/**
 * Application Configuration
 * Replaces .env files by providing centralized default settings with optional environment overrides.
 */
export const config = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL || "file:./dev.db",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  allowedOrigins: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ]
};

export default config;
