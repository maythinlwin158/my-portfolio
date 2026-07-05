'use client';

import { usePortfolioStore } from '../store/portfolioStore';
import { portfolioData } from '../lib/portfolio';

export default function HeroTerminal() {
  const toggleTerminal = usePortfolioStore((s) => s.toggleTerminal);
  const { heroTerminal, terminal } = portfolioData;
  const { promptUser, promptHost } = terminal;

  return (
    <div className="terminal-panel h-full flex flex-col">
      <div className="terminal-panel-header">
        <div className="terminal-dot bg-red-500/80" />
        <div className="terminal-dot bg-yellow-500/80" />
        <div className="terminal-dot bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-subtle">{promptUser}@{promptHost} ~</span>
      </div>

      <div className="p-5 font-mono text-sm flex-1 min-h-[280px] md:min-h-[320px]">
        {heroTerminal.bootLines.map((line, i) => (
          <div
            key={`${line.command}-${i}`}
            className="mb-1.5 animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'forwards' }}
          >
            <div className="mb-0.5">
              <span className="prompt-user">{promptUser}</span>
              <span className="prompt-symbol">@</span>
              <span className="prompt-path">{promptHost}</span>
              <span className="prompt-symbol"> ~ </span>
              <span className="text-foreground">{line.command}</span>
            </div>
            {line.type === 'hint' ? (
              <span className="text-subtle italic">{line.output}</span>
            ) : (
              <span className="output-text">{line.output}</span>
            )}
          </div>
        ))}
        <div className="mt-3 flex items-center gap-2 animate-fade-up opacity-0" style={{ animationDelay: `${heroTerminal.bootLines.length * 0.15}s`, animationFillMode: 'forwards' }}>
          <span className="prompt-user">{promptUser}</span>
          <span className="prompt-symbol">@</span>
          <span className="prompt-path">{promptHost}</span>
          <span className="prompt-symbol"> ~ </span>
          <span className="w-2 h-4 bg-terminal animate-blink inline-block" />
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={toggleTerminal}
          className="w-full py-2.5 rounded-lg border border-border bg-surface-hover text-sm font-mono text-terminal hover:bg-border/50 transition-colors"
        >
          Open interactive terminal · press `
        </button>
      </div>
    </div>
  );
}
