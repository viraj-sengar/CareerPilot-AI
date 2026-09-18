"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-grid-pattern relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">CareerPilot AI</span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Reset your password
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          We&apos;ll send recovery instructions to your email address
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-navy-900 border border-navy-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Check your email</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If an account exists for <span className="text-slate-200 font-medium">{email}</span>, you will receive password reset instructions shortly.
              </p>
              <Link href="/login" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" variant="primary" size="md" className="w-full justify-center">
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
