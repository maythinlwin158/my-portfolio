'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  techStackLayers?: { layer: string; stack: string }[];
  features?: string[];
  link?: string;
  github?: string;
}

interface ProjectSliderProps {
  projects: Project[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const total = projects.length;
  const progress = total > 1 ? ((activeIndex + 1) / total) * 100 : 100;

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    const slide = slideRefs.current[clamped];
    const container = scrollRef.current;
    if (!slide || !container) return;

    isScrollingRef.current = true;
    container.scrollTo({ top: slide.offsetTop, behavior: 'smooth' });
    setActiveIndex(clamped);

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  }, [total]);

  const goNext = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);
  const goPrev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: [0.55, 0.75] }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div ref={sectionRef} className="relative" tabIndex={-1}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-8">
        {/* Desktop nav rail */}
        <nav
          className="hidden lg:flex flex-col gap-1 sticky top-24 self-start"
          aria-label="Project navigation"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-3 px-3">
            ls projects/
          </p>
          {projects.map((project, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-current={isActive ? 'true' : undefined}
                className={`group flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-terminal/10 border border-terminal/25'
                    : 'border border-transparent hover:bg-surface-hover hover:border-border'
                }`}
              >
                <span
                  className={`font-mono text-xs shrink-0 mt-0.5 transition-colors ${
                    isActive ? 'text-terminal' : 'text-subtle group-hover:text-muted'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-mono text-sm leading-snug transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground'
                  }`}
                >
                  {project.title}
                </span>
              </button>
            );
          })}

          {/* Vertical progress track */}
          <div className="mt-6 px-3 flex items-center gap-3">
            <div className="relative w-1 h-24 bg-border rounded-full overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0 bg-terminal rounded-full transition-all duration-300 ease-out"
                style={{ height: `${progress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-subtle">
              <span className="text-terminal">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-subtle"> / {String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </nav>

        {/* Mobile horizontal pills */}
        <div className="lg:hidden -mx-1">
          <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-none snap-x snap-mandatory">
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-current={activeIndex === i ? 'true' : undefined}
                className={`snap-start shrink-0 px-3 py-1.5 rounded-full font-mono text-xs border transition-all ${
                  activeIndex === i
                    ? 'bg-terminal/15 border-terminal/40 text-terminal'
                    : 'border-border text-muted hover:border-terminal/20'
                }`}
              >
                {String(i + 1).padStart(2, '0')} {project.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Slider viewport */}
        <div className="relative min-w-0 lg:col-start-2 lg:row-start-1">
          {/* Top / bottom fade hints */}
          <div className="pointer-events-none absolute top-0 left-0 right-2 h-8 bg-gradient-to-b from-background to-transparent z-10 rounded-t-xl" />
          <div className="pointer-events-none absolute bottom-14 left-0 right-2 h-10 bg-gradient-to-t from-background to-transparent z-10 rounded-b-xl" />

          <div
            ref={scrollRef}
            className="project-slider-scroll h-[440px] md:h-[500px] overflow-y-auto overscroll-y-contain rounded-xl border border-border bg-surface/50 snap-y snap-mandatory scroll-smooth"
            aria-label="Projects slider"
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                ref={(el) => { slideRefs.current[i] = el; }}
                className="snap-start snap-always min-h-full flex items-stretch px-4 md:px-6 py-6"
              >
                <article
                  className={`w-full flex flex-col rounded-xl border p-5 md:p-7 transition-all duration-300 ${
                    activeIndex === i
                      ? 'border-terminal/30 bg-surface shadow-lg shadow-terminal/5'
                      : 'border-border/60 bg-surface/80 opacity-60 scale-[0.98]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="font-mono text-xs text-terminal mb-2 block">
                        project[{i}] · {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-mono text-xl md:text-2xl text-foreground">{project.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted text-sm md:text-base leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>

                  {project.features && project.features.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted flex items-start gap-2.5">
                          <span className="text-terminal shrink-0 font-mono">›</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-4 border-t border-border mt-auto space-y-3">
                    {project.techStackLayers && project.techStackLayers.length > 0 ? (
                      <div className="space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Tech stack</p>
                        <div className="rounded-lg border border-border overflow-hidden text-sm">
                          {project.techStackLayers.map(({ layer, stack }) => (
                            <div
                              key={layer}
                              className="grid grid-cols-[88px_1fr] sm:grid-cols-[100px_1fr] border-b border-border last:border-b-0"
                            >
                              <span className="px-3 py-2 font-mono text-xs text-terminal bg-terminal/5 border-r border-border">
                                {layer}
                              </span>
                              <span className="px-3 py-2 text-muted leading-snug">{stack}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tag">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Controls bar */}
          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                className="p-2.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-terminal/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronUp size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === total - 1}
                aria-label="Next project"
                className="p-2.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-terminal/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            <p className="font-mono text-xs text-subtle hidden sm:block">
              Scroll · ↑↓ keys · tap nav
            </p>

            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-terminal">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-subtle">/</span>
              <span className="text-subtle">{String(total).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Dot indicators — mobile + desktop supplement */}
          <div className="flex justify-center gap-1.5 mt-4 lg:hidden" role="tablist" aria-label="Project dots">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-terminal' : 'w-1.5 bg-border hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
