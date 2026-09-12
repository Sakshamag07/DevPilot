import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileCode,
  Wrench,
  GitBranch,
} from 'lucide-react';
import type { PullRequest, NavigationTab } from '../../types';

interface PullRequestsViewProps {
  pr: PullRequest;
  onNavigate: (tab: NavigationTab) => void;
  onGenerateFix: () => void;
}

export const PullRequestsView: React.FC<PullRequestsViewProps> = ({
  pr,
  onNavigate,
  onGenerateFix,
}) => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* PR Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0f121d] border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
                PR #{pr.number}: {pr.title}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                {pr.status}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-purple-300">
                <GitBranch className="w-3.5 h-3.5" />
                {pr.branch}
              </span>
              <span>➔</span>
              <span>{pr.targetBranch}</span>
              <span>•</span>
              <span>{pr.author}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('tests')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold"
            >
              View Test Run
            </button>
            <button
              onClick={onGenerateFix}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md flex items-center gap-2"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Generate Fix</span>
            </button>
          </div>
        </div>

        {/* PR Stats Bar */}
        <div className="flex items-center gap-6 pt-4 border-t border-slate-800 text-xs font-mono">
          <div>
            Files changed: <span className="text-slate-200 font-bold">{pr.filesChanged}</span>
          </div>
          <div>
            Additions: <span className="text-emerald-400 font-bold">+{pr.additions}</span>
          </div>
          <div>
            Deletions: <span className="text-rose-400 font-bold">-{pr.deletions}</span>
          </div>
        </div>
      </div>

      {/* AI REVIEW SCORE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0f121d] border border-indigo-500/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-indigo-500"
                strokeWidth="10"
                strokeDasharray="251"
                strokeDashoffset={251 - (251 * pr.aiReviewScore) / 100}
                strokeLinecap="round"
                stroke="#6366f1"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{pr.aiReviewScore}</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">/ 100</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Review Score</h3>
            <p className="text-xs text-slate-400 mt-1">High confidence approval</p>
          </div>
        </div>

        {/* AI FINDINGS CHECKLIST */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0f121d] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            AI Automated Findings Checklist
          </h3>

          <div className="space-y-3">
            {pr.findings.map((finding, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
                  finding.type === 'success'
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                }`}
              >
                {finding.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span>{finding.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INLINE CODE REVIEW COMMENTS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          Inline AI Code Comments
        </h3>

        <div className="space-y-4">
          {pr.inlineComments.map((comment, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0f121d] border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-300 font-bold">{comment.file} : line {comment.line}</span>
                <span className="text-slate-500">Suggested by DevPilot AI</span>
              </div>

              <p className="text-xs text-slate-200">{comment.comment}</p>

              {comment.suggestion && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300">
                  {comment.suggestion}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onGenerateFix}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Generate Fix</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
