/**
 * Frontend Application Configuration
 * Replaces .env files by providing centralized application constants.
 */
export const config = {
  appName: "CareerPilot AI",
  appDescription: "AI-Powered Career Co-Pilot & Launchpad",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  apiBaseUrl: "/api",
  author: "CareerPilot AI",
  version: "1.0.0"
};

export default config;
