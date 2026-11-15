import { Router, Request, Response } from "express";
import { z } from "zod";
import { authenticateUser, requireRole } from "../middleware/auth.js";

const router = Router();

export interface DatasetItem {
  id: string;
  name: string;
  description: string;
  category: string;
  dataSource: string;
  totalRecords: number;
  accessLevel: "Public" | "Internal" | "Restricted";
  createdAt: string;
  lastUpdated: string;
}

let datasetsStore: DatasetItem[] = [
  {
    id: "ds-global-enterprise-01",
    name: "Global Enterprise Revenue & Contracts",
    description: "High-volume repository containing enterprise contract telemetry, multi-region sales, account profitability, and historical status audits.",
    category: "Enterprise",
    dataSource: "SAP S/4HANA & Salesforce Lake",
    totalRecords: 100000,
    accessLevel: "Public",
    createdAt: "2026-01-01T00:00:00Z",
    lastUpdated: "2026-11-14T10:00:00Z",
  },
  {
    id: "ds-cloud-infra-02",
    name: "Cloud Infrastructure & Telemetry Metrics",
    description: "Multi-cluster Kubernetes pod telemetry, CPU utilization matrices, edge computing bandwidth, and SLA uptime records.",
    category: "DevOps & Cloud",
    dataSource: "Datadog & AWS CloudWatch Ingest",
    totalRecords: 245000,
    accessLevel: "Internal",
    createdAt: "2026-01-15T00:00:00Z",
    lastUpdated: "2026-11-12T15:30:00Z",
  },
  {
    id: "ds-hft-fin-03",
    name: "Algorithmic High-Frequency Transactions",
    description: "Securities order books, settlement logs, derivative margin calls, and real-time execution tick streams.",
    category: "Financial Services",
    dataSource: "Bloomberg Terminal & FIX Protocol Feed",
    totalRecords: 500000,
    accessLevel: "Restricted",
    createdAt: "2026-02-01T00:00:00Z",
    lastUpdated: "2026-11-10T08:45:00Z",
  },
];

const CreateDatasetSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional().default(""),
  category: z.string().default("Enterprise"),
  dataSource: z.string().default("Data Lake"),
  accessLevel: z.enum(["Public", "Internal", "Restricted"]).default("Internal"),
});

// GET /api/datasets - List all registered datasets
router.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: datasetsStore,
    totalCount: datasetsStore.length,
  });
});

// GET /api/datasets/:id - Get a single dataset by ID
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const ds = datasetsStore.find((d) => d.id === id);
  if (!ds) {
    return res.status(404).json({ success: false, error: { message: "Dataset not found." } });
  }
  res.json({ success: true, data: ds });
});

// POST /api/datasets - Create a new dataset (RBAC: Administrator authority only)
router.post(
  "/",
  authenticateUser,
  requireRole("Administrator"),
  (req: Request, res: Response) => {
  const parsed = CreateDatasetSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid dataset configuration.", details: parsed.error.issues },
    });
  }

  const { name, description, category, dataSource, accessLevel } = parsed.data;
  const newDataset: DatasetItem = {
    id: `ds-${Date.now()}`,
    name,
    description,
    category,
    dataSource,
    totalRecords: 0,
    accessLevel,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };

  datasetsStore.push(newDataset);
  res.status(201).json({ success: true, data: newDataset, message: "Dataset registered successfully." });
});

export default router;
