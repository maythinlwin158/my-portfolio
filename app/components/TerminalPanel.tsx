interface TerminalPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function TerminalPanel({ title, children, className = '', onClose }: TerminalPanelProps) {
  return (
    <div className={`terminal-panel ${className}`}>
      <div className="terminal-panel-header">
        <div className="terminal-dot bg-red-500/80" {...(onClose ? { onClick: onClose, role: 'button' as const } : {})} />
        <div className="terminal-dot bg-yellow-500/80" />
        <div className="terminal-dot bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-subtle truncate">{title}</span>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}
