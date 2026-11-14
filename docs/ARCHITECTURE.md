# DataScope – System & Frontend Architecture Documentation

This document provides in-depth architectural specifications and visual Mermaid diagrams for **DataScope – Enterprise Data Discovery & Intelligence Platform**.

---

## 1. System Overview Architecture

DataScope is structured as a high-throughput, multi-tiered enterprise data platform with strict separation of concerns across presentation, state coordination, query execution, and database indexing.

```mermaid
flowchart TD
    subgraph Client["Client Tier (Browser)"]
        UI["Modern Enterprise UI\n(Next.js App Router + Tailwind)"]
        RTK["Redux Toolkit Store\n(Auth, Saved Views, UI Prefs)"]
        RTKQ["RTK Query Engine\n(Cache, Deduplication, Tags)"]
        URL["URL Search State\n(nuqs / Next Navigation)"]
    end

    subgraph Server["Application Server Tier (Next.js Node.js)"]
        API["REST API Route Handlers\n(/api/records, /api/analytics, /api/views)"]
        RBAC["Security & RBAC Guard\n(Admin, Analyst, Viewer)"]
        Validator["Zod Input & Filter Query Validator"]
        QueryBuilder["Dynamic SQL Query Engine\n(Drizzle ORM)"]
    end

    subgraph Database["Database Tier (PostgreSQL)"]
        PG["PostgreSQL Relational Engine\n(ACID Compliant)"]
        BTree["B-Tree Indexes\n(IDs, Numbers, Dates, Foreign Keys)"]
        GIN["GIN Trigram Index (pg_trgm)\n(Fast Substring & Global Search)"]
        Tables["100,000+ Enterprise Records\n(Datasets, Fields, Records, Audits)"]
    end

    UI -->|Dispatches Actions| RTK
    UI -->|Reads & Updates| URL
    UI -->|Queries & Mutations| RTKQ
    URL -->|Syncs Params| RTKQ
    RTKQ -->|Optimized HTTP GET/POST| API
    API --> RBAC
    RBAC --> Validator
    Validator --> QueryBuilder
    QueryBuilder -->|Type-Safe Parameterized SQL| PG
    PG --> BTree
    PG --> GIN
    PG --> Tables
```

---

## 2. Frontend Architecture Diagram

The frontend is architected using a scalable, feature-first structure with strict state boundaries:

```mermaid
graph TD
    subgraph Presentation["Presentation Layer (src/components)"]
        Layout["App Layout & Sidebar\n(src/components/layout)"]
        DataTable["Enterprise Data Table\n(Dynamic Columns, Sorting, Selection)"]
        FilterBuilder["Visual Query & Filter Builder\n(Text, Range, Date, Enums)"]
        AnalyticsDashboard["Real-Time Analytics Widgets\n(Recharts Visualizations)"]
        RecordDrawer["Record Details & Audit Drawer\n(Audit Trail, Related Entities)"]
    end

    subgraph State["State Management Layer (src/store)"]
        ReduxStore["Redux Store Root\n(src/store/index.ts)"]
        AuthSlice["Auth Slice\n(User, Role, Session)"]
        UISlice["UI Preference Slice\n(Column Visibility, Densities, Themes)"]
        SavedViewsSlice["Saved Views Slice\n(Active View, Modal States)"]
        RTKQApi["RTK Query API Service\n(src/store/api/recordsApi.ts)"]
    end

    subgraph DataSync["URL & Router Sync Layer"]
        URLParams["Search Params Manager\n(?page, ?pageSize, ?sort, ?q, ?filter)"]
    end

    Layout --> Presentation
    FilterBuilder -->|Updates Query Parameters| URLParams
    DataTable -->|Triggers Sort & Page Changes| URLParams
    URLParams -->|Provides Active Query Args| RTKQApi
    RTKQApi -->|Injects Cached Data| DataTable
    RTKQApi -->|Injects Aggregated Data| AnalyticsDashboard
    ReduxStore --> AuthSlice
    ReduxStore --> UISlice
    ReduxStore --> SavedViewsSlice
    ReduxStore --> RTKQApi
    UISlice -->|Configures Columns| DataTable
```

---

## 3. Data Fetching Flow Diagram (Server State vs. Client State)

The diagram below details the exact lifecycle of an analytical query, demonstrating how **RTK Query** prevents redundant API hits through automatic cache evaluation and request deduplication:

```mermaid
sequenceDiagram
    autonumber
    actor User as Data Analyst
    participant UI as Explorer Table UI
    participant Hook as useGetRecordsQuery(args)
    participant Cache as RTK Query Cache
    participant Server as Next.js API (/api/records)
    participant DB as PostgreSQL (Drizzle)

    User->>UI: Types filter or clicks page jump
    UI->>Hook: Triggers query with args { page: 2, status: "Active" }
    Hook->>Cache: Check for existing serialized cache key
    
    alt Cache Hit (Data exists & is fresh)
        Cache-->>UI: Return cached records immediately (0ms)
    else Cache Miss or Stale Data
        Hook->>Server: Dispatch GET /api/records?page=2&status=Active
        Server->>Server: Validate query with Zod Schema & Check RBAC
        Server->>DB: Execute SELECT ... WHERE status = 'Active' LIMIT 50 OFFSET 50
        DB-->>Server: Return 50 rows + count metadata
        Server-->>Hook: 200 OK JSON { data: [...], pagination: {...} }
        Hook->>Cache: Store response with Tag ['DatasetRecords']
        Cache-->>UI: Render table rows smoothly
    end

    Note over User,UI: User navigates away and returns within 5 minutes
    User->>UI: Returns to Page 2
    UI->>Hook: useGetRecordsQuery({ page: 2, status: "Active" })
    Hook->>Cache: Cache Hit!
    Cache-->>UI: Rendered instantaneously without network call!
```

