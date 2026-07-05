export type SkillIconKey = 'cpu' | 'layout' | 'database' | 'server';

export interface HeroStat {
  label: string;
  value: string;
}

export interface ExperienceScope {
  domain: string;
  building: string[];
  serving: string;
}

export interface PortfolioProfile {
  name: string;
  username: string;
  title: string;
  focus?: string;
  tagline: string;
  availability: string;
  location: string;
  locationShort: string;
  email: string;
  phone?: string;
  status: string;
  heroStats?: HeroStat[];
}

export interface PortfolioCV {
  href: string;
  filename: string;
  lastUpdated?: string;
}

export interface PortfolioSocial {
  github: string;
  linkedin: string;
  email: string;
}

export interface PortfolioNavItem {
  id: string;
  label: string;
}

export interface PortfolioSection {
  number: string;
  name: string;
  description: string;
  terminalPanelTitle?: string;
  codeSnippet?: { variable: string; value: string };
  paragraphs?: string[];
  responseTime?: string;
}

export interface HeroTerminalLine {
  command: string;
  output: string;
  type: 'output' | 'hint';
}

export interface PortfolioSkill {
  id: string;
  title: string;
  icon: SkillIconKey;
  items: string[];
}

export interface PortfolioExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  team?: string;
  scope?: ExperienceScope;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface PortfolioProject {
  title: string;
  role?: string;
  context?: string;
  scale?: string;
  description?: string;
  techStack: string[];
  techStackLayers?: { layer: string; stack: string }[];
  features?: string[];
  link?: string;
  github?: string;
}

export interface PortfolioTerminal {
  welcomeMessage: string;
  promptUser: string;
  promptHost: string;
  about: string;
  skills: string;
}

export interface PortfolioData {
  meta: { title: string; description: string };
  profile: PortfolioProfile;
  cv: PortfolioCV;
  social: PortfolioSocial;
  navigation: PortfolioNavItem[];
  sections: {
    about: PortfolioSection;
    experience: PortfolioSection;
    projects: PortfolioSection;
    skills: PortfolioSection;
    contact: PortfolioSection;
  };
  heroTerminal: { bootLines: HeroTerminalLine[] };
  skills: PortfolioSkill[];
  experience: PortfolioExperience[];
  projects: PortfolioProject[];
  terminal: PortfolioTerminal;
  footer: { builtWith: string; terminalHint: string };
}
