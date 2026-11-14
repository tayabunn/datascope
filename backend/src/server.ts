import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recordsRouter from "./routes/records.js";
import analyticsRouter from "./routes/analytics.js";
import savedViewsRouter from "./routes/savedViews.js";
import exportRouter from "./routes/export.js";
import aiSearchRouter from "./routes/aiSearch.js";

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

// Health Check
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

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 DataScope REST API Server running on port ${PORT}`);
  console.log(`📡 Endpoints active at http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});

export default app;
