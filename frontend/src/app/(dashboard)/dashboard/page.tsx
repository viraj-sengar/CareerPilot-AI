"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  TrendingUp, 
  FileText, 
  Target, 
  Briefcase, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  ChevronRight,
  Flame,
  Award,
  BookOpen
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

export default function DashboardPage() {
  const { user, applications, setIsAiDrawerOpen } = useApp();
  const [selectedProgressMetric, setSelectedProgressMetric] = useState<"all" | "skills" | "projects" | "resume" | "applications">("all");

  const name = user?.name?.split(" ")[0] || "Alex";

  const nextSteps = [
    {
      id: "step-1",
      title: "Learn Spring Boot Microservices",
      reason: "Spring Boot represents your largest skill gap (50% gap) for Software Engineer roles.",
      estimatedTime: "45 hrs",
      difficulty: "Medium",
      difficultyVariant: "amber" as const,
      actionLabel: "View Roadmap",
      actionUrl: "/roadmap",
      category: "Skill Gap"
    },
    {
      id: "step-2",
      title: "Improve Resume Project Bullets",
      reason: "3 quantified bullet rewrites are available to elevate your ATS score from 87 to 94.",
      estimatedTime: "15 mins",
      difficulty: "Easy",
      difficultyVariant: "emerald" as const,
      actionLabel: "Optimize Resume",
      actionUrl: "/resume",
      category: "Resume"
    },
    {
      id: "step-3",
      title: "Build AI Job Recommendation Engine",
      reason: "Demonstrates Spring Boot, PostgreSQL vector search, and Docker in a single project.",
      estimatedTime: "40 hrs",
      difficulty: "Intermediate",
      difficultyVariant: "brand" as const,
      actionLabel: "Open Project Plan",
      actionUrl: "/projects",
      category: "Project"
    },
    {
      id: "step-4",
      title: "Practice Technical Mock Interview",
      reason: "Prepare for upcoming Amazon and Bloomberg rounds with real-time AI scoring.",
      estimatedTime: "20 mins",
      difficulty: "Medium",
      difficultyVariant: "amber" as const,
      actionLabel: "Start Mock Interview",
      actionUrl: "/interview",
      category: "Interview"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Good morning, {name}</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here&apos;s your career progress and what you should focus on next to become job-ready.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/skill-gap">
            <Button variant="secondary" size="sm" leftIcon={<Target className="w-4 h-4 text-brand-400" />}>
              Analyze Skill Gaps
            </Button>
          </Link>
          <Button
            variant="glow"
            size="sm"
            onClick={() => setIsAiDrawerOpen(true)}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Ask Career AI
          </Button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Career Readiness */}
        <Card hover glow="brand">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Career Readiness</span>
              <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white">
                {user?.readinessScore || 82}%
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                +4% this week
              </span>
            </div>
            <Progress value={user?.readinessScore || 82} variant="gradient" size="sm" className="mt-3" />
            <p className="text-[11px] text-slate-400 mt-2">
              Based on skills, resume, projects & applications
            </p>
          </CardHeader>
        </Card>

        {/* Card 2: Resume Score */}
        <Card hover glow="cyan">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">ATS Resume Score</span>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-cyan-400">
                {user?.resumeScore || 87}/100
              </span>
              <Badge variant="cyan" size="sm">ATS Optimized</Badge>
            </div>
            <Progress value={user?.resumeScore || 87} variant="cyan" size="sm" className="mt-3" />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>Top 12% of applicants</span>
              <Link href="/resume" className="text-cyan-300 hover:underline">Improve &rarr;</Link>
            </div>
          </CardHeader>
        </Card>

        {/* Card 3: Skill Match */}
        <Card hover glow="brand">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Target Role Match</span>
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-indigo-300">
                {user?.skillMatchScore || 76}%
              </span>
              <span className="text-xs text-slate-400 truncate max-w-[120px]">
                {user?.targetRole || "Software Engineer"}
              </span>
            </div>
            <Progress value={user?.skillMatchScore || 76} variant="brand" size="sm" className="mt-3" />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>Primary gap: Spring Boot</span>
              <Link href="/skill-gap" className="text-brand-300 hover:underline">View gaps &rarr;</Link>
            </div>
          </CardHeader>
        </Card>

        {/* Card 4: Applications */}
        <Card hover glow="emerald">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Applications Tracked</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-emerald-400">
                {applications.length || 18}
              </span>
              <Badge variant="amber" size="sm" dot>
                {applications.filter(a => a.status === "INTERVIEW").length} Interviews
              </Badge>
            </div>
            <Progress 
              value={Math.round((applications.filter(a => a.status !== "REJECTED").length / (applications.length || 1)) * 100)} 
              variant="emerald" 
              size="sm" 
              className="mt-3" 
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>2 offers received 🎉</span>
              <Link href="/applications" className="text-emerald-300 hover:underline">Kanban &rarr;</Link>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Main Section: Career Progress Chart + AI Advisor Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Career Progress Over Time Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-navy-900 border border-navy-800 p-6 shadow-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-400" />
                <span>Career Progress Over Time</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tracking your trajectory across skills, projects, resume, applications & interviews.
              </p>
            </div>

            {/* Metric filter buttons */}
            <div className="flex items-center gap-1.5 bg-navy-950 p-1 rounded-lg border border-navy-800 text-[11px]">
              {(["all", "skills", "projects", "resume", "applications"] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedProgressMetric(metric)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                    selectedProgressMetric === metric
                      ? "bg-brand-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Progress Visualization */}
          <div className="h-64 w-full relative flex items-end pt-8 pb-4 px-2">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-6">
              <div className="border-b border-navy-800/60 w-full flex justify-between text-[10px] text-slate-500">
                <span>100% (Job Ready)</span>
              </div>
              <div className="border-b border-navy-800/40 w-full flex justify-between text-[10px] text-slate-500">
                <span>75%</span>
              </div>
              <div className="border-b border-navy-800/40 w-full flex justify-between text-[10px] text-slate-500">
                <span>50%</span>
              </div>
              <div className="border-b border-navy-800/40 w-full flex justify-between text-[10px] text-slate-500">
                <span>25%</span>
              </div>
              <div className="border-b border-navy-800 w-full flex justify-between text-[10px] text-slate-500">
                <span>0%</span>
              </div>
            </div>

            {/* Month Data Columns */}
            <div className="relative w-full h-full flex items-end justify-between z-10 pl-6 pr-2">
              {[
                { month: "Nov", readiness: 45, skills: 50, apps: 2, resume: 65 },
                { month: "Dec", readiness: 58, skills: 62, apps: 6, resume: 74 },
                { month: "Jan", readiness: 68, skills: 70, apps: 10, resume: 80 },
                { month: "Feb", readiness: 75, skills: 73, apps: 14, resume: 84 },
                { month: "Mar (Now)", readiness: 82, skills: 76, apps: 18, resume: 87 },
                { month: "Apr (Target)", readiness: 95, skills: 90, apps: 25, resume: 95 },
              ].map((point, index) => {
                const isCurrent = point.month.includes("Now");
                const isTarget = point.month.includes("Target");
                return (
                  <div key={point.month} className="flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-navy-950 border border-brand-500/40 px-2.5 py-1 rounded-lg text-[10px] text-white whitespace-nowrap shadow-glow z-20">
                      Readiness: {point.readiness}% | Resume: {point.resume}/100
                    </div>

                    {/* Bar Pillar */}
                    <div className="w-8 sm:w-12 bg-navy-950 rounded-t-lg h-44 flex items-end p-1 border border-navy-800/80">
                      <div
                        className={`w-full rounded transition-all duration-500 ${
                          isTarget
                            ? "bg-dashed border-2 border-brand-500/60 bg-brand-500/20"
                            : isCurrent
                            ? "bg-gradient-to-t from-brand-600 via-indigo-500 to-cyan-400 shadow-glow"
                            : "bg-navy-700/80 group-hover:bg-brand-500/60"
                        }`}
                        style={{ height: `${point.readiness}%` }}
                      />
                    </div>

                    {/* Label */}
                    <span className={`text-[11px] font-medium ${isCurrent ? "text-cyan-400 font-bold" : "text-slate-400"}`}>
                      {point.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Footer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-navy-800/80 text-center">
            <div className="p-2.5 rounded-lg bg-navy-850/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Skills Mastered</span>
              <p className="text-base font-bold text-white mt-0.5">8 / 12</p>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-850/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Projects Built</span>
              <p className="text-base font-bold text-cyan-400 mt-0.5">3 Live</p>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-850/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Interview Rate</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5">22.2%</p>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-850/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Target Date</span>
              <p className="text-base font-bold text-amber-400 mt-0.5">April 2026</p>
            </div>
          </div>
        </div>

        {/* Right: AI Career Assistant Card */}
        <div className="rounded-2xl bg-gradient-to-b from-brand-950/40 via-navy-900 to-navy-900 border border-brand-500/30 p-6 shadow-card flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <div className="flex items-center gap-2 text-brand-300 font-semibold text-xs">
                <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
                <span>AI Career Assistant</span>
              </div>
              <Badge variant="brand" size="sm">Live Analysis</Badge>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-2">
              <p className="text-xs font-semibold text-white">Current Profile Assessment</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                &ldquo;You have strong Java and SQL fundamentals. Your biggest opportunity for backend roles is 
                <span className="text-brand-300 font-semibold"> Spring Boot</span> and 
                <span className="text-cyan-300 font-semibold"> REST API development</span>.&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                Immediate Action Items
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Build the AI Job Recommendation Engine project.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Apply the 3 quantified resume bullet rewrites.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Practice Amazon Leadership Principle questions.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button
              variant="glow"
              size="md"
              className="w-full justify-center text-xs font-semibold"
              onClick={() => setIsAiDrawerOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Ask Career AI
            </Button>
            <Link href="/roadmap" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs text-slate-400">
                Explore Full Roadmap &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Next Steps Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Recommended Next Steps</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Prioritized by career impact and estimated completion time.
            </p>
          </div>
          <Link href="/roadmap" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
            View all milestones &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nextSteps.map((step) => (
            <Card key={step.id} hover glow="brand" className="flex flex-col justify-between">
              <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {step.category}
                  </span>
                  <Badge variant={step.difficultyVariant} size="sm">
                    {step.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {step.reason}
                </CardDescription>
              </CardHeader>

              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Est. time: <strong className="text-slate-200">{step.estimatedTime}</strong></span>
                </div>

                <Link href={step.actionUrl} className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center text-xs font-semibold hover:border-brand-500 hover:text-brand-300"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {step.actionLabel}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
