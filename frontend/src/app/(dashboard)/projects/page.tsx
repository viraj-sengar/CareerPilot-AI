"use client";

import React, { useState } from "react";
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Code, 
  ArrowRight, 
  Check, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FolderTree,
  Terminal,
  Server
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Modal } from "@/components/ui/Modal";
import { ProjectRecommendation } from "@/lib/types";

export default function AIProjectBuilderPage() {
  const { projects, toggleProjectTask, user, apiKey } = useApp();
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation>(projects[0]);
  const [expandedPhaseIndex, setExpandedPhaseIndex] = useState<number | null>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Compute completion stats for selected project
  const totalTasks = selectedProject.roadmapPhases.length;
  const completedTasks = selectedProject.roadmapPhases.filter((p) => p.completed).length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const handleGenerateNewProject = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: user?.targetRole || "Software Engineer",
          missingSkills: ["Spring Boot", "REST APIs", "Docker", "Redis"],
          apiKey: apiKey
        })
      });

      if (res.ok) {
        const newProj: ProjectRecommendation = await res.json();
        setSelectedProject(newProj);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>AI Project Architect</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Build a Project That Improves Your Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Projects custom-generated to eliminate your specific skill gaps and impress tech hiring managers.
          </p>
        </div>

        <Button
          variant="glow"
          size="sm"
          onClick={handleGenerateNewProject}
          isLoading={isGenerating}
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate New Project Plan
        </Button>
      </div>

      {/* Project Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => {
          const isSelected = selectedProject.id === proj.id;
          const doneCount = proj.roadmapPhases.filter((p) => p.completed).length;
          const prog = Math.round((doneCount / proj.roadmapPhases.length) * 100);

          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all shadow-card ${
                isSelected
                  ? "bg-navy-900 border-brand-500 shadow-glow"
                  : "bg-navy-900/60 border-navy-800 hover:border-slate-700 hover:bg-navy-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant={proj.difficulty === "Advanced" ? "rose" : "brand"} size="sm">
                  {proj.difficulty}
                </Badge>
                <span className="text-xs text-slate-400 font-semibold">{prog}% Completed</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {proj.title}
              </h3>

              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {proj.whyRecommended}
              </p>

              <Progress value={prog} variant="gradient" size="sm" className="mt-4" />
            </div>
          );
        })}
      </div>

      {/* Selected Project Overview Card */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-navy-800">
          <div>
            <span className="text-[11px] uppercase font-bold text-brand-400 tracking-wider">
              Active Project Roadmap
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {selectedProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {selectedProject.summary}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-center shrink-0 min-w-[160px]">
            <span className="text-xs text-slate-400">Total Progress</span>
            <p className="text-2xl font-bold text-white mt-0.5">{completionPercentage}%</p>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {completedTasks} of {totalTasks} Phases Done
            </span>
          </div>
        </div>

        {/* Why this project bridges your gap */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/40 via-navy-850 to-navy-950 border border-brand-500/30 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
              Strategic Portfolio Impact
            </h4>
            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
              {selectedProject.whyRecommended}
            </p>
          </div>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-2">Technologies Used:</span>
          {selectedProject.techStack.map((tech) => (
            <Badge key={tech} variant="neutral" size="md">
              {tech}
            </Badge>
          ))}
          <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Est. ~{selectedProject.estimatedHours} Hours Total</span>
          </span>
        </div>

        {/* 7-Phase Interactive Implementation Plan */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Implementation Phases & Checkpoints
          </h3>

          <div className="space-y-3">
            {selectedProject.roadmapPhases.map((phase, idx) => {
              const isExpanded = expandedPhaseIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all ${
                    phase.completed
                      ? "bg-navy-850/40 border-emerald-500/30"
                      : "bg-navy-850 border-navy-750"
                  }`}
                >
                  {/* Phase Header Row */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleProjectTask(selectedProject.id, idx)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                          phase.completed
                            ? "bg-emerald-500 border-emerald-400 text-white"
                            : "border-navy-600 hover:border-brand-400 bg-navy-950"
                        }`}
                      >
                        {phase.completed && <Check className="w-4 h-4" />}
                      </button>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-brand-400">
                          {phase.phase}
                        </span>
                        <h4
                          className={`text-sm font-semibold transition-colors ${
                            phase.completed ? "text-slate-400 line-through" : "text-white"
                          }`}
                        >
                          {phase.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {phase.estimatedHours} hrs
                      </span>
                      <button
                        onClick={() => setExpandedPhaseIndex(isExpanded ? null : idx)}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-navy-800"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Phase Details & Code Snippet */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-navy-800/80 space-y-3 text-xs text-slate-300">
                      <p className="leading-relaxed">{phase.description}</p>

                      {phase.codeSnippet && (
                        <div className="rounded-lg bg-navy-950 border border-navy-800 p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                          <pre>{phase.codeSnippet}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
