import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const AiSearchInputSchema = z.object({
  prompt: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = AiSearchInputSchema.parse(body);

    const lower = prompt.toLowerCase();
    const generatedFilter: Record<string, any> = {};

    // 1. Status extraction
    if (lower.includes("active")) generatedFilter.status = "Active";
    else if (lower.includes("pending")) generatedFilter.status = "Pending";
    else if (lower.includes("inactive")) generatedFilter.status = "Inactive";
    else if (lower.includes("archived")) generatedFilter.status = "Archived";

    // 2. Country extraction
    const countries = [
      "germany", "united states", "united kingdom", "france", "japan",
      "canada", "australia", "singapore", "netherlands", "switzerland"
    ];
    for (const c of countries) {
      if (lower.includes(c)) {
        generatedFilter.country = c
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        break;
      }
    }

    // 3. Category extraction
    if (lower.includes("enterprise")) generatedFilter.category = "Enterprise";
    else if (lower.includes("mid-market") || lower.includes("midmarket")) generatedFilter.category = "Mid-Market";
    else if (lower.includes("smb")) generatedFilter.category = "SMB";
    else if (lower.includes("public sector")) generatedFilter.category = "Public Sector";
    else if (lower.includes("financial")) generatedFilter.category = "Financial Services";

    // 4. Revenue extraction (e.g. "greater than 10,000", "> 50k", "over 100000")
    const revMatch = lower.match(/(?:greater than|more than|over|>)\s*\$?([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?k?)/);
    if (revMatch) {
      let rawVal = revMatch[1].replace(/,/g, "");
      let multiplier = 1;
      if (rawVal.endsWith("k")) {
        multiplier = 1000;
        rawVal = rawVal.slice(0, -1);
      }
      const num = parseFloat(rawVal) * multiplier;
      if (!isNaN(num)) generatedFilter.minRevenue = num;
    }

    // 5. Sorting extraction
    if (lower.includes("highest revenue") || lower.includes("top revenue")) {
      generatedFilter.sortField = "revenue";
      generatedFilter.sortOrder = "desc";
    } else if (lower.includes("most profitable") || lower.includes("highest profit")) {
      generatedFilter.sortField = "profit";
      generatedFilter.sortOrder = "desc";
    } else if (lower.includes("newest") || lower.includes("recent")) {
      generatedFilter.sortField = "createdAt";
      generatedFilter.sortOrder = "desc";
    }

    return NextResponse.json({
      success: true,
      data: {
        interpretation: `Converted natural language query: "${prompt}" into validated parameters.`,
        filterConfig: generatedFilter,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 400 }
    );
  }
}
