import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import type { IssueItem, ProjectHealth, NavigationTab } from '../../types';

interface OverviewViewProps {
  health: ProjectHealth;
  issues: IssueItem[];
  onNavigate: (tab: NavigationTab) => void;
  onInvestigateIssue: (issueId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  health,
  issues,
  onNavigate,
  onInvestigateIssue,
}) => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Good afternoon, Alex 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">Here's what needs your attention right now.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('debugger')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Debugger</span>
          </button>
        </div>
      </div>

      {/* AI PROJECT HEALTH HERO SECTION */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0f121d] border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radial Health Score Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800/80">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* SVG Radial Progress Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-slate-800/80"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-indigo-500 transition-all duration-1000"
                  strokeWidth="10"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * health.overallScore) / 100}
                  strokeLinecap="round"
                  stroke="url(#gradientHealth)"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="gradientHealth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center text-center">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {health.overallScore}
                </span>
                <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                  Out of 100
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Project Health: {health.statusText}
              </div>
            </div>
          </div>

          {/* Health Breakdown Metrics */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Continuous Intelligence Health Index
            </h3>

            <div className="space-y-3">
              {[
                { label: 'Code Quality', pct: health.breakdown.codeQuality, color: 'bg-indigo-500' },
                { label: 'Test Coverage', pct: health.breakdown.testCoverage, color: 'bg-purple-500' },
                { label: 'Performance', pct: health.breakdown.performance, color: 'bg-emerald-500' },
                { label: 'Security', pct: health.breakdown.security, color: 'bg-cyan-500' },
                { label: 'Deployment Health', pct: health.breakdown.deploymentHealth, color: 'bg-amber-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-slate-200 font-mono">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHAT NEEDS ATTENTION SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              What Needs Attention
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              AI prioritized action items sorted by severity & impact
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Showing {issues.length} active items
          </span>
        </div>

        {/* Issue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {issues.map((issue) => {
            const isCritical = issue.severity === 'critical';
            const isWarning = issue.severity === 'warning';

            return (
              <div
                key={issue.id}
                className={`p-6 rounded-2xl bg-[#0f121d] border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isCritical
                    ? 'border-rose-500/40 hover:border-rose-500 shadow-lg shadow-rose-950/20'
                    : isWarning
                    ? 'border-amber-500/40 hover:border-amber-500 shadow-lg shadow-amber-950/20'
                    : 'border-emerald-500/40 hover:border-emerald-500 shadow-lg shadow-emerald-950/20'
                }`}
              >
                {/* Severity Badge & Time */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {isCritical ? (
                        <AlertCircle className="w-3.5 h-3.5" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <Zap className="w-3.5 h-3.5" />
                      )}
                      {issue.severity}
                    </span>

                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {issue.detectedAgo}
                    </span>
                  </div>

                  {/* Title & File */}
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {issue.title}
                  </h3>

                  <div className="mt-2 inline-block px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300">
                    {issue.file} {issue.lineNumber ? `: ${issue.lineNumber}` : ''}
                  </div>

                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {issue.description}
                  </p>
                </div>

                {/* AI Confidence & Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[11px] text-slate-400 font-medium">AI Confidence:</span>
                    <span className="text-xs font-bold text-slate-200">{issue.aiConfidence}%</span>
                  </div>

                  <button
                    onClick={() => {
                      if (isCritical) {
                        onInvestigateIssue(issue.id);
                      } else if (isWarning) {
                        onNavigate('logs');
                      } else {
                        onNavigate('code');
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md ${
                      isCritical
                        ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                        : isWarning
                        ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                    }`}
                  >
                    <span>{issue.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
