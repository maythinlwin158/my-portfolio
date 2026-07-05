import { Cpu, Database, Layout, Server } from 'lucide-react';
import type { SkillIconKey } from '../types/portfolio';

const ICONS = {
  cpu: Cpu,
  layout: Layout,
  database: Database,
  server: Server,
} as const;

export function getSkillIcon(key: SkillIconKey, size = 18) {
  const Icon = ICONS[key];
  return <Icon size={size} />;
}
