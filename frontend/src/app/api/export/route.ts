import { NextRequest } from "next/server";
import { getOrGenerateMockRecords } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const country = searchParams.get("country") || "all";

  const allRecords = getOrGenerateMockRecords(5000);
  let filtered = allRecords;

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

  // Stream CSV chunk by chunk
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Header row
      const headers = "Record ID,Deal Title,Company Name,Category,Status,Country,Revenue ($),Cost ($),Profit ($),Rating,Priority,Created Date\n";
      controller.enqueue(encoder.encode(headers));

      // Stream records in chunks of 500
      let index = 0;
      function pushChunk() {
        const chunk = filtered.slice(index, index + 500);
        if (chunk.length === 0) {
          controller.close();
          return;
        }

        let csvLines = "";
        for (const r of chunk) {
          const safeTitle = `"${r.title.replace(/"/g, '""')}"`;
          const safeCompany = `"${r.companyName.replace(/"/g, '""')}"`;
          csvLines += `${r.recordCode},${safeTitle},${safeCompany},${r.category},${r.status},${r.country},${r.revenue},${r.cost},${r.profit},${r.rating},${r.priority},${r.createdAt}\n`;
        }

        controller.enqueue(encoder.encode(csvLines));
        index += 500;
        setTimeout(pushChunk, 5); // cooperative tick
      }

      pushChunk();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="datascope-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Transfer-Encoding": "chunked",
    },
  });
}

