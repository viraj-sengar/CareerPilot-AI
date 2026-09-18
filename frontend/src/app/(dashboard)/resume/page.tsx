"use client";

import React, { useState } from "react";
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Download,
  Loader2,
  FileCheck,
  Zap
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { DEMO_RESUME_ANALYSIS } from "@/lib/demo-data";
import { ResumeAnalysisData } from "@/lib/types";

const SAMPLE_RESUME_TEXT = `ALEX SHARMA
alex.sharma@stanford.edu | (555) 234-5678 | github.com/alexsharma-dev | linkedin.com/in/alexsharma-swe

EDUCATION
Stanford University — B.S. in Computer Science (Expected June 2026)
Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Object-Oriented Software Design, Computer Networks.

TECHNICAL SKILLS
Languages: Java, Python, JavaScript, TypeScript, SQL, C++
Frameworks & Libraries: React, Next.js, Node.js, Express, JUnit, HTML5, CSS3/Tailwind
Databases & Tools: PostgreSQL, MySQL, Redis, Git, GitHub, Docker, Linux/Unix

PROJECTS
E-Commerce Web Application (Java, React, PostgreSQL)
- Worked on an e-commerce website with product search and payment processing.
- Built authentication endpoints and user profile management.
- Connected PostgreSQL database for storing products, orders, and user carts.

Database Optimization Engine (SQL, PostgreSQL)
- Made SQL queries faster and fixed slow queries in MySQL database.
- Implemented indexing on high-volume tables.

Student Portal Backend (Java, REST APIs)
- Created REST APIs for student registration and course catalog.
- Integrated JWT authentication for student accounts.`;

