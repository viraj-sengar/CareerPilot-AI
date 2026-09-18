"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Sparkles, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginDemoUser } = useApp();
  const [email, setEmail] = useState("alex.sharma@stanford.edu");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoLogin = () => {
    loginDemoUser();
    router.push("/dashboard");
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
          Welcome back
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Sign in to your career command center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-navy-900 border border-navy-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          {/* Quick Demo Button */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-900/40 to-indigo-900/30 border border-brand-500/40 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-300">
              <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
              <span>Instant Interviewer / Demo Access</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Explore the entire platform pre-loaded with Alex Sharma&apos;s complete career profile.
            </p>
            <Button
              type="button"
              variant="glow"
              size="sm"
              className="w-full justify-center mt-2"
              onClick={handleDemoLogin}
            >
              1-Click Demo Login
            </Button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-navy-800" />
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Or continue with email</span>
            <div className="flex-grow border-t border-navy-800" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-brand-400 hover:text-brand-300"
                >
                  Forgot password?
                </Link>
              </div>
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
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              className="w-full justify-center"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-brand-400 hover:text-brand-300">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
