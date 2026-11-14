import { db, pool } from "./index";
import {
  users,
  datasets,
  datasetFields,
  datasetRecords,
  savedViews,
  userPreferences,
  recordRelationships,
} from "./schema";
import { sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Realistic Data Generators
// ---------------------------------------------------------------------------
const COMPANY_PREFIXES = [
  "Apex", "Nova", "Starlight", "Quantum", "Nexus", "Vanguard", "Summit",
  "Cyber", "Cloud", "Vertex", "Pulse", "Orion", "Alpha", "Hyper", "Synapse",
  "Aero", "Bio", "Crest", "Dynasty", "Echo", "Falcon", "Genesis", "Horizon",
  "Iron", "Jupiter", "Krypton", "Luminary", "Matrix", "Neutron", "Omega",
  "Pinnacle", "Quasar", "Radiant", "Stratum", "Titan", "Unity", "Valence"
];

const COMPANY_SUFFIXES = [
  "Dynamics", "Technologies", "Logistics", "Ventures", "Systems", "Solutions",
  "Holdings", "Labs", "Energy", "Analytics", "Networks", "Capital", "Group",
  "Digital", "Software", "Security", "Industries", "Consulting", "Robotics"
];

const DEAL_TITLES = [
  "Enterprise Multi-Cloud Infrastructure Migration",
  "Global Real-Time Data Pipeline Architecture",
  "Zero-Trust Cybersecurity & SOC 2 Compliance Suite",
  "Automated Global Financial Reconciliation Gateway",
  "Predictive AI Demand Forecasting Engine",
  "IoT Fleet Telemetry & Edge Computing Gateway",
  "High-Frequency Algorithmic Execution Platform",
  "Omnichannel Customer Identity Resolution Hub",
  "Microservices API Gateway & Service Mesh Modernization",
  "Containerized Kubernetes Orchestration Cluster",
  "Enterprise Data Warehouse Consolidation",
  "Automated Supply Chain Visibility Matrix",
  "Next-Gen Payment Orchestration & Settlement",
  "Healthcare Regulatory EHR Integration Pipeline",
  "Telecom 5G Core Network Analytics Framework"
];

const CATEGORIES = [
  "Enterprise",
  "Mid-Market",
  "SMB",
  "Public Sector",
  "Financial Services"
];

const STATUSES = ["Active", "Pending", "Inactive", "Archived"];
const STATUS_WEIGHTS = [0.65, 0.18, 0.12, 0.05]; // 65% Active, 18% Pending, etc.

const COUNTRIES = [
  "Germany", "United States", "United Kingdom", "France", "Japan",
  "Canada", "Australia", "Singapore", "Netherlands", "Switzerland",
  "Sweden", "Brazil", "India"
];

const PRIORITIES = ["Urgent", "High", "Medium", "Low"];

const ALL_TAGS = [
  "tier-1", "cloud", "saas", "critical", "fintech", "compliance",
  "renewal", "expansion", "strategic", "emea", "apac", "north-america"
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomWeightedStatus(): string {
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < STATUSES.length; i++) {
    cumulative += STATUS_WEIGHTS[i];
    if (rand <= cumulative) return STATUSES[i];
  }
  return "Active";
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// ---------------------------------------------------------------------------
// Main High-Speed Seeder
// ---------------------------------------------------------------------------
export async function seedDatabase(targetRecordCount = 100000) {
  console.log("==========================================================");
  console.log("  DataScope – Enterprise Data Seeder (100,000 Records)    ");
  console.log("==========================================================");

  const startTime = Date.now();

  try {
    // 0. Ensure PostgreSQL pg_trgm extension exists for fast search
    console.log("-> Checking PostgreSQL pg_trgm extension...");
    try {
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
      console.log("   ✓ pg_trgm extension enabled successfully.");
    } catch {
      console.log("   * Notice: pg_trgm extension could not be enabled directly (may require superuser or already active). Continuing...");
    }

    // 1. Seed Core Users (Admin, Data Analyst, Viewer)
    console.log("-> Seeding Core System Users...");
    const [adminUser] = await db
      .insert(users)
      .values({
        email: "admin@datascope.internal",
        fullName: "Alex Rivera (Chief Data Officer)",
        passwordHash: "$2a$12$e8m4hS...", // Mock hashed password
        role: "Administrator",
      })
      .onConflictDoUpdate({
        target: users.email,
        set: { fullName: "Alex Rivera (Chief Data Officer)" },
      })
      .returning();

    const [analystUser] = await db
      .insert(users)
      .values({
        email: "analyst@datascope.internal",
        fullName: "Sarah Connor (Senior Data Analyst)",
        passwordHash: "$2a$12$e8m4hS...",
        role: "Data Analyst",
      })
      .onConflictDoUpdate({
        target: users.email,
        set: { fullName: "Sarah Connor (Senior Data Analyst)" },
      })
      .returning();

    await db
      .insert(users)
      .values({
        email: "viewer@datascope.internal",
        fullName: "Marcus Vance (Executive Viewer)",
        passwordHash: "$2a$12$e8m4hS...",
        role: "Viewer",
      })
      .onConflictDoNothing();

    console.log("   ✓ Admin, Analyst, and Viewer accounts seeded.");

    // 2. Seed Default User Preferences
    await db
      .insert(userPreferences)
      .values({
        userId: adminUser.id,
        theme: "dark",
        pageSize: 50,
        tableDensity: "compact",
        visibleColumns: ["recordCode", "title", "companyName", "category", "status", "country", "revenue", "profit", "priority", "createdAt"],
      })
      .onConflictDoNothing();

    // 3. Seed Primary Dataset Definition
    console.log("-> Seeding Primary Enterprise Dataset...");
    const [dataset] = await db
      .insert(datasets)
      .values({
        name: "Global Enterprise Revenue & Contracts",
        description:
          "High-volume repository containing enterprise contract telemetry, multi-region sales, account profitability, and historical status audits.",
        category: "Enterprise",
        dataSource: "SAP S/4HANA & Salesforce Lake",
        totalRecords: targetRecordCount,
        accessLevel: "Public",
        createdById: adminUser.id,
      })
      .onConflictDoUpdate({
        target: datasets.name,
        set: { totalRecords: targetRecordCount, updatedAt: new Date() },
      })
      .returning();

    console.log(`   ✓ Dataset registered: '${dataset.name}' (ID: ${dataset.id})`);

    // 4. Seed Dataset Fields metadata
    console.log("-> Registering Schema Field Metadata...");
    const fieldsToInsert = [
      { fieldName: "recordCode", displayName: "Record ID", dataType: "string", orderIndex: 1 },
      { fieldName: "title", displayName: "Deal / Contract Title", dataType: "string", orderIndex: 2 },
      { fieldName: "companyName", displayName: "Target Company", dataType: "string", orderIndex: 3 },
      { fieldName: "category", displayName: "Sector Category", dataType: "enum", orderIndex: 4 },
      { fieldName: "status", displayName: "Operational Status", dataType: "enum", orderIndex: 5 },
      { fieldName: "country", displayName: "Origin Country", dataType: "string", orderIndex: 6 },
      { fieldName: "revenue", displayName: "Total Revenue ($)", dataType: "number", orderIndex: 7 },
      { fieldName: "cost", displayName: "Operating Cost ($)", dataType: "number", orderIndex: 8 },
      { fieldName: "profit", displayName: "Net Profit ($)", dataType: "number", orderIndex: 9 },
      { fieldName: "rating", displayName: "Client Rating", dataType: "number", orderIndex: 10 },
      { fieldName: "priority", displayName: "Execution Priority", dataType: "enum", orderIndex: 11 },
      { fieldName: "createdAt", displayName: "Created Date", dataType: "date", orderIndex: 12 },
    ];

    for (const f of fieldsToInsert) {
      await db
        .insert(datasetFields)
        .values({
          datasetId: dataset.id,
          fieldName: f.fieldName,
          displayName: f.displayName,
          dataType: f.dataType,
          orderIndex: f.orderIndex,
        })
        .onConflictDoNothing();
    }
    console.log("   ✓ 12 Field schema definitions mapped.");

    // 5. Check if records already exist
    const [countResult] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(datasetRecords)
      .where(sql`dataset_id = ${dataset.id}`);

    const existingCount = countResult?.count || 0;
    console.log(`-> Existing Records Count: ${existingCount.toLocaleString()} rows.`);

    if (existingCount >= targetRecordCount) {
      console.log(`✓ Database already contains ${existingCount.toLocaleString()} records. Seeding skipped!`);
      return;
    }

    const recordsToGenerate = targetRecordCount - existingCount;
    console.log(`-> Generating & Streaming ${recordsToGenerate.toLocaleString()} Records in Chunks of 2,500...`);

    const BATCH_SIZE = 2500;
    const totalBatches = Math.ceil(recordsToGenerate / BATCH_SIZE);
    const dateStart = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000); // 2 years ago
    const dateEnd = new Date();

    for (let batch = 0; batch < totalBatches; batch++) {
      const currentBatchSize = Math.min(
        BATCH_SIZE,
        recordsToGenerate - batch * BATCH_SIZE
      );
      const batchRecords = [];

      for (let i = 0; i < currentBatchSize; i++) {
        const globalIndex = existingCount + batch * BATCH_SIZE + i + 1;
        const codeNum = String(globalIndex).padStart(6, "0");
        const companyName = `${getRandomItem(COMPANY_PREFIXES)} ${getRandomItem(COMPANY_SUFFIXES)}`;
        const title = `${getRandomItem(DEAL_TITLES)} – ${companyName}`;
        const category = getRandomItem(CATEGORIES);
        const status = getRandomWeightedStatus();
        const country = getRandomItem(COUNTRIES);
        const revenueNum = getRandomNumber(12000, 1850000) + Math.round(Math.random() * 99) / 100;
        const costRatio = 0.45 + Math.random() * 0.35; // 45% - 80% cost
        const costNum = Math.round(revenueNum * costRatio * 100) / 100;
        const profitNum = Math.round((revenueNum - costNum) * 100) / 100;
        const ratingNum = Math.round((2.5 + Math.random() * 2.5) * 10) / 10;
        const priority = getRandomItem(PRIORITIES);
        const tagsCount = getRandomNumber(2, 4);
        const tags = Array.from(new Set(Array.from({ length: tagsCount }, () => getRandomItem(ALL_TAGS))));
        const createdAt = getRandomDate(dateStart, dateEnd);
        const updatedAt = new Date(createdAt.getTime() + getRandomNumber(1, 60) * 86400000);

        batchRecords.push({
          datasetId: dataset.id,
          recordCode: `REC-${codeNum}`,
          title,
          companyName,
          category,
          status,
          country,
          revenue: revenueNum.toFixed(2),
          cost: costNum.toFixed(2),
          profit: profitNum.toFixed(2),
          rating: ratingNum.toFixed(2),
          priority,
          tags,
          metadata: {
            accountTier: revenueNum > 500000 ? "Tier-1 Enterprise" : "Standard",
            contractLengthMonths: getRandomItem([12, 24, 36, 60]),
            riskLevel: profitNum < 20000 ? "Elevated" : "Normal",
          },
          createdAt,
          updatedAt,
        });
      }

      await db.insert(datasetRecords).values(batchRecords);
      const progressPercent = Math.round(((batch + 1) / totalBatches) * 100);
      const currentInserted = (batch + 1) * BATCH_SIZE;
      process.stdout.write(
        `\r   [Batch ${batch + 1}/${totalBatches}] ${Math.min(currentInserted, recordsToGenerate).toLocaleString()} / ${recordsToGenerate.toLocaleString()} records (${progressPercent}%)`
      );
    }

    console.log("\n   ✓ Bulk streaming completed successfully.");

    // 6. Seed Sample Saved Views
    console.log("-> Seeding Default Saved Views for Analysts...");
    await db
      .insert(savedViews)
      .values([
        {
          userId: analystUser.id,
          datasetId: dataset.id,
          viewName: "High-Value German Enterprise Accounts",
          description: "Active accounts based in Germany with revenues exceeding $100,000",
          filters: { status: "Active", country: "Germany", minRevenue: 100000 },
          sortingConfig: { field: "revenue", order: "desc" },
          visibleColumns: ["recordCode", "title", "companyName", "status", "country", "revenue", "profit", "priority"],
          isShared: true,
        },
        {
          userId: analystUser.id,
          datasetId: dataset.id,
          viewName: "Pending Critical Reviews (US & UK)",
          description: "Urgent or High priority transactions pending operational audit",
          filters: { status: "Pending", priority: "Urgent" },
          sortingConfig: { field: "createdAt", order: "desc" },
          visibleColumns: ["recordCode", "title", "companyName", "priority", "status", "revenue", "createdAt"],
          isShared: true,
        },
        {
          userId: analystUser.id,
          datasetId: dataset.id,
          viewName: "Top Profit Margin Leaders",
          description: "Deals sorted by maximum net profit margins",
          filters: { status: "Active" },
          sortingConfig: { field: "profit", order: "desc" },
          visibleColumns: ["recordCode", "companyName", "revenue", "cost", "profit", "rating"],
          isShared: false,
        },
      ])
      .onConflictDoNothing();

    console.log("   ✓ 3 Preset Saved Views configured.");

    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log("==========================================================");
    console.log(`  🎉 SEEDING COMPLETED: 100,000 Records Ready in ${elapsedSeconds}s!`);
    console.log("==========================================================");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    throw error;
  }
}

// Allow direct CLI invocation
if (require.main === module) {
  seedDatabase()
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
