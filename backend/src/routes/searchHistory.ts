import { Router, Request, Response } from "express";

const router = Router();

export interface SearchHistoryEntry {
  id: string;
  queryString: string;
  datasetName: string;
  filterConfig: {
    status?: string;
    category?: string;
    country?: string;
    minRevenue?: number | null;
    maxRevenue?: number | null;
  };
  sortingConfig?: {
    field: string;
    order: string;
  };
  totalMatches: number;
  executionTimeMs: number;
  executedAt: string;
}

let historyStore: SearchHistoryEntry[] = [
  {
    id: "hist-001",
    queryString: "cloud",
    datasetName: "Global Enterprise Revenue & Contracts",
    filterConfig: {
      status: "Active",
      country: "Germany",
      minRevenue: 50000,
    },
    sortingConfig: {
      field: "revenue",
      order: "desc",
    },
    totalMatches: 842,
    executionTimeMs: 14.1,
    executedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "hist-002",
    queryString: "",
    datasetName: "Global Enterprise Revenue & Contracts",
    filterConfig: {
      status: "Pending",
    },
    sortingConfig: {
      field: "createdAt",
      order: "desc",
    },
    totalMatches: 312,
    executionTimeMs: 11.5,
    executedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "hist-003",
    queryString: "Siemens",
    datasetName: "Global Enterprise Revenue & Contracts",
    filterConfig: {
      country: "Germany",
      category: "Enterprise",
    },
    sortingConfig: {
      field: "revenue",
      order: "desc",
    },
    totalMatches: 124,
    executionTimeMs: 12.8,
    executedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

// GET /api/search-history - Retrieve recent executed queries
router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: historyStore });
});

// POST /api/search-history - Log a newly executed query
router.post("/", (req: Request, res: Response) => {
  try {
    const { queryString, filterConfig, sortingConfig, totalMatches, executionTimeMs, datasetName } = req.body;

    // Skip empty dummy searches if no query and no filters
    const hasFilter = filterConfig && Object.values(filterConfig).some((v) => v && v !== "all");
    const hasQuery = queryString && queryString.trim().length > 0;

    if (!hasFilter && !hasQuery) {
      return res.json({ success: true, skipped: true });
    }

    // Deduplicate if identical query was added within the last 15 seconds
    if (historyStore.length > 0) {
      const latest = historyStore[0];
      const isSameQuery = (latest.queryString || "") === (queryString || "");
      const isRecent = Date.now() - new Date(latest.executedAt).getTime() < 15000;
      if (isSameQuery && isRecent) {
        return res.json({ success: true, deduplicated: true, data: latest });
      }
    }

    const newEntry: SearchHistoryEntry = {
      id: `hist-${Date.now()}`,
      queryString: (queryString || "").trim(),
      datasetName: datasetName || "Global Enterprise Revenue & Contracts",
      filterConfig: filterConfig || {},
      sortingConfig: sortingConfig || { field: "createdAt", order: "desc" },
      totalMatches: Number(totalMatches) || 0,
      executionTimeMs: Number(executionTimeMs) || 12.5,
      executedAt: new Date().toISOString(),
    };

    historyStore.unshift(newEntry);

    // Keep history capped to last 50 queries
    if (historyStore.length > 50) {
      historyStore = historyStore.slice(0, 50);
    }

    res.json({ success: true, data: newEntry });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// DELETE /api/search-history - Clear all recent search history
router.delete("/", (req: Request, res: Response) => {
  historyStore = [];
  res.json({ success: true, message: "Search history cleared successfully." });
});

// DELETE /api/search-history/:id - Delete a specific search history entry
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  historyStore = historyStore.filter((h) => h.id !== id);
  res.json({ success: true, message: `History entry ${id} deleted.` });
});

export default router;
