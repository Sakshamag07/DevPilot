import React, { useState } from 'react';
import {
  FileCode,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Wrench,
  HelpCircle,
  EyeOff,
  CheckCircle2,
  BrainCircuit,
  ArrowRight,
  Code2,
} from 'lucide-react';
import type { AIInvestigation, FileNode, NavigationTab } from '../../types';
import { mockFileTree } from '../../data/mockData';

interface AIDebuggerViewProps {
  investigation: AIInvestigation;
  onGenerateFix: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const AIDebuggerView: React.FC<AIDebuggerViewProps> = ({
  investigation,
  onGenerateFix,
  onNavigate,
}) => {
  const [selectedFile, setSelectedFile] = useState('payment.service.ts');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    src: true,
    'src/services': true,
  });
  const [showFurtherExplanation, setShowFurtherExplanation] = useState(false);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    if (node.type === 'folder') {
      const isExpanded = expandedFolders[node.path];
      return (
        <div key={node.path} className="select-none">
          <div
            onClick={() => toggleFolder(node.path)}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 cursor-pointer font-mono"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-slate-500" />
            ) : (
              <ChevronRight className="w-3 h-3 text-slate-500" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
            ) : (
              <Folder className="w-3.5 h-3.5 text-indigo-400/70" />
            )}
            <span>{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div className="space-y-0.5">
              {node.children.map((child) => renderFileNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    const isSelected = selectedFile === node.name;
    return (
      <div
        key={node.path}
        onClick={() => setSelectedFile(node.name)}
        style={{ paddingLeft: `${depth * 12 + 20}px` }}
        className={`flex items-center justify-between py-1 px-2 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
          isSelected
            ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <FileCode
            className={`w-3.5 h-3.5 ${node.hasError ? 'text-rose-400' : 'text-slate-500'}`}
          />
          <span className="truncate">{node.name}</span>
        </div>
        {node.hasError && (
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
        )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Top Banner Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f121d] border border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              AI Debugger Workspace
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Active Critical Memory Leak
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Target File: src/services/payment.service.ts : line 186
            </p>
          </div>
        </div>

        <button
          onClick={onGenerateFix}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group"
        >
          <Wrench className="w-4 h-4" />
          <span>Generate AI Fix</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3-PANEL IDE DEBUGGING LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[640px]">
        {/* PANEL 1: LEFT SIDEBAR FILE EXPLORER (3 cols) */}
        <div className="lg:col-span-3 bg-[#0c0e18] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Project Explorer
              </span>
              <span className="text-[10px] font-mono text-slate-500">TypeScript</span>
            </div>

            <div className="space-y-1">
              {mockFileTree.map((node) => renderFileNode(node))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-6 text-xs text-slate-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>AST Indexer Active</span>
          </div>
        </div>

        {/* PANEL 2: CENTER CODE EDITOR (5 cols) */}
        <div className="lg:col-span-5 bg-[#0a0c14] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col font-mono">
          {/* File Tab Header */}
          <div className="h-10 bg-[#0e101a] border-b border-slate-800 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <FileCode className="w-4 h-4 text-rose-400" />
              <span>payment.service.ts</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <span className="text-[11px] text-slate-500">Read-Only View</span>
          </div>

          {/* IDE Code Content */}
          <div className="flex-1 p-4 overflow-x-auto text-xs leading-relaxed space-y-1 bg-[#090a10]">
            <div className="text-slate-600">// Payment Processing Service</div>
            <div className="text-purple-400">import <span className="text-slate-200">{'{ processPayment, validateOrder }'}</span> from <span className="text-emerald-300">'./payment-gateway'</span>;</div>
            <div className="text-purple-400">import <span className="text-slate-200">{'{ OrderPayload, PaymentResult }'}</span> from <span className="text-emerald-300">'../types'</span>;</div>
            <div className="h-2" />

            <div className="text-slate-500">181:</div>
            <div className="text-slate-500">182: <span className="text-purple-400">export async function</span> <span className="text-yellow-300">processOrderPayment</span>(order: OrderPayload): Promise&lt;PaymentResult&gt; {'{'}</div>
            <div className="text-slate-500">183:   <span className="text-purple-400">const</span> validatedOrder = <span className="text-purple-400">await</span> validateOrder(order);</div>
            <div className="text-slate-500">184:   <span className="text-purple-400">const</span> payment = <span className="text-purple-400">await</span> processPayment(order);</div>
            <div className="text-slate-500">185:</div>

            {/* PROBLEM LINE HIGHLIGHTED */}
            <div className="my-2 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 relative group animate-pulse">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400">186: cache[payment.id] = payment;</span>
                <span className="text-[10px] uppercase font-bold bg-rose-500 text-white px-2 py-0.5 rounded">
                  Memory Leak Marker
                </span>
              </div>
              <div className="mt-1 text-[11px] text-rose-300 font-sans flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>AI Warning: Heap dictionary assignment without TTL eviction mechanism.</span>
              </div>
            </div>

            <div className="text-slate-500">187:   <span className="text-purple-400">return</span> payment;</div>
            <div className="text-slate-500">188: {'}'}</div>
          </div>
        </div>

        {/* PANEL 3: RIGHT AI INVESTIGATION CARD (4 cols) */}
        <div className="lg:col-span-4 bg-[#0f121d] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">AI Investigation</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Root cause identified
              </span>
            </div>

            {/* Diagnosis Cards */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Problem
                </span>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  {investigation.problem}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Root Cause
                </span>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  {investigation.rootCause}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  Estimated Impact
                </span>
                <p className="text-xs font-bold text-rose-200 mt-1">
                  {investigation.impact}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Recommended Fix
                </span>
                <p className="text-xs text-indigo-200 mt-1 font-medium">
                  {investigation.recommendedFix}
                </p>
              </div>
            </div>

            {/* AI Confidence */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">AI Model Confidence Score</span>
              <span className="font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded font-mono">
                {investigation.confidence}%
              </span>
            </div>

            {/* Further explanation dropdown toggle */}
            {showFurtherExplanation && (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 animate-in fade-in">
                <p className="font-semibold text-purple-300 mb-1">Deep Static Analysis:</p>
                Object keys matching `payment.id` are retained in `global.cache` without a garbage collector hook. Over 24 hours of peak load (10,000 checkout requests/hr), memory reaches 8.2GB threshold causing Node V8 OOM panic.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <button
              onClick={onGenerateFix}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Generate Fix</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowFurtherExplanation(!showFurtherExplanation)}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Explain Further</span>
              </button>

              <button
                onClick={() => onNavigate('overview')}
                className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Ignore</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
