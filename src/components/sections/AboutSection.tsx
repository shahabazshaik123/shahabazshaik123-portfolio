"use client";

import React from "react";
import { getProfile } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconRenderer } from "@/components/ui/IconRenderer";

export function AboutSection() {
  const profile = getProfile();

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="About Me"
          title="Passion for Building"
          highlightedWord="Modern Systems"
          subtitle="Engineering AI-enabled software solutions, high-performance backends, and responsive user experiences."
        />

        {/* Narrative & Verified Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Professional Summary */}
          <div className="lg:col-span-7 space-y-5 text-neutral-300 leading-relaxed text-base sm:text-lg">
            {profile.introduction.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-3">
                Core Engineering Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{interest}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Verified Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {profile.stats.map((stat) => (
              <Card
                key={stat.label}
                hoverEffect={true}
                className="p-5 text-center flex flex-col justify-center items-center h-full border-purple-500/10 hover:border-purple-500/30"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-white gradient-text-purple mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-neutral-200 font-medium">
                  {stat.label}
                </span>
                {stat.subtext && (
                  <span className="text-[11px] text-neutral-400 mt-1">
                    {stat.subtext}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 4 Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-4 shadow-sm">
                  <IconRenderer name={pillar.icon} className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                {pillar.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
