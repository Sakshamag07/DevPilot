import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Bug,
  BrainCircuit,
  Wrench,
  CheckCircle2,
  Rocket,
  Activity,
  Play,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface LandingPageProps {
  onOpenWorkspace: () => void;
  onStartDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenWorkspace, onStartDemo }) => {
  const workflowSteps = [
    { icon: Code2, label: 'Code', desc: 'Continuous repo analysis', color: 'from-blue-500 to-indigo-500' },
    { icon: Bug, label: 'AI Detects', desc: 'Instant anomaly detection', color: 'from-rose-500 to-pink-500' },
    { icon: BrainCircuit, label: 'AI Explains', desc: 'Root cause breakdown', color: 'from-amber-500 to-orange-500' },
    { icon: Wrench, label: 'Fix', desc: 'Automated TTL code diffs', color: 'from-emerald-500 to-teal-500' },
    { icon: CheckCircle2, label: 'Test', desc: 'Animated suite execution', color: 'from-cyan-500 to-blue-500' },
    { icon: Rocket, label: 'Deploy', desc: 'Zero-downtime pipeline', color: 'from-purple-500 to-indigo-500' },
    { icon: Activity, label: 'Monitor', desc: 'Real-time trace telemetry', color: 'from-violet-500 to-fuchsia-500' },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-600/10 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none" />

      {/* Landing Navigation */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <div className="w-full h-full bg-[#090a0f] rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
            DevPilot
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              AI Command Center
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onStartDemo}
            className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
            Watch Guided Demo
          </button>
          <button
            onClick={onOpenWorkspace}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            Open Developer Workspace
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-20 z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8 animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Next-Generation AI Command Center for Engineering Teams</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl leading-[1.15]">
          Ship better code.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Faster.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          One intelligent workspace to detect bugs, understand failures, test fixes, deploy confidently, and monitor what happens next.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenWorkspace}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Open Developer Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onStartDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2.5"
          >
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/30" />
            <span>Interactive 12-Step Demo</span>
          </button>
        </div>

        {/* Interactive Workflow Node Stream */}
        <div className="mt-20 w-full">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
            Continuous DevPilot Lifecycle Chain
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  onClick={onOpenWorkspace}
                  className="group relative p-4 rounded-2xl bg-[#0f121d] border border-slate-800/80 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col items-center text-center shadow-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} p-[1px] mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full bg-[#0f121d] rounded-[11px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-100">{step.label}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{step.desc}</span>

                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-8 border-t border-slate-900 text-center z-10">
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
          </span>
          <span>•</span>
          <span>Linear + Vercel + GitHub + Raycast Integration Engine</span>
        </div>
      </footer>
    </div>
  );
};
