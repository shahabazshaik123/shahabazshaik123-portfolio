"use client";

import React from "react";
import { getProfile, getNavigationItems } from "@/lib/data";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  const profile = getProfile();
  const navItems = getNavigationItems();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080D]/90 pt-16 pb-12 text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06] items-start">
          {/* Identity & Headline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-900/30">
                <IconRenderer name="Sparkles" className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-purple-400 font-medium text-sm">
              {profile.primaryTitle}
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {profile.alternativeHeadline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="hover:text-purple-300 transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Back-to-Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3 md:text-right">
                Connect
              </h3>
              <div className="flex items-center gap-2.5">
                {profile.socials.map((social) => {
                  const isMailto = social.url.startsWith("mailto:");
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target={isMailto ? undefined : "_blank"}
                      rel={isMailto ? undefined : "noopener noreferrer"}
                      aria-label={isMailto ? `Email ${profile.name} at ${social.label}` : `${social.platform} profile - ${social.label}`}
                      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-purple-950/30 text-neutral-400 hover:text-purple-300 flex items-center justify-center transition-all duration-200"
                    >
                      <IconRenderer name={social.icon} className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.04]"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <IconRenderer name="ArrowUp" className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-neutral-400">
            <span>Built with Next.js, TypeScript &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
