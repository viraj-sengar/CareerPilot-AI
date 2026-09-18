"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Check, 
  Filter,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { JobListing } from "@/lib/types";

export default function JobMatchingPage() {
  const { jobs, addApplication, applications } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedWorkModel, setSelectedWorkModel] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [addedJobs, setAddedJobs] = useState<Record<string, boolean>>({});

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.matchedSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "All" || job.jobType === selectedType;
    const matchesModel = selectedWorkModel === "All" || job.workModel === selectedWorkModel;

    return matchesSearch && matchesType && matchesModel;
  });

  const handleAddToApplications = (job: JobListing) => {
    addApplication({
      company: job.company,
      role: job.title,
      location: job.location,
      status: "APPLIED",
      salary: job.salaryRange,
      priority: job.matchPercentage >= 90 ? "HIGH" : "MEDIUM",
      matchedScore: job.matchPercentage,
      notes: `Applied via CareerPilot AI. Matched ${job.matchedSkills.join(", ")}. Missing: ${job.missingSkills.join(", ")}.`,
    });
    setAddedJobs((prev) => ({ ...prev, [job.id]: true }));
  };

  const isAlreadyApplied = (company: string, role: string) => {
    return applications.some((a) => a.company.toLowerCase() === company.toLowerCase() && a.role.toLowerCase() === role.toLowerCase());
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>AI Job Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Job Matching & Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Verified opportunities scored in real-time against your technical profile and resume.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, companies, or skills..."
            className="w-full bg-navy-950 border border-navy-750 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-navy-950 border border-navy-750 text-xs text-white rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
          </select>

          <select
            value={selectedWorkModel}
            onChange={(e) => setSelectedWorkModel(e.target.value)}
            className="bg-navy-950 border border-navy-750 text-xs text-white rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Work Models</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredJobs.map((job) => {
          const applied = isAlreadyApplied(job.company, job.title) || !!addedJobs[job.id];
          return (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-navy-900 border border-navy-800 hover:border-brand-500/40 transition-all shadow-card flex flex-col justify-between space-y-4 group"
            >
              {/* Top Row: Company & Match Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center font-bold text-white text-base overflow-hidden shrink-0">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                    ) : (
                      job.company.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-slate-200 font-semibold">{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <Badge
                  variant={job.matchPercentage >= 90 ? "cyan" : "brand"}
                  size="md"
                  dot
                >
                  {job.matchPercentage}% Match
                </Badge>
              </div>

              {/* Meta details & Salary */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="px-2.5 py-1 rounded bg-navy-850 border border-navy-750 font-medium">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-1 rounded bg-navy-850 border border-navy-750 font-medium">
                  {job.workModel}
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                  {job.salaryRange}
                </span>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-medium mr-1">Matched:</span>
                  {job.matchedSkills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-medium"
                    >
                      <Check className="w-3 h-3" />
                      {s}
                    </span>
                  ))}
                </div>

                {job.missingSkills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">Missing:</span>
                    {job.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1 font-medium"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Explanation Callout */}
              <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <p>{job.aiExplanation}</p>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-navy-800 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedJob(job)}
                  className="text-xs"
                >
                  View Details
                </Button>

                {applied ? (
                  <Badge variant="emerald" size="md">
                    ✓ In Applications Tracker
                  </Badge>
                ) : (
                  <Button
                    variant="glow"
                    size="sm"
                    onClick={() => handleAddToApplications(job)}
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="text-xs"
                  >
                    Add to Applications
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={selectedJob.title}
          description={`${selectedJob.company} · ${selectedJob.location} · ${selectedJob.jobType}`}
          maxWidth="xl"
        >
          <div className="space-y-5 text-slate-200">
            {/* Match Breakdown Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/60 to-navy-900 border border-brand-500/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Match Compatibility</p>
                <p className="text-2xl font-bold text-white mt-0.5">
                  {selectedJob.matchPercentage}% Candidate Fit
                </p>
              </div>
              <Badge variant={selectedJob.matchPercentage >= 90 ? "cyan" : "brand"} size="md">
                High Interview Probability
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Job Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Key Responsibilities
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Requirements
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-400 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Compensation: <strong className="text-emerald-400">{selectedJob.salaryRange}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </Button>
                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => {
                    handleAddToApplications(selectedJob);
                    setSelectedJob(null);
                  }}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add to Application Tracker
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
