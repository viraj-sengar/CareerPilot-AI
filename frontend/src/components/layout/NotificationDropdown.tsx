"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Briefcase, FileText, Sparkles, Award } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "INTERVIEW":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "RESUME":
        return <FileText className="w-4 h-4 text-cyan-400" />;
      case "JOB":
        return <Briefcase className="w-4 h-4 text-brand-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors focus:outline-none"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-500 rounded-full ring-2 ring-navy-900 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-navy-900 border border-navy-750 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-3.5 border-b border-navy-800 flex items-center justify-between bg-navy-950/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-[340px] overflow-y-auto divide-y divide-navy-800/60">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No notifications right now
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 hover:bg-navy-800/50 ${
                    !notif.read ? "bg-brand-950/20" : ""
                  }`}
                >
                  <div className="p-2 rounded-lg bg-navy-800 shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-semibold truncate ${!notif.read ? "text-white" : "text-slate-300"}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-500 shrink-0">{notif.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                    {notif.actionUrl && (
                      <Link
                        href={notif.actionUrl}
                        onClick={() => setIsOpen(false)}
                        className="inline-block text-[11px] text-brand-400 hover:text-brand-300 font-medium mt-1.5"
                      >
                        Take action &rarr;
                      </Link>
                    )}
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
