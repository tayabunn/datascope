import { NextRequest, NextResponse } from "next/server";

interface StoredSavedView {
  id: string;
  name: string;
  description?: string;
  filters: Record<string, unknown>;
  sorting: { field: string; order: "asc" | "desc" };
  visibleColumns: string[];
  isShared: boolean;
  createdAt: string;
}

let savedViewsStore: StoredSavedView[] = [
  {
    id: "view-001",
    name: "High-Value German Enterprise Accounts",
    description: "Active accounts based in Germany with revenues exceeding $100,000",
    filters: { status: "Active", country: "Germany", minRevenue: 100000 },
    sorting: { field: "revenue", order: "desc" },
    visibleColumns: ["recordCode", "title", "companyName", "status", "country", "revenue", "profit", "priority"],
    isShared: true,
    createdAt: "2026-01-10T14:00:00Z",
  },
  {
    id: "view-002",
    name: "Pending Critical Reviews (US & UK)",
    description: "Urgent or High priority transactions pending operational audit",
    filters: { status: "Pending", priority: "Urgent" },
    sorting: { field: "createdAt", order: "desc" },
    visibleColumns: ["recordCode", "title", "companyName", "priority", "status", "revenue", "createdAt"],
    isShared: true,
    createdAt: "2026-01-12T09:30:00Z",
  },
  {
    id: "view-003",
    name: "Top Profit Margin Leaders",
    description: "Deals sorted by maximum net profit margins",
    filters: { status: "Active" },
    sorting: { field: "profit", order: "desc" },
    visibleColumns: ["recordCode", "companyName", "revenue", "cost", "profit", "rating"],
    isShared: false,
    createdAt: "2026-02-01T11:15:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: savedViewsStore,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newView: StoredSavedView = {
      id: `view-${Date.now()}`,
      name: body.viewName || body.name || "Untitled View",
      description: body.description || "",
      filters: body.filters || {},
      sorting: body.sortingConfig || body.sorting || { field: "createdAt", order: "desc" },
      visibleColumns: body.visibleColumns || ["recordCode", "title", "revenue", "status"],
      isShared: Boolean(body.isShared),
      createdAt: new Date().toISOString(),
    };

    savedViewsStore.unshift(newView);

    return NextResponse.json({
      success: true,
      data: newView,
      message: "View saved successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 400 }
    );
  }
}

