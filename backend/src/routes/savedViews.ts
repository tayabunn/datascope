import { Router, Request, Response } from "express";

const router = Router();

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
];

router.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: savedViewsStore });
});

router.post("/", (req: Request, res: Response) => {
  try {
    const body = req.body;
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
    res.json({ success: true, data: newView, message: "View saved successfully." });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  savedViewsStore = savedViewsStore.filter((v) => v.id !== id);
  res.json({ success: true, message: `View ${id} deleted successfully.` });
});

export default router;

