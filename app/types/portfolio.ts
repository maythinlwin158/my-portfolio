export type SkillIconKey = 'cpu' | 'layout' | 'database' | 'server';

export interface PortfolioProfile {
  name: string;
  username: string;
  title: string;
  tagline: string;
  availability: string;
  location: string;
  locationShort: string;
  email: string;
  phone: string;
  status: string;
}

export interface PortfolioCV {
  href: string;
  filename: string;
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
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface TechStackLayer {
  layer: string;
  stack: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  techStack: string[];
  techStackLayers?: TechStackLayer[];
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
