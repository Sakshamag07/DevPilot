export type NavigationTab = 
  | 'landing'
  | 'overview'
  | 'projects'
  | 'code'
  | 'debugger'
  | 'issues'
  | 'tests'
  | 'deployments'
  | 'monitoring'
  | 'logs'
  | 'prs'
  | 'settings';

export type Severity = 'critical' | 'warning' | 'optimization' | 'info';

export interface IssueItem {
  id: string;
  severity: Severity;
  title: string;
  file: string;
  lineNumber: number;
  detectedAgo: string;
  aiConfidence: number;
  description: string;
  service: string;
  actionText: string;
  status: 'active' | 'resolved' | 'investigating';
}

export interface ProjectHealth {
  overallScore: number;
  statusText: string;
  breakdown: {
    codeQuality: number;
    testCoverage: number;
    performance: number;
    security: number;
    deploymentHealth: number;
  };
}

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  hasError?: boolean;
  children?: FileNode[];
}

export interface AIInvestigation {
  issueId: string;
  problem: string;
  rootCause: string;
  impact: string;
  recommendedFix: string;
  confidence: number;
  affectedFile: string;
  lineNumber: number;
  codeContext: {
    beforeLines: Array<{ line: number; code: string }>;
    problemLine: { line: number; code: string };
    afterLines: Array<{ line: number; code: string }>;
  };
  fixDiff: {
    beforeCode: string;
    afterCode: string;
    impactMetrics: {
      memory: string;
      performance: string;
    };
  };
}

export interface TestSuite {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'api' | 'e2e';
  status: 'passed' | 'failed' | 'skipped' | 'running';
  duration: string;
  errorDetails?: {
    message: string;
    stackTrace: string;
    aiFixExplanation: string;
    suggestedFix: string;
  };
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  coverage: number;
  suites: TestSuite[];
}

export type DeploymentStageStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface DeploymentStage {
  id: string;
  name: string;
  status: DeploymentStageStatus;
  duration?: string;
  logs?: string[];
}

export interface DeploymentState {
  version: string;
  status: 'live' | 'deploying' | 'failed' | 'rolled_back';
  commit: string;
  commitMessage: string;
  author: string;
  timestamp: string;
  stages: DeploymentStage[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  severity: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  service: string;
  message: string;
  context?: Record<string, any>;
  aiAnalysis?: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  branch: string;
  targetBranch: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  aiReviewScore: number;
  status: 'open' | 'merged' | 'draft';
  findings: Array<{
    type: 'success' | 'warning' | 'error';
    text: string;
  }>;
  inlineComments: Array<{
    file: string;
    line: number;
    comment: string;
    suggestion?: string;
  }>;
}

export interface MonitoringMetrics {
  requestsPerSec: string;
  errorRate: string;
  latencyMs: number;
  uptimePct: string;
  memoryPct: number;
  cpuPct: number;
  history: Array<{
    time: string;
    requests: number;
    latency: number;
    errorRate: number;
    cpu: number;
    memory: number;
  }>;
  activityStream: Array<{
    timestamp: string;
    text: string;
    type: 'success' | 'warning' | 'info' | 'critical';
  }>;
}

export interface AIIncident {
  id: string;
  title: string;
  subtitle: string;
  confidence: number;
  affectedRequests: number;
  chainOfReasoning: {
    deployment: string;
    logSample: string;
    errorName: string;
    codeFile: string;
  };
}
