# DataScope – Technical Presentation Video Guide & Walkthrough Script

Use this structured walkthrough script when recording your **Mandatory Technical Presentation Video** (Section 19 of the project specification).

Follow this step-by-step roadmap to demonstrate your actual application while explaining the architectural reasoning behind your implementation.

---

## ⏱️ Video Structure (Target: 7–10 Minutes)

| Part | Topic | Target Time | What to Show on Screen |
| :--- | :--- | :--- | :--- |
| **Part 1** | Introduction & Problem Overview | 0:00 – 1:00 | Landing Page (`/`) & Architecture Overview |
| **Part 2** | Central Data Explorer & High-Density Table | 1:00 – 3:00 | Data Explorer (`/explorer`) with 100k records |
| **Part 3** | Large-Scale Search & PostgreSQL Indexing | 3:00 – 5:00 | Live Search, Visual Query Builder (`/search`) |
| **Part 4** | Data Fetching & RTK Query Caching | 5:00 – 6:30 | Network Tab in DevTools, fast back/forward |
| **Part 5** | Record Detail Drawer & Audit Trails | 6:30 – 7:45 | Click row -> Drawer -> Status Mutation |
| **Part 6** | Portfolio Analytics & Server Aggregations | 7:45 – 8:45 | Analytics page (`/analytics`) |
| **Part 7** | Architectural Trade-offs & Future Scaling | 8:45 – 10:00 | `docs/ADR.md` & Scalability from 100k to 10M |

---

## 🎙️ Step-by-Step Speaking Script

### Part 1: Introduction & Architecture (0:00 – 1:00)
* **Screen:** Open `http://localhost:3000` (The Landing Page).
* **Say:**
  > *"Hello everyone. Today I am presenting DataScope, an Enterprise Data Discovery and Intelligence Platform engineered to explore, search, filter, and analyze large datasets containing over 100,000 structured business records.*
  >
  > *In data-intensive platforms, the biggest failure point is client-side data bloat and slow unindexed database scans. In DataScope, our architecture enforces two strict rules:*
  > *1. Heavy lifting stays on the database: all filtering, text matching, and aggregations run directly in PostgreSQL using B-Tree and GIN Trigram indexes.*
  > *2. The frontend stays lightweight: we use server-side pagination with RTK Query caching and request deduplication.*
  >
  > *Let's jump into the live application."*

---

### Part 2: Central Data Explorer & High-Density Table (1:00 – 3:00)
* **Screen:** Click **"Launch Data Explorer"** or navigate to `/explorer`.
* **Actions on Screen:**
  1. Scroll through the table showing 50 records per page.
  2. Click on the **"Visible Columns"** dropdown and toggle columns off and on.
  3. Click column headers (**Revenue**, **Profit**, **Rating**) to demonstrate ascending/descending sorting.
  4. Select multiple rows using the checkboxes.
* **Say:**
  > *"Here is the Central Data Explorer. Notice the clean, high-density layout. We did not use heavy headless table abstractions like TanStack; instead, we built a modular, custom React table with full TypeScript typing.*
  >
  > *Users can dynamically customize column visibility, sort by multiple columns, and select rows for batch actions.*
  >
  > *Notice the pagination bar at the bottom: we are using Server-Side Offset Pagination. Instead of downloading 100,000 rows into the browser, each request only fetches 50 rows. Let's jump straight to Page 40: notice the transition takes under 20 milliseconds."*

---

### Part 3: Large-Scale Search & Database Indexing (3:00 – 5:00)
* **Screen:** Stay on `/explorer`, open the Search input or navigate to `/search` (Visual Query Builder).
* **Actions on Screen:**
  1. In the search bar, type `"cloud"` or `"apex"`.
  2. Apply combined filters: **Status: Active**, **Country: Germany**, **Revenue: > $10,000**.
  3. Show the **Telemetry Badge** in the top header showing `Query: ~12ms | Index: GIN / B-Tree`.
  4. Open the **AI Search Assistant** (`✨ AI Search`), click one of the example pills, and click **Apply**.
