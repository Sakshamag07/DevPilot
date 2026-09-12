import React, { useState, useEffect } from 'react';
import {
  Search,
  Bug,
  CheckSquare,
  Rocket,
  Terminal,
  Sparkles,
  GitPullRequest,
  RotateCcw,
  FileCode,
  Globe,
  ArrowRight,
} from 'lucide-react';
import type { NavigationTab } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onTriggerAction: (action: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerAction,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    {
      id: 'debug-error',
      title: 'Debug latest error with AI',
      subtitle: 'Jump directly to memory leak in payment.service.ts',
      icon: Bug,
      category: 'AI Workflows',
      action: () => {
        onNavigate('debugger');
        onClose();
      },
    },
    {
      id: 'run-tests',
      title: 'Run test suite',
      subtitle: 'Execute unit, integration, and E2E tests',
      icon: CheckSquare,
      category: 'Testing',
      action: () => {
        onNavigate('tests');
        onTriggerAction('run-tests');
        onClose();
      },
    },
    {
      id: 'deploy',
      title: 'Deploy to Production',
      subtitle: 'Trigger zero-downtime release pipeline v2.4.1',
      icon: Rocket,
      category: 'Deployments',
      action: () => {
        onNavigate('deployments');
        onTriggerAction('deploy');
        onClose();
      },
    },
    {
      id: 'open-file',
      title: 'Open payment.service.ts',
      subtitle: 'src/services/payment.service.ts',
      icon: FileCode,
      category: 'Code Search',
      action: () => {
        onNavigate('debugger');
        onClose();
      },
    },
    {
      id: 'view-logs',
      title: 'View live logs',
      subtitle: 'Open log explorer for payment-service',
      icon: Terminal,
      category: 'Monitoring',
      action: () => {
        onNavigate('logs');
        onClose();
      },
    },
    {
      id: 'rollback',
      title: 'Rollback latest deployment',
      subtitle: 'Revert Production back to stable v2.4.0',
      icon: RotateCcw,
      category: 'Deployments',
      action: () => {
        onNavigate('deployments');
        onTriggerAction('rollback');
        onClose();
      },
    },
    {
      id: 'ask-ai',
      title: 'Ask Contextual AI Assistant',
      subtitle: 'Open AI side drawer for real-time guidance',
      icon: Sparkles,
      category: 'AI Workflows',
      action: () => {
        onTriggerAction('open-ai-drawer');
        onClose();
      },
    },
    {
      id: 'create-pr',
      title: 'Review Pull Request #248',
      subtitle: 'Optimize authentication middleware',
      icon: GitPullRequest,
      category: 'Pull Requests',
      action: () => {
        onNavigate('prs');
        onClose();
      },
    },
    {
      id: 'switch-env',
      title: 'Switch Environment',
      subtitle: 'Toggle between Staging and Production',
      icon: Globe,
      category: 'Settings',
      action: () => {
        onTriggerAction('switch-env');
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filtered, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0f121e] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#0d0f17]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, file name, or action (e.g., debug, deploy, logs)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <kbd className="text-[10px] text-slate-400 font-mono px-2 py-1 rounded bg-slate-800 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No matching commands found for "{query}"
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-slate-100'
                      : 'hover:bg-slate-800/40 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="text-xs font-semibold truncate">{cmd.title}</span>
                      <span className="text-[11px] text-slate-400 truncate">{cmd.subtitle}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight className="w-4 h-4 text-indigo-400 animate-pulse" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-[#0a0c13] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↵</kbd> Select
            </span>
          </div>
          <span className="text-slate-400 font-mono">DevPilot AI Command v2.4</span>
        </div>
      </div>
    </div>
  );
};
