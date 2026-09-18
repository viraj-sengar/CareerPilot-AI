"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  Send, 
  Loader2, 
  ArrowUpRight, 
  Bot, 
  User, 
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ChatMessage } from "@/lib/types";
import Link from "next/link";

const QUICK_PROMPTS = [
  "What skills should I learn next?",
  "Analyze my resume and find gaps",
  "What projects should I build?",
  "Am I ready for backend roles?",
  "Create a 30-Day Plan",
];

export const AiQuickDrawer: React.FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, user, apiKey } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `### 👋 Hi ${user?.name?.split(" ")[0] || "there"}! I'm your CareerPilot AI Advisor.

I've analyzed your profile targeting **${user?.targetRole || "Software Engineer"}**. 

* **Career Readiness**: ${user?.readinessScore || 82}%
* **Top Opportunity**: Spring Boot & REST APIs
* **Recommended Focus**: Complete your backend project and practice technical interview problems.

How can I help you accelerate your job readiness today?`,
      timestamp: "Just now",
      suggestedPrompts: QUICK_PROMPTS
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

  const sendMessage = async (contentToSend?: string) => {
    const text = contentToSend || input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: "msg-user-" + Date.now(),
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

      if (!res.ok) throw new Error("Failed to get AI response");

      const data: ChatMessage = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content: "I ran into a temporary hiccup processing that request. Please try again or ask another question!",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAiDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div
        className="fixed inset-0 bg-navy-950/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAiDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-navy-900 border-l border-navy-750 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 border-b border-navy-800 flex items-center justify-between bg-navy-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-navy-950 rounded-md flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  AI Career Advisor
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-medium">
                    24/7
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">Context: {user?.targetRole || "Software Engineer"}</p>
              </div>
            </div>
            <button
              onClick={() => setIsAiDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    isAssistant ? "items-start" : "items-start flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${
                      isAssistant
                        ? "bg-brand-600/20 border border-brand-500/30 text-brand-400"
                        : "bg-cyan-600/20 border border-cyan-500/30 text-cyan-400"
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`space-y-2 max-w-[85%]`}>
                    <div
                      className={`p-3.5 rounded-xl border ${
                        isAssistant
                          ? "bg-navy-850/90 border-navy-750 text-slate-200"
                          : "bg-brand-600 border-brand-500 text-white"
                      }`}
                    >
                      {/* Markdown-like simple rendering */}
                      <div className="whitespace-pre-line space-y-1.5 font-normal">
                        {msg.content}
                      </div>

                      {/* Action Recommendation Cards */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-navy-750 space-y-2">
                          {msg.recommendations.map((rec, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-lg bg-navy-900 border border-navy-700/80 hover:border-brand-500/50 transition-all"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] uppercase font-semibold text-brand-400">
                                  {rec.badge}
                                </span>
                                {rec.actionTarget && (
                                  <Link
                                    href={rec.actionTarget}
                                    onClick={() => setIsAiDrawerOpen(false)}
                                    className="text-[11px] font-semibold text-brand-300 hover:text-white flex items-center gap-0.5"
                                  >
                                    <span>{rec.actionLabel || "Open"}</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </Link>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-white mt-0.5">{rec.title}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{rec.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-brand-300 bg-navy-850/80 p-3 rounded-xl border border-navy-750 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                <span>Thinking and analyzing your career profile...</span>
              </div>
            )}
          </div>

          {/* Suggested Quick Prompts */}
          <div className="p-3 border-t border-navy-800/80 bg-navy-950/40">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-brand-400" />
              <span>Suggested questions:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  disabled={loading}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-navy-800 hover:bg-brand-600/20 text-slate-300 hover:text-brand-300 border border-navy-700 hover:border-brand-500/40 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-navy-800 bg-navy-950/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Career AI anything..."
                className="flex-1 bg-navy-900 border border-navy-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
