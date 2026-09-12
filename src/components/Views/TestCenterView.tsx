import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Play,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import type { TestSummary, TestSuite, NavigationTab } from '../../types';

interface TestCenterViewProps {
  summary: TestSummary;
  onNavigate: (tab: NavigationTab) => void;
  autoRunTrigger?: boolean;
}

export const TestCenterView: React.FC<TestCenterViewProps> = ({
  summary,
  onNavigate,
  autoRunTrigger = false,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(4); // 4 = finished
  const [selectedFailedTest, setSelectedFailedTest] = useState<TestSuite | null>(null);

  const stages = [
    { label: 'Unit Tests', count: '82 tests' },
    { label: 'Integration Tests', count: '44 tests' },
    { label: 'API Tests', count: '21 tests' },
    { label: 'E2E Tests', count: '8 tests' },
  ];

  const handleRunTests = () => {
    setIsRunning(true);
    setActiveStage(0);

    const timer1 = setTimeout(() => setActiveStage(1), 800);
    const timer2 = setTimeout(() => setActiveStage(2), 1600);
    const timer3 = setTimeout(() => setActiveStage(3), 2400);
    const timer4 = setTimeout(() => {
      setActiveStage(4);
      setIsRunning(false);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  useEffect(() => {
    if (autoRunTrigger) {
      handleRunTests();
    }
  }, [autoRunTrigger]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            Test Center
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              Automated CI Runner
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time test suite execution with continuous coverage telemetry
          </p>
        </div>

        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
        >
          {isRunning ? (
            <RotateCcw className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white" />
          )}
          <span>{isRunning ? 'Running Test Suite...' : 'Run Tests'}</span>
        </button>
      </div>

      {/* ANIMATED EXECUTION STEPPER */}
      {isRunning ? (
        <div className="p-8 rounded-3xl bg-[#0f121d] border border-indigo-500/40 shadow-2xl space-y-6">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Executing Test Pipeline...
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {stages.map((st, idx) => {
              const isCompleted = activeStage > idx;
              const isCurrent = activeStage === idx;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : isCurrent
                      ? 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200 animate-pulse'
                      : 'bg-slate-900/50 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">{st.label}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-700" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{st.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TEST RESULTS METRICS BREAKDOWN */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[#0f121d] border border-slate-800">
            <span className="text-xs font-bold uppercase text-slate-500">Total Tests</span>
            <div className="text-2xl font-black text-slate-100 mt-2 font-mono">{summary.total}</div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <span className="text-xs font-bold uppercase text-emerald-400">Passed</span>
            <div className="text-2xl font-black text-emerald-300 mt-2 font-mono">
              {summary.passed}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
            <span className="text-xs font-bold uppercase text-rose-400">Failed</span>
            <div className="text-2xl font-black text-rose-300 mt-2 font-mono">
              {summary.failed}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-bold uppercase text-slate-400">Skipped</span>
            <div className="text-2xl font-black text-slate-400 mt-2 font-mono">
              {summary.skipped}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
            <span className="text-xs font-bold uppercase text-indigo-400">Coverage</span>
            <div className="text-2xl font-black text-indigo-300 mt-2 font-mono">
              {summary.coverage}%
            </div>
          </div>
        </div>
      )}

      {/* FAILED TESTS LIST & AI FIX DISCOVERY */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          Failed Test Suite Investigations
        </h3>

        <div className="space-y-3">
          {summary.suites
            .filter((s) => s.status === 'failed')
            .map((test) => (
              <div
                key={test.id}
                className="p-5 rounded-2xl bg-[#0f121d] border border-rose-500/30 hover:border-rose-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-rose-950/10"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-sm font-bold text-slate-100 font-mono">{test.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                      {test.type}
                    </span>
                  </div>
                  {test.errorDetails && (
                    <p className="text-xs text-rose-300 font-mono pl-6">
                      {test.errorDetails.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedFailedTest(test)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Fix Test</span>
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* AI FIX TEST DRAWER / MODAL */}
      {selectedFailedTest && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0f121d] border border-indigo-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                <h3 className="text-base font-bold text-slate-100">
                  AI Test Diagnosis: {selectedFailedTest.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFailedTest(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 font-mono text-xs text-rose-300">
                {selectedFailedTest.errorDetails?.stackTrace}
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-indigo-400">AI Explanation</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedFailedTest.errorDetails?.aiFixExplanation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-400">Suggested Test Remediation</span>
                <p className="text-xs text-emerald-200 font-mono">
                  {selectedFailedTest.errorDetails?.suggestedFix}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedFailedTest(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedFailedTest(null);
                  onNavigate('deployments');
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2"
              >
                <span>Proceed to Deploy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
