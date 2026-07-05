'use client';

import { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { TerminalSquare, Menu, X } from 'lucide-react';
import DownloadCVButton from './DownloadCVButton';
import { portfolioData } from '../lib/portfolio';

const { navigation, profile, social } = portfolioData;

export default function Header() {
  const { activeSection, setActiveSection, toggleTerminal } = usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const sections = [{ id: 'home' }, ...navigation].map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i === 0 ? 'home' : navigation[i - 1].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 72, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/85 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="font-mono text-sm text-foreground hover:text-terminal transition-colors flex items-center gap-1.5"
        >
          <span className="text-terminal">~</span>
          <span>{profile.username}</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`px-3 py-1.5 rounded-md font-mono text-sm transition-colors ${
                activeSection === link.id
                  ? 'text-terminal bg-terminal/10'
                  : 'text-muted hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              ./{link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTerminal}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-sm text-muted hover:text-terminal border border-border hover:border-terminal/30 bg-surface transition-colors"
            title="Toggle terminal (`)"
          >
            <TerminalSquare size={15} />
            <span className="hidden lg:inline">terminal</span>
            <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-surface-hover text-subtle border border-border">`</kbd>
          </button>
          <DownloadCVButton variant="ghost" label="cv" className="hidden sm:inline-flex" />
          <a
            href={social.email}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-md font-mono text-sm bg-terminal text-background font-medium hover:bg-terminal-dim transition-colors"
          >
            contact
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-lg px-5 py-3">
          {navigation.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left py-3 font-mono text-sm border-b border-border last:border-0 ${
                activeSection === link.id ? 'text-terminal' : 'text-muted'
              }`}
            >
              cd ./{link.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <DownloadCVButton variant="secondary" label="$ download cv" className="w-full" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { toggleTerminal(); setIsMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-md font-mono text-sm border border-border text-muted"
              >
                terminal
              </button>
              <a
                href={social.email}
                className="flex-1 py-2.5 rounded-md font-mono text-sm bg-terminal text-background text-center font-medium"
              >
                contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
