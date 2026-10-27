import profileData from "@/data/profile.json";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";
import {
  Profile,
  SkillCategory,
  SkillItem,
  Project,
  ExperienceItem,
  EducationItem,
  NavigationItem,
} from "@/types/portfolio";

export const navigationItems: NavigationItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getSkillCategories(): SkillCategory[] {
  return skillsData as SkillCategory[];
}

export function getAllSkills(): SkillItem[] {
  const categories = getSkillCategories();
  const seen = new Set<string>();
  const allSkills: SkillItem[] = [];

  for (const cat of categories) {
    for (const skill of cat.skills) {
      if (!seen.has(skill.name)) {
        seen.add(skill.name);
        allSkills.push(skill);
      }
    }
  }

  return allSkills;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return (projectsData as Project[]).filter((p) => p.featured);
}

export function getExperience(): ExperienceItem[] {
  return experienceData as ExperienceItem[];
}

export function getEducation(): EducationItem[] {
  return educationData as EducationItem[];
}

export function getNavigationItems(): NavigationItem[] {
  return navigationItems;
}
