"use client";

import React, { useState } from "react";
import { 
  KanbanSquare, 
  Plus, 
  Building2, 
  Calendar, 
  Clock, 
  DollarSign, 
  MapPin, 
  Trash2, 
  Edit3, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { JobApplication, ApplicationStatus } from "@/lib/types";

const COLUMNS: Array<{ id: ApplicationStatus; title: string; color: string; badgeVariant: "neutral" | "brand" | "amber" | "emerald" | "rose" }> = [
  { id: "APPLIED", title: "Applied", color: "border-slate-700", badgeVariant: "neutral" },
  { id: "ASSESSMENT", title: "Online Assessment", color: "border-brand-500/50", badgeVariant: "brand" },
  { id: "INTERVIEW", title: "Interviewing", color: "border-amber-500/50", badgeVariant: "amber" },
  { id: "OFFER", title: "Offer Received", color: "border-emerald-500/50", badgeVariant: "emerald" },
  { id: "REJECTED", title: "Archived / Rejected", color: "border-rose-500/40", badgeVariant: "rose" },
];

export default function ApplicationTrackerPage() {
  const { applications, addApplication, updateApplicationStatus, deleteApplication, updateApplicationNotes } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  // Form states
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("Remote");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("APPLIED");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    addApplication({
      company,
      role,
      location,
      salary,
      status,
      notes,
      priority,
    });

    setCompany("");
    setRole("");
    setNotes("");
    setIsAddModalOpen(false);
  };

  const advanceStatus = (app: JobApplication) => {
    const sequence: ApplicationStatus[] = ["APPLIED", "ASSESSMENT", "INTERVIEW", "OFFER"];
    const currentIndex = sequence.indexOf(app.status);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      updateApplicationStatus(app.id, sequence[currentIndex + 1]);
    }
  };

  const rollbackStatus = (app: JobApplication) => {
    const sequence: ApplicationStatus[] = ["APPLIED", "ASSESSMENT", "INTERVIEW", "OFFER"];
    const currentIndex = sequence.indexOf(app.status);
    if (currentIndex > 0) {
      updateApplicationStatus(app.id, sequence[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <KanbanSquare className="w-3.5 h-3.5" />
            <span>Pipeline Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize and manage your active interviews, assessments, deadlines, and offers.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Application
        </Button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 select-none min-h-[620px] snap-x">
        {COLUMNS.map((col) => {
          const colApps = applications.filter((a) => a.status === col.id);
          return (
            <div
              key={col.id}
              className="w-80 shrink-0 bg-navy-900/80 rounded-2xl border border-navy-800 flex flex-col snap-start shadow-card"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-navy-800/80 flex items-center justify-between bg-navy-950/40 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {col.title}
                  </h3>
                  <Badge variant={col.badgeVariant} size="sm">
                    {colApps.length}
                  </Badge>
                </div>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[600px]">
                {colApps.length === 0 ? (
                  <div className="h-32 rounded-xl border border-dashed border-navy-800 flex items-center justify-center text-xs text-slate-500 text-center p-4">
                    No applications in this stage
                  </div>
                ) : (
                  colApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl bg-navy-850 border border-navy-750 hover:border-brand-500/50 transition-all shadow-sm group hover:-translate-y-0.5"
                    >
                      {/* Company & Role */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-brand-400">
                            {app.company}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-0.5 leading-snug">
                            {app.role}
                          </h4>
                        </div>

                        {app.matchedScore && (
                          <Badge variant="cyan" size="sm">
                            {app.matchedScore}%
                          </Badge>
                        )}
                      </div>

                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-400">
                        {app.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {app.location}
                          </span>
                        )}
                        {app.salary && (
                          <span className="text-emerald-400 font-semibold">
                            {app.salary}
                          </span>
                        )}
                      </div>

                      {/* Notes / Reminders */}
                      {app.nextInterviewDate && (
                        <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>Interview: {app.nextInterviewDate}</span>
                        </div>
                      )}

                      {app.deadlineDate && (
                        <div className="mt-2 p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-[11px] text-brand-300 flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>Deadline: {app.deadlineDate}</span>
                        </div>
                      )}

                      {app.notes && (
                        <p className="mt-2 text-[11px] text-slate-400 line-clamp-2 italic leading-relaxed">
                          &ldquo;{app.notes}&rdquo;
                        </p>
                      )}

                      {/* Card Footer Controls */}
                      <div className="mt-3 pt-2.5 border-t border-navy-800 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {col.id !== "APPLIED" && (
                            <button
                              onClick={() => rollbackStatus(app)}
                              title="Move back"
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {col.id !== "OFFER" && col.id !== "REJECTED" && (
                            <button
                              onClick={() => advanceStatus(app)}
                              title="Advance stage"
                              className="p-1 rounded text-slate-400 hover:text-brand-300 hover:bg-navy-800 transition-colors flex items-center text-[10px] gap-0.5"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedApp(app)}
                            title="Edit notes"
                            className="p-1 rounded text-slate-400 hover:text-brand-300 hover:bg-navy-800 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            title="Delete"
                            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-navy-800 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Application Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Application"
        description="Track a new company application in your Kanban pipeline."
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Stripe, Google, Microsoft"
              className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Role / Position *
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer Intern"
              className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote / City"
                className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Salary / Stipend
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="$8,500/mo or ₹75k"
                className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Notes / Referral details
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Applied via alumni referral, tailored resume with Spring Boot projects..."
              className="w-full bg-navy-950 border border-navy-750 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="glow" size="sm">
              Save Application
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Notes Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Edit Notes: ${selectedApp.role} at ${selectedApp.company}`}
          description="Update interview feedback or deadlines."
          maxWidth="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Stage
              </label>
              <select
                value={selectedApp.status}
                onChange={(e) => {
                  updateApplicationStatus(selectedApp.id, e.target.value as ApplicationStatus);
                  setSelectedApp({ ...selectedApp, status: e.target.value as ApplicationStatus });
                }}
                className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Notes
              </label>
              <textarea
                rows={4}
                value={selectedApp.notes || ""}
                onChange={(e) => setSelectedApp({ ...selectedApp, notes: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="glow"
                size="sm"
                onClick={() => {
                  if (selectedApp.notes) updateApplicationNotes(selectedApp.id, selectedApp.notes);
                  setSelectedApp(null);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
