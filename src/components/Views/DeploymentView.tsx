import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  RotateCcw,
  Terminal,
  GitCommit,
  User,
  Clock,
  Play,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { DeploymentState, NavigationTab } from '../../types';

interface DeploymentViewProps {
  deployment: DeploymentState;
  onNavigate: (tab: NavigationTab) => void;
  onRollback: () => void;
  onSimulateDeploy: () => void;
}

export const DeploymentView: React.FC<DeploymentViewProps> = ({
  deployment,
  onNavigate,
  onRollback,
  onSimulateDeploy,
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(6); // 6 = completed

  const handleDeployClick = () => {
    setIsDeploying(true);
    setActiveStageIdx(0);
    onSimulateDeploy();

    const stageTimers = [0, 1, 2, 3, 4, 5].map((idx) =>
      setTimeout(() => setActiveStageIdx(idx + 1), (idx + 1) * 800)
    );

    setTimeout(() => {
      setIsDeploying(false);
    }, 5000);

    return () => stageTimers.forEach(clearTimeout);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0f121d] border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-100">Production Release</h1>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live: {deployment.version}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <GitCommit className="w-3.5 h-3.5 text-purple-400" />
                Commit: <code className="text-slate-200">{deployment.commit}</code>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                {deployment.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {deployment.timestamp}
              </span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('logs')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>View Logs</span>
          </button>

          <button
            onClick={onRollback}
            className="px-4 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rollback</span>
          </button>

          <button
            onClick={handleDeployClick}
            disabled={isDeploying}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isDeploying ? 'Deploying...' : 'Deploy'}</span>
          </button>
        </div>
      </div>

      {/* VISUAL DEPLOYMENT PIPELINE STEPPER */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0f121d] border border-slate-800 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Zero-Downtime Deployment Pipeline</span>
          <span className="text-xs font-mono text-emerald-400">Canary Health Checks Active</span>
        </h2>

        {/* Stepper Node Graph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {deployment.stages.map((stage, idx) => {
            const isCompleted = activeStageIdx > idx;
            const isCurrent = activeStageIdx === idx && isDeploying;

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between h-32 relative ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200 animate-pulse'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-slate-800/80">
                    Step 0{idx + 1}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-slate-700" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-100">{stage.name}</h4>
                  <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                    {stage.duration || 'Running'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTEXT NEXT STEP CTA */}
      <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span className="text-xs text-indigo-200 font-semibold">
            Deployment v2.4.1 verified. Next step: Monitor real-time telemetry metrics.
          </span>
        </div>
        <button
          onClick={() => onNavigate('monitoring')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2"
        >
          <span>Open Monitoring</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
