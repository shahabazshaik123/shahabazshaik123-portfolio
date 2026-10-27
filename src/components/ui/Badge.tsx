import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "purple" | "emerald" | "amber" | "neutral" | "cyan";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-white/[0.04] border-white/10 text-neutral-300",
    purple:
      "bg-purple-950/40 border-purple-500/30 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.12)]",
    emerald:
      "bg-emerald-950/40 border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.12)]",
    amber:
      "bg-amber-950/40 border-amber-500/30 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.12)]",
    neutral: "bg-neutral-900/60 border-neutral-700/50 text-neutral-400",
    cyan: "bg-cyan-950/40 border-cyan-500/30 text-cyan-300",
  };

  const sizeStyles = {
    sm: "text-[10px] sm:text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-xs sm:text-sm px-3 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium backdrop-blur-sm transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
