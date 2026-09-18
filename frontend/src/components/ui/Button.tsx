import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
  }[size];

  const variantStyles = {
    primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-sm hover:shadow-glow focus:ring-brand-500 border border-brand-500/30",
    glow: "bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 text-white shadow-glow hover:shadow-glow-cyan hover:brightness-110 border border-brand-400/30",
    secondary: "bg-navy-800 hover:bg-navy-700 text-slate-100 border border-navy-700/80 focus:ring-navy-600",
    outline: "bg-transparent hover:bg-navy-850 text-slate-200 border border-slate-750 hover:border-slate-600 focus:ring-brand-500",
    ghost: "bg-transparent hover:bg-navy-800/60 text-slate-300 hover:text-white focus:ring-brand-500",
    danger: "bg-rose-600/90 hover:bg-rose-500 text-white focus:ring-rose-500 border border-rose-500/30",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
