import { Router, Request, Response } from "express";

const router = Router();

export interface StoredSavedView {
  id: string;
  viewName: string;
  description?: string;
  datasetId: string;
  datasetName: string;
  searchConditions: {
    q: string;
  };
  filters: {
    status?: string;
    category?: string;
    country?: string;
    minRevenue?: number | null;
    maxRevenue?: number | null;
    startDate?: string | null;
    endDate?: string | null;
  };
  sortingConfig: {
    field: string;
    order: string;
  };
  visibleColumns: string[];
  isShared: boolean;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
}

let savedViewsStore: StoredSavedView[] = [
  {
    id: "view-001",
    viewName: "High-Value German Enterprise Accounts",
    description: "Active enterprise accounts based in Germany with revenues exceeding $100,000",
    datasetId: "ds-global-enterprise-01",
    datasetName: "Global Enterprise Revenue & Contracts",
    searchConditions: { q: "" },
    filters: { status: "Active", country: "Germany", minRevenue: 100000 },
    sortingConfig: { field: "revenue", order: "desc" },
    visibleColumns: ["recordCode", "title", "companyName", "status", "country", "revenue", "profit", "priority"],
    isShared: true,
    sharedWith: ["Admin", "Data Analyst", "Viewer"],
    createdAt: "2026-01-10T14:00:00Z",
    updatedAt: "2026-01-10T14:00:00Z",
  },
  {
    id: "view-002",
    viewName: "Pending Critical Reviews (US & UK)",
    description: "Urgent or High priority transactions pending operational audit",
    datasetId: "ds-global-enterprise-01",
    datasetName: "Global Enterprise Revenue & Contracts",
    searchConditions: { q: "" },
    filters: { status: "Pending" },
    sortingConfig: { field: "createdAt", order: "desc" },
    visibleColumns: ["recordCode", "title", "companyName", "priority", "status", "revenue", "createdAt"],
    isShared: true,
    sharedWith: ["Admin", "Data Analyst"],
    createdAt: "2026-01-12T09:30:00Z",
    updatedAt: "2026-01-12T09:30:00Z",
  },
  {
    id: "view-003",
    viewName: "High-Margin APAC Cloud Contracts",
    description: "Profitable deals located in Singapore and Japan with positive cash margin",
    datasetId: "ds-global-enterprise-01",
    datasetName: "Global Enterprise Revenue & Contracts",
    searchConditions: { q: "cloud" },
    filters: { country: "Singapore", category: "Enterprise", minRevenue: 50000 },
    sortingConfig: { field: "profit", order: "desc" },
    visibleColumns: ["recordCode", "title", "companyName", "country", "revenue", "profit", "rating"],
    isShared: false,
    sharedWith: [],
    createdAt: "2026-02-01T11:15:00Z",
    updatedAt: "2026-02-01T11:15:00Z",
  },
];

// GET /api/saved-views - List all saved views
router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: savedViewsStore });
});

// POST /api/saved-views - Create a new saved view
router.post("/", (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newView: StoredSavedView = {
      id: `view-${Date.now()}`,
      viewName: body.viewName || body.name || "Untitled View",
      description: body.description || "",
      datasetId: body.datasetId || "ds-global-enterprise-01",
      datasetName: body.datasetName || "Global Enterprise Revenue & Contracts",
      searchConditions: body.searchConditions || { q: body.q || "" },
      filters: body.filters || {},
      sortingConfig: body.sortingConfig || body.sorting || { field: "createdAt", order: "desc" },
      visibleColumns: body.visibleColumns || [
        "recordCode",
        "title",
        "companyName",
        "status",
        "revenue",
        "profit",
      ],
      isShared: Boolean(body.isShared),
      sharedWith: body.sharedWith || (body.isShared ? ["Admin", "Data Analyst", "Viewer"] : []),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    savedViewsStore.unshift(newView);
    res.json({ success: true, data: newView, message: "View saved successfully." });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// PUT /api/saved-views/:id - Edit an existing saved view
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = savedViewsStore.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: { message: "Saved view not found." } });
  }

  const existing = savedViewsStore[index];
  const body = req.body;

  const updatedView: StoredSavedView = {
    ...existing,
    viewName: body.viewName ?? existing.viewName,
    description: body.description ?? existing.description,
    datasetName: body.datasetName ?? existing.datasetName,
    searchConditions: body.searchConditions ?? existing.searchConditions,
    filters: body.filters ?? existing.filters,
    sortingConfig: body.sortingConfig ?? existing.sortingConfig,
    visibleColumns: body.visibleColumns ?? existing.visibleColumns,
    isShared: body.isShared !== undefined ? Boolean(body.isShared) : existing.isShared,
    sharedWith: body.sharedWith ?? existing.sharedWith,
    updatedAt: new Date().toISOString(),
  };

  savedViewsStore[index] = updatedView;
  res.json({ success: true, data: updatedView, message: "View updated successfully." });
});

// PATCH /api/saved-views/:id/share - Toggle share status with team members
router.patch("/:id/share", (req: Request, res: Response) => {
  const { id } = req.params;
  const view = savedViewsStore.find((v) => v.id === id);

  if (!view) {
    return res.status(404).json({ success: false, error: { message: "Saved view not found." } });
  }

  const { isShared, sharedWith } = req.body;
  view.isShared = isShared !== undefined ? Boolean(isShared) : !view.isShared;
  if (sharedWith) {
    view.sharedWith = sharedWith;
  } else if (view.isShared && view.sharedWith.length === 0) {
    view.sharedWith = ["Admin", "Data Analyst", "Viewer"];
  }
  view.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    data: view,
    message: view.isShared
      ? "View shared with authorized team members."
      : "View made private.",
  });
});

// DELETE /api/saved-views/:id - Delete a saved view
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  savedViewsStore = savedViewsStore.filter((v) => v.id !== id);
  res.json({ success: true, message: `View ${id} deleted successfully.` });
});

export default router;
