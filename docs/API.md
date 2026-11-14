# DataScope – REST API Documentation

This document specifies the RESTful endpoints for **DataScope – Enterprise Data Discovery & Intelligence Platform**. All endpoints support JSON payloads and respond with consistent enterprise error structures.

---

## 1. Global Response Standards

### Success Response Format
```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "totalCount": 100000,
    "totalPages": 2000,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "meta": {
    "executionTimeMs": 14.2,
    "timestamp": "2026-11-14T13:10:00Z"
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid search parameter: 'minRevenue' must be a positive number.",
    "details": [ ... ]
  }
}
```

---

## 2. Records Endpoints (`/api/records`)

### `GET /api/records`
Fetches a paginated, sorted, and filtered slice of records from the database.

* **Query Parameters:**
  | Parameter | Type | Default | Description |
  | :--- | :--- | :--- | :--- |
  | `datasetId` | UUID | (default) | Target dataset identifier |
  | `page` | Integer | `1` | Page number (1-based index) |
  | `pageSize` | Integer | `50` | Records per page (10, 25, 50, 100) |
  | `q` | String | `""` | Global search query (title, company, code) |
  | `status` | String | `all` | Filter by status (`Active`, `Pending`, etc.) |
  | `category` | String | `all` | Filter by category |
  | `country` | String | `all` | Filter by country name |
  | `minRevenue`| Number | `0` | Minimum revenue filter |
  | `maxRevenue`| Number | `null` | Maximum revenue filter |
  | `startDate` | ISO Date| `null` | Minimum created date |
  | `endDate` | ISO Date| `null` | Maximum created date |
  | `sortField` | String | `createdAt`| Column to sort by |
  | `sortOrder` | String | `desc` | Direction (`asc` or `desc`) |

* **Sample Request:**
  ```http
  GET /api/records?page=1&pageSize=25&q=tech&status=Active&minRevenue=10000&sortField=revenue&sortOrder=desc
  ```

---

### `GET /api/records/:id`
Retrieves detailed information for a single record, including its historical audit changes and related entities.

* **Path Parameters:**
  * `id` (UUID): Unique record identifier.
* **Sample Response:**
  ```json
  {
    "success": true,
    "data": {
      "record": {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "recordCode": "REC-004521",
        "title": "Cloud Infrastructure Expansion",
        "companyName": "TechGlobal Solutions",
        "category": "Enterprise",
        "status": "Active",
        "country": "Germany",
        "revenue": 145000.00,
        "cost": 62000.00,
        "profit": 83000.00,
        "rating": 4.8,
        "priority": "High",
        "tags": ["cloud", "enterprise", "europe"],
        "metadata": { "contractYears": 3, "accountTier": "Tier 1" },
        "createdAt": "2025-08-12T10:30:00Z",
        "updatedAt": "2026-01-14T14:20:00Z"
      },
      "relatedRecords": [
        {
          "relationshipType": "Associated Deal",
          "targetRecord": { "id": "...", "title": "Cybersecurity Suite", "revenue": 45000.00 }
        }
      ],
      "auditLogs": [
        {
          "id": "...",
          "action": "UPDATE",
          "changedBy": "Sarah Connor (Data Analyst)",
          "previousValues": { "revenue": 120000.00, "status": "Pending" },
          "newValues": { "revenue": 145000.00, "status": "Active" },
          "timestamp": "2026-01-14T14:20:00Z"
        }
      ]
    }
  }
  ```

---

## 3. Analytics Endpoints (`/api/analytics`)

### `GET /api/analytics`
Executes server-side SQL aggregations across the 100,000+ records to generate real-time metrics without downloading rows to the client.

* **Query Parameters:** `datasetId` (UUID)
* **Sample Response:**
  ```json
  {
    "success": true,
    "data": {
      "summary": {
        "totalRecords": 100000,
        "totalRevenue": 482910450.00,
        "avgProfitMargin": 34.6,
        "activeCount": 68420
      },
      "byCategory": [
        { "category": "Enterprise", "count": 34200, "revenue": 210400000.00 },
        { "category": "SMB", "count": 42100, "revenue": 152100000.00 },
        { "category": "Consumer", "count": 23700, "revenue": 120410450.00 }
      ],
      "byStatus": [
        { "status": "Active", "count": 68420 },
        { "status": "Pending", "count": 18230 },
        { "status": "Inactive", "count": 9410 },
        { "status": "Archived", "count": 3940 }
      ],
      "growthTrends": [
        { "month": "2025-01", "recordCount": 7800, "revenue": 38400000.00 },
        { "month": "2025-02", "recordCount": 8400, "revenue": 41200000.00 }
      ]
    }
  }
  ```

---

## 4. Saved Views Endpoints (`/api/saved-views`)

### `GET /api/saved-views`
Retrieves all personal and shared views accessible by the authenticated user.

### `POST /api/saved-views`
Saves a specific search configuration, filter AST, sorting, and column visibility layout.
* **Payload:**
  ```json
  {
    "datasetId": "...",
    "viewName": "High-Value German Enterprise Accounts",
    "description": "Active accounts in Germany with > $50k revenue",
    "searchConditions": { "q": "" },
    "filters": {
      "status": "Active",
      "country": "Germany",
      "minRevenue": 50000
    },
    "sortingConfig": { "field": "revenue", "order": "desc" },
    "visibleColumns": ["recordCode", "title", "companyName", "revenue", "status"],
    "isShared": true
  }
  ```

---

## 5. Streaming CSV Export (`/api/export`)

### `GET /api/export`
Streams filtered query results directly from PostgreSQL into a downloadable CSV file using HTTP chunked transfer encoding, ensuring zero memory spikes even for 50,000+ matching records.

* **Headers:**
  * `Content-Type: text/csv; charset=utf-8`
  * `Content-Disposition: attachment; filename="datascope-export-20261114.csv"`

