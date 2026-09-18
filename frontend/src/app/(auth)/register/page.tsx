"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Sparkles, ArrowRight, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, name);
      router.push("/onboarding");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-grid-pattern relative">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">CareerPilot AI</span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Create your career profile
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Build skills, optimize your resume, and track applications
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-navy-900 border border-navy-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-5">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-navy-950 border border-navy-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  placeholder="Alex Sharma"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-navy-950 border border-navy-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  placeholder="you@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-navy-950 border border-navy-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={loading}
              className="w-full justify-center mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Career Onboarding
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-400 hover:text-brand-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
