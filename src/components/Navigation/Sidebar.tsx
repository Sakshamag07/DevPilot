import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Bug,
  AlertCircle,
  CheckSquare,
  Rocket,
  Activity,
  Terminal,
  GitPullRequest,
  Building2,
  Users,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';
import type { NavigationTab } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeIssueCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  activeIssueCount,
}) => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

  const mainNav = [
    { id: 'overview' as NavigationTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'projects' as NavigationTab, label: 'Projects', icon: FolderGit2 },
    { id: 'code' as NavigationTab, label: 'Code', icon: Code2 },
    { id: 'debugger' as NavigationTab, label: 'AI Debugger', icon: Bug, badge: 'Hero', isAi: true },
    { id: 'issues' as NavigationTab, label: 'Issues', icon: AlertCircle, badgeCount: activeIssueCount },
    { id: 'tests' as NavigationTab, label: 'Tests', icon: CheckSquare },
    { id: 'deployments' as NavigationTab, label: 'Deployments', icon: Rocket },
    { id: 'monitoring' as NavigationTab, label: 'Monitoring', icon: Activity },
    { id: 'logs' as NavigationTab, label: 'Logs', icon: Terminal },
    { id: 'prs' as NavigationTab, label: 'Pull Requests', icon: GitPullRequest, badgeCount: 1 },
  ];

  const secondaryNav = [
    { id: 'workspace' as NavigationTab, label: 'Workspace', icon: Building2 },
    { id: 'team' as NavigationTab, label: 'Team', icon: Users },
    { id: 'integrations' as NavigationTab, label: 'Integrations', icon: Plug },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0d0f17] border-r border-slate-800/60 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60">
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d0f17] rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                DevPilot
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Command Center</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors hidden md:flex items-center justify-center"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {/* Main Nav */}
        <div className="space-y-1">
          {!collapsed && (
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase px-3 py-1 block">
              Core Navigation
            </span>
          )}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}

                {/* Hero / AI Badge */}
                {item.isAi && !collapsed && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Hero
                  </span>
                )}

                {/* Badge Count */}
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span
                    className={`ml-auto px-1.5 py-0.5 rounded-full text-xs font-bold ${
                      collapsed ? 'absolute -top-1 -right-1 ring-2 ring-[#0d0f17]' : ''
                    } ${
                      item.id === 'issues'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/60 my-2" />

        {/* Secondary Nav */}
        <div className="space-y-1">
          {!collapsed && (
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase px-3 py-1 block">
              Workspace & Team
            </span>
          )}
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile & Footer */}
      <div className="p-3 border-t border-slate-800/60 bg-[#0a0c13]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs border border-indigo-400/40">
                AC
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0d0f17]" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate">Alex Chen</span>
                <span className="text-[11px] text-slate-500 truncate">Staff Engineer</span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
