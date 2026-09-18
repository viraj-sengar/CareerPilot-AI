"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  Sun, 
  Moon, 
  Search,
  Target,
  LayoutDashboard,
  Map,
  Briefcase,
  FileText,
  Mic,
  Layers,
  KanbanSquare,
  UserCircle,
  BarChart3,
  Settings
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { NotificationDropdown } from "./NotificationDropdown";

const MOBILE_NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Career Roadmap", href: "/roadmap", icon: Map },
  { label: "Skill Gap", href: "/skill-gap", icon: Target },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Mock Interview", href: "/interview", icon: Mic },
  { label: "Projects", href: "/projects", icon: Layers },
  { label: "Applications", href: "/applications", icon: KanbanSquare },
  { label: "Portfolio", href: "/portfolio", icon: UserCircle },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const TopBar: React.FC = () => {
  const { user, theme, toggleTheme, setIsAiDrawerOpen, apiKey } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-navy-950/80 backdrop-blur-md border-b border-navy-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Left Area: Mobile Menu + Title or Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-850 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile brand mark */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-navy-950 rounded-md flex items-center justify-center">
              <Compass className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <span className="font-bold text-sm text-white">CareerPilot</span>
        </Link>

        {/* Target role pill */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-750 text-xs text-slate-300">
            <Target className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-slate-400">Target Role:</span>
            <span className="font-semibold text-white">{user.targetRole}</span>
          </div>
        )}
      </div>

      {/* Right Area: Search, AI button, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* AI Engine Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-900/90 border border-navy-750 text-[11px] text-slate-400">
          <span className={`w-2 h-2 rounded-full ${apiKey ? "bg-emerald-400" : "bg-cyan-400"} animate-pulse`} />
          <span>{apiKey ? "Gemini Live" : "High-Fidelity AI"}</span>
        </div>

        {/* Ask Career AI Trigger */}
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        {/* Notification Bell */}
        <NotificationDropdown />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-850 transition-colors"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Mini Avatar Link */}
        {user && (
          <Link
            href="/portfolio"
            className="w-8 h-8 rounded-full bg-brand-600 border border-brand-400/40 overflow-hidden flex items-center justify-center text-xs font-bold text-white hover:ring-2 hover:ring-brand-400 transition-all shrink-0"
            title="View Portfolio"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </Link>
        )}
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-navy-900 border-r border-navy-800 p-5 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-brand-400" />
                <span className="font-bold text-white text-base">CareerPilot AI</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {MOBILE_NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-brand-600/20 text-brand-300 border border-brand-500/30"
                        : "text-slate-400 hover:text-white hover:bg-navy-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {user && (
              <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{user.targetRole}</p>
                </div>
                <button
                  onClick={() => {
                    setIsAiDrawerOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg bg-brand-600 text-white text-xs flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask AI
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
