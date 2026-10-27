"use client";

import React, { useState } from "react";
import { getSkillCategories } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Badge } from "@/components/ui/Badge";

export function SkillsSection() {
  const categories = getSkillCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Skills", icon: "Layers" },
    ...categories.map((c) => ({ id: c.id, label: c.title, icon: c.icon })),
  ];

  const displayedCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((c) => c.id === selectedCategory);

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Core":
      case "Advanced":
        return "purple";
      case "Proficient":
        return "emerald";
      case "Practical":
        return "amber";
      default:
        return "neutral";
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="Technical Skills"
          title="Tools &amp; Technologies"
          highlightedWord="I Work With"
          subtitle="A comprehensive, honest toolkit across backend, client, database systems, AI integration, and developer workflows."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-purple-600/25 border-purple-500/50 text-white shadow-md shadow-purple-900/30"
                    : "bg-[#0D101A]/70 border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                <IconRenderer name={tab.icon} className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => (
            <Card
              key={category.id}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Header of Category Card */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.06]">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 flex items-center justify-center shadow-sm">
                    <IconRenderer name={category.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {category.skills.length} Technologies
                    </p>
                  </div>
                </div>

                {/* Category Description */}
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills Badges List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/30 hover:bg-purple-950/20 transition-all text-xs text-neutral-300"
                    >
                      <IconRenderer
                        name={skill.icon}
                        className="w-3.5 h-3.5 text-purple-400/80 group-hover:text-purple-300"
                      />
                      <span>{skill.name}</span>
                      <Badge
                        variant={getLevelBadgeVariant(skill.level)}
                        size="sm"
                        className="text-[10px] py-0 px-1.5 group-hover:text-purple-200"
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
