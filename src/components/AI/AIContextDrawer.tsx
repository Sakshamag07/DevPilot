import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Code2,
  ArrowUpRight,
} from 'lucide-react';
import type { NavigationTab } from '../../types';

interface AIContextDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: Array<{ label: string; action: () => void }>;
}

export const AIContextDrawer: React.FC<AIContextDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Alex 👋 I'm continuous monitoring `E-Commerce API` in **Production**. I detected a critical memory leak in `payment.service.ts:184` (+340 MB/hr). How can I assist you?",
      timestamp: '12:43 PM',
      actions: [
        {
          label: '⚡ Investigate Memory Leak',
          action: () => onNavigate('debugger'),
        },
        {
          label: '🔍 Correlate Logs',
          action: () => onNavigate('logs'),
        },
      ],
    },
  ]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      let aiText = `I analyzed your request regarding "${currentInput}". I recommend replacing the unbounded memory cache with an expiring LRU TTL cache strategy in payment.service.ts.`;
      let actions = [
        {
          label: 'Fix in AI Debugger',
          action: () => onNavigate('debugger'),
        },
        {
          label: 'Run Test Suite',
          action: () => onNavigate('tests'),
        },
      ];

      if (currentInput.toLowerCase().includes('log') || activeTab === 'logs') {
        aiText = `Analyzing production logs around 12:41:03... Found database connection timeouts correlating directly with heap exhaustion in processPayment().`;
      } else if (currentInput.toLowerCase().includes('deploy') || activeTab === 'deployments') {
        aiText = `Deployment v2.4.1 is currently Live in Production. All canary health checks are passing with 99.98% uptime.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions,
        },
      ]);
    }, 600);
  };

  return (
    <aside className="fixed right-0 top-16 bottom-0 z-40 w-full sm:w-[420px] bg-[#0c0e18] border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800/80 bg-[#0d0f1b] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Contextual AI
              <span className="text-[10px] font-mono font-normal bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">
                GPT-4o-Dev
              </span>
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Active Context:</span>
              <span className="text-indigo-300 font-semibold truncate max-w-[140px]">
                payment.service.ts
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Context Chips Banner */}
      <div className="px-4 py-2 bg-indigo-950/20 border-b border-indigo-500/10 flex items-center justify-between text-xs text-indigo-300">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tracking Code + Logs + Metrics</span>
        </div>
        <span className="text-[10px] bg-indigo-500/20 text-indigo-200 font-mono px-2 py-0.5 rounded">
          v2.4.1 Live
        </span>
      </div>

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md shadow-indigo-500/20">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-2`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1.5 text-right ${
                    msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {/* Action Suggestion Buttons */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.actions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={act.action}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all flex items-center gap-1 group"
                    >
                      <span>{act.label}</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-[#0d0f1b]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI about code, stack traces, deployments..."
            className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
          <button
            type="submit"
            className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </aside>
  );
};