---

## 4. Large-Scale Search Architecture & Index Execution

How PostgreSQL processes multi-condition queries across **100,000+ records** without full table scans:

```mermaid
flowchart LR
    subgraph Query["Incoming Multi-Condition Search"]
        Q1["Global Search: 'Acme'"]
        Q2["Country: 'Germany'"]
        Q3["Revenue: > $10,000"]
        Q4["Status: 'Active'"]
        Q5["Date: Last 30 Days"]
    end

    subgraph Optimizer["PostgreSQL Query Planner"]
        Planner["Cost-Based Optimizer\n(EXPLAIN ANALYZE)"]
    end

    subgraph Indexes["Specialized Index Lookups"]
        GINIdx["GIN Trigram Index\n(idx_records_search_trgm)\nMatches 'Acme' in 2ms"]
        BTreeCountry["B-Tree Index\n(idx_records_country_status)\nFilters Germany & Active in 1ms"]
        BTreeNumeric["B-Tree Index\n(idx_records_revenue)\nRange Scan in 1ms"]
        BTreeDate["B-Tree Index\n(idx_records_created_at)\nDate Range Scan in 1ms"]
    end

    subgraph Result["Bitmap Index Scan & Heap Fetch"]
        Bitmap["Bitmap AND Operation\n(Combines matching pointers)"]
        LimitOffset["LIMIT 50 OFFSET 0"]
        FinalPayload["50 Matching Records\nTotal Execution: 8ms–16ms"]
    end

    Q1 --> Planner
    Q2 --> Planner
    Q3 --> Planner
    Q4 --> Planner
    Q5 --> Planner

    Planner --> GINIdx
    Planner --> BTreeCountry
    Planner --> BTreeNumeric
    Planner --> BTreeDate

    GINIdx --> Bitmap
    BTreeCountry --> Bitmap
    BTreeNumeric --> Bitmap
    BTreeDate --> Bitmap

    Bitmap --> LimitOffset
    LimitOffset --> FinalPayload
```

---

## 5. Directory & Feature-Based Folder Structure

The application follows the official Next.js App Router best-practice structure:

```text
datascope/
├── docs/                               # Comprehensive Technical Documentation
│   ├── ADR.md                          # 10 Architectural Decision Records
│   ├── ARCHITECTURE.md                 # System, Frontend & Search Architecture Diagrams
│   ├── DATABASE.md                     # Database ERD, Schema & Indexing Guide
│   ├── API.md                          # REST API Endpoints Specification
│   └── PERFORMANCE.md                  # 100k Records Benchmark & Performance Report
├── src/
│   ├── app/                            # Next.js App Router Pages & API Routes
│   │   ├── (auth)/                     # Auth routes (login, register)
│   │   ├── (dashboard)/                # Protected enterprise application routes
│   │   │   ├── explorer/               # Central Data Explorer page
│   │   │   ├── analytics/              # Aggregated Analytics page
│   │   │   ├── saved-views/            # Saved Views management page
│   │   │   ├── history/                # Search History page
│   │   │   ├── settings/               # System and User Preferences page
│   │   │   └── page.tsx                # Overview Dashboard
│   │   ├── api/                        # Backend REST API Endpoints
│   │   │   ├── records/                # Search, filter, paginate 100k records
│   │   │   ├── records/[id]/           # Individual record detail & audit trail
│   │   │   ├── datasets/               # Dataset management & statistics
│   │   │   ├── analytics/              # Server-side SQL aggregate calculations
│   │   │   ├── saved-views/            # CRUD for saved view configurations
│   │   │   └── export/                 # High-speed streaming CSV export
│   │   ├── layout.tsx                  # Root layout with Providers
│   │   └── page.tsx                    # Modern Enterprise Landing Page
│   ├── components/                     # Reusable UI & Feature Components
│   │   ├── table/                      # Enterprise Data Table (dynamic, sort, select)
│   │   ├── filters/                    # Visual Filter Builder & Condition Rows
│   │   ├── analytics/                  # Recharts Charts & Metric Cards
│   │   ├── layout/                     # Enterprise Sidebar, Header, User Menu
│   │   └── ui/                         # Base Atomic UI elements (Modal, Badge, Button)
│   ├── db/                             # Database Layer (Drizzle ORM)
│   │   ├── schema.ts                   # PostgreSQL Tables, Relations & Indexes
│   │   ├── index.ts                    # Database Pool Connection & Client
│   │   ├── seed.ts                     # 100,000 High-Speed Record Generator
│   │   └── migrations/                 # Drizzle SQL Migrations
│   ├── store/                          # Redux Toolkit Global State & RTK Query
│   │   ├── index.ts                    # Redux Store Configuration
│   │   ├── slices/                     # Client Slices (auth, ui, savedViews, search)
│   │   └── api/                        # RTK Query API Service Definitions
│   ├── types/                          # Shared TypeScript Interfaces & DTOs
│   └── lib/                            # Shared Utilities & Query Builders
└── drizzle.config.ts                   # Drizzle ORM Configuration
```

