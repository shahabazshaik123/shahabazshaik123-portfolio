"use client";

import React from "react";
import { getExperience } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Badge } from "@/components/ui/Badge";

export function ExperienceSection() {
  const experiences = getExperience();

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="Career Journey"
          title="Professional"
          highlightedWord="Experience"
          subtitle="Engineering milestones, application architectures, and hands-on system development across roles."
        />

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Connecting Line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-500/60 via-indigo-500/40 to-transparent" />

          {/* Timeline Entries */}
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-12 sm:pl-20 group"
              >
                {/* Glowing Circular Node Marker */}
                <div className="absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 border-2 border-[#08090F] shadow-[0_0_12px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform" />

                {/* Experience Card */}
                <Card className="hover:border-purple-500/40 p-6 sm:p-7">
                  {/* Top Bar: Role Title & Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-400 mt-0.5">
                        <span className="font-medium text-purple-300">
                          {exp.company}
                        </span>
                        <span>&bull;</span>
                        <span>{exp.employmentType}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-neutral-400">
                          <IconRenderer name="MapPin" className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="self-start sm:self-auto">
                      <Badge variant="purple" size="sm">
                        <IconRenderer name="Calendar" className="w-3 h-3 text-purple-300" />
                        <span>
                          {exp.startDate} &mdash; {exp.endDate}
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Responsibilities Checklist */}
                  <div className="mb-5">
                    <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2">
                      Key Responsibilities &amp; Focus
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-400">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-400 text-sm leading-none mt-0.5">&#8227;</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
