"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { Compass, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loginDemoUser } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 bg-grid-pattern relative">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        <div className="relative w-full max-w-md p-8 rounded-2xl bg-navy-900 border border-navy-800 shadow-2xl text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 mx-auto flex items-center justify-center shadow-glow">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-brand-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Sign In to CareerPilot AI</h1>
            <p className="text-xs text-slate-400 mt-1.5">
              Access your personalized career dashboard, mock interviews, and application tracker.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="glow"
              size="lg"
              className="w-full justify-center"
              onClick={loginDemoUser}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              1-Click Demo Login as Alex Sharma
            </Button>

            <Link href="/login" className="block">
              <Button variant="outline" size="md" className="w-full justify-center">
                Sign In with Custom Email
              </Button>
            </Link>
          </div>

          <p className="text-[11px] text-slate-500">
            Evaluating the product? The Demo Login gives you instant access to preloaded career data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-16 lg:pb-0">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
