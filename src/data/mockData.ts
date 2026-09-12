import type {
  IssueItem,
  ProjectHealth,
  FileNode,
  AIInvestigation,
  TestSummary,
  DeploymentState,
  LogEntry,
  PullRequest,
  MonitoringMetrics,
  AIIncident,
  NavigationTab,
} from '../types';

export const mockProjectHealth: ProjectHealth = {
  overallScore: 92,
  statusText: 'Excellent',
  breakdown: {
    codeQuality: 94,
    testCoverage: 87,
    performance: 91,
    security: 96,
    deploymentHealth: 98,
  },
};

export const mockIssues: IssueItem[] = [
  {
    id: 'issue-mem-184',
    severity: 'critical',
    title: 'Memory leak detected in payment service',
    file: 'payment.service.ts',
    lineNumber: 184,
    detectedAgo: '23 minutes ago',
    aiConfidence: 96,
    description: 'Unbounded heap allocation accumulating +340 MB/hr due to perpetual object caching.',
    service: 'payment-service',
    actionText: 'Investigate',
    status: 'active',
  },
  {
    id: 'issue-lat-204',
    severity: 'warning',
    title: 'API response time increased by 28%',
    file: '/api/products',
    lineNumber: 42,
    detectedAgo: '41 minutes ago',
    aiConfidence: 91,
    description: 'N+1 query bottleneck detected in product catalog resolver.',
    service: 'catalog-api',
    actionText: 'Analyze',
    status: 'active',
  },
  {
    id: 'issue-idx-88',
    severity: 'optimization',
    title: 'Unused database index detected',
    file: 'orders.schema.sql',
    lineNumber: 12,
    detectedAgo: '2 hours ago',
    aiConfidence: 89,
    description: 'Index `idx_orders_created_at_temp` has 0 lookups in 30 days. Removing frees 1.2GB space.',
    service: 'database-cluster',
    actionText: 'Optimize',
    status: 'active',
  },
];

export const mockFileTree: FileNode[] = [
  {
    name: 'src',
    path: 'src',
    type: 'folder',
    children: [
      {
        name: 'controllers',
        path: 'src/controllers',
        type: 'folder',
        children: [
          { name: 'payment.controller.ts', path: 'src/controllers/payment.controller.ts', type: 'file' },
          { name: 'product.controller.ts', path: 'src/controllers/product.controller.ts', type: 'file' },
        ],
      },
      {
        name: 'services',
        path: 'src/services',
        type: 'folder',
        children: [
          { name: 'payment.service.ts', path: 'src/services/payment.service.ts', type: 'file', hasError: true },
          { name: 'auth.service.ts', path: 'src/services/auth.service.ts', type: 'file' },
          { name: 'notification.service.ts', path: 'src/services/notification.service.ts', type: 'file' },
        ],
      },
      {
        name: 'database',
        path: 'src/database',
        type: 'folder',
        children: [
          { name: 'connection.ts', path: 'src/database/connection.ts', type: 'file' },
          { name: 'cache.ts', path: 'src/database/cache.ts', type: 'file' },
        ],
      },
      { name: 'app.ts', path: 'src/app.ts', type: 'file' },
      { name: 'server.ts', path: 'src/server.ts', type: 'file' },
    ],
  },
];

export const mockAIInvestigation: AIInvestigation = {
  issueId: 'issue-mem-184',
  problem: 'Payment objects are being stored indefinitely in an in-memory cache.',
  rootCause: 'The cache has no expiration or cleanup mechanism.',
  impact: 'Estimated memory growth: +340 MB/hour.',
  recommendedFix: 'Replace the in-memory cache with an expiring cache strategy.',
  confidence: 96,
  affectedFile: 'payment.service.ts',
  lineNumber: 186,
  codeContext: {
    beforeLines: [
      { line: 182, code: 'export async function processOrderPayment(order: OrderPayload): Promise<PaymentResult> {' },
      { line: 183, code: '  const validatedOrder = await validateOrder(order);' },
      { line: 184, code: '  const payment = await processPayment(order);' },
      { line: 185, code: '' },
    ],
    problemLine: { line: 186, code: '  cache[payment.id] = payment;' },
    afterLines: [
      { line: 187, code: '  return payment;' },
      { line: 188, code: '}' },
    ],
  },
  fixDiff: {
    beforeCode: `// Before (unbounded object mutation)
cache[payment.id] = payment;`,
    afterCode: `// After (LRU TTL cache strategy)
cache.set(payment.id, payment, {
  ttl: 300 // 5 minute automatic eviction
});`,
    impactMetrics: {
      memory: 'Memory usage ↓ 42%',
      performance: 'Performance ↑ 18%',
    },
  },
};

