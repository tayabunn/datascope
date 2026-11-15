import { Router, Request, Response } from "express";
import { getOrGenerateMockRecords } from "../mockData.js";
import { authenticateUser, requireRole } from "../middleware/auth.js";

const router = Router();

// GET /api/export - Streaming CSV Export (RBAC Protected: Admin & Analyst only)
router.get(
  "/",
  authenticateUser,
  requireRole("Administrator", "Data Analyst"),
  (req: Request, res: Response) => {
  const q = (req.query.q as string) || "";
  const status = (req.query.status as string) || "all";
  const category = (req.query.category as string) || "all";
  const country = (req.query.country as string) || "all";

  const idsParam = (req.query.ids as string) || "";

  const allRecords = getOrGenerateMockRecords(5000);
  let filtered = allRecords;

  if (idsParam.trim()) {
    const idList = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    filtered = filtered.filter((r) => idList.includes(r.id) || idList.includes(r.recordCode));
  } else {
    if (q.trim()) {
      const term = q.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.companyName.toLowerCase().includes(term) ||
          r.recordCode.toLowerCase().includes(term)
      );
    }
    if (status !== "all") filtered = filtered.filter((r) => r.status === status);
    if (category !== "all") filtered = filtered.filter((r) => r.category === category);
    if (country !== "all") filtered = filtered.filter((r) => r.country === country);
  }

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="datascope-export-${new Date().toISOString().slice(0, 10)}.csv"`
  );

  // Write CSV headers
  res.write("Record ID,Deal Title,Company Name,Category,Status,Country,Revenue ($),Cost ($),Profit ($),Rating,Priority,Created Date\n");

  let index = 0;
  function streamChunk() {
    const chunk = filtered.slice(index, index + 500);
    if (chunk.length === 0) {
      res.end();
      return;
    }

    let csvLines = "";
    for (const r of chunk) {
      const safeTitle = `"${r.title.replace(/"/g, '""')}"`;
      const safeCompany = `"${r.companyName.replace(/"/g, '""')}"`;
      csvLines += `${r.recordCode},${safeTitle},${safeCompany},${r.category},${r.status},${r.country},${r.revenue},${r.cost},${r.profit},${r.rating},${r.priority},${r.createdAt}\n`;
    }

    res.write(csvLines);
    index += 500;
    setTimeout(streamChunk, 5);
  }

  streamChunk();
});

export default router;

