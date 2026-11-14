import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

const AiSearchInputSchema = z.object({
  prompt: z.string().min(2),
});

// POST /api/ai-search - Natural Language query converter
router.post("/", (req: Request, res: Response) => {
  try {
    const { prompt } = AiSearchInputSchema.parse(req.body);
    const lower = prompt.toLowerCase();
    const generatedFilter: Record<string, any> = {};

    if (lower.includes("active")) generatedFilter.status = "Active";
    else if (lower.includes("pending")) generatedFilter.status = "Pending";
    else if (lower.includes("inactive")) generatedFilter.status = "Inactive";
    else if (lower.includes("archived")) generatedFilter.status = "Archived";

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

    if (lower.includes("enterprise")) generatedFilter.category = "Enterprise";
    else if (lower.includes("mid-market") || lower.includes("midmarket")) generatedFilter.category = "Mid-Market";
    else if (lower.includes("smb")) generatedFilter.category = "SMB";
    else if (lower.includes("public sector")) generatedFilter.category = "Public Sector";
    else if (lower.includes("financial")) generatedFilter.category = "Financial Services";

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

    if (lower.includes("highest revenue") || lower.includes("top revenue")) {
      generatedFilter.sortField = "revenue";
      generatedFilter.sortOrder = "desc";
    } else if (lower.includes("most profitable") || lower.includes("highest profit")) {
      generatedFilter.sortField = "profit";
      generatedFilter.sortOrder = "desc";
    }

    res.json({
      success: true,
      data: {
        interpretation: `Converted natural language query: "${prompt}" into validated parameters.`,
        filterConfig: generatedFilter,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

export default router;

