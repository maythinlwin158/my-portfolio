import rawData from '../../data/portfolio.improved.json';
import type { PortfolioData } from '../types/portfolio';

export const portfolioData = rawData as PortfolioData;

export function getProjectSummary(project: PortfolioData['projects'][number]): string {
  return project.context ?? project.description ?? '';
}

export function getTerminalProjectsOutput(): string {
  return portfolioData.projects
    .map((p, i) => `${String(i + 1).padStart(2, '0')}  ${p.title}`)
    .join('\n');
}

export function getTerminalExperienceOutput(): string {
  return portfolioData.experience
    .map((e) => `→ ${e.role} @ ${e.company.split('(')[0].trim()} (${e.period})`)
    .join('\n');
}

export function getTerminalContactOutput(): string {
  const { profile, social } = portfolioData;
  const lines = [
    `Email: ${profile.email}`,
    ...(profile.phone ? [`Phone: ${profile.phone}`] : []),
    `Location: ${profile.locationShort}`,
    `LinkedIn: ${social.linkedin.replace('https://', '')}`,
  ];
  return lines.join('\n');
}

export function getNavigationSectionIds(): string[] {
  return portfolioData.navigation.map((n) => n.id);
}

export function getLsOutput(): string {
  return portfolioData.navigation.map((n) => `${n.label}/`).join('  ');
}