export const mockTestSummary: TestSummary = {
  total: 155,
  passed: 148,
  failed: 2,
  skipped: 5,
  coverage: 89.4,
  suites: [
    {
      id: 'test-1',
      name: 'PaymentCacheExpiry.test.ts',
      type: 'unit',
      status: 'failed',
      duration: '420ms',
      errorDetails: {
        message: 'AssertionError: expected cache size to decay after 300s TTL',
        stackTrace: 'at Context.<anonymous> (src/tests/PaymentCacheExpiry.test.ts:38:14)',
        aiFixExplanation: 'The unit test expected cache eviction to take effect, but the legacy raw dictionary assignment was bypassing TTL enforcement.',
        suggestedFix: 'Update mock provider in test to invoke cache.set() with explicit TTL config.',
      },
    },
    {
      id: 'test-2',
      name: 'CheckoutConcurrencyLimit.test.ts',
      type: 'integration',
      status: 'failed',
      duration: '1.2s',
      errorDetails: {
        message: 'TimeoutError: 504 Gateway Timeout on concurrent checkout batch (100 reqs)',
        stackTrace: 'at CheckoutRunner.execute (src/tests/CheckoutConcurrencyLimit.test.ts:89:11)',
        aiFixExplanation: 'High lock contention in payment status mutations causing queue timeout under load.',
        suggestedFix: 'Implement non-blocking read-locks during batch payment verification.',
      },
    },
    {
      id: 'test-3',
      name: 'AuthMiddlewareJWT.test.ts',
      type: 'unit',
      status: 'passed',
      duration: '110ms',
    },
    {
      id: 'test-4',
      name: 'ProductSearchIndex.test.ts',
      type: 'api',
      status: 'passed',
      duration: '380ms',
    },
    {
      id: 'test-5',
      name: 'EndToEndCheckoutFlow.test.ts',
      type: 'e2e',
      status: 'passed',
      duration: '4.8s',
    },
  ],
};

export const mockDeploymentState: DeploymentState = {
  version: 'v2.4.1',
  status: 'live',
  commit: 'a81f92c',
  commitMessage: 'fix(payment): implement LRU cache with TTL eviction strategy',
  author: 'Alex Chen <alex@devpilot.io>',
  timestamp: 'Just now',
  stages: [
    { id: 'stage-1', name: 'Code Checkout', status: 'completed', duration: '4s' },
    { id: 'stage-2', name: 'Build Artifacts', status: 'completed', duration: '28s' },
    { id: 'stage-3', name: 'Run Automated Tests', status: 'completed', duration: '45s' },
    { id: 'stage-4', name: 'Security & Dependency Scan', status: 'completed', duration: '12s' },
    { id: 'stage-5', name: 'Zero-Downtime Deploy', status: 'completed', duration: '18s' },
    { id: 'stage-6', name: 'Canary Health Check', status: 'completed', duration: '15s' },
  ],
};

export const mockLogs: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '12:43:24',
    severity: 'INFO',
    service: 'payment-service',
    message: 'Cache TTL manager initialized with 300s window.',
    aiAnalysis: 'System successfully initialized memory cleanup routine.',
  },
  {
    id: 'log-2',
    timestamp: '12:43:21',
    severity: 'INFO',
    service: 'payment-service',
    message: 'Payment API recovered. Heap allocation stabilized at 142 MB.',
    aiAnalysis: 'Memory usage dropped back into nominal baseline parameters.',
  },
  {
    id: 'log-3',
    timestamp: '12:42:17',
    severity: 'INFO',
    service: 'deployment-pipeline',
    message: 'Deployment completed. v2.4.1 promoted to Production.',
    aiAnalysis: 'Release pipeline completed all verification checks without regression.',
  },
  {
    id: 'log-4',
    timestamp: '12:41:03',
    severity: 'ERROR',
    service: 'payment-service',
    message: 'Database connection timeout in processPayment()',
    context: { errorId: 'ERR_TIMEOUT_99', latencyMs: 5200 },
    aiAnalysis: 'Connection pool exhausted due to unreleased payment cache locks.',
  },
  {
    id: 'log-5',
    timestamp: '12:39:14',
    severity: 'WARN',
    service: 'api-gateway',
    message: 'Retry attempt 2/3 for POST /v1/payments',
    aiAnalysis: 'Gateway retried requests as downstream latency spiked past threshold.',
  },
];

export const mockPullRequest: PullRequest = {
  id: 'pr-248',
  number: 248,
  title: 'Optimize authentication middleware & cache eviction',
  author: 'Alex Chen',
  branch: 'fix/payment-memory-leak',
  targetBranch: 'main',
  filesChanged: 12,
  additions: 284,
  deletions: 91,
  aiReviewScore: 92,
  status: 'open',
  findings: [
    { type: 'success', text: 'No critical security vulnerabilities found.' },
    { type: 'success', text: 'Unit tests included for new cache expiration.' },
    { type: 'warning', text: 'Potential performance bottleneck if cache size exceeds 10,000 keys.' },
    { type: 'warning', text: 'Missing edge-case test for concurrent cache invalidation.' },
  ],
  inlineComments: [
    {
      file: 'payment.service.ts',
      line: 186,
      comment: 'DevPilot AI: Replaced raw object dictionary with bounded cache. Excellent fix!',
      suggestion: 'cache.set(payment.id, payment, { ttl: 300 });',
    },
  ],
};

