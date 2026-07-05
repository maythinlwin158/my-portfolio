interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="p-5 md:p-6 rounded-xl border border-border bg-surface hover:border-terminal/20 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-mono text-base text-foreground">{item.role}</h3>
              </div>
              <p className="text-sm text-muted">{item.company}</p>
            </div>
            <div className="font-mono text-xs text-cyan shrink-0">{item.period}</div>
          </div>

          <p className="text-sm text-subtle mb-1">{item.location}</p>
          <p className="text-muted text-sm leading-relaxed mb-4">{item.description}</p>

          <ul className="space-y-2 mb-4">
            {item.highlights.map((h, i) => (
              <li key={i} className="text-sm text-muted flex items-start gap-2">
                <span className="text-terminal shrink-0 mt-0.5">→</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
            {item.techStack.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
