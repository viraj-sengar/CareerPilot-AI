"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ArrowUpRight, 
  HelpCircle,
  RotateCcw
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChatMessage } from "@/lib/types";
import Link from "next/link";

const QUICK_PROMPTS = [
  "What skills should I learn next for backend development?",
  "Analyze my resume for enterprise keywords",
  "What projects should I build to bridge my Spring Boot gap?",
  "Am I ready for Stripe's Software Engineer intern role?",
  "Prepare me for an Amazon technical interview",
  "Create a 30-Day Plan for Spring Boot & REST APIs"
];

export default function AssistantPage() {
  const { user, apiKey } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content: `### 👋 Welcome to your AI Career Command Center!

I am your dedicated career mentor, specialized in software engineering roadmaps, technical interviews, resume optimization, and skill gap elimination.

Here are a few high-impact topics we can explore right now:
* 🎯 **Skill Priorities**: Identify your highest-leverage learning milestones.
* 📄 **Resume Critique**: Enhance project bullet points with quantified results.
* 🎙️ **Interview Tactics**: Prepare for technical coding and behavioral frameworks.
* 🚀 **Project Architecting**: Plan end-to-end full stack and backend applications.

How can I help you take the next step today?`,
      timestamp: "Just now",
      suggestedPrompts: QUICK_PROMPTS.slice(0, 4)
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (promptToSend?: string) => {
    const text = promptToSend || input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: text,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          userProfile: user,
          apiKey: apiKey
        })
      });

      if (res.ok) {
        const data: ChatMessage = await res.json();
        setMessages((prev) => [...prev, data]);
      } else {
        throw new Error("Failed to get assistant response");
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content: "I encountered an error processing your query. Please retry or ask another question!",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-2xl bg-navy-900 border border-navy-800 shadow-card overflow-hidden animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 border-b border-navy-800 flex items-center justify-between bg-navy-950/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-glow">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              CareerPilot AI Assistant
              <Badge variant="brand" size="sm">
                Pro
              </Badge>
            </h1>
            <p className="text-xs text-slate-400">
              Personalized for {user?.name || "Alex"} · {user?.targetRole || "Software Engineer"}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessages([messages[0]])}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Chat
        </Button>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isAssistant = msg.role === "assistant";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 max-w-3xl ${
                isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-1 ${
                  isAssistant
                    ? "bg-brand-600/20 border border-brand-500/30 text-brand-400"
                    : "bg-cyan-600/20 border border-cyan-500/30 text-cyan-400"
                }`}
              >
                {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              <div className="space-y-2 max-w-[90%]">
                <div
                  className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isAssistant
                      ? "bg-navy-850/90 border-navy-750 text-slate-200"
                      : "bg-brand-600 border-brand-500 text-white"
                  }`}
                >
                  <div className="whitespace-pre-line space-y-2">{msg.content}</div>

                  {/* Recommendation action cards */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-navy-750 space-y-2.5">
                      {msg.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-navy-900 border border-navy-700/90 hover:border-brand-500 transition-colors flex items-center justify-between gap-4"
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold text-brand-400">
                              {rec.badge}
                            </span>
                            <h4 className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                              {rec.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">{rec.description}</p>
                          </div>
                          {rec.actionTarget && (
                            <Link href={rec.actionTarget}>
                              <Button variant="outline" size="sm" className="shrink-0 text-xs">
                                {rec.actionLabel || "Open"}
                                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 block px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-navy-850/60 border border-navy-750 w-fit text-xs text-brand-300">
            <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
            <span>Analyzing your career profile and drafting recommendation...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3.5 border-t border-navy-800 bg-navy-950/60">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-brand-400" />
          <span>Suggested prompts:</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-full bg-navy-850 hover:bg-brand-600/20 text-slate-300 hover:text-brand-300 border border-navy-750 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-navy-800 bg-navy-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask CareerPilot AI anything about your skills, resume, or interviews..."
            className="flex-1 bg-navy-900 border border-navy-750 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
          <Button
            type="submit"
            variant="glow"
            size="md"
            disabled={!input.trim() || loading}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
