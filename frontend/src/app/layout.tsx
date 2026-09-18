import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AiQuickDrawer } from "@/components/layout/AiQuickDrawer";

export const metadata: Metadata = {
  title: "CareerPilot AI — Your Career, Powered by AI",
  description: "AI-powered career acceleration platform for college students and fresh graduates. Discover what to learn, build better projects, optimize your resume, prepare for interviews, and land top software engineering jobs.",
  keywords: [
    "AI career coach",
    "career roadmap",
    "software engineer internships",
    "resume analyzer",
    "mock interview",
    "skill gap analysis",
    "application tracker",
    "student portfolio"
  ],
  authors: [{ name: "CareerPilot AI" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 min-h-screen antialiased selection:bg-brand-500 selection:text-white">
        <AppProvider>
          {children}
          <AiQuickDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
