import React, { useState } from 'react';
import {
  Search,
  Command,
  Bell,
  GitBranch,
  Server,
  Layers,
  Sparkles,
  ChevronDown,
  Check,
  AlertTriangle,
} from 'lucide-react';
import type { NavigationTab } from '../../types';

interface TopbarProps {
  collapsed: boolean;
  onOpenCommandPalette: () => void;
  onToggleAiDrawer: () => void;
  activeTab: NavigationTab;
  isAiDrawerOpen: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  collapsed,
  onOpenCommandPalette,
  onToggleAiDrawer,
  activeTab,
  isAiDrawerOpen,
}) => {
  const [selectedProject] = useState('E-Commerce API');
  const [selectedEnv] = useState('Production');
  const [selectedBranch] = useState('main');
  const [showNotifications, setShowNotifications] = useState(false);

  const getContextLabel = () => {
    switch (activeTab) {
      case 'debugger':
        return 'payment.service.ts : line 186';
      case 'tests':
        return 'PaymentCacheExpiry.test.ts';
      case 'deployments':
        return 'Deployment v2.4.1';
      case 'monitoring':
        return 'Production Metrics & Logs';
      case 'prs':
        return 'PR #248 (Auth & Cache)';
      case 'logs':
        return 'payment-service logs';
      default:
        return 'E-Commerce API / Production';
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 h-16 bg-[#090a0f]/90 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300 flex items-center justify-between px-4 md:px-6 ${
        collapsed ? 'ml-16' : 'ml-0 md:ml-64'
      }`}
    >
      {/* Left side: Project selectors */}
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
        {/* Project Selector */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 text-xs font-semibold text-slate-200 transition-colors">
            <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate max-w-[120px] md:max-w-[160px]">{selectedProject}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        <span className="text-slate-700 hidden sm:inline">/</span>

        {/* Environment Badge */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 transition-colors">
            <Server className="w-3.5 h-3.5" />
            <span>{selectedEnv}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>

        <span className="text-slate-700 hidden sm:inline">/</span>

        {/* Branch Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs font-mono text-slate-300">
          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
          <span>{selectedBranch}</span>
        </div>
      </div>

      {/* Center/Right: AI Context Pill & Command Palette & Actions */}
      <div className="flex items-center gap-3">
        {/* Context-Aware AI Pill */}
        <button
          onClick={onToggleAiDrawer}
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isAiDrawerOpen
              ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-md shadow-indigo-500/20'
              : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300 hover:border-indigo-400/60'
          }`}
          title="Open AI Context Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">AI Context:</span>
          <span className="font-semibold text-indigo-200 truncate max-w-[180px]">{getContextLabel()}</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-inner group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
          <span className="hidden lg:inline text-slate-400">Search command or file...</span>
          <span className="inline lg:hidden text-slate-400">Search</span>
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#090a0f]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0f121d] border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Notifications</span>
                <span className="text-[10px] font-semibold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full">
                  1 Critical
                </span>
              </div>
              <div className="py-2 space-y-2.5">
                <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 flex gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold text-rose-200">Critical Memory Leak</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Detected in payment.service.ts (+340MB/hr)</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">23m ago</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex gap-2.5">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold text-indigo-200">Deployment v2.4.1 Ready</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">All 148 automated unit tests passed.</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-[1px] cursor-pointer">
          <div className="w-full h-full rounded-full bg-[#090a0f] flex items-center justify-center font-bold text-xs text-indigo-300">
            AC
          </div>
        </div>
      </div>
    </header>
  );
};
