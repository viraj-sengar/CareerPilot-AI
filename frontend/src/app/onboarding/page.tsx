"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Loader2, 
  Target, 
  Briefcase, 
  Code, 
  Globe, 
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { TargetRole, ExperienceLevel, CareerGoalType } from "@/lib/types";

const ROLES: Array<{ title: TargetRole; desc: string }> = [
  { title: "Software Engineer", desc: "Core algorithms, systems, backend & full-stack development" },
  { title: "Frontend Developer", desc: "React, Next.js, responsive web UX, and modern JavaScript" },
  { title: "Backend Developer", desc: "APIs, microservices, databases, distributed caching" },
  { title: "Full Stack Developer", desc: "End-to-end web apps, database models, and cloud servers" },
  { title: "AI/ML Engineer", desc: "PyTorch, LLM agents, vector embeddings, ML pipelines" },
  { title: "Data Scientist", desc: "Data analysis, statistical modeling, SQL, Python" },
  { title: "Product Manager", desc: "Product discovery, user stories, roadmaps, analytics" },
  { title: "UI/UX Designer", desc: "Design systems, Figma, wireframes, user research" },
];

const EXPERIENCE_LEVELS: Array<{ level: ExperienceLevel; title: string; desc: string }> = [
  { level: "Beginner", title: "Beginner", desc: "0-1 years. Learning fundamental syntax and basic projects." },
  { level: "Intermediate", title: "Intermediate", desc: "1-2 years. Built web apps or completed college CS core courses." },
  { level: "Advanced", title: "Advanced", desc: "2+ years. Comfortable with data structures, architecture, and deployment." },
];

const GOALS: Array<{ goal: CareerGoalType; title: string; desc: string }> = [
  { goal: "Internship", title: "Summer / College Internship", desc: "Landing high-impact paid engineering internship (2025/2026)." },
  { goal: "Full-time job", title: "Full-Time Graduate Role", desc: "Transitioning to entry-level SWE / SDE-1 after graduation." },
  { goal: "Skill improvement", title: "Skill & Portfolio Elevation", desc: "Leveling up coding depth and building production projects." },
  { goal: "Career transition", title: "Career Switch to Tech", desc: "Pivoting from non-CS background into software engineering." },
];

const SKILL_OPTIONS = [
  "Java", "Python", "JavaScript", "TypeScript", "React", "Next.js", 
  "SQL", "PostgreSQL", "MongoDB", "Spring Boot", "Node.js", "Express",
  "Docker", "AWS", "Git", "System Design", "Data Structures", "Tailwind CSS"
];

