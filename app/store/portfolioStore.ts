import { create } from 'zustand';
import React from 'react';
import { portfolioData } from '../lib/portfolio';

export interface TerminalLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

interface PortfolioState {
  terminalLogs: TerminalLog[];
  isTerminalOpen: boolean;
  addTerminalLog: (log: Omit<TerminalLog, 'id'>) => void;
  clearTerminalLogs: () => void;
  toggleTerminal: () => void;
  setTerminalOpen: (isOpen: boolean) => void;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  activeProjectFilter: string;
  setActiveProjectFilter: (filter: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  terminalLogs: [
    {
      id: 'init',
      command: '',
      output: portfolioData.terminal.welcomeMessage,
    },
  ],
  isTerminalOpen: false,
  addTerminalLog: (log) =>
    set((state) => ({
      terminalLogs: [
        ...state.terminalLogs,
        { ...log, id: Math.random().toString(36).substring(7) },
      ],
    })),
  clearTerminalLogs: () => set({ terminalLogs: [] }),
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  setTerminalOpen: (isOpen) => set({ isTerminalOpen: isOpen }),
  activeSection: 'home',
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  activeProjectFilter: 'All',
  setActiveProjectFilter: (filter) => set({ activeProjectFilter: filter }),
}));