export default function ResumeAnalyzerPage() {
  const { user, updateProfile, apiKey } = useApp();
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEXT);
  const [analysis, setAnalysis] = useState<ResumeAnalysisData>(DEMO_RESUME_ANALYSIS);
  const [analyzing, setAnalyzing] = useState(false);
  const [fileName, setFileName] = useState<string>("alex_sharma_resume.pdf");
  const [appliedRewrites, setAppliedRewrites] = useState<Record<number, boolean>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // For text or demo, read file text
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setResumeText(content);
          triggerAnalysis(content);
        }
      };
      if (file.type.includes("text") || file.name.endsWith(".txt")) {
        reader.readAsText(file);
      } else {
        // For PDF/DOCX in demo, simulate parsed text and trigger analysis
        triggerAnalysis(resumeText);
      }
    }
  };

  const triggerAnalysis = async (textToAnalyze: string) => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: textToAnalyze,
          targetRole: user?.targetRole || "Software Engineer",
          apiKey: apiKey
        })
      });

      if (res.ok) {
        const data: ResumeAnalysisData = await res.json();
        setAnalysis(data);
        if (data.atsScore) {
          updateProfile({ resumeScore: data.atsScore });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyRewrite = (index: number) => {
    setAppliedRewrites((prev) => ({ ...prev, [index]: true }));
    // Boost ATS score slightly when applying recommendations
    setAnalysis((prev) => ({
      ...prev,
      atsScore: Math.min(98, prev.atsScore + 3),
      projectsScore: Math.min(100, prev.projectsScore + 4),
    }));
    updateProfile({ resumeScore: Math.min(98, (user?.resumeScore || 87) + 3) });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>ATS Resume Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Resume Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate your resume against ATS screening algorithms and apply quantified AI bullet rewrites.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => triggerAnalysis(resumeText)}
            isLoading={analyzing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Re-Analyze
          </Button>
          <Button
            variant="glow"
            size="sm"
            onClick={() => {
              setResumeText(SAMPLE_RESUME_TEXT);
              triggerAnalysis(SAMPLE_RESUME_TEXT);
            }}
            leftIcon={<Zap className="w-3.5 h-3.5" />}
          >
            Load Sample Resume
          </Button>
        </div>
      </div>

      {/* Upload Zone & Quick Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Drop Area */}
        <div className="lg:col-span-2 rounded-2xl bg-navy-900 border border-navy-800 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Upload Resume</h3>
            <span className="text-xs text-slate-400">PDF, DOCX, TXT supported</span>
          </div>

          <label className="border-2 border-dashed border-navy-750 hover:border-brand-500/60 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-navy-950/40 group">
            <div className="w-12 h-12 rounded-xl bg-brand-600/15 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              Drag & drop your resume file here, or <span className="text-brand-400 underline">browse</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports standard ATS single-column resumes up to 10MB
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {/* Active parsed file indicator */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-850/80 border border-navy-800">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">{fileName}</span>
            </div>
            <Badge variant="cyan" size="sm">
              Parsed & Analyzed
            </Badge>
          </div>
        </div>

        {/* ATS Score Overall Gauge Card */}
        <div className="rounded-2xl bg-gradient-to-b from-cyan-950/30 via-navy-900 to-navy-900 border border-cyan-500/30 p-6 shadow-card flex flex-col justify-between text-center">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Overall ATS Score
            </span>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative w-36 h-36 rounded-full border-8 border-navy-800 flex items-center justify-center bg-navy-950">
                <div
                  className="absolute inset-0 rounded-full border-8 border-cyan-400 border-t-transparent animate-[spin_6s_linear_infinite]"
                  style={{ transform: `rotate(${(analysis.atsScore / 100) * 360}deg)` }}
                />
                <div>
                  <span className="text-4xl font-extrabold text-white">{analysis.atsScore}</span>
                  <span className="text-xs text-slate-400 block">/ 100</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-400 font-medium mt-3">
              ✓ Ready for ATS job application screening
            </p>
          </div>

          <div className="pt-4 border-t border-navy-800/80 text-xs text-slate-400">
            Targeting: <strong className="text-white">{user?.targetRole || "Software Engineer"}</strong>
          </div>
        </div>
      </div>

      {/* Breakdown Scores Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Technical Skills", score: analysis.skillsScore, color: "brand" as const },
          { label: "Formatting", score: analysis.formattingScore, color: "cyan" as const },
          { label: "Experience", score: analysis.experienceScore, color: "emerald" as const },
          { label: "Projects", score: analysis.projectsScore, color: "amber" as const },
          { label: "Keyword Density", score: analysis.keywordsScore, color: "brand" as const },
        ].map((metric) => (
          <div key={metric.label} className="p-3.5 rounded-xl bg-navy-900 border border-navy-800">
            <span className="text-[11px] text-slate-400 block truncate">{metric.label}</span>
            <p className="text-lg font-bold text-white mt-0.5">{metric.score}/100</p>
            <Progress value={metric.score} variant={metric.color} size="sm" className="mt-2" />
          </div>
        ))}
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Resume Strengths</span>
            </CardTitle>
            <CardDescription>
              Elements working well that will pass automated ATS filters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {analysis.strengths.map((str, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>{str}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Recommended Improvements</span>
            </CardTitle>
            <CardDescription>
              Fix these areas to increase your recruiter callback conversion rate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {analysis.improvements.map((imp, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-bold mt-0.5">⚠</span>
                <span>{imp}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Rewrite Suggestions with "Apply Suggestion" */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span>AI Bullet Point Rewrites</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Transform passive duty descriptions into high-impact, quantified accomplishments.
          </p>
        </div>

        <div className="space-y-4">
          {analysis.bulletRewrites.map((rewrite, i) => {
            const isApplied = !!appliedRewrites[i];
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-brand-500/40 transition-all space-y-4 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="sm">
                    {rewrite.role}
                  </Badge>
                  {isApplied ? (
                    <Badge variant="emerald" size="sm" dot>
                      Applied to Resume (+3 Pts)
                    </Badge>
                  ) : (
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => handleApplyRewrite(i)}
                      leftIcon={<Check className="w-3.5 h-3.5" />}
                    >
                      Apply Suggestion
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="p-3.5 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                      Before (Passive)
                    </span>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      &ldquo;{rewrite.before}&rdquo;
                    </p>
                  </div>

                  {/* After */}
                  <div className="p-3.5 rounded-xl bg-brand-950/20 border border-brand-500/40 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                      After (Quantified & Impactful)
                    </span>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      &ldquo;{rewrite.after}&rdquo;
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  <strong>Why this works:</strong> {rewrite.impactReason}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