const LOCATIONS = [
  "India (Bengaluru, Hyderabad, NCR)",
  "Remote / Global",
  "United States (San Francisco, NY, Seattle)",
  "Europe (London, Berlin, Amsterdam)",
  "Hybrid / Any location"
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile, loginDemoUser } = useApp();

  const [step, setStep] = useState(1);
  const [targetRole, setTargetRole] = useState<TargetRole>("Software Engineer");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Intermediate");
  const [careerGoal, setCareerGoal] = useState<CareerGoalType>("Internship");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Java", "SQL", "Git", "Data Structures", "React"
  ]);
  const [location, setLocation] = useState("India (Bengaluru, Hyderabad, NCR)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("Analyzing market demand for " + targetRole + "...");

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleFinish = () => {
    setIsGenerating(true);

    const steps = [
      `Analyzing hiring requirements for ${targetRole}...`,
      `Synthesizing ${selectedSkills.length} verified technical skills...`,
      `Pinpointing critical skill gaps against competitive applicant benchmarks...`,
      `Building personalized 4-phase Career Roadmap...`,
      `Finalizing your customized CareerPilot AI dashboard!`
    ];

    steps.forEach((text, index) => {
      setTimeout(() => {
        setGenerationStep(text);
      }, (index + 1) * 600);
    });

    setTimeout(() => {
      updateProfile({
        targetRole,
        experienceLevel,
        careerGoal,
        preferredLocation: location,
        readinessScore: 82,
        resumeScore: 87,
        skillMatchScore: 76,
      });
      router.push("/dashboard");
    }, 3400);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-center bg-grid-pattern relative">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        <div className="relative z-10 max-w-md w-full p-8 rounded-2xl bg-navy-900 border border-navy-800 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 p-0.5 mx-auto flex items-center justify-center shadow-glow animate-pulse">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Generating Your Career Plan</h2>
            <p className="text-xs text-brand-300 font-mono mt-2 min-h-[32px] flex items-center justify-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{generationStep}</span>
            </p>
          </div>

          <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
            <div className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full animate-[progress_3s_ease-in-out_infinite] w-full" />
          </div>

          <p className="text-[11px] text-slate-500">
            Tailoring milestones, gap analysis, and mock interviews for your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      <div className="max-w-3xl mx-auto">
        {/* Header with progress */}
        <div className="flex items-center justify-between pb-6 border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-navy-950 rounded-md flex items-center justify-center">
                <Compass className="w-4 h-4 text-brand-400" />
              </div>
            </div>
            <span className="font-bold text-sm text-white">CareerPilot AI Onboarding</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Step {step} of 5</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`w-4 h-1.5 rounded-full transition-colors ${
                    s <= step ? "bg-brand-500" : "bg-navy-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Wizard Card */}
        <div className="mt-8 p-6 sm:p-10 rounded-2xl bg-navy-900 border border-navy-800 shadow-2xl">
          {/* STEP 1: Target Role */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 1</span>
                <h2 className="text-2xl font-bold text-white mt-1">What role are you targeting?</h2>
                <p className="text-xs text-slate-400 mt-1">
                  We&apos;ll tailor your roadmap and interview questions specifically for this career track.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map((r) => {
                  const isSelected = targetRole === r.title;
                  return (
                    <div
                      key={r.title}
                      onClick={() => setTargetRole(r.title)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-brand-600/15 border-brand-500 text-white shadow-glow"
                          : "bg-navy-850/60 border-navy-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white">{r.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-brand-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{r.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Experience Level */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 2</span>
                <h2 className="text-2xl font-bold text-white mt-1">What is your current experience level?</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Helps calibrate the difficulty of recommended projects and interview questions.
                </p>
              </div>

              <div className="space-y-3">
                {EXPERIENCE_LEVELS.map((e) => {
                  const isSelected = experienceLevel === e.level;
                  return (
                    <div
                      key={e.level}
                      onClick={() => setExperienceLevel(e.level)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-brand-600/15 border-brand-500 text-white shadow-glow"
                          : "bg-navy-850/60 border-navy-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm text-white">{e.title}</span>
                        <p className="text-xs text-slate-400 mt-0.5">{e.desc}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-brand-400" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Career Goal */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 3</span>
                <h2 className="text-2xl font-bold text-white mt-1">What is your immediate career goal?</h2>
                <p className="text-xs text-slate-400 mt-1">
                  We&apos;ll configure your timeline and application targets accordingly.
                </p>
              </div>

              <div className="space-y-3">
                {GOALS.map((g) => {
                  const isSelected = careerGoal === g.goal;
                  return (
                    <div
                      key={g.goal}
                      onClick={() => setCareerGoal(g.goal)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-brand-600/15 border-brand-500 text-white shadow-glow"
                          : "bg-navy-850/60 border-navy-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm text-white">{g.title}</span>
                        <p className="text-xs text-slate-400 mt-0.5">{g.desc}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-brand-400" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Skills Selection */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 4</span>
                <h2 className="text-2xl font-bold text-white mt-1">Select your technology skills</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Choose the languages, frameworks, and tools you have experience with.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-brand-600 text-white shadow-glow border border-brand-400"
                          : "bg-navy-850 text-slate-300 border border-navy-750 hover:border-slate-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400">
                Selected {selectedSkills.length} skills. You can always update or expand these later in Settings.
              </p>
            </div>
          )}

          {/* STEP 5: Location */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step 5</span>
                <h2 className="text-2xl font-bold text-white mt-1">Preferred job location</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Where are you looking to work or intern?
                </p>
              </div>

              <div className="space-y-3">
                {LOCATIONS.map((loc) => {
                  const isSelected = location === loc;
                  return (
                    <div
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-brand-600/15 border-brand-500 text-white shadow-glow"
                          : "bg-navy-850/60 border-navy-800 text-slate-300 hover:border-slate-700 hover:bg-navy-850"
                      }`}
                    >
                      <span className="font-semibold text-xs sm:text-sm text-white">{loc}</span>
                      {isSelected && <Check className="w-4 h-4 text-brand-400" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-navy-800 flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setStep(step - 1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(step + 1)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="glow"
                size="md"
                onClick={handleFinish}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate My Career Plan
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
