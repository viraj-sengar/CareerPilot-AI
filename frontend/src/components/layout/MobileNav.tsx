"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, Briefcase, KanbanSquare, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { setIsAiDrawerOpen } = useApp();

  const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Roadmap", href: "/roadmap", icon: Map },
    { label: "Jobs", href: "/jobs", icon: Briefcase },
    { label: "Tracker", href: "/applications", icon: KanbanSquare },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-navy-950/95 backdrop-blur-lg border-t border-navy-800/90 px-3 py-2 flex items-center justify-around">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? "text-brand-400 font-semibold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-brand-400" : "text-slate-400"}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={() => setIsAiDrawerOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium text-brand-400 hover:text-brand-300"
      >
        <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
        <span>Ask AI</span>
      </button>
    </div>
  );
};
