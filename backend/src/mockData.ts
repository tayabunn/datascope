export interface BusinessRecord {
  id: string;
  datasetId: string;
  recordCode: string;
  title: string;
  companyName: string;
  category: string;
  status: "Active" | "Pending" | "Inactive" | "Archived";
  country: string;
  revenue: number;
  cost: number;
  profit: number;
  rating: number;
  priority: "Urgent" | "High" | "Medium" | "Low";
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

const COMPANY_PREFIXES = [
  "Apex", "Nova", "Starlight", "Quantum", "Nexus", "Vanguard", "Summit",
  "Cyber", "Cloud", "Vertex", "Pulse", "Orion", "Alpha", "Hyper", "Synapse",
  "Aero", "Bio", "Crest", "Dynasty", "Echo", "Falcon", "Genesis", "Horizon",
  "Iron", "Jupiter", "Krypton", "Luminary", "Matrix", "Neutron", "Omega"
];

const COMPANY_SUFFIXES = [
  "Dynamics", "Technologies", "Logistics", "Ventures", "Systems", "Solutions",
  "Holdings", "Labs", "Energy", "Analytics", "Networks", "Capital", "Group",
  "Digital", "Software", "Security"
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
  "Containerized Kubernetes Orchestration Cluster"
];

const CATEGORIES = ["Enterprise", "Mid-Market", "SMB", "Public Sector", "Financial Services"];
const COUNTRIES = [
  "Germany", "United States", "United Kingdom", "France", "Japan",
  "Canada", "Australia", "Singapore", "Netherlands", "Switzerland"
];
const STATUSES: Array<"Active" | "Pending" | "Inactive" | "Archived"> = ["Active", "Pending", "Inactive", "Archived"];
const PRIORITIES: Array<"Urgent" | "High" | "Medium" | "Low"> = ["Urgent", "High", "Medium", "Low"];
const ALL_TAGS = ["tier-1", "cloud", "saas", "critical", "fintech", "compliance", "renewal", "expansion"];

// Generate deterministic in-memory records
let inMemoryRecords: BusinessRecord[] | null = null;

export function getOrGenerateMockRecords(count = 10000): BusinessRecord[] {
  if (inMemoryRecords && inMemoryRecords.length >= count) {
    return inMemoryRecords;
  }

  const records: BusinessRecord[] = [];
  const baseTime = Date.now() - 365 * 24 * 60 * 60 * 1000;

  for (let i = 1; i <= count; i++) {
    const codeNum = String(i).padStart(6, "0");
    const prefix = COMPANY_PREFIXES[i % COMPANY_PREFIXES.length];
    const suffix = COMPANY_SUFFIXES[(i * 3) % COMPANY_SUFFIXES.length];
    const companyName = `${prefix} ${suffix}`;
    const title = `${DEAL_TITLES[i % DEAL_TITLES.length]} – ${companyName}`;
    const category = CATEGORIES[i % CATEGORIES.length];
    const status = STATUSES[i % 10 === 0 ? 3 : i % 7 === 0 ? 2 : i % 4 === 0 ? 1 : 0]; // 60% Active
    const country = COUNTRIES[i % COUNTRIES.length];
    const revenue = Math.round((25000 + ((i * 137) % 850000)) * 100) / 100;
    const cost = Math.round(revenue * (0.5 + ((i % 30) / 100)) * 100) / 100;
    const profit = Math.round((revenue - cost) * 100) / 100;
    const rating = Math.round((3.0 + ((i % 20) / 10)) * 10) / 10;
    const priority = PRIORITIES[i % PRIORITIES.length];
    const tags = [ALL_TAGS[i % ALL_TAGS.length], ALL_TAGS[(i + 2) % ALL_TAGS.length]];
    const createdAt = new Date(baseTime + i * 3153600).toISOString();

    records.push({
      id: `rec-mem-${codeNum}`,
      datasetId: "ds-global-enterprise-001",
      recordCode: `REC-${codeNum}`,
      title,
      companyName,
      category,
      status,
      country,
      revenue,
      cost,
      profit,
      rating,
      priority,
      tags,
      metadata: {
        accountTier: revenue > 400000 ? "Tier-1 Enterprise" : "Standard",
        contractLengthMonths: 12 + ((i % 4) * 12),
      },
      createdAt,
      updatedAt: createdAt,
    });
  }

  inMemoryRecords = records;
  return records;
}

