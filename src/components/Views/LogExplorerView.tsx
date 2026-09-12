import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { LogEntry, NavigationTab } from '../../types';

interface LogExplorerViewProps {
  logs: LogEntry[];
  onNavigate: (tab: NavigationTab) => void;
}

export const LogExplorerView: React.FC<LogExplorerViewProps> = ({ logs, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [selectedLogForAi, setSelectedLogForAi] = useState<LogEntry | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            Log Explorer
            <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full">
              Live Stream
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Production system telemetry with contextual AI automated root cause analysis
          </p>
        </div>

        <button
          onClick={() => onNavigate('debugger')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Debug Error with AI</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="p-4 rounded-2xl bg-[#0f121d] border border-slate-800 flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs by keyword, error code, or service..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['ALL', 'ERROR', 'WARN', 'INFO'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                severityFilter === sev
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* LOGS TABLE LIST */}
      <div className="rounded-2xl border border-slate-800 bg-[#0c0e18] overflow-hidden font-mono">
        <div className="px-4 py-3 bg-[#0e101a] border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
          <span>TIME & SEVERITY</span>
          <span>SERVICE & MESSAGE</span>
          <span>AI ACTION</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {filteredLogs.map((log) => {
            const isError = log.severity === 'ERROR';
            const isWarn = log.severity === 'WARN';

            return (
              <div
                key={log.id}
                className="p-4 hover:bg-slate-900/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                {/* Time & Severity Badge */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-500">{log.timestamp}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                      isError
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isWarn
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {log.severity}
                  </span>
                </div>

                {/* Service & Message */}
                <div className="flex-1 min-w-0">
                  <span className="text-indigo-400 font-semibold mr-2">[{log.service}]</span>
                  <span className="text-slate-200">{log.message}</span>
                </div>

                {/* AI Action Button */}
                <button
                  onClick={() => setSelectedLogForAi(log)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-sans text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Analyze with AI</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI LOG ANALYZER MODAL */}
      {selectedLogForAi && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0f121d] border border-indigo-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h3 className="text-base font-bold text-slate-100">AI Contextual Log Analysis</h3>
              </div>
              <button
                onClick={() => setSelectedLogForAi(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300">
              [{selectedLogForAi.timestamp}] {selectedLogForAi.severity} {selectedLogForAi.service}:{' '}
              {selectedLogForAi.message}
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
              <span className="text-xs font-bold uppercase text-indigo-400">AI Explanation</span>
              <p className="text-xs text-indigo-200 leading-relaxed font-sans">
                {selectedLogForAi.aiAnalysis}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedLogForAi(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setSelectedLogForAi(null);
                  onNavigate('debugger');
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2"
              >
                <span>Debug Issue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
