import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  features?: string[];
  link?: string;
  github?: string;
  index?: number;
}

export default function ProjectCard({ title, description, techStack, features, link, github, index }: ProjectCardProps) {
  return (
    <article className="group p-5 md:p-6 rounded-xl border border-border bg-surface hover:border-terminal/25 hover:bg-surface-hover transition-all duration-200 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {index !== undefined && (
            <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')}</span>
          )}
          <h3 className="font-mono text-base md:text-lg text-foreground group-hover:text-terminal transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-foreground" aria-label="GitHub">
              <ExternalLink size={14} />
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-foreground" aria-label="View project">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">{description}</p>

      {features && features.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {features.map((f, i) => (
            <li key={i} className="text-sm text-muted flex items-start gap-2">
              <span className="text-terminal shrink-0">›</span>
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border">
        {techStack.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </article>
  );
}
