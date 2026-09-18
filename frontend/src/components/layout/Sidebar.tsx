"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  LayoutDashboard, 
  Map, 
  Target, 
  Briefcase, 
  FileText, 
  Mic, 
  Layers, 
  KanbanSquare, 
  UserCircle, 
  BarChart3, 
  Sparkles, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const NAV_ITEMS = [
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
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, setIsAiDrawerOpen } = useApp();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-navy-900 border-r border-navy-800/90 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-800/80 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 shadow-glow flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-brand-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
              CareerPilot <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-500/20 text-brand-300 px-1.5 py-0.5 rounded border border-brand-500/30">AI</span>
            </span>
            <p className="text-[11px] text-slate-400">Career Launchpad</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? "bg-brand-600/15 text-brand-300 border border-brand-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-navy-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-brand-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-glow" />
              )}
            </Link>
          );
        })}

        {/* AI Assistant Quick Trigger Banner */}
        <div className="pt-3 pb-2 px-2">
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-brand-900/40 to-indigo-900/30 border border-brand-500/30 hover:border-brand-500/60 transition-all group"
          >
            <div className="flex items-center gap-2.5 text-brand-300 font-semibold text-xs mb-1">
              <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
              <span>AI Career Assistant</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Get personalized next steps & feedback
            </p>
          </button>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-navy-800/80 space-y-2 bg-navy-950/40">
        <Link
          href="/settings"
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            pathname === "/settings"
              ? "bg-brand-600/15 text-brand-300"
              : "text-slate-400 hover:text-white hover:bg-navy-800/60"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {/* User Card */}
        {user && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-navy-850/80 border border-navy-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-700 border border-brand-500/40 flex items-center justify-center text-xs font-semibold text-white overflow-hidden shrink-0">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.targetRole}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
