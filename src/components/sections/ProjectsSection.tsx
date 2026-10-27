"use client";

import React, { useState, useEffect } from "react";
import { getProjects } from "@/lib/data";
import { Project } from "@/types/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProjectsSection() {
  const projects = getProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Mobile Applications",
    "Full-Stack Applications",
    "AI Applications",
    "Data Engineering",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      }
    };

    if (activeModalProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalProject]);

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Active Architecture":
        return { variant: "emerald" as const, dot: true };
      case "Production Workflow":
        return { variant: "cyan" as const, dot: true };
      case "Concept / Prototype":
        return { variant: "purple" as const, dot: false };
      case "Pipeline Template":
        return { variant: "amber" as const, dot: false };
      default:
        return { variant: "default" as const, dot: false };
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="Featured Work"
          title="Engineered Projects &amp;"
          highlightedWord="Systems"
          subtitle="Explore recruitment platforms, full-stack applications, semantic search prototypes, and data pipelines built with modern engineering standards."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-purple-600/25 border-purple-500/50 text-white shadow-sm shadow-purple-900/30"
                    : "bg-[#0D101A]/70 border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-[#0D101A]/50 border border-white/[0.08] max-w-md mx-auto">
            <IconRenderer name="Info" className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <p className="text-white font-medium mb-1">No projects in this category</p>
            <p className="text-xs text-neutral-400">
              Select &quot;All&quot; to view all portfolio projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project) => {
              const statusInfo = getStatusBadge(project.status);

              return (
                <Card
                  key={project.id}
                  className="p-0 overflow-hidden flex flex-col justify-between group hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20 transition-all duration-300"
                >
                  {/* Visual Header Banner */}
                  <div className="relative h-44 sm:h-48 bg-gradient-to-br from-[#121422] via-[#16182c] to-[#0c0d16] flex items-center justify-center border-b border-white/[0.06] overflow-hidden">
                    {/* Background Grid Pattern inside Banner */}
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />

                    {/* Ambient Radial Hover Light */}
                    <div className="absolute w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    {/* Center Icon Graphic */}
                    <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#1b1e33]/90 border border-purple-500/30 text-purple-300 flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300">
                        <IconRenderer name={project.icon} className="w-7 h-7 text-purple-300" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-purple-300/90 font-medium">
                        {project.categoryBadge}
                      </span>
                    </div>

                    {/* Status Badge in Top Left */}
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant={statusInfo.variant} size="sm">
                        {statusInfo.dot && (
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        )}
                        <span>{project.status}</span>
                      </Badge>
                    </div>

                    {/* Featured Tag in Top Right */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge variant="purple" size="sm">
                          <IconRenderer name="Sparkles" className="w-3 h-3 text-purple-300" />
                          <span>Featured</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                        {project.summary}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.08]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/10 hover:border-purple-500/30 backdrop-blur-md px-3.5 py-2.5 gap-2 flex-1 text-xs sm:text-sm"
                      >
                        <IconRenderer name="Info" className="w-4 h-4 text-purple-400" />
                        <span>View Details</span>
                      </button>

                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white border border-white/15 px-3 py-2.5 text-xs sm:text-sm"
                          aria-label="GitHub Repository"
                        >
                          <IconRenderer name="Github" className="w-4 h-4" />
                        </a>
                      ) : null}

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-900/25 px-4 py-2.5 gap-1.5 text-xs sm:text-sm"
                        >
                          <span>Live Demo</span>
                          <IconRenderer name="ExternalLink" className="w-3.5 h-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Details Modal Dialog */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D101A] border border-white/15 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Close modal dialog"
            >
              <IconRenderer name="X" className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="purple" size="sm">
                {activeModalProject.categoryBadge}
              </Badge>
              <Badge variant="neutral" size="sm">
                {activeModalProject.status}
              </Badge>
            </div>

            <h3 id="modal-title" className="text-2xl font-bold text-white mb-3">
              {activeModalProject.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              {activeModalProject.description}
            </p>

            {/* Key Capabilities Checklist */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-3">
                Key Capabilities &amp; Verified Features
              </h4>
              <ul className="space-y-2">
                {activeModalProject.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <IconRenderer name="CheckCircle2" className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Details if present */}
            {activeModalProject.architectureDetails && (
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-3">
                  Architecture Overview
                </h4>
                <div className="space-y-2 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-xs text-neutral-300 font-mono">
                  {activeModalProject.architectureDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400">&gt;</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2.5">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions inside Modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
              <div className="text-xs text-neutral-500">
                Press <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">Esc</kbd> to close
              </div>

              <div className="flex items-center gap-2">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 transition-colors"
                  >
                    <IconRenderer name="Github" className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}

                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md transition-all"
                  >
                    <span>Launch Live Demo</span>
                    <IconRenderer name="ExternalLink" className="w-3.5 h-3.5" />
                  </a>
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveModalProject(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
