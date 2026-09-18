import React from "react";

interface ProgressProps {
  value: number; // 0 to 100
  variant?: "brand" | "cyan" | "emerald" | "amber" | "gradient";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = "gradient",
  size = "md",
  showLabel = false,
  className = "",
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  }[size];

  const variantStyles = {
    brand: "bg-brand-500",
    cyan: "bg-cyan-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    gradient: "bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400",
  }[variant];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-slate-200">{clampedValue}%</span>
        </div>
      )}
      <div className={`w-full bg-navy-950/80 rounded-full overflow-hidden border border-navy-800 ${sizeStyles}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantStyles}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
