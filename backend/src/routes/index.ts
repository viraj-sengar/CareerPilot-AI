import { Router } from "express";
import aiRouter from "./ai.routes";
import prisma from "../db/client";

export const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "CareerPilot AI Backend",
    timestamp: new Date().toISOString()
  });
});

// AI endpoints
apiRouter.use("/ai", aiRouter);

// Profile endpoint example (Prisma SQLite backed)
apiRouter.get("/user/profile", async (_req, res) => {
  try {
    const user = await prisma.user.findFirst({
      include: { profile: true }
    });
    res.json(user || { status: "no_user_found" });
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default apiRouter;
