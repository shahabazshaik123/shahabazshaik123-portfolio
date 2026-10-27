"use client";

import React, { useState } from "react";
import { getProfile } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const profile = getProfile();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<"idle" | "ready" | "copied">("idle");
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  // Validate form inputs
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = profile.email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyStatus("success");
        setTimeout(() => setCopyStatus("idle"), 2500);
      } catch {
        setCopyStatus("error");
        setTimeout(() => setCopyStatus("idle"), 2500);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Prepare mailto link with encoded parameters
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedStatus("ready");

      const mailtoUrl = `mailto:${encodeURIComponent(profile.email)}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Hello Shaik,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
      )}`;

      // Open mail client
      window.location.href = mailtoUrl;
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmittedStatus("idle");
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="Get In Touch"
          title="Let's Discuss"
          highlightedWord="Opportunities"
          subtitle="Whether you have an engineering role, a technical project, or an AI system inquiry, my inbox is open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-7 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Direct Contact
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  I am available for full-time AI engineering, backend API development, and full-stack positions. Feel free to reach out directly via email or professional networks.
                </p>
              </div>

              {/* Email Address with Copy Button */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label={`Email ${profile.name}`}
                    className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-500/60 flex items-center justify-center shrink-0 transition-colors"
                  >
                    <IconRenderer name="Mail" className="w-4 h-4" />
                  </a>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-xs sm:text-sm font-mono text-purple-300 hover:text-purple-200 transition-colors truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/40 text-neutral-300 hover:text-purple-300 transition-all shrink-0 relative"
                  title="Copy email address"
                  aria-label="Copy email address to clipboard"
                >
                  <IconRenderer
                    name={copyStatus === "success" ? "Check" : copyStatus === "error" ? "X" : "Copy"}
                    className="w-4 h-4"
                  />
                  {copyStatus === "success" && (
                    <span className="absolute -top-7 right-0 bg-purple-950 border border-purple-500/50 text-purple-200 text-[10px] px-1.5 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                  {copyStatus === "error" && (
                    <span className="absolute -top-7 right-0 bg-rose-950 border border-rose-500/50 text-rose-200 text-[10px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                      Failed to copy
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Phone Number */}
              {profile.phone && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <a
                      href={`tel:${profile.phone}`}
                      aria-label={`Call ${profile.name}`}
                      className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-500/60 flex items-center justify-center shrink-0 transition-colors"
                    >
                      <IconRenderer name="Phone" className="w-4 h-4" />
                    </a>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        Mobile Number
                      </p>
                      <a
                        href={`tel:${profile.phone}`}
                        aria-label={`Call ${profile.name}`}
                        className="text-xs sm:text-sm font-mono text-purple-300 hover:text-purple-200 transition-colors truncate block"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`tel:${profile.phone}`}
                    aria-label={`Call ${profile.name}`}
                    title={`Call ${profile.phone}`}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/40 text-neutral-300 hover:text-purple-300 transition-all shrink-0"
                  >
                    <IconRenderer name="Phone" className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Location & Status Info */}
              <div className="space-y-3 pt-2 border-t border-white/[0.06] text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <IconRenderer name="MapPin" className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{profile.locationDetails}</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconRenderer name="CheckCircle2" className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Available for immediate interviews &amp; hiring discussions</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-white/[0.06]">
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                  Professional Profiles
                </p>
                <div className="flex flex-col gap-2">
                  {profile.socials.map((social) => {
                    const isMailto = social.url.startsWith("mailto:");
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target={isMailto ? undefined : "_blank"}
                        rel={isMailto ? undefined : "noopener noreferrer"}
                        aria-label={isMailto ? `Email ${profile.name} at ${social.label}` : `${social.platform} profile - ${social.label}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all text-xs sm:text-sm text-neutral-300 group"
                      >
                        <div className="flex items-center gap-2.5">
                          <IconRenderer name={social.icon} className="w-4 h-4 text-purple-400" />
                          <span className="group-hover:text-white transition-colors">
                            {social.platform}
                          </span>
                        </div>
                        <IconRenderer
                          name="ChevronRight"
                          className="w-4 h-4 text-neutral-500 group-hover:text-purple-300 transition-colors"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Email Compose Form */}
          <div className="lg:col-span-7">
            <Card className="p-7">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                Fill in the details below. This will prepare a direct email message pre-addressed to {profile.email}.
              </p>

              {submittedStatus === "ready" ? (
                <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-500/40 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center mx-auto">
                    <IconRenderer name="CheckCircle2" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Email Client Prepared
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
                      Your default mail program was triggered with your message. If it didn&apos;t open automatically, you can send directly to <code className="text-purple-300">{profile.email}</code>.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        window.location.href = `mailto:${encodeURIComponent(
                          profile.email
                        )}?subject=${encodeURIComponent(
                          `[Portfolio Inquiry] ${formData.subject}`
                        )}&body=${encodeURIComponent(
                          `Hello Shaik,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
                        )}`;
                      }}
                    >
                      <span>Reopen Mail Client</span>
                      <IconRenderer name="ExternalLink" className="w-3.5 h-3.5" />
                    </Button>

                    <Button variant="secondary" size="sm" onClick={handleReset}>
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#121422]/90 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-rose-500/60 focus:ring-rose-500"
                            : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="sender-email"
                        className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5"
                      >
                        Your Email *
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#121422]/90 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-rose-500/60 focus:ring-rose-500"
                            : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="message-subject"
                      className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5"
                    >
                      Subject *
                    </label>
                    <input
                      id="message-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. AI Engineering Role / Collaboration"
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#121422]/90 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.subject
                          ? "border-rose-500/60 focus:ring-rose-500"
                          : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message-body"
                      className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message-body"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell me about your project, team, or role requirements..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#121422]/90 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all resize-y ${
                        errors.message
                          ? "border-rose-500/60 focus:ring-rose-500"
                          : "border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      <IconRenderer name="Send" className="w-4 h-4" />
                      <span>Send Message</span>
                    </Button>
                    <p className="text-[11px] text-neutral-500 mt-2">
                      Launches your mail client directly with your message pre-composed. No fake delivery promises.
                    </p>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
