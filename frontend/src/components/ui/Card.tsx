import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: "brand" | "cyan" | "emerald" | "none";
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  hover = false,
  glow = "none",
  className = "",
  children,
  ...props
}) => {
  const glowStyles = {
    none: "",
    brand: "hover:shadow-glow hover:border-brand-500/40",
    cyan: "hover:shadow-glow-cyan hover:border-cyan-500/40",
    emerald: "hover:shadow-glow-emerald hover:border-emerald-500/40",
  }[glow];

  const hoverStyles = hover
    ? "transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-850 cursor-pointer"
    : "";

  return (
    <div
      className={`rounded-xl border border-navy-800 bg-navy-900/90 text-slate-100 shadow-card backdrop-blur-sm ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => <div className={`p-5 pb-3 ${className}`}>{children}</div>;

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => (
  <h3 className={`text-base font-semibold text-white tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => (
  <p className={`text-xs text-slate-400 mt-1 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => <div className={`p-5 pt-2 ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => (
  <div className={`p-5 pt-0 flex items-center justify-between border-t border-navy-800/80 mt-2 ${className}`}>
    {children}
  </div>
);
