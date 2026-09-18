import express from "express";
import cors from "cors";
import config from "./config";
import apiRouter from "./routes/index";

const app = express();

// Middleware
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api", apiRouter);

// Root greeting
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to CareerPilot AI Backend Server",
    endpoints: {
      health: "/api/health",
      ai: {
        chat: "POST /api/ai/chat",
        interview: "POST /api/ai/interview",
        resume: "POST /api/ai/resume",
        skillGap: "POST /api/ai/skill-gap",
        project: "POST /api/ai/project"
      }
    }
  });
});

app.listen(config.port, () => {
  console.log(`🚀 CareerPilot AI Backend running on http://localhost:${config.port}`);
  console.log(`📡 Health check available at http://localhost:${config.port}/api/health`);
});

export default app;
