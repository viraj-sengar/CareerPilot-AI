"use client";

import React, { useState, useEffect } from "react";
import { 
  Mic, 
  Clock, 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  HelpCircle, 
  ArrowRight,
  BookOpen,
  Volume2,
  Loader2
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { DEMO_INTERVIEW_QUESTIONS } from "@/lib/demo-data";
import { InterviewFeedback, InterviewQuestion } from "@/lib/types";

export default function MockInterviewPage() {
  const { user, apiKey } = useApp();

  const [category, setCategory] = useState<"Technical" | "Behavioral" | "HR" | "System Design">("Technical");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);

  // Filter questions by selected category
  const filteredQuestions = DEMO_INTERVIEW_QUESTIONS.filter((q) => q.category === category);
  const currentQuestion: InterviewQuestion = filteredQuestions[currentQuestionIndex] || DEMO_INTERVIEW_QUESTIONS[0];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive && !feedback) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, feedback]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsSessionActive(true);
    setFeedback(null);
    setUserAnswer("");
    setSeconds(0);
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          answer: userAnswer,
          category,
          difficulty,
          role: user?.targetRole || "Software Engineer",
          apiKey: apiKey
        })
      });

      if (res.ok) {
        const data: InterviewFeedback = await res.json();
        setFeedback(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    setFeedback(null);
    setUserAnswer("");
    setSeconds(0);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interview Preparation Coach
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate realistic technical and behavioral rounds with instant AI performance scoring.
          </p>
        </div>

        {/* Configuration Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as any);
              setCurrentQuestionIndex(0);
              setFeedback(null);
            }}
            className="bg-navy-900 border border-navy-750 text-xs text-white rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="Technical">Technical (Data Structures & Backend)</option>
            <option value="System Design">System Design & Architecture</option>
            <option value="Behavioral">Behavioral (STAR Method)</option>
            <option value="HR">HR & Cultural Fit</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="bg-navy-900 border border-navy-750 text-xs text-white rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {!isSessionActive ? (
        /* Pre-interview start banner */
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-brand-950/50 via-navy-900 to-navy-900 border border-brand-500/30 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 mx-auto flex items-center justify-center shadow-glow">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <Mic className="w-8 h-8 text-brand-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="brand">Ready to Practice</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {category} Interview Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              You will be presented with a realistic interview question calibrated at <strong>{difficulty}</strong> difficulty. Answer as you would in front of a hiring committee.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-left text-xs">
            <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Format</span>
              <p className="text-white font-medium mt-0.5">Timed Session</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Evaluation</span>
              <p className="text-cyan-400 font-medium mt-0.5">Instant AI</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Target</span>
              <p className="text-emerald-400 font-medium mt-0.5">SWE Roles</p>
            </div>
          </div>

          <Button
            variant="glow"
            size="lg"
            onClick={handleStart}
            leftIcon={<Play className="w-5 h-5 fill-current" />}
            className="px-8"
          >
            Start Interview Question
          </Button>
        </div>
      ) : (
        /* Active Interview Question Workspace */
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 shadow-card space-y-6">
            {/* Top Row: Question Index & Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="md">
                  Question 0{currentQuestionIndex + 1}
                </Badge>
                <Badge variant="neutral" size="md">
                  {currentQuestion.category}
                </Badge>
                <Badge variant="amber" size="md">
                  {difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950 border border-navy-800 text-xs font-mono font-bold text-white">
                <Clock className="w-4 h-4 text-brand-400 animate-pulse" />
                <span>{formatTimer(seconds)}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
              {currentQuestion.context && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  💡 <strong>Interviewer Context:</strong> {currentQuestion.context}
                </p>
              )}
            </div>

            {/* Answer Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Your Answer</span>
                <span className="text-[11px] text-slate-500">
                  {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0} words
                </span>
              </div>

              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your response here. Structure your answer with core principles, workflow, edge cases, and computational trade-offs..."
                className="w-full bg-navy-950 border border-navy-750 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 leading-relaxed font-sans"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUserAnswer(currentQuestion.sampleAnswer || "")}
                >
                  Load Sample Answer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextQuestion}
                >
                  Skip Question
                </Button>
              </div>

              <Button
                variant="glow"
                size="md"
                onClick={handleSubmit}
                isLoading={isEvaluating}
                disabled={!userAnswer.trim()}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Submit for AI Evaluation
              </Button>
            </div>
          </div>

          {/* AI Feedback Results Screen */}
          {feedback && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              {/* Score Dials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-navy-900 border border-brand-500/30 text-center">
                  <span className="text-xs text-slate-400">Technical Accuracy</span>
                  <p className="text-2xl font-bold text-white mt-1">{feedback.technicalAccuracy}%</p>
                  <Progress value={feedback.technicalAccuracy} variant="brand" size="sm" className="mt-2" />
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-cyan-500/30 text-center">
                  <span className="text-xs text-slate-400">Communication</span>
                  <p className="text-2xl font-bold text-cyan-400 mt-1">{feedback.communication}%</p>
                  <Progress value={feedback.communication} variant="cyan" size="sm" className="mt-2" />
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-indigo-500/30 text-center">
                  <span className="text-xs text-slate-400">Structure (STAR)</span>
                  <p className="text-2xl font-bold text-indigo-300 mt-1">{feedback.structure}%</p>
                  <Progress value={feedback.structure} variant="gradient" size="sm" className="mt-2" />
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-emerald-500/30 text-center">
                  <span className="text-xs text-slate-400">Overall Score</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{feedback.overall}%</p>
                  <Progress value={feedback.overall} variant="emerald" size="sm" className="mt-2" />
                </div>
              </div>

              {/* Strengths & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Strengths in Your Answer</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {feedback.strengths.map((str, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Constructive Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {feedback.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Model Answer Callout */}
              <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-300 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-brand-400" />
                  <span>Ideal Model Response</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {feedback.modelAnswer || currentQuestion.sampleAnswer}
                </p>
              </div>

              {/* Next Question Control */}
              <div className="flex justify-end">
                <Button
                  variant="glow"
                  size="md"
                  onClick={handleNextQuestion}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Next Interview Question
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
