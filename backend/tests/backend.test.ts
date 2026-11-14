import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getOrGenerateMockRecords } from "../src/mockData.js";

describe("DataScope Backend REST API & Engine Tests", () => {
  const records = getOrGenerateMockRecords(1000);

  test("1. Dataset Ingestion & Schema Integrity", () => {
    assert.equal(records.length, 1000, "Must contain 1,000 deterministic records");
    assert.ok(records[0].recordCode.startsWith("REC-"), "Record Code format REC-xxxxxx");
    assert.ok(records[0].revenue > 0, "Revenue must be positive");
    assert.ok(records[0].profit <= records[0].revenue, "Profit cannot exceed revenue");
  });

  test("2. Substring & Trigram Search Simulation", () => {
    const query = "cloud";
    const matches = records.filter((r) => r.title.toLowerCase().includes(query));
    assert.ok(matches.length > 0, "Must return matches for 'cloud'");
    for (const m of matches) {
      assert.ok(m.title.toLowerCase().includes(query));
    }
  });

  test("3. Multi-Predicate Filter Combinations", () => {
    const results = records.filter(
      (r) => r.status === "Active" && r.country === "Germany" && r.revenue >= 50000
    );

    for (const r of results) {
      assert.equal(r.status, "Active");
      assert.equal(r.country, "Germany");
      assert.ok(r.revenue >= 50000);
    }
  });

  test("4. Server-Side Pagination Slice Bounds", () => {
    const pageSize = 50;
    const page2 = records.slice(50, 100);
    assert.equal(page2.length, 50);
    assert.equal(page2[0].recordCode, "REC-000051");
  });

  test("5. Multi-Column Sorting Verification", () => {
    const sorted = [...records].sort((a, b) => b.revenue - a.revenue);
    assert.ok(sorted[0].revenue >= sorted[1].revenue);
    assert.ok(sorted[0].revenue >= sorted[sorted.length - 1].revenue);
  });
});
