"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Loader2,
  HelpCircle
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { DEMO_SKILL_GAPS } from "@/lib/demo-data";

const ROLES = [
  "Software Engineer",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "AI/ML Engineer",
  "Data Scientist"
];

export default function SkillGapPage() {
  const { user, updateProfile, apiKey } = useApp();
  const [selectedRole, setSelectedRole] = useState(user?.targetRole || "Software Engineer");
  const [loading, setLoading] = useState(false);
  const [skillData, setSkillData] = useState(DEMO_SKILL_GAPS);

  const handleRoleChange = async (role: string) => {
    setSelectedRole(role);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: role,
          currentSkills: ["Java", "SQL", "Git", "React", "Data Structures"],
          apiKey: apiKey
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.skills) setSkillData(data.skills);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Find biggest gap
  const biggestGap = [...skillData].sort((a, b) => (b.required - b.current) - (a.required - a.current))[0] || {
    skill: "Spring Boot",
    current: 25,
    required: 75,
    gap: 50
  };

  const actualGap = Math.max(0, biggestGap.required - biggestGap.current);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Competitive Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare your current skill levels against real hiring criteria for your target role.
          </p>
        </div>

        {/* Role Selector Pill Menu */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="bg-navy-900 border border-navy-750 text-xs text-white rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Callout: Biggest Skill Gap Alert Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950/60 via-navy-900 to-indigo-950/40 border border-brand-500/40 shadow-glow relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="rose" size="sm" dot>
                Biggest Skill Gap
              </Badge>
              <span className="text-xs text-slate-400">Target Role: {selectedRole}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {biggestGap.skill} — <span className="text-rose-400">{actualGap}% Gap</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              &ldquo;Build a production-ready REST API using {biggestGap.skill} and PostgreSQL. Packaging this into an end-to-end microservice will eliminate your single largest hiring blocker.&rdquo;
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <Link href="/projects">
              <Button variant="glow" size="md" className="w-full justify-center text-xs font-semibold" leftIcon={<Layers className="w-4 h-4" />}>
                Generate Project Plan
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                View Learning Roadmap &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Comparison Table Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
          <div>
            <CardTitle>Skills vs Required Competency</CardTitle>
            <CardDescription>
              Green indicates ready for technical interviews. Amber and red indicate active skill gaps.
            </CardDescription>
          </div>
          {loading && (
            <div className="flex items-center gap-1.5 text-xs text-brand-300">
              <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
              <span>Analyzing market requirements...</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-800/80 bg-navy-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Skill</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-6">Current vs Required</th>
                <th className="py-3.5 px-4 text-center">Gap %</th>
                <th className="py-3.5 px-6 text-right">Readiness Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60 text-xs">
              {skillData.map((item) => {
                const gap = Math.max(0, item.required - item.current);
                const isReady = item.current >= item.required;

                return (
                  <tr key={item.skill} className="hover:bg-navy-850/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {item.skill}
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-navy-800 border border-navy-750">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 min-w-[200px]">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-300 font-medium">You: {item.current}%</span>
                        <span className="text-slate-400">Benchmark: {item.required}%</span>
                      </div>
                      <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isReady ? "bg-emerald-400" : "bg-brand-500"
                          }`}
                          style={{ width: `${item.current}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {gap === 0 ? (
                        <span className="text-emerald-400 font-semibold text-xs">0%</span>
                      ) : (
                        <span className="text-rose-400 font-semibold text-xs">-{gap}%</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {isReady ? (
                        <Badge variant="emerald" size="sm" dot>
                          Interview Ready
                        </Badge>
                      ) : gap > 35 ? (
                        <Badge variant="rose" size="sm" dot>
                          High Priority Gap
                        </Badge>
                      ) : (
                        <Badge variant="amber" size="sm">
                          Moderate Gap
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
