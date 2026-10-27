"use client";

import React from "react";
import { getEducation } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Badge } from "@/components/ui/Badge";

export function EducationSection() {
  const educationList = getEducation();

  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="Academic Background"
          title="Education &amp;"
          highlightedWord="Foundations"
          subtitle="Verified academic qualifications in computer science, mathematical theory, digital electronics, and foundational sciences."
        />

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationList.map((edu) => (
            <Card
              key={edu.id}
              className="flex flex-col justify-between hover:border-purple-500/40"
            >
              <div>
                {/* Top Header with Icon and Aggregate Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 flex items-center justify-center shadow-sm">
                    <IconRenderer name="GraduationCap" className="w-5 h-5 text-purple-300" />
                  </div>

                  <Badge variant="purple" size="md">
                    <span className="font-bold text-white">{edu.aggregate}</span>
                    <span className="text-[10px] text-purple-300">Aggregate</span>
                  </Badge>
                </div>

                {/* Degree & Discipline */}
                <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                  {edu.degree}
                </h3>

                <p className="text-xs text-purple-400 font-medium mb-3">
                  {edu.institution}
                </p>

                {/* Year Pill */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4">
                  <IconRenderer name="Calendar" className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Completion Year: {edu.graduationYear}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                  {edu.description}
                </p>
              </div>

              {/* Coursework Tags */}
              {edu.coursework && (
                <div className="pt-4 border-t border-white/[0.06]">
                  <h4 className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    Key Academic Areas
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
