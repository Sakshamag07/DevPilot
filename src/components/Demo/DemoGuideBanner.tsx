import React from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { demoSteps } from '../../data/mockData';

interface DemoGuideBannerProps {
  activeStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onExitDemo: () => void;
}

export const DemoGuideBanner: React.FC<DemoGuideBannerProps> = ({
  activeStep,
  onNextStep,
  onPrevStep,
  onExitDemo,
}) => {
  const currentStep = demoSteps.find((s) => s.step === activeStep) || demoSteps[0];
  const progressPct = (activeStep / demoSteps.length) * 100;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92%] sm:w-full bg-[#0f1220]/95 backdrop-blur-xl border border-indigo-500/40 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-8 duration-300">
      {/* Top progress bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-extrabold text-xs shrink-0">
            {activeStep}/{demoSteps.length}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-100 truncate">
                {currentStep.title}
              </span>
              {currentStep.actionText && (
                <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full shrink-0">
                  {currentStep.actionText}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 truncate mt-0.5">{currentStep.instruction}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {activeStep > 1 && (
            <button
              onClick={onPrevStep}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
              title="Previous Step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onNextStep}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5"
          >
            <span>{activeStep === demoSteps.length ? 'Finish Demo' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onExitDemo}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit Guided Demo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
