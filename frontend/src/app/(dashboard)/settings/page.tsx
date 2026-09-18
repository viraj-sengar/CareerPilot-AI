"use client";

import React, { useState } from "react";
import { 
  Settings, 
  User, 
  Key, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Download, 
  RotateCcw, 
  Check, 
  Sparkles,
  Save,
  CheckCircle2
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function SettingsPage() {
  const { user, updateProfile, theme, toggleTheme, apiKey, setApiKey, loginDemoUser } = useApp();

  const [activeTab, setActiveTab] = useState<"account" | "career" | "ai" | "appearance" | "data">("career");
  const [name, setName] = useState(user?.name || "Alex Sharma");
  const [email, setEmail] = useState(user?.email || "alex.sharma@stanford.edu");
  const [bio, setBio] = useState(user?.bio || "");
  const [targetRole, setTargetRole] = useState(user?.targetRole || "Software Engineer");
  const [preferredLocation, setPreferredLocation] = useState(user?.preferredLocation || "Remote / India / US");
  const [keyInput, setKeyInput] = useState(apiKey || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      bio,
      targetRole,
      preferredLocation,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveApiKey = () => {
    setApiKey(keyInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      user,
      exportedAt: new Date().toISOString(),
      platform: "CareerPilot AI",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "careerpilot_profile_export.json";
    a.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Settings & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize your career targets, AI provider keys, appearance, and exported data.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-navy-800 pb-3 overflow-x-auto text-xs font-medium">
        {[
          { id: "career", label: "Career Preferences" },
          { id: "account", label: "Account Profile" },
          { id: "ai", label: "AI Engine & Keys" },
          { id: "appearance", label: "Appearance" },
          { id: "data", label: "Data Controls" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg transition-colors shrink-0 ${
              activeTab === tab.id
                ? "bg-brand-600/20 text-brand-300 border border-brand-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-navy-850"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Career Preferences */}
      {activeTab === "career" && (
        <Card>
          <CardHeader>
            <CardTitle>Career Goals & Targets</CardTitle>
            <CardDescription>
              Adjusting your target role automatically recalibrates your skill gaps, roadmap milestones, and job matches.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Engineering Track
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="AI/ML Engineer">AI/ML Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Job Locations
                </label>
                <input
                  type="text"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Professional Headline / Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-750 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <Button type="submit" variant="glow" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                Save Preferences
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Account Profile */}
      {activeTab === "account" && (
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Update your personal information and contact email.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <Button type="submit" variant="glow" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: AI Preferences & API Keys */}
      {activeTab === "ai" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>AI Provider & Live Gemini Configuration</span>
            </CardTitle>
            <CardDescription>
              CareerPilot AI includes a built-in high-fidelity AI engine that works completely offline. You can also connect your Google Gemini API Key for live AI responses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 max-w-xl">
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Active Engine Status</span>
                <Badge variant={apiKey ? "emerald" : "cyan"} size="sm" dot>
                  {apiKey ? "Google Gemini 1.5 Live" : "High-Fidelity Built-in AI"}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {apiKey
                  ? "Your Google Gemini API key is configured. The platform uses Gemini 1.5 Flash for live resume critiques, skill gap analysis, and mock interviews."
                  : "Using the built-in deterministic career intelligence engine. Works out of the box with zero external dependencies."}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                Google Gemini API Key (Optional)
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-brand-500"
              />
              <p className="text-[11px] text-slate-500">
                Keys are stored only in your browser session/localStorage and never exposed publicly.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="glow" size="sm" onClick={handleSaveApiKey}>
                Save API Key
              </Button>
              {apiKey && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setKeyInput("");
                    setApiKey("");
                    setSavedSuccess(true);
                  }}
                >
                  Clear Key (Revert to Built-in AI)
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Appearance */}
      {activeTab === "appearance" && (
        <Card>
          <CardHeader>
            <CardTitle>Appearance & Theme</CardTitle>
            <CardDescription>Select your preferred visual mode for the CareerPilot AI workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                onClick={() => theme === "light" && toggleTheme()}
                className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 ${
                  theme === "dark" ? "bg-brand-600/15 border-brand-500 text-white" : "bg-navy-950 border-navy-800 text-slate-400"
                }`}
              >
                <Moon className="w-5 h-5 text-brand-400" />
                <div>
                  <p className="text-xs font-bold text-white">Dark SaaS (Default)</p>
                  <p className="text-[11px] text-slate-400">Deep navy with vibrant accents</p>
                </div>
              </div>

              <div
                onClick={() => theme === "dark" && toggleTheme()}
                className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 ${
                  theme === "light" ? "bg-brand-600/15 border-brand-500 text-white" : "bg-navy-950 border-navy-800 text-slate-400"
                }`}
              >
                <Sun className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">Light Mode</p>
                  <p className="text-[11px] text-slate-400">Clean white & high-contrast slate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 5: Data Controls */}
      {activeTab === "data" && (
        <Card>
          <CardHeader>
            <CardTitle>Data Management & Reset</CardTitle>
            <CardDescription>Export your candidate telemetry or reload original sample data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-xl">
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
              <h4 className="text-xs font-bold text-white">Export Career Profile</h4>
              <p className="text-xs text-slate-400">
                Download your complete profile, applications, and roadmap as a portable JSON document.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export JSON Data
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-bold text-rose-300">Reset Demo Data</h4>
              <p className="text-xs text-slate-400">
                Restore Alex Sharma&apos;s default state (18 applications, 82% readiness, 87 resume score).
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  loginDemoUser();
                  window.location.reload();
                }}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset to Default Demo State
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