export const mockMonitoringMetrics: MonitoringMetrics = {
  requestsPerSec: '24.8K',
  errorRate: '0.08%',
  latencyMs: 182,
  uptimePct: '99.98%',
  memoryPct: 61,
  cpuPct: 34,
  history: [
    { time: '12:00', requests: 21000, latency: 195, errorRate: 0.12, cpu: 42, memory: 78 },
    { time: '12:10', requests: 22400, latency: 210, errorRate: 0.18, cpu: 48, memory: 84 },
    { time: '12:20', requests: 23800, latency: 260, errorRate: 0.34, cpu: 62, memory: 92 },
    { time: '12:30', requests: 24100, latency: 290, errorRate: 0.42, cpu: 71, memory: 98 },
    { time: '12:40', requests: 24800, latency: 182, errorRate: 0.08, cpu: 34, memory: 61 },
  ],
  activityStream: [
    { timestamp: '12:43:21', text: 'Payment API recovered - Heap memory normal', type: 'success' },
    { timestamp: '12:42:17', text: 'Deployment v2.4.1 live in Production', type: 'info' },
    { timestamp: '12:41:03', text: 'AI detected memory leak in payment.service.ts', type: 'critical' },
    { timestamp: '12:38:45', text: 'Automated test suite triggered by PR #248', type: 'info' },
  ],
};

export const mockAIIncident: AIIncident = {
  id: 'inc-991',
  title: 'AI INCIDENT DETECTED',
  subtitle: 'Error rate increased 34% after deployment v2.4.1.',
  confidence: 93,
  affectedRequests: 1284,
  chainOfReasoning: {
    deployment: 'v2.4.1 (Deployed 12 minutes ago)',
    logSample: '12:41:03 ERROR payment-service Database timeout',
    errorName: 'ERR_MEM_LEAK_HEAP_OVERFLOW',
    codeFile: 'payment.service.ts:184',
  },
};

export interface DemoStep {
  step: number;
  title: string;
  instruction: string;
  targetTab: NavigationTab;
  actionText?: string;
  nextStepTrigger?: string;
}

export const demoSteps: DemoStep[] = [
  {
    step: 1,
    title: 'Welcome to DevPilot',
    instruction: 'Review the Project Health (92/100) and the Critical Memory Leak issue.',
    targetTab: 'overview',
  },
  {
    step: 2,
    title: 'Investigate Critical Issue',
    instruction: 'Click "Investigate" on the Critical Memory Leak issue card to open the AI Debugger.',
    targetTab: 'overview',
    actionText: 'Click "Investigate"',
  },
  {
    step: 3,
    title: 'AI Debugger Workspace',
    instruction: 'Inspect the 3-panel workspace: File Tree, Code Editor (Line 186 marked), and AI Root Cause Investigation.',
    targetTab: 'debugger',
  },
  {
    step: 4,
    title: 'Generate AI Fix',
    instruction: 'Click "Generate Fix" in the AI Investigation panel to view the proposed code diff.',
    targetTab: 'debugger',
    actionText: 'Click "Generate Fix"',
  },
  {
    step: 5,
    title: 'Review Code Diff',
    instruction: 'Examine the Before vs After code diff and estimated memory reduction (-42%). Then click "Apply Fix".',
    targetTab: 'debugger',
    actionText: 'Click "Apply Fix"',
  },
  {
    step: 6,
    title: 'Run Automated Tests',
    instruction: 'Click "Run Tests" to execute the test suite and verify regression checks.',
    targetTab: 'tests',
    actionText: 'Click "Run Tests"',
  },
  {
    step: 7,
    title: 'Test Suite Execution',
    instruction: 'Watch the real-time test progress (148 passed, 2 failed). Click "AI Fix Test" to inspect test failures.',
    targetTab: 'tests',
  },
  {
    step: 8,
    title: 'Deploy Fix to Production',
    instruction: 'Click "Deploy" to trigger the zero-downtime deployment pipeline.',
    targetTab: 'deployments',
    actionText: 'Click "Deploy"',
  },
  {
    step: 9,
    title: 'Deployment Pipeline Live',
    instruction: 'Watch stages transition to Live status (v2.4.1). Next, check production monitoring.',
    targetTab: 'deployments',
  },
  {
    step: 10,
    title: 'Production Monitoring',
    instruction: 'Observe healthy metrics (182ms latency, 61% memory) and real-time activity stream.',
    targetTab: 'monitoring',
  },
  {
    step: 11,
    title: 'Explore Log Explorer',
    instruction: 'View live logs and click "Analyze with AI" on any log line.',
    targetTab: 'logs',
  },
  {
    step: 12,
    title: 'PR Review & Command Palette',
    instruction: 'Press ⌘K (or Ctrl+K) to launch the Global Command Palette from anywhere.',
    targetTab: 'prs',
  },
];
