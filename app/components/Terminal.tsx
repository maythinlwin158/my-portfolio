'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { X, Minimize2 } from 'lucide-react';
import {
  portfolioData,
  getTerminalProjectsOutput,
  getTerminalExperienceOutput,
  getTerminalContactOutput,
  getNavigationSectionIds,
  getLsOutput,
} from '../lib/portfolio';

const SECTIONS = getNavigationSectionIds();
const { terminal, cv } = portfolioData;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

export default function Terminal() {
  const { isTerminalOpen, setTerminalOpen, terminalLogs, addTerminalLog, clearTerminalLogs } = usePortfolioStore();
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs, isTerminalOpen]);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();

    if (!trimmed) {
      addTerminalLog({ command: cmd, output: '' });
      return;
    }

    let output: string | React.ReactNode = '';

    if (lower === 'clear') {
      clearTerminalLogs();
      return;
    }

    if (lower === 'help') {
      output = (
        <div className="space-y-2 mt-1">
          <p className="text-terminal font-medium">Available commands:</p>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <span className="text-keyword">help</span><span>List all commands</span>
            <span className="text-keyword">about</span><span>Profile summary</span>
            <span className="text-keyword">skills</span><span>Technical skills</span>
            <span className="text-keyword">projects</span><span>Featured projects</span>
            <span className="text-keyword">experience</span><span>Work history</span>
            <span className="text-keyword">contact</span><span>Contact details</span>
            <span className="text-keyword">cv</span><span>Download résumé (PDF)</span>
            <span className="text-keyword">cd &lt;section&gt;</span><span>Navigate (about, projects, etc.)</span>
            <span className="text-keyword">clear</span><span>Clear terminal</span>
          </div>
        </div>
      );
    } else if (lower === 'about') {
      output = terminal.about;
    } else if (lower === 'skills') {
      output = terminal.skills;
    } else if (lower === 'projects') {
      output = getTerminalProjectsOutput();
    } else if (lower === 'experience') {
      output = getTerminalExperienceOutput();
    } else if (lower === 'contact') {
      output = getTerminalContactOutput();
    } else if (lower === 'cv' || lower === 'resume') {
      output = (
        <span>
          Downloading {cv.filename}…{' '}
          <a href={cv.href} download={cv.filename} className="text-cyan hover:text-terminal underline">
            click here
          </a>{' '}
          if the download did not start.
        </span>
      );
      if (typeof window !== 'undefined') {
        const link = document.createElement('a');
        link.href = cv.href;
        link.download = cv.filename;
        link.click();
      }
    } else if (lower.startsWith('cd ')) {
      const target = lower.replace('cd ', '').trim().replace('./', '');
      if (target === 'home') {
        scrollTo('home');
        output = 'Navigated to home.';
      } else if (SECTIONS.includes(target)) {
        scrollTo(target);
        output = `Navigated to /${target}`;
      } else {
        output = `Directory not found: ${target}. Try: ${SECTIONS.join(', ')}`;
      }
    } else if (lower === 'sudo') {
      output = 'Nice try. Permission denied.';
    } else if (lower === 'ls') {
      output = getLsOutput();
    } else {
      output = `Command not found: ${trimmed}. Type "help" for available commands.`;
    }

    addTerminalLog({ command: cmd, output });
  }, [addTerminalLog, clearTerminalLogs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = terminalLogs.filter((l) => l.command).map((l) => l.command);
      if (commands.length > 0 && historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = terminalLogs.filter((l) => l.command).map((l) => l.command);
        setInput(commands[commands.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      setTerminalOpen(false);
    }
  };

  if (!isTerminalOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 md:hidden"
        onClick={() => setTerminalOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label="Interactive terminal"
        className="fixed z-50 inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 md:w-full md:max-w-xl animate-slide-up md:animate-fade-up"
      >
        <div className="terminal-panel shadow-2xl shadow-black/50 md:rounded-xl rounded-t-xl">
          <div className="terminal-panel-header">
            <button type="button" onClick={() => setTerminalOpen(false)} className="terminal-dot bg-red-500/80 hover:bg-red-500 transition-colors" aria-label="Close" />
            <div className="terminal-dot bg-yellow-500/80" />
            <div className="terminal-dot bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-subtle flex-1">
              {terminal.promptUser}@{terminal.promptHost} ~ interactive
            </span>
            <button type="button" onClick={() => setTerminalOpen(false)} className="text-subtle hover:text-foreground p-1" aria-label="Minimize">
              <Minimize2 size={14} />
            </button>
            <button type="button" onClick={() => setTerminalOpen(false)} className="text-subtle hover:text-foreground p-1 md:hidden" aria-label="Close">
              <X size={16} />
            </button>
          </div>

          <div className="p-4 h-[50vh] md:h-[360px] overflow-y-auto font-mono text-sm">
            {terminalLogs.map((log) => (
              <div key={log.id} className="mb-3">
                {log.command !== undefined && log.command !== '' && (
                  <div className="flex flex-wrap items-center gap-x-1.5">
                    <span className="prompt-user">{terminal.promptUser}</span>
                    <span className="prompt-symbol">@</span>
                    <span className="prompt-path">{terminal.promptHost}</span>
                    <span className="prompt-symbol"> ~ $</span>
                    <span className="text-foreground">{log.command}</span>
                  </div>
                )}
                {log.output && (
                  <div className="output-text mt-1 whitespace-pre-wrap leading-relaxed">
                    {log.output}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-x-1.5 mt-1">
              <span className="prompt-user">{terminal.promptUser}</span>
              <span className="prompt-symbol">@</span>
              <span className="prompt-path">{terminal.promptHost}</span>
              <span className="prompt-symbol"> ~ $</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-foreground p-0 caret-terminal"
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </div>
            <div ref={logsEndRef} />
          </div>

          <div className="px-4 py-2 border-t border-border bg-[#0C0C0E] hidden md:flex items-center justify-between">
            <span className="font-mono text-[10px] text-subtle">↑↓ history · Esc close · ` toggle</span>
            <span className="font-mono text-[10px] text-subtle">try: help · cd projects · cv</span>
          </div>
        </div>
      </div>
    </>
  );
}
