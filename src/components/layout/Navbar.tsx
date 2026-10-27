"use client";

import React, { useState, useEffect } from "react";
import { getProfile, getNavigationItems } from "@/lib/data";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { scrollToSection } from "@/lib/utils";

export function Navbar() {
  const profile = getProfile();
  const navItems = getNavigationItems();

  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeNotice, setResumeNotice] = useState<boolean>(false);

  // Track scroll position to update background & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!profile.hasResume) {
      e.preventDefault();
      setResumeNotice(true);
      setTimeout(() => setResumeNotice(false), 3500);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#08090F]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg py-1 px-1.5"
            aria-label="Shaik Shahabaz Portfolio Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-900/30 group-hover:scale-105 transition-transform">
              <IconRenderer name="Sparkles" className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0D101A]/70 border border-white/[0.08] rounded-full p-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/40 rounded-full shadow-sm" />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume */}
          <div className="hidden md:flex items-center gap-3 relative">
            <a
              href={profile.hasResume ? profile.resumeUrl : "#"}
              onClick={handleResumeClick}
              download={profile.hasResume ? "Shaik_Shahabaz_Resume.pdf" : undefined}
              target={profile.hasResume ? "_blank" : undefined}
              rel={profile.hasResume ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white border border-white/15 hover:border-purple-500/40 px-3 py-1.5 gap-1.5 text-xs font-semibold"
            >
              <IconRenderer name="FileDown" className="w-4 h-4 text-purple-400" />
              <span>Resume</span>
            </a>

            {/* Resume Placeholder Popover */}
            {resumeNotice && (
              <div className="absolute right-0 top-12 w-64 p-3 rounded-xl bg-[#121626] border border-purple-500/40 shadow-xl text-xs text-neutral-300 z-50 animate-in fade-in zoom-in-95 duration-150">
                <p className="font-semibold text-white mb-1">Resume File Note</p>
                <p className="text-neutral-400">
                  Add your resume PDF to <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded">public/resume/</code> and set <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded">hasResume: true</code> in <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded">profile.json</code>.
                </p>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <IconRenderer name={mobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0D101A]/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.name}
              </a>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
            <a
              href={profile.hasResume ? profile.resumeUrl : "#"}
              onClick={handleResumeClick}
              download={profile.hasResume ? "Shaik_Shahabaz_Resume.pdf" : undefined}
              target={profile.hasResume ? "_blank" : undefined}
              rel={profile.hasResume ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3.5 py-2 text-xs font-semibold gap-2 w-full text-center"
            >
              <IconRenderer name="FileDown" className="w-4 h-4 text-purple-300" />
              <span>Download Resume</span>
            </a>
          </div>

          {resumeNotice && (
            <div className="mt-2 p-2.5 rounded-xl bg-[#121626] border border-purple-500/30 text-xs text-neutral-300">
              Resume file placeholder: configure in <code className="text-purple-300">profile.json</code>.
            </div>
          )}
        </div>
      )}
    </header>
  );
}
