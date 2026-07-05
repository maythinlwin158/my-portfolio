import { Download } from 'lucide-react';
import { portfolioData } from '../lib/portfolio';

type DownloadCVButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  showIcon?: boolean;
  label?: string;
};

export default function DownloadCVButton({
  variant = 'secondary',
  className = '',
  showIcon = true,
  label = 'Download CV',
}: DownloadCVButtonProps) {
  const { cv } = portfolioData;
  const base =
    'inline-flex items-center justify-center gap-2 font-mono text-sm font-medium transition-colors rounded-lg';

  const variants = {
    primary:
      'px-5 py-2.5 bg-terminal text-background hover:bg-terminal-dim',
    secondary:
      'px-5 py-2.5 border border-border text-muted hover:text-foreground hover:border-terminal/30',
    ghost:
      'px-3 py-1.5 text-muted hover:text-terminal',
  };

  return (
    <a
      href={cv.href}
      download={cv.filename}
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={`Download CV — ${cv.filename}`}
    >
      {showIcon && <Download size={16} aria-hidden="true" />}
      {label}
    </a>
  );
}
