import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "cyan" | "emerald" | "amber" | "rose" | "neutral" | "outline";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "brand",
  size = "md",
  className = "",
  dot = false,
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-medium",
  }[size];

  const variantStyles = {
    brand: "bg-brand-500/10 text-brand-300 border border-brand-500/25",
    cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/25",
    emerald: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25",
    amber: "bg-amber-500/10 text-amber-300 border border-amber-500/25",
    rose: "bg-rose-500/10 text-rose-300 border border-rose-500/25",
    neutral: "bg-slate-800/80 text-slate-300 border border-slate-700/60",
    outline: "bg-transparent text-slate-300 border border-slate-700",
  }[variant];

  const dotColor = {
    brand: "bg-brand-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    neutral: "bg-slate-400",
    outline: "bg-slate-400",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-sm transition-colors ${sizeStyles} ${variantStyles} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />}
      {children}
    </span>
  );
};
