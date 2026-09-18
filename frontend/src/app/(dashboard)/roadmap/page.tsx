"use client";

import React, { useState } from "react";
import { 
  Map, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  ChevronRight, 
  Sparkles,
  Award,
  AlertCircle,
  BarChart2,
  Check
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Modal } from "@/components/ui/Modal";
import { SkillItem } from "@/lib/types";

export default function CareerRoadmapPage() {
  const { roadmap, updateSkillStatus, user } = useApp();
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Compute total progress
  const allSkills = roadmap.flatMap((p) => p.skills);
  const completedSkills = allSkills.filter((s) => s.status === "COMPLETED");
  const overallRoadmapProgress = Math.round((completedSkills.length / allSkills.length) * 100);

  const handleMarkComplete = (skill: SkillItem) => {
    updateSkillStatus(skill.id, "COMPLETED", 100);
    setSelectedSkill({
      ...skill,
      status: "COMPLETED",
      currentLevel: 100,
    });
  };

  const handleMarkInProgress = (skill: SkillItem) => {
    updateSkillStatus(skill.id, "IN_PROGRESS", Math.max(skill.currentLevel, 50));
    setSelectedSkill({
      ...skill,
      status: "IN_PROGRESS",
      currentLevel: Math.max(skill.currentLevel, 50),
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <Map className="w-3.5 h-3.5" />
            <span>Personalized Career Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Software Engineering Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Click any milestone node to view rationale, curated tutorials, project ideas, and track completion.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-4">
          <div>
            <p className="text-xs text-slate-400">Roadmap Completion</p>
            <p className="text-xl font-bold text-white mt-0.5">{overallRoadmapProgress}%</p>
          </div>
          <div className="w-24">
            <Progress value={overallRoadmapProgress} variant="gradient" size="sm" />
            <span className="text-[10px] text-slate-400 mt-1 block">
              {completedSkills.length}/{allSkills.length} Milestones
            </span>
          </div>
        </div>
      </div>

      {/* Roadmap Phase Tiers */}
      <div className="space-y-8 relative">
        {roadmap.map((phase, phaseIdx) => (
          <div key={phase.phaseNumber} className="relative">
            {/* Phase Section Banner */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-navy-900/90 border border-navy-800 mb-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center font-bold text-sm text-brand-400">
                  {phase.phaseNumber}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">{phase.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{phase.description}</p>
                </div>
              </div>

              <Badge
                variant={
                  phase.status === "COMPLETED"
                    ? "emerald"
                    : phase.status === "IN_PROGRESS"
                    ? "brand"
                    : "neutral"
                }
                size="sm"
              >
                {phase.status}
              </Badge>
            </div>

            {/* Grid of Interactive Skill Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phase.skills.map((skill) => {
                const isCompleted = skill.status === "COMPLETED";
                const isInProgress = skill.status === "IN_PROGRESS";

                return (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all hover:-translate-y-1 group relative ${
                      isCompleted
                        ? "bg-navy-900/90 border-emerald-500/30 hover:border-emerald-500/60"
                        : isInProgress
                        ? "bg-navy-900/90 border-brand-500/40 hover:shadow-glow hover:border-brand-500"
                        : "bg-navy-900/60 border-navy-800 hover:border-slate-700 opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* Top Row: Category + Importance */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isCompleted && (
                          <Badge variant="emerald" size="sm" dot>
                            Completed
                          </Badge>
                        )}
                        {isInProgress && (
                          <Badge variant="brand" size="sm" dot>
                            {skill.currentLevel}%
                          </Badge>
                        )}
                        {!isCompleted && !isInProgress && (
                          <Badge variant="neutral" size="sm">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors flex items-center justify-between">
                      <span>{skill.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                    </h3>

                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {skill.whyMatters}
                    </p>

                    {/* Bottom Progress Bar */}
                    <div className="mt-4 pt-3 border-t border-navy-800/80">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                        <span>Proficiency</span>
                        <span className="font-semibold text-slate-200">
                          {skill.currentLevel}% / {skill.targetLevel}%
                        </span>
                      </div>
                      <Progress
                        value={skill.currentLevel}
                        variant={isCompleted ? "emerald" : "brand"}
                        size="sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Skill Detail Modal */}
      {selectedSkill && (
        <Modal
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={selectedSkill.name}
          description={`Skill Category: ${selectedSkill.category} · Priority: ${selectedSkill.importance}`}
          maxWidth="xl"
        >
          <div className="space-y-5 text-slate-200">
            {/* Why it matters */}
            <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5">
              <h4 className="text-xs font-semibold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-400" />
                Why this skill matters for your target role
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedSkill.whyMatters}
              </p>
            </div>

            {/* Current vs Target Level */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-navy-850 border border-navy-800">
                <span className="text-[11px] text-slate-400">Current Level</span>
                <p className="text-lg font-bold text-white mt-0.5">{selectedSkill.currentLevel}%</p>
              </div>
              <div className="p-3 rounded-lg bg-navy-850 border border-navy-800">
                <span className="text-[11px] text-slate-400">Target Benchmark</span>
                <p className="text-lg font-bold text-cyan-400 mt-0.5">{selectedSkill.targetLevel}%</p>
              </div>
              <div className="p-3 rounded-lg bg-navy-850 border border-navy-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400">Estimated Effort</span>
                <p className="text-lg font-bold text-amber-400 mt-0.5">{selectedSkill.estimatedHours} Hours</p>
              </div>
            </div>

            {/* Recommended Learning Resources */}
            {selectedSkill.resources && selectedSkill.resources.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-400" />
                  <span>Curated Learning Resources</span>
                </h4>
                <div className="space-y-2">
                  {selectedSkill.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-navy-850 border border-navy-750 hover:border-brand-500/60 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Badge variant="cyan" size="sm">
                          {res.type}
                        </Badge>
                        <span className="text-xs font-medium text-white group-hover:text-brand-300 transition-colors">
                          {res.title}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Hands-on Projects */}
            {selectedSkill.recommendedProjects && selectedSkill.recommendedProjects.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Recommended Projects to Prove Mastery</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSkill.recommendedProjects.map((proj, i) => (
                    <div key={i} className="p-3 rounded-lg bg-navy-850 border border-navy-750 text-xs font-medium text-slate-200 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Status Updates */}
            <div className="pt-4 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Status: <strong className="text-white">{selectedSkill.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                {selectedSkill.status !== "IN_PROGRESS" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkInProgress(selectedSkill)}
                  >
                    Mark In Progress (50%)
                  </Button>
                )}
                {selectedSkill.status !== "COMPLETED" && (
                  <Button
                    variant="glow"
                    size="sm"
                    leftIcon={<Check className="w-4 h-4" />}
                    onClick={() => handleMarkComplete(selectedSkill)}
                  >
                    Mark as Mastered (100%)
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
