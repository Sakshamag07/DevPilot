import React from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { MonitoringMetrics, AIIncident, NavigationTab } from '../../types';

interface MonitoringViewProps {
  metrics: MonitoringMetrics;
  incident: AIIncident;
  onNavigate: (tab: NavigationTab) => void;
  onInvestigateIncident: () => void;
  onRollback: () => void;
}

export const MonitoringView: React.FC<MonitoringViewProps> = ({
  metrics,
  incident,
  onInvestigateIncident,
  onRollback,
}) => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* AI INCIDENT DETECTION BANNER (Hero Monitoring Innovation) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/80 via-purple-950/40 to-slate-900 border border-rose-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                  {incident.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Confidence: <span className="text-white font-bold">{incident.confidence}%</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 mt-1">{incident.subtitle}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRollback}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rollback Deployment</span>
            </button>

            <button
              onClick={onInvestigateIncident}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Investigate Issue</span>
            </button>
          </div>
        </div>

        {/* AI CHAIN OF REASONING CROSS-WORKFLOW LINK */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
            AI Automated Cross-Workflow Chain of Reasoning:
          </span>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              Deployment {incident.chainOfReasoning.deployment}
            </div>
            <span className="text-slate-600">➔</span>

            <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
              {incident.chainOfReasoning.logSample}
            </div>
            <span className="text-slate-600">➔</span>

            <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
              Error: {incident.chainOfReasoning.errorName}
            </div>
            <span className="text-slate-600">➔</span>

            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold">
              Root File: {incident.chainOfReasoning.codeFile}
            </div>
          </div>
        </div>
      </div>

      {/* METRICS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-[#0f121d] border border-slate-800">
          <span className="text-xs font-bold uppercase text-slate-500">Requests</span>
          <div className="text-2xl font-black text-slate-100 mt-2 font-mono">{metrics.requestsPerSec}</div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-xs font-bold uppercase text-emerald-400">Error Rate</span>
          <div className="text-2xl font-black text-emerald-300 mt-2 font-mono">{metrics.errorRate}</div>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
          <span className="text-xs font-bold uppercase text-indigo-400">Latency</span>
          <div className="text-2xl font-black text-indigo-300 mt-2 font-mono">{metrics.latencyMs}ms</div>
        </div>

        <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
          <span className="text-xs font-bold uppercase text-purple-400">Uptime</span>
          <div className="text-2xl font-black text-purple-300 mt-2 font-mono">{metrics.uptimePct}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-bold uppercase text-slate-400">Memory</span>
          <div className="text-2xl font-black text-slate-200 mt-2 font-mono">{metrics.memoryPct}%</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs font-bold uppercase text-slate-400">CPU</span>
          <div className="text-2xl font-black text-slate-200 mt-2 font-mono">{metrics.cpuPct}%</div>
        </div>
      </div>

      {/* SVG METRICS CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency & Requests Chart */}
        <div className="p-6 rounded-3xl bg-[#0f121d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">API Response Latency (ms)</h3>
            <span className="text-xs text-indigo-400 font-mono">182ms baseline</span>
          </div>

          <div className="h-44 w-full flex items-end gap-3 pt-6 border-b border-slate-800">
            {metrics.history.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-500 group-hover:from-indigo-400 group-hover:to-purple-300 transition-all"
                  style={{ height: `${(h.latency / 300) * 100}%` }}
                />
                <span className="text-[10px] text-slate-500 font-mono">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Stream */}
        <div className="p-6 rounded-3xl bg-[#0f121d] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between">
            <span>Real-time Activity Stream</span>
            <span className="text-xs text-slate-500 font-mono">Live Telemetry</span>
          </h3>

          <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
            {metrics.activityStream.map((act, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-500">{act.timestamp}</span>
                  <span className="font-semibold text-slate-200">{act.text}</span>
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${
                    act.type === 'success'
                      ? 'bg-emerald-400'
                      : act.type === 'critical'
                      ? 'bg-rose-400'
                      : 'bg-indigo-400'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
