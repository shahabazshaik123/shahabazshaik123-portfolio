import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  glow = false,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-[#0D101A]/80 border border-white/[0.08] backdrop-blur-xl p-6",
        hoverEffect &&
          "transition-all duration-300 hover:border-purple-500/30 hover:bg-[#121626]/90 hover:shadow-[0_12px_30px_-10px_rgba(168,85,247,0.14)]",
        glow && "border-purple-500/20 shadow-[0_0_24px_rgba(168,85,247,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
