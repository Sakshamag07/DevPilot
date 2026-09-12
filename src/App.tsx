import { useState } from 'react';
import { Sidebar } from './components/Navigation/Sidebar';
import { Topbar } from './components/Navigation/Topbar';
import { CommandPalette } from './components/Navigation/CommandPalette';
import { AIContextDrawer } from './components/AI/AIContextDrawer';
import { LandingPage } from './components/LandingPage';
import { OverviewView } from './components/Views/OverviewView';
import { AIDebuggerView } from './components/Views/AIDebuggerView';
import { CodeFixModal } from './components/Views/CodeFixModal';
import { TestCenterView } from './components/Views/TestCenterView';
import { DeploymentView } from './components/Views/DeploymentView';
import { MonitoringView } from './components/Views/MonitoringView';
import { LogExplorerView } from './components/Views/LogExplorerView';
import { PullRequestsView } from './components/Views/PullRequestsView';
import { DemoGuideBanner } from './components/Demo/DemoGuideBanner';
import { ToastContainer } from './components/Common/Toast';
import type { ToastMessage } from './components/Common/Toast';
import type { NavigationTab } from './types';
import {
  mockProjectHealth,
  mockIssues,
  mockAIInvestigation,
  mockTestSummary,
  mockDeploymentState,
  mockLogs,
  mockPullRequest,
  mockMonitoringMetrics,
  mockAIIncident,
  demoSteps,
} from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isCodeFixOpen, setIsCodeFixOpen] = useState(false);
  const [autoRunTests, setAutoRunTests] = useState(false);

  // Demo Guided Flow State
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(1);

  // Toast System State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Demo Step Controller
  const handleStartDemo = () => {
    setIsDemoMode(true);
    setDemoStep(1);
    setActiveTab('overview');
    addToast({
      type: 'info',
      title: 'Guided Demo Started',
      message: 'Step 1: Reviewing AI Project Health & Critical Issues.',
    });
  };

  const handleNextDemoStep = () => {
    const next = demoStep + 1;
    if (next > demoSteps.length) {
      setIsDemoMode(false);
      addToast({
        type: 'success',
        title: 'Demo Completed!',
        message: 'You have completed the DevPilot continuous developer lifecycle workflow.',
      });
      return;
    }
    setDemoStep(next);
    const stepObj = demoSteps.find((s) => s.step === next);
    if (stepObj) {
      setActiveTab(stepObj.targetTab);
      if (next === 4 || next === 5) {
        setIsCodeFixOpen(true);
      }
    }
  };

  const handlePrevDemoStep = () => {
    const prev = Math.max(1, demoStep - 1);
    setDemoStep(prev);
    const stepObj = demoSteps.find((s) => s.step === prev);
    if (stepObj) {
      setActiveTab(stepObj.targetTab);
    }
  };

  // Interactive Actions
  const handleInvestigateIssue = (_issueId?: string) => {
    setActiveTab('debugger');
    addToast({
      type: 'info',
      title: 'AI Debugger Workspace Loaded',
      message: 'Analyzing heap dump & AST for payment.service.ts:184.',
    });
    if (isDemoMode && demoStep === 2) {
      setDemoStep(3);
    }
  };

  const handleGenerateFix = () => {
    setIsCodeFixOpen(true);
    addToast({
      type: 'success',
      title: 'AI Code Fix Generated',
      message: 'Created TTL cache eviction diff (-42% memory impact).',
    });
    if (isDemoMode && demoStep === 4) {
      setDemoStep(5);
    }
  };

  const handleApplyFix = () => {
    setIsCodeFixOpen(false);
    addToast({
      type: 'success',
      title: 'Fix Applied to payment.service.ts',
      message: 'Saved changes to workspace.',
    });
    if (isDemoMode && demoStep === 5) {
      setDemoStep(6);
      setActiveTab('tests');
    }
  };

  const handleRunTestsFromModal = () => {
    setIsCodeFixOpen(false);
    setActiveTab('tests');
    setAutoRunTests(true);
    addToast({
      type: 'info',
      title: 'Triggering Automated Test Suite',
      message: 'Running 155 unit, integration, API, and E2E tests.',
    });
    if (isDemoMode) {
      setDemoStep(7);
    }
  };

  const handleSimulateDeploy = () => {
    addToast({
      type: 'success',
      title: 'Deployment Pipeline Triggered',
      message: 'Promoting v2.4.1 to Production cluster with zero-downtime canary checks.',
    });
  };

  const handleRollback = () => {
    addToast({
      type: 'warning',
      title: 'Deployment Rollback Initiated',
      message: 'Reverting Production traffic back to stable v2.4.0 release.',
    });
  };

  const handleCommandPaletteAction = (action: string) => {
    if (action === 'open-ai-drawer') {
      setIsAiDrawerOpen(true);
    } else if (action === 'run-tests') {
      setAutoRunTests(true);
    } else if (action === 'deploy') {
      handleSimulateDeploy();
    } else if (action === 'rollback') {
      handleRollback();
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* LANDING PAGE ROUTE */}
      {activeTab === 'landing' ? (
        <LandingPage
          onOpenWorkspace={() => setActiveTab('overview')}
          onStartDemo={handleStartDemo}
        />
      ) : (
        /* DEVELOPER COMMAND CENTER WORKSPACE */
        <div className="flex min-h-screen relative">
          {/* Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            activeIssueCount={mockIssues.length}
          />

          {/* Main Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <Topbar
              collapsed={sidebarCollapsed}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onToggleAiDrawer={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
              activeTab={activeTab}
              isAiDrawerOpen={isAiDrawerOpen}
            />

            {/* Views Router */}
            <main className={`flex-1 overflow-y-auto pb-24 transition-all duration-300 ${
              sidebarCollapsed ? 'ml-16' : 'ml-0 md:ml-64'
            }`}>
              {activeTab === 'overview' && (
                <OverviewView
                  health={mockProjectHealth}
                  issues={mockIssues}
                  onNavigate={setActiveTab}
                  onInvestigateIssue={handleInvestigateIssue}
                />
              )}

              {activeTab === 'debugger' && (
                <AIDebuggerView
                  investigation={mockAIInvestigation}
                  onGenerateFix={handleGenerateFix}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'tests' && (
                <TestCenterView
                  summary={mockTestSummary}
                  onNavigate={setActiveTab}
                  autoRunTrigger={autoRunTests}
                />
              )}

              {activeTab === 'deployments' && (
                <DeploymentView
                  deployment={mockDeploymentState}
                  onNavigate={setActiveTab}
                  onRollback={handleRollback}
                  onSimulateDeploy={handleSimulateDeploy}
                />
              )}

              {activeTab === 'monitoring' && (
                <MonitoringView
                  metrics={mockMonitoringMetrics}
                  incident={mockAIIncident}
                  onNavigate={setActiveTab}
                  onInvestigateIncident={() => handleInvestigateIssue('issue-mem-184')}
                  onRollback={handleRollback}
                />
              )}

              {activeTab === 'logs' && (
                <LogExplorerView logs={mockLogs} onNavigate={setActiveTab} />
              )}

              {activeTab === 'prs' && (
                <PullRequestsView
                  pr={mockPullRequest}
                  onNavigate={setActiveTab}
                  onGenerateFix={handleGenerateFix}
                />
              )}

              {/* General Placeholder for other views */}
              {['projects', 'code', 'workspace', 'team', 'integrations', 'settings'].includes(activeTab) && (
                <div className="p-12 text-center text-slate-400 space-y-4">
                  <h2 className="text-xl font-bold text-slate-200 capitalize">{activeTab} Workspace</h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Continuous synchronization active for {activeTab}. Connected with GitHub & Vercel Webhooks.
                  </p>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                  >
                    Return to Overview
                  </button>
                </div>
              )}
            </main>
          </div>

          {/* Context AI Side Drawer */}
          <AIContextDrawer
            isOpen={isAiDrawerOpen}
            onClose={() => setIsAiDrawerOpen(false)}
            activeTab={activeTab}
            onNavigate={setActiveTab}
          />
        </div>
      )}

      {/* Code Fix Diff Viewer Modal */}
      <CodeFixModal
        isOpen={isCodeFixOpen}
        onClose={() => setIsCodeFixOpen(false)}
        onApplyFix={handleApplyFix}
        onRunTests={handleRunTestsFromModal}
        onCreatePR={() => {
          setIsCodeFixOpen(false);
          setActiveTab('prs');
          addToast({
            type: 'success',
            title: 'Pull Request #248 Created',
            message: 'Draft PR opened on GitHub with automated AI review checklist.',
          });
        }}
      />

      {/* Global ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActiveTab}
        onTriggerAction={handleCommandPaletteAction}
      />

      {/* Guided 12-Step Demo Overlay */}
      {isDemoMode && (
        <DemoGuideBanner
          activeStep={demoStep}
          onNextStep={handleNextDemoStep}
          onPrevStep={handlePrevDemoStep}
          onExitDemo={() => setIsDemoMode(false)}
        />
      )}

      {/* Toast Notification Manager */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
