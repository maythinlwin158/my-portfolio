'use client';

import { usePortfolioStore } from './store/portfolioStore';
import { GraduationCap, Languages, Mail, MapPin } from 'lucide-react';
import SkillCard from './components/SkillCard';
import Timeline from './components/Timeline';
import ContactForm from './components/ContactForm';
import SectionHeader from './components/SectionHeader';
import HeroTerminal from './components/HeroTerminal';
import TerminalPanel from './components/TerminalPanel';
import ProjectSlider from './components/ProjectSlider';
import DownloadCVButton from './components/DownloadCVButton';
import HeroStats from './components/HeroStats';
import { portfolioData } from './lib/portfolio';
import { getSkillIcon } from './lib/skillIcons';

const { profile, social, sections, skills, experience, projects } = portfolioData;

export default function Home() {
  const toggleTerminal = usePortfolioStore((s) => s.toggleTerminal);

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );

  const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );

  return (
    <main className="flex-1 relative z-10">
      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-5 md:px-6 pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="animate-fade-up">
            <p className="font-mono text-sm text-terminal mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-terminal animate-pulse" />
              {profile.availability}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight mb-3">
              {profile.name}
            </h1>

            <p className="font-mono text-base text-cyan mb-1">{profile.title}</p>
            {profile.focus && (
              <p className="font-mono text-sm text-terminal/90 mb-4">{profile.focus}</p>
            )}

            <p className="text-muted leading-relaxed mb-6 max-w-md text-sm md:text-base">{profile.tagline}</p>

            {profile.heroStats && profile.heroStats.length > 0 && (
              <HeroStats stats={profile.heroStats} />
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleTerminal}
                className="px-5 py-2.5 rounded-lg bg-terminal text-background font-mono text-sm font-medium hover:bg-terminal-dim transition-colors"
              >
                $ open terminal
              </button>
              <DownloadCVButton variant="secondary" label="$ download cv" />
              <a
                href={social.email}
                className="px-5 py-2.5 rounded-lg border border-border font-mono text-sm text-muted hover:text-foreground hover:border-terminal/30 transition-colors"
              >
                contact
              </a>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <a href={social.github} className="text-subtle hover:text-terminal transition-colors" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href={social.linkedin} className="text-subtle hover:text-terminal transition-colors" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href={social.email} className="text-subtle hover:text-terminal transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <SectionHeader
            number={sections.about.number}
            name={sections.about.name}
            description={sections.about.description}
          />
          <TerminalPanel title={sections.about.terminalPanelTitle ?? 'cat about.md'}>
            <div className="font-mono text-sm space-y-4 text-muted leading-relaxed">
              {sections.about.codeSnippet && (
                <p>
                  <span className="text-keyword">const</span>{' '}
                  <span className="text-foreground">{sections.about.codeSnippet.variable}</span>{' '}
                  <span className="text-subtle">=</span>{' '}
                  <span className="text-string">&quot;{sections.about.codeSnippet.value}&quot;</span>
                  <span className="text-subtle">;</span>
                </p>
              )}
              {sections.about.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-muted">{paragraph}</p>
              ))}
              <div className="flex flex-wrap gap-5 pt-2 text-sm">
                <span className="flex items-center gap-2 text-subtle">
                  <MapPin size={14} className="text-terminal" />
                  {profile.location}
                </span>
                <a href={social.email} className="flex items-center gap-2 text-subtle hover:text-terminal transition-colors">
                  <Mail size={14} className="text-terminal" />
                  {profile.email}
                </a>
                {profile.education && (
                  <span className="flex items-center gap-2 text-subtle">
                    <GraduationCap size={14} className="text-terminal" />
                    {profile.education}
                  </span>
                )}
                {(profile.englishLevel || profile.japaneseLevel) && (
                  <span className="flex items-center gap-2 text-subtle">
                    <Languages size={14} className="text-terminal" />
                    {[profile.englishLevel, profile.japaneseLevel].filter(Boolean).join(' · ')}
                  </span>
                )}
              </div>
            </div>
          </TerminalPanel>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-border bg-surface/50">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <SectionHeader
            number={sections.experience.number}
            name={sections.experience.name}
            description={sections.experience.description}
          />
          <Timeline items={experience} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <SectionHeader
            number={sections.projects.number}
            name={sections.projects.name}
            description={sections.projects.description}
          />
          <ProjectSlider projects={projects} />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-border bg-surface/50">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <SectionHeader
            number={sections.skills.number}
            name={sections.skills.name}
            description={sections.skills.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((category) => (
              <SkillCard
                key={category.id}
                title={category.title}
                icon={getSkillIcon(category.icon)}
                skills={category.items}
                tier={category.id === 'primary' ? 'primary' : category.id === 'secondary' ? 'secondary' : 'familiar'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <SectionHeader
            number={sections.contact.number}
            name={sections.contact.name}
            description={sections.contact.description}
          />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <TerminalPanel title="contact --info">
                <div className="font-mono text-sm space-y-3 text-muted">
                  <p>
                    <span className="text-keyword">email</span>:{' '}
                    <a href={social.email} className="text-cyan hover:text-terminal transition-colors">{profile.email}</a>
                  </p>
                  {profile.phone && (
                    <p><span className="text-keyword">phone</span>: <span className="text-foreground">{profile.phone}</span></p>
                  )}
                  <p><span className="text-keyword">location</span>: <span className="text-foreground">{profile.locationShort}</span></p>
                  {profile.education && (
                    <p><span className="text-keyword">education</span>: <span className="text-foreground">{profile.education}</span></p>
                  )}
                  {profile.englishLevel && (
                    <p><span className="text-keyword">english</span>: <span className="text-foreground">{profile.englishLevel}</span></p>
                  )}
                  {profile.japaneseLevel && (
                    <p><span className="text-keyword">japanese</span>: <span className="text-foreground">{profile.japaneseLevel}</span></p>
                  )}
                  <p><span className="text-keyword">status</span>: <span className="text-terminal">{profile.status}</span></p>
                  {portfolioData.cv.lastUpdated && (
                    <p><span className="text-keyword">cv</span>: <span className="text-foreground">updated {portfolioData.cv.lastUpdated}</span></p>
                  )}
                  <div className="pt-2">
                    <DownloadCVButton variant="secondary" label="$ download cv" className="w-full sm:w-auto" />
                  </div>
                </div>
              </TerminalPanel>
            </div>
            <div className="lg:col-span-3">
              <TerminalPanel title="send-message.sh">
                <ContactForm />
              </TerminalPanel>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-subtle">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs text-subtle">
            Built with {portfolioData.footer.builtWith} · Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-muted">`</kbd>{' '}
            for terminal
          </p>
        </div>
      </footer>
    </main>
  );
}
