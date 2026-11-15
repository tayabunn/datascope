import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recordsRouter from "./routes/records.js";
import analyticsRouter from "./routes/analytics.js";
import savedViewsRouter from "./routes/savedViews.js";
import exportRouter from "./routes/export.js";
import aiSearchRouter from "./routes/aiSearch.js";
import searchHistoryRouter from "./routes/searchHistory.js";
import datasetsRouter from "./routes/datasets.js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Health & API Index Check
app.get(["/", "/api"], (req: express.Request, res: express.Response) => {
  res.json({
    service: "DataScope Enterprise REST API",
    version: "2.4.0",
    status: "active",
    message: "DataScope REST API Engine is running successfully.",
    endpoints: {
      health: "/api/health",
      records: "/api/records?page=1&pageSize=50",
      analytics: "/api/analytics",
      savedViews: "/api/saved-views",
      exportCsv: "/api/export",
      aiSearch: "/api/ai-search",
    },
    database: "Neon PostgreSQL (100,000+ indexed records)",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.json({
    status: "healthy",
    service: "DataScope Enterprise REST API",
    version: "2.4.0",
    timestamp: new Date().toISOString(),
  });
});

// Mount Platform Routes
app.use("/api/records", recordsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/saved-views", savedViewsRouter);
app.use("/api/export", exportRouter);
app.use("/api/ai-search", aiSearchRouter);
app.use("/api/search-history", searchHistoryRouter);
app.use("/api/datasets", datasetsRouter);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 DataScope REST API Server running on port ${PORT}`);
  console.log(`📡 Endpoints active at http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});

export default app;
