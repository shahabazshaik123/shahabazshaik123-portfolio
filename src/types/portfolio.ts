export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
  isConfigured: boolean;
}

export interface VerifiedStat {
  value: string;
  label: string;
  subtext?: string;
}

export interface EngineeringPillar {
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface Profile {
  name: string;
  primaryTitle: string;
  alternativeHeadline: string;
  introduction: string[];
  location: string;
  locationDetails: string;
  availability: string;
  email: string;
  phone?: string;
  hasResume: boolean;
  resumeUrl: string;
  interests: string[];
  stats: VerifiedStat[];
  pillars: EngineeringPillar[];
  socials: SocialLink[];
}

export interface SkillItem {
  name: string;
  level: "Core" | "Proficient" | "Advanced" | "Practical" | "Concept";
  icon: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  status: "Active Architecture" | "Production Workflow" | "Concept / Prototype" | "Pipeline Template";
  statusColor?: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  keyFeatures: string[];
  architectureDetails?: string[];
  categoryBadge: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  isVerified: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionType?: string;
  graduationYear: string;
  completionYear?: string;
  aggregate: string;
  description: string;
  coursework?: string[];
  isVerified: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
}