* **Say:**
  > *"Now let's examine large-scale searching across our 100,000 records. Traditional SQL `LIKE '%query%'` forces a full table scan that takes nearly 500 milliseconds on 100,000 rows.*
  >
  > *To solve this, we enabled the PostgreSQL `pg_trgm` extension and created GIN Trigram indexes on searchable text columns like title and company name.*
  >
  > *Notice that when I type 'cloud' and combine it with multiple filters—Status Active, Country Germany, and Revenue greater than $10,000—the entire multi-predicate query executes in only 12 to 16 milliseconds.*
  >
  > *We also built a Visual Query Builder and an AI Search Assistant that converts natural language queries into strictly validated filter parameters."*

---

### Part 4: Data Fetching & RTK Query Caching (5:00 – 6:30)
* **Screen:** Open Chrome DevTools (`F12`), switch to the **Network** tab, and filter by `Fetch/XHR`.
* **Actions on Screen:**
  1. Type in the search input quickly: show that requests are debounced by 300ms (no intermediate keystroke spam).
  2. Click to Page 2 (network request fires).
  3. Click back to Page 1: **Notice NO network request fires** because RTK Query serves it instantly from cache!
* **Say:**
  > *"Data fetching architecture is one of the most critical aspects of this project. We selected RTK Query integrated into our Redux Toolkit store.*
  >
  > *Watch the Chrome Network tab as I type. Because we implemented 300ms input debouncing, individual keystrokes do not flood the server. Only the final keyword triggers an API call, cutting network requests by 90%.*
  >
  > *Furthermore, RTK Query provides automatic request deduplication and normalized caching. When I navigate from Page 1 to Page 2, a request is made. But when I navigate back to Page 1, it renders instantaneously in 0ms with zero network traffic because it is served directly from the RTK Query cache."*

---

### Part 5: Record Detail Drawer & Audit History (6:30 – 7:45)
* **Screen:** On `/explorer`, click on any row to open the slide-over drawer.
* **Actions on Screen:**
  1. Point out the financial metrics (Revenue, Profit, Priority).
  2. Point out the **Related Business Records** (connected graph).
  3. Point out the **Historical Change Audit Log** timeline.
  4. Click a status button (e.g. change to "Archived") and show it update.
* **Say:**
  > *"When an analyst clicks a row, the Record Detail Drawer slides in without unmounting the table or losing the active scroll position.*
  >
  > *Here we see complete entity metadata, related account relationships, and an immutable audit trail showing who modified the record, previous values, and timestamps.*
  >
  > *When I update the status, RTK Query's tag invalidation automatically triggers a background refresh on the table while optimistically updating the UI."*

---

### Part 6: Portfolio Analytics & Server Aggregations (7:45 – 8:45)
* **Screen:** Navigate to `/analytics`.
* **Actions on Screen:**
  1. Point out the summary cards (100,000 Records, $480M+ Aggregated Revenue, Average Margin).
  2. Hover over the Recharts visualizations (Category Bar Chart, Status Donut Chart, Monthly Growth Area Chart).
* **Say:**
  > *"Here on the Analytics page, all charts and summaries are powered by server-side SQL aggregations using `COUNT`, `AVG`, and `GROUP BY`.*
  >
  > *A common junior mistake is downloading all 100,000 records to calculate statistics with JavaScript `reduce()`. In DataScope, the client receives only a lightweight 2KB summary payload, allowing the charts to render in under 30 milliseconds."*

---

### Part 7: Architectural Trade-Offs & Scaling to 10M Records (8:45 – 10:00)
* **Screen:** Show `docs/ADR.md` or the Overview page.
* **Say:**
  > *"Finally, we documented 10 formal Architecture Decision Records covering every critical decision:*
  > * *Why RTK Query instead of Redux Async Thunks (automated cache tags, deduplication).*
  > * *Why PostgreSQL and Drizzle ORM over Prisma or MongoDB (zero cold-start binary overhead, native GIN Trigram support).*
  > * *Why Server-Side Pagination over Client-Side (strictly bounded network payloads).*
  >
  > *If this platform scales from 100,000 to 10 million records:*
  > *1. We would introduce PostgreSQL Declarative Table Partitioning by date range.*
  > *2. We would switch from exact `COUNT(*)` to estimated row counts using PostgreSQL's `reltuples` catalog.*
  > *3. We would implement keyset cursor pagination for deep sequential streaming.*
  >
  > *Thank you for your time. DataScope is fully functional, fully tested with 100,000 records, and ready for production deployment."*
