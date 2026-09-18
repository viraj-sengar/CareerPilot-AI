"use client";

import React from "react";
import Link from "next/link";
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  FileText, 
  Mic, 
  Layers, 
  KanbanSquare, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase,
  Zap,
  Users,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function LandingPage() {
  const { loginDemoUser } = useApp();

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-md border-b border-navy-800/80 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 shadow-glow flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-brand-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              CareerPilot <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-500/20 text-brand-300 px-1.5 py-0.5 rounded border border-brand-500/30">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#for-students" className="hover:text-white transition-colors">For Students</a>
            <a href="#demo" className="hover:text-white transition-colors">Platform Demo</a>
          </nav>

          {/* Header CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="glow" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 lg:px-12 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-medium mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>The Next-Gen Career Platform for Engineers & Students</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Your career, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            powered by AI.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Discover what to learn, build better projects, improve your resume, prepare for interviews, and find opportunities that match your skills.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/onboarding">
            <Button variant="glow" size="lg" className="w-full sm:w-auto text-sm font-semibold" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Your Career Journey
            </Button>
          </Link>
          <Link href="/dashboard" onClick={loginDemoUser}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold" leftIcon={<Zap className="w-4 h-4 text-cyan-400" />}>
              Explore Live Demo (Alex Sharma)
            </Button>
          </Link>
        </div>

        {/* Realistic Dashboard Preview with Floating Stat Badges */}
        <div className="relative max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-brand-500/30 via-navy-800/40 to-navy-900/80 shadow-2xl border border-navy-750 backdrop-blur-sm">
          <div className="relative rounded-xl overflow-hidden bg-navy-900/90 border border-navy-800 shadow-inner">
            {/* Window bar mockup */}
            <div className="px-4 py-3 bg-navy-950/80 border-b border-navy-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-400 font-mono">careerpilot.ai/dashboard</span>
              <div className="w-12" />
            </div>

            {/* Mock Dashboard Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
              {/* Stat 1 */}
              <div className="p-4 rounded-xl bg-navy-850/80 border border-navy-750">
                <p className="text-xs text-slate-400">Career Readiness</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">82%</span>
                  <span className="text-[11px] text-emerald-400 font-medium">+4% this week</span>
                </div>
                <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-brand-500 h-full w-[82%]" />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-4 rounded-xl bg-navy-850/80 border border-navy-750">
                <p className="text-xs text-slate-400">ATS Resume Score</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-cyan-400">87/100</span>
                  <span className="text-[11px] text-slate-400">Top 10%</span>
                </div>
                <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[87%]" />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-4 rounded-xl bg-navy-850/80 border border-navy-750">
                <p className="text-xs text-slate-400">Target Skill Match</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-indigo-300">76%</span>
                  <span className="text-[11px] text-brand-300">SWE Track</span>
                </div>
                <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-indigo-400 h-full w-[76%]" />
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-4 rounded-xl bg-navy-850/80 border border-navy-750">
                <p className="text-xs text-slate-400">Active Applications</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-emerald-400">18</span>
                  <span className="text-[11px] text-amber-400">3 Interviews</span>
                </div>
                <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[70%]" />
                </div>
              </div>

              {/* Big Dashboard Visual Graphic */}
              <div className="md:col-span-3 p-5 rounded-xl bg-navy-850/60 border border-navy-750 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Career Acceleration Roadmap</h4>
                    <span className="text-xs text-brand-400">Target: Software Engineer</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Step-by-step milestones to clear top-tier technical hiring bars.</p>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="p-3 rounded-lg bg-navy-900 border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase">Phase 1</span>
                    <p className="text-xs font-semibold text-white mt-0.5">Foundations & DSA</p>
                    <span className="text-[10px] text-emerald-300 block mt-1">✓ 100% Completed</span>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900 border border-brand-500/40">
                    <span className="text-[10px] text-brand-400 font-semibold uppercase">Phase 2</span>
                    <p className="text-xs font-semibold text-white mt-0.5">Spring Boot & APIs</p>
                    <span className="text-[10px] text-brand-300 block mt-1">⚡ 65% In Progress</span>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900 border border-navy-700">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Phase 3</span>
                    <p className="text-xs font-semibold text-slate-300 mt-0.5">System Design & AWS</p>
                    <span className="text-[10px] text-slate-400 block mt-1">🔒 Up Next</span>
                  </div>
                </div>
              </div>

              {/* AI Assistant Widget Preview */}
              <div className="p-5 rounded-xl bg-gradient-to-b from-brand-900/30 to-navy-850/90 border border-brand-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-300">
                    <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
                    <span>AI Career Assistant</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                    &ldquo;You have strong Java fundamentals. Your biggest opportunity is Spring Boot & REST APIs.&rdquo;
                  </p>
                </div>
                <Link href="/dashboard" onClick={loginDemoUser}>
                  <Button variant="outline" size="sm" className="w-full mt-3 text-xs justify-center">
                    Ask Career AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating live badges */}
          <div className="hidden sm:flex absolute -top-5 -left-5 p-3 rounded-xl bg-navy-900/95 border border-brand-500/40 shadow-glow items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs">
              82%
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold text-white">Career Readiness</p>
              <p className="text-[10px] text-emerald-400">+4% this week</p>
            </div>
          </div>

          <div className="hidden sm:flex absolute -bottom-5 -right-5 p-3 rounded-xl bg-navy-900/95 border border-cyan-500/40 shadow-glow-cyan items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              92%
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold text-white">Job Match</p>
              <p className="text-[10px] text-slate-300">Stripe SWE Intern</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Why CareerPilot AI */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-navy-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="brand" className="mb-3">Why CareerPilot AI</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stop guessing what recruiters want. <br />
            Get a clear, actionable game plan.
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Generic job boards show you hundreds of open roles without telling you if you&apos;re qualified. CareerPilot AI bridges the gap between where you are today and where you need to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover glow="brand">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-400 mb-3">
                <Target className="w-5 h-5" />
              </div>
              <CardTitle>Skill Gap Intelligence</CardTitle>
              <CardDescription>
                Compare your current abilities against actual hiring benchmarks for top engineering roles. Pinpoint your exact missing skills.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover glow="cyan">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <CardTitle>ATS Resume Optimization</CardTitle>
              <CardDescription>
                Get your resume scored across 5 key dimensions with quantified bullet point rewrites that impress hiring managers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover glow="emerald">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3">
                <Mic className="w-5 h-5" />
              </div>
              <CardTitle>AI Mock Interviews</CardTitle>
              <CardDescription>
                Simulate real technical, behavioral, and system design interviews with instant feedback on accuracy, communication, and structure.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover glow="brand">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-400 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <CardTitle>AI Project Builder</CardTitle>
              <CardDescription>
                Build resume-defining projects designed specifically to eliminate your skill gaps with interactive 7-phase roadmaps.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover glow="cyan">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <CardTitle>Real-Time Job Matching</CardTitle>
              <CardDescription>
                See exactly which skills you match and which you lack for every role, with AI explanations and application readiness.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover glow="emerald">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3">
                <KanbanSquare className="w-5 h-5" />
              </div>
              <CardTitle>Kanban Application Tracker</CardTitle>
              <CardDescription>
                Organize every application from Applied to Offer with deadline alerts, interview schedules, and stage analytics.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 2. How It Works */}
      <section id="how-it-works" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-navy-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">How It Works</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From student to job-ready in 4 steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-navy-900 border border-navy-800 relative">
            <span className="text-3xl font-extrabold text-brand-500/30">01</span>
            <h3 className="text-base font-semibold text-white mt-2">Create Profile</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Select your target role (SWE, Frontend, Backend, AI/ML) and current technical background.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy-900 border border-navy-800 relative">
            <span className="text-3xl font-extrabold text-brand-500/30">02</span>
            <h3 className="text-base font-semibold text-white mt-2">Analyze Gaps</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              AI maps your skills against real company job requirements to highlight your highest-leverage areas.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy-900 border border-navy-800 relative">
            <span className="text-3xl font-extrabold text-brand-500/30">03</span>
            <h3 className="text-base font-semibold text-white mt-2">Execute Roadmap</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Follow tailored milestones, build gap-closing projects, and optimize your resume bullets.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy-900 border border-navy-800 relative">
            <span className="text-3xl font-extrabold text-brand-500/30">04</span>
            <h3 className="text-base font-semibold text-white mt-2">Land Offers</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Practice mock interviews, apply to high-match jobs, and manage your pipeline through to offer day.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-brand-900/50 via-navy-900 to-navy-950 border border-brand-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          <Badge variant="brand" className="mb-4">Ready to accelerate?</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Start your journey with CareerPilot AI.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of engineering students and fresh graduates who transformed career uncertainty into offer letters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding">
              <Button variant="glow" size="lg" className="w-full sm:w-auto font-semibold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Your Career Plan Free
              </Button>
            </Link>
            <Link href="/dashboard" onClick={loginDemoUser}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold">
                Launch Instant Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-800/80 py-12 px-6 lg:px-12 bg-navy-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-brand-400" />
            <span className="font-semibold text-white">CareerPilot AI</span>
            <span>&copy; 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
            <Link href="/resume" className="hover:text-white transition-colors">Resume Analyzer</Link>
            <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
            <Link href="/interview" className="hover:text-white transition-colors">Mock Interview</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
