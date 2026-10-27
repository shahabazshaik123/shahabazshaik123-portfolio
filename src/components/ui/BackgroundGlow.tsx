import React from "react";

export function BackgroundGlow() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none"
      aria-hidden="true"
    >
      {/* Top purple ambient glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] will-change-transform" />

      {/* Center-left indigo ambient glow */}
      <div className="absolute top-[35%] left-[-150px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] will-change-transform" />

      {/* Bottom-right violet ambient glow */}
      <div className="absolute bottom-[10%] right-[-100px] w-[550px] h-[550px] bg-purple-800/12 rounded-full blur-[150px] will-change-transform" />

      {/* Subtle blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
