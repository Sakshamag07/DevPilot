import React from 'react';
import {
  CheckCircle2,
  X,
  TrendingDown,
  TrendingUp,
  CheckSquare,
  GitPullRequest,
  Zap,
  Sparkles,
} from 'lucide-react';

interface CodeFixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFix: () => void;
  onRunTests: () => void;
  onCreatePR: () => void;
}

export const CodeFixModal: React.FC<CodeFixModalProps> = ({
  isOpen,
  onClose,
  onApplyFix,
  onRunTests,
  onCreatePR,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#0f121d] border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col space-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-[#0d0f1a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
                AI-Generated Code Fix
                <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Verified TTL eviction
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Target: src/services/payment.service.ts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CODE DIFF VIEWER */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BEFORE (Red Removal) */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 overflow-hidden font-mono">
              <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-500/20 flex items-center justify-between text-xs font-bold text-rose-300">
                <span>BEFORE (Line 186)</span>
                <span className="text-[10px] text-rose-400 uppercase">Unbounded Leak</span>
              </div>
              <div className="p-4 text-xs text-rose-200 leading-relaxed bg-[#0c080d]">
                <pre className="whitespace-pre-wrap font-mono">{`// Unbounded object mutation
cache[payment.id] = payment;`}</pre>
              </div>
            </div>

            {/* AFTER (Green Addition) */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 overflow-hidden font-mono">
              <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-xs font-bold text-emerald-300">
                <span>AFTER (Optimized Fix)</span>
                <span className="text-[10px] text-emerald-400 uppercase">LRU TTL eviction</span>
              </div>
              <div className="p-4 text-xs text-emerald-200 leading-relaxed bg-[#060f0d]">
                <pre className="whitespace-pre-wrap font-mono">{`// Expiring TTL Cache Strategy
cache.set(payment.id, payment, {
  ttl: 300 // 5-minute eviction
});`}</pre>
              </div>
            </div>
          </div>

          {/* ESTIMATED IMPACT CALLOUTS */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Estimated System Impact
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-emerald-300">Memory usage ↓ 42%</span>
                  <p className="text-[11px] text-slate-400">Prevents V8 heap memory overflow spikes.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-indigo-300">Performance ↑ 18%</span>
                  <p className="text-[11px] text-slate-400">Eliminates garbage collection pauses under load.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 border-t border-slate-800 bg-[#0d0f1a] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onApplyFix}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Fix</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onRunTests}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Run Tests</span>
            </button>

            <button
              onClick={onCreatePR}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Create PR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
