import type { ExperienceScope, HeroStat } from '../types/portfolio';

interface HeroStatsProps {
  stats: HeroStat[];
}

export default function HeroStats({ stats }: HeroStatsProps) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-xl">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-surface/80 px-3.5 py-2.5 hover:border-terminal/20 transition-colors"
        >
          <dt className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-1">
            {stat.label}
          </dt>
          <dd className="text-sm text-foreground leading-snug">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface ScopePanelProps {
  scope: ExperienceScope;
}

export function ScopePanel({ scope }: ScopePanelProps) {
  return (
    <div className="scope-panel mb-4">
      <div className="scope-panel-header">
        <span className="font-mono text-[10px] uppercase tracking-widest text-terminal">scope</span>
      </div>
      <div className="divide-y divide-border">
        <div className="px-3.5 py-2.5 grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-1 sm:gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">domain</span>
          <span className="text-sm text-foreground leading-snug">{scope.domain}</span>
        </div>
        <div className="px-3.5 py-2.5 grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-1.5 sm:gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-subtle sm:pt-0.5">building</span>
          <div className="flex flex-wrap gap-1.5">
            {scope.building.map((item) => (
              <span key={item} className="scope-chip">{item}</span>
            ))}
          </div>
        </div>
        <div className="px-3.5 py-2.5 grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-1 sm:gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">serving</span>
          <span className="text-sm text-muted leading-snug">{scope.serving}</span>
        </div>
      </div>
    </div>
  );
}
