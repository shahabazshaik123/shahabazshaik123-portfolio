"use client";

import React, { useState } from "react";
import { getProfile } from "@/lib/data";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { scrollToSection } from "@/lib/utils";

export function HeroSection() {
  const profile = getProfile();
  const [copiedCode, setCopiedCode] = useState(false);
  const [resumeNotice, setResumeNotice] = useState(false);

  const terminalCode = `const engineer = {
  name: "Shaik Shahabaz",
  role: "AI Engineer & Full-Stack Developer",
  focus: ["Backend Engineering", "AI Integration", "Mobile Apps"],
  coreStack: ["Python", "FastAPI", "Flutter", "PostgreSQL", "React"],
  aiIntegration: ["Sentence Transformers", "Pinecone", "Embeddings"],
  availableForHire: true,
  execute: () => {
    return "Engineering intelligent, scalable systems from concept to launch.";
  }
};`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(terminalCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Graceful fallback
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!profile.hasResume) {
      e.preventDefault();
      setResumeNotice(true);
      setTimeout(() => setResumeNotice(false), 3500);
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Personal Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Pill */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs sm:text-sm font-medium text-purple-300 shadow-[0_0_14px_rgba(168,85,247,0.18)] backdrop-blur-sm gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{profile.availability}</span>
              </span>
            </div>

            {/* Intro & Name */}
            <div className="mb-3">
              <span className="text-purple-400 text-sm sm:text-base font-semibold tracking-wide uppercase">
                Hello, I&apos;m
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mt-1">
                {profile.name}
              </h1>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text-purple">
                {profile.primaryTitle}
              </h2>
            </div>

            {/* Short Supporting Copy */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              {profile.alternativeHeadline}
            </p>

            {/* Location & Status Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400 mb-8">
              <div className="flex items-center gap-1.5">
                <IconRenderer name="MapPin" className="w-4 h-4 text-purple-400" />
                <span>{profile.locationDetails}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-neutral-600 hidden sm:inline-block" />
              <div className="flex items-center gap-1.5">
                <IconRenderer name="CheckCircle2" className="w-4 h-4 text-emerald-400" />
                <span>Open for Collaboration</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto relative">
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/25 hover:shadow-purple-700/40 border border-purple-400/20 text-sm sm:text-base px-6 py-3.5 gap-2.5 font-semibold w-full sm:w-auto"
              >
                <span>View My Projects</span>
                <IconRenderer name="ArrowRight" className="w-4 h-4" />
              </button>

              <a
                href={profile.hasResume ? profile.resumeUrl : "#"}
                onClick={handleResumeClick}
                download={profile.hasResume ? "Shaik_Shahabaz_Resume.pdf" : undefined}
                target={profile.hasResume ? "_blank" : undefined}
                rel={profile.hasResume ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/10 hover:border-purple-500/30 backdrop-blur-md text-sm sm:text-base px-6 py-3.5 gap-2.5 font-semibold w-full sm:w-auto"
              >
                <IconRenderer name="FileDown" className="w-4 h-4 text-purple-400" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-[0.98] bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white border border-white/15 hover:border-purple-500/40 text-sm sm:text-base px-5 py-3.5 gap-2 font-semibold w-full sm:w-auto"
              >
                <IconRenderer name="Mail" className="w-4 h-4 text-purple-400" />
                <span>Contact Me</span>
              </button>

              {/* Resume Popover */}
              {resumeNotice && (
                <div className="absolute left-0 top-full mt-3 w-72 p-3 rounded-xl bg-[#121626] border border-purple-500/40 shadow-2xl text-xs text-neutral-300 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <p className="font-semibold text-white mb-1">Resume File Note</p>
                  <p className="text-neutral-400">
                    Resume file can be placed at <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded">public/resume/</code>. Update <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded">hasResume: true</code> in <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded">profile.json</code> to enable instant download.
                  </p>
                </div>
              )}
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/[0.08] w-full">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium mr-2">
                Connect:
              </span>
              {profile.socials.map((social) => {
                const isMailto = social.url.startsWith("mailto:");
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target={isMailto ? undefined : "_blank"}
                    rel={isMailto ? undefined : "noopener noreferrer"}
                    aria-label={isMailto ? `Email ${profile.name}` : `${social.platform} profile`}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-purple-950/30 text-neutral-400 hover:text-purple-300 flex items-center justify-center transition-all duration-200"
                  >
                    <IconRenderer name={social.icon} className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Terminal Profile Card */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Background Gradient for Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-3xl blur-2xl opacity-60 -z-10" />

            <div className="rounded-2xl bg-[#0D101A]/95 border border-white/[0.12] shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-[#151726]/90 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <IconRenderer name="Terminal" className="w-3.5 h-3.5 text-purple-400" />
                  <span>shaik@portfolio:~</span>
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopyCode}
                  className="text-neutral-400 hover:text-purple-300 p-1 rounded transition-colors relative"
                  title="Copy snippet"
                  aria-label="Copy terminal snippet"
                >
                  <IconRenderer
                    name={copiedCode ? "Check" : "Copy"}
                    className="w-3.5 h-3.5"
                  />
                  {copiedCode && (
                    <span className="absolute -top-7 right-0 bg-purple-950 border border-purple-500/50 text-purple-200 text-[10px] px-1.5 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Terminal Body with Syntax Highlighting */}
              <div className="p-5 font-mono text-xs sm:text-sm text-neutral-300 space-y-2.5 leading-relaxed overflow-x-auto">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-indigo-300">engineer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">name:</span>{" "}
                  <span className="text-emerald-300">&quot;Shaik Shahabaz&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">role:</span>{" "}
                  <span className="text-emerald-300">
                    &quot;AI Engineer &amp; Full-Stack Developer&quot;
                  </span>
                  ,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">focus:</span> [
                  <span className="text-amber-300">&quot;Backend APIs&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;AI Integration&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;Mobile Apps&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">coreStack:</span> [
                  <span className="text-amber-300">&quot;FastAPI&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;Python&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;Flutter&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;PostgreSQL&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">aiIntegration:</span> [
                  <span className="text-amber-300">&quot;Sentence Transformers&quot;</span>,{" "}
                  <span className="text-amber-300">&quot;Pinecone&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">availableForHire:</span>{" "}
                  <span className="text-purple-400">true</span>,
                </div>
                <div className="pl-4">
                  <span className="text-neutral-400">execute:</span> () =&gt; &#123;
                </div>
                <div className="pl-8 text-neutral-400">
                  <span className="text-purple-300">return</span>{" "}
                  <span className="text-emerald-300">
                    &quot;Turning ideas into scalable, intelligent software.&quot;
                  </span>
                  ;
                </div>
                <div className="pl-4">&#125;</div>
                <div>&#125;;</div>

                {/* Status Bar inside Terminal */}
                <div className="pt-3 text-neutral-400 text-xs border-t border-white/[0.06] flex items-center gap-2">
                  <IconRenderer name="Sparkles" className="w-3.5 h-3.5 text-purple-400" />
                  <span>Ready to deploy next-gen applications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
