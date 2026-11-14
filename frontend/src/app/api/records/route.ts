import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, pool } from "@/db";
import { datasetRecords } from "@/db/schema";
import { sql, and, eq, gte, lte, ilike, or, desc, asc } from "drizzle-orm";
import { getOrGenerateMockRecords } from "@/lib/mockData";

const RecordsQuerySchema = z.object({
  datasetId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(5).max(250).default(50),
  q: z.string().optional().default(""),
  status: z.string().optional().default("all"),
  category: z.string().optional().default("all"),
  country: z.string().optional().default("all"),
  minRevenue: z.coerce.number().optional(),
  maxRevenue: z.coerce.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortField: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export async function GET(req: NextRequest) {
  const startTime = performance.now();

  try {
    const { searchParams } = new URL(req.url);
    const parsed = RecordsQuerySchema.safeParse(
      Object.fromEntries(searchParams.entries())
    );

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters.",
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const {
      page,
      pageSize,
      q,
      status,
      category,
      country,
      minRevenue,
      maxRevenue,
      startDate,
      endDate,
      sortField,
      sortOrder,
    } = parsed.data;

    const offset = (page - 1) * pageSize;

    // 1. Attempt PostgreSQL Query via Drizzle ORM
    let isDbConnected = false;
    try {
      // Quick ping test to verify DB responsiveness within 1.5s
      const client = await Promise.race([
        pool.connect(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("DB Timeout")), 1500)
        ),
      ]);
      (client as any).release();
      isDbConnected = true;
    } catch {
      isDbConnected = false;
    }

    if (isDbConnected) {
      const conditions = [];

      // Global search across title, companyName, recordCode using GIN / ILIKE
      if (q && q.trim().length > 0) {
        const queryTerm = `%${q.trim()}%`;
        conditions.push(
          or(
            ilike(datasetRecords.title, queryTerm),
            ilike(datasetRecords.companyName, queryTerm),
            ilike(datasetRecords.recordCode, queryTerm)
          )
        );
      }

      // Exact & Categorical filters
      if (status && status !== "all") {
        conditions.push(eq(datasetRecords.status, status));
      }
      if (category && category !== "all") {
        conditions.push(eq(datasetRecords.category, category));
      }
      if (country && country !== "all") {
        conditions.push(eq(datasetRecords.country, country));
      }

      // Numeric ranges
      if (minRevenue != null) {
        conditions.push(gte(datasetRecords.revenue, String(minRevenue)));
      }
      if (maxRevenue != null) {
        conditions.push(lte(datasetRecords.revenue, String(maxRevenue)));
      }

      // Date ranges
      if (startDate) {
        conditions.push(gte(datasetRecords.createdAt, new Date(startDate)));
      }
      if (endDate) {
        conditions.push(lte(datasetRecords.createdAt, new Date(endDate)));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      // Dynamic sorting
      const sortColumn =
        sortField === "revenue"
          ? datasetRecords.revenue
          : sortField === "profit"
          ? datasetRecords.profit
          : sortField === "rating"
          ? datasetRecords.rating
          : sortField === "companyName"
          ? datasetRecords.companyName
          : sortField === "title"
          ? datasetRecords.title
          : datasetRecords.createdAt;

      const orderExpr = sortOrder === "asc" ? asc(sortColumn) : desc(sortColumn);

      // Execute data query and count in parallel
      const [rows, [countRes]] = await Promise.all([
        db
          .select()
          .from(datasetRecords)
          .where(whereClause)
          .orderBy(orderExpr)
          .limit(pageSize)
          .offset(offset),
        db
          .select({ totalCount: sql<number>`cast(count(*) as integer)` })
          .from(datasetRecords)
          .where(whereClause),
      ]);

      const totalCount = countRes?.totalCount || 0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const executionTimeMs = Math.round((performance.now() - startTime) * 10) / 10;

      return NextResponse.json({
        success: true,
        data: rows.map((r) => ({
          ...r,
          revenue: Number(r.revenue),
          cost: Number(r.cost),
          profit: Number(r.profit),
          rating: Number(r.rating),
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        })),
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        meta: {
          executionTimeMs,
          engine: "PostgreSQL (Drizzle ORM)",
          timestamp: new Date().toISOString(),
        },
      });
    }

    // 2. High-Performance Local / In-Memory Fallback
    const mockDataset = getOrGenerateMockRecords(25000);
    let filtered = mockDataset;

    if (q && q.trim().length > 0) {
      const term = q.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.companyName.toLowerCase().includes(term) ||
          r.recordCode.toLowerCase().includes(term)
      );
    }

    if (status && status !== "all") {
      filtered = filtered.filter((r) => r.status === status);
    }
    if (category && category !== "all") {
      filtered = filtered.filter((r) => r.category === category);
    }
    if (country && country !== "all") {
      filtered = filtered.filter((r) => r.country === country);
    }
    if (minRevenue != null) {
      filtered = filtered.filter((r) => r.revenue >= minRevenue);
    }
    if (maxRevenue != null) {
      filtered = filtered.filter((r) => r.revenue <= maxRevenue);
    }
    if (startDate) {
      const startMs = new Date(startDate).getTime();
      filtered = filtered.filter((r) => new Date(r.createdAt).getTime() >= startMs);
    }
    if (endDate) {
      const endMs = new Date(endDate).getTime();
      filtered = filtered.filter((r) => new Date(r.createdAt).getTime() <= endMs);
    }

    // Sort
    filtered.sort((a, b) => {
      let valA: any = a[sortField as keyof typeof a] ?? a.createdAt;
      let valB: any = b[sortField as keyof typeof b] ?? b.createdAt;

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const pagedRecords = filtered.slice(offset, offset + pageSize);
    const executionTimeMs = Math.round((performance.now() - startTime) * 10) / 10;

    return NextResponse.json({
      success: true,
      data: pagedRecords,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      meta: {
        executionTimeMs,
        engine: "DataScope In-Memory Fallback Engine",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("API /records error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: error.message || "An unexpected error occurred",
        },
      },
      { status: 500 }
    );
  }
}

