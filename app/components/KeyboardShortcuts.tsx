'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';

export default function KeyboardShortcuts() {
  const toggleTerminal = usePortfolioStore((s) => s.toggleTerminal);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return null;
}
