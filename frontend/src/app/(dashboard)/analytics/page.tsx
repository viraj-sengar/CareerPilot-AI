"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Award, 
  CheckCircle2, 
  Target, 
  Clock, 
  ArrowUpRight,
  Flame,
  PieChart
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

export default function AnalyticsPage() {
  const { user, applications } = useApp();

  const totalApps = applications.length || 18;
  const assessments = applications.filter((a) => a.status === "ASSESSMENT").length;
  const interviews = applications.filter((a) => a.status === "INTERVIEW").length;
  const offers = applications.filter((a) => a.status === "OFFER").length;

  const interviewRate = Math.round(((interviews + offers) / totalApps) * 100);
  const offerRate = Math.round((offers / totalApps) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Performance Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Career Analytics & Conversion Funnel
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Quantitative tracking of your application conversion rates, skill growth velocity, and readiness trajectory.
        </p>
      </div>

      {/* AI Performance Insight Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950/60 via-navy-900 to-cyan-950/30 border border-brand-500/30 shadow-card flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
              AI Trajectory Insight
            </span>
            <Badge variant="emerald" size="sm">
              +14% Conversion
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            &ldquo;Your interview conversion rate has improved to <strong className="text-emerald-400">22.2%</strong> this month, outperforming the university average (8.5%). Your primary leverage point right now is passing final round technical rounds at Amazon and Bloomberg.&rdquo;
          </p>
        </div>
      </div>

      {/* 4 Metric Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover glow="brand">
          <CardHeader>
            <span className="text-xs text-slate-400 font-medium">Total Applications</span>
            <p className="text-3xl font-extrabold text-white mt-1">{totalApps}</p>
            <span className="text-xs text-brand-300 font-medium mt-1 block">Active across 5 stages</span>
          </CardHeader>
        </Card>

        <Card hover glow="cyan">
          <CardHeader>
            <span className="text-xs text-slate-400 font-medium">Interview Conversion</span>
            <p className="text-3xl font-extrabold text-cyan-400 mt-1">{interviewRate}%</p>
            <span className="text-xs text-emerald-400 font-medium mt-1 block">+8% vs last month</span>
          </CardHeader>
        </Card>

        <Card hover glow="emerald">
          <CardHeader>
            <span className="text-xs text-slate-400 font-medium">Offers Received</span>
            <p className="text-3xl font-extrabold text-emerald-400 mt-1">{offers}</p>
            <span className="text-xs text-emerald-300 font-medium mt-1 block">Zomato & Cloudflare 🎉</span>
          </CardHeader>
        </Card>

        <Card hover glow="brand">
          <CardHeader>
            <span className="text-xs text-slate-400 font-medium">ATS Optimization</span>
            <p className="text-3xl font-extrabold text-white mt-1">{user?.resumeScore || 87}/100</p>
            <span className="text-xs text-cyan-400 font-medium mt-1 block">92nd percentile</span>
          </CardHeader>
        </Card>
      </div>

      {/* Application Funnel Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Stage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Application Conversion Funnel</CardTitle>
            <CardDescription>
              Volume progression from initial submission to final job offer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { stage: "Submitted Applications", count: totalApps, percentage: 100, color: "brand" as const },
              { stage: "Online Assessments Cleared", count: assessments + interviews + offers, percentage: 55, color: "cyan" as const },
              { stage: "Technical & Behavioral Interviews", count: interviews + offers, percentage: 33, color: "amber" as const },
              { stage: "Job Offers Extended", count: offers, percentage: 11, color: "emerald" as const },
            ].map((step) => (
              <div key={step.stage} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{step.stage}</span>
                  <span className="text-slate-400 font-mono">
                    {step.count} ({step.percentage}%)
                  </span>
                </div>
                <Progress value={step.percentage} variant={step.color} size="md" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Velocity & Skill Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Growth & Velocity</CardTitle>
            <CardDescription>
              Technical competency gains logged across learning phases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 text-center">
                <span className="text-xs text-slate-400">Hours Invested</span>
                <p className="text-2xl font-bold text-white mt-1">140+ hrs</p>
                <span className="text-[10px] text-emerald-400 font-medium">+15 hrs this week</span>
              </div>
              <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 text-center">
                <span className="text-xs text-slate-400">Milestones Done</span>
                <p className="text-2xl font-bold text-cyan-400 mt-1">8 / 12</p>
                <span className="text-[10px] text-brand-300 font-medium">Phase 2 In Progress</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-850/60 border border-navy-800 space-y-2">
              <span className="text-xs font-semibold text-white">Velocity Assessment</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                At your current learning pace of ~15 hours/week, you are on track to master Spring Boot and complete your containerization milestone before your next interview round.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
