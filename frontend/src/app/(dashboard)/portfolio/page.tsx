"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  UserCircle, 
  Github, 
  Linkedin, 
  Globe, 
  ExternalLink, 
  Award, 
  Code2, 
  CheckCircle2, 
  Share2, 
  FileText, 
  Check, 
  MapPin, 
  Mail,
  Layers
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function PortfolioPage() {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);

  const copyShareLink = () => {
    navigator.clipboard?.writeText?.(window.location.origin + "/portfolio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills = [
    { name: "Java", level: "Advanced" },
    { name: "SQL & PostgreSQL", level: "Advanced" },
    { name: "Data Structures & Algorithms", level: "Advanced" },
    { name: "Git & Version Control", level: "Advanced" },
    { name: "React & Next.js", level: "Intermediate" },
    { name: "REST APIs & OpenAPI", level: "Intermediate" },
    { name: "Spring Boot", level: "Learning" },
    { name: "Docker", level: "Learning" },
    { name: "System Design", level: "Learning" },
  ];

  const featuredProjects = [
    {
      title: "AI Job Recommendation Engine",
      role: "Backend & Systems Lead",
      desc: "Microservice that vectorizes candidate resumes and matches job postings with cosine similarity queries on PostgreSQL pgvector.",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "pgvector"],
      githubUrl: "https://github.com/alexsharma-dev/ai-job-engine",
      liveUrl: "https://ai-job-engine.demo"
    },
    {
      title: "High-Throughput Distributed Rate Limiter",
      role: "System Designer",
      desc: "Ultra-low latency Sliding Window Rate Limiter powered by atomic Redis Lua scripts serving 10,000+ simulated RPS.",
      tech: ["Java", "Redis", "Docker", "Spring Cloud"],
      githubUrl: "https://github.com/alexsharma-dev/distributed-rate-limiter"
    },
    {
      title: "E-Commerce Resilient Core Platform",
      role: "Full Stack Engineer",
      desc: "Full-featured shopping platform with JWT authentication, Stripe payment flow, and automated query indexing.",
      tech: ["React", "Java", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/alexsharma-dev/ecommerce-core"
    }
  ];

  const certificates = [
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Jan 2026" },
    { title: "LeetCode Top 5% Global Ranking (Contest Rating 1940)", issuer: "LeetCode", date: "Dec 2025" },
    { title: "Database Systems Specialization", issuer: "Coursera / Stanford", date: "Nov 2025" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <UserCircle className="w-3.5 h-3.5" />
            <span>Public Candidate Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Developer Profile & Showcase
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Recruiter-ready portfolio showcasing your verified skills, projects, and ATS score.
          </p>
        </div>

        <Button
          variant="glow"
          size="sm"
          onClick={copyShareLink}
          leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        >
          {copied ? "Link Copied to Clipboard!" : "Share Portfolio Link"}
        </Button>
      </div>

      {/* Candidate Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-brand-950/50 via-navy-900 to-navy-900 border border-brand-500/30 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-brand-600 border-2 border-brand-400/60 overflow-hidden shadow-glow shrink-0">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user?.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-white">
                {user?.name?.charAt(0) || "A"}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {user?.name || "Alex Sharma"}
              </h2>
              <Badge variant="emerald" size="sm" dot>
                Open to Internships
              </Badge>
            </div>
            <p className="text-xs text-brand-300 font-semibold">
              Target Role: {user?.targetRole || "Software Engineer"}
            </p>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed pt-1">
              {user?.bio}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {user?.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {user?.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <div className="flex items-center gap-1 text-xs text-slate-400 pl-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.preferredLocation || "Remote"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Column */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">ATS Score</span>
            <p className="text-xl font-bold text-cyan-400 mt-0.5">{user?.resumeScore || 87}/100</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Readiness</span>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">{user?.readinessScore || 82}%</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Projects</span>
            <p className="text-xl font-bold text-white mt-0.5">3 Built</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Skills</span>
            <p className="text-xl font-bold text-brand-300 mt-0.5">12 Core</p>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-400" />
          <span>Featured Engineering Projects</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((proj, i) => (
            <Card key={i} hover glow="brand" className="flex flex-col justify-between">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-brand-400">
                    {proj.role}
                  </span>
                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <CardTitle className="text-base font-bold text-white">
                  {proj.title}
                </CardTitle>

                <CardDescription className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {proj.desc}
                </CardDescription>
              </CardHeader>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-navy-750 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Verified Skills & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Core Technical Competencies</span>
            </CardTitle>
            <CardDescription>
              Demonstrated through university coursework, competitive programming, and GitHub repositories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2.5">
              {skills.map((s) => (
                <div key={s.name} className="p-3 rounded-lg bg-navy-850 border border-navy-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">{s.name}</span>
                  <Badge
                    variant={
                      s.level === "Advanced"
                        ? "emerald"
                        : s.level === "Intermediate"
                        ? "brand"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {s.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificates & Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certificates & Recognitions</span>
            </CardTitle>
            <CardDescription>
              Verified credentials and competitive programming contest records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {certificates.map((cert, i) => (
              <div key={i} className="p-3 rounded-xl bg-navy-850 border border-navy-800 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white">{cert.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
                </div>
                <Badge variant="amber" size="sm">
                  {cert.date}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
