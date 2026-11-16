import { SolutionItem } from '../types';

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'automation',
    number: '01.',
    title: 'Rapid AI Automation & Agents',
    summary:
      'Autonomous multi-step agents that execute CRM enrichment, document triage, and back-office approvals around the clock without brittle RPA scripts.',
    outcome: 'Up to 78% reduction in repetitive manual operations within 14 days.',
    latencyTarget: '42ms orchestration',
    deploymentWindow: '10-day sprint',
    capabilities: [
      'Deterministic tool-calling guardrails with human-in-the-loop checkpoints',
      'Direct ERP, Slack, HubSpot, and webhook state synchronization',
      'Automatic retry, schema validation, and exception routing',
    ],
    architectureNote:
      'Event-driven worker queues isolate long-running tool calls from sub-second decision routing.',
    scopeLabel: 'Rapid AI Automation & Agents',
  },
  {
    id: 'analytics',
    number: '02.',
    title: 'High-Velocity Predictive Analytics',
    summary:
      'Live forecasting pipelines for demand spikes, churn risk, and dynamic pricing—turning raw telemetry into executive decisions before markets shift.',
    outcome: '94.3% forecast accuracy across high-frequency revenue & inventory streams.',
    latencyTarget: '36ms scoring',
    deploymentWindow: '14-day sprint',
    capabilities: [
      'Sub-second anomaly and revenue leakage detection across live feeds',
      'Feature-store pipelines calibrated for seasonality and cohort drift',
      'Executive KPI dashboards with confidence intervals and driver attribution',
    ],
    architectureNote:
      'Vectorized scoring kernels run alongside streaming warehouses to eliminate overnight batch delays.',
    scopeLabel: 'High-Velocity Predictive Analytics',
  },
  {
    id: 'llm',
    number: '03.',
    title: 'Custom LLM & Workflow Integration',
    summary:
      'Domain-tuned language models, semantic RAG pipelines, and enterprise copilots grounded exclusively in your verified internal knowledge base.',
    outcome: '3.8x faster customer & analyst resolution with zero-hallucination citations.',
    latencyTarget: '48ms first-token',
    deploymentWindow: '12-day sprint',
    capabilities: [
      'Hybrid dense + lexical retrieval with strict role-based access control',
      'Model routing across frontier & quantized weights for optimal cost-speed ratio',
      'Automated evaluation harness tracking groundedness and latency regressions',
    ],
    architectureNote:
      'Speculative decoding and semantic prompt caching keep P95 response times consistently under 50ms.',
    scopeLabel: 'Custom LLM & Workflow Integration',
  },
  {
    id: 'data-engineering',
    number: '04.',
    title: 'Real-Time Data Engineering',
    summary:
      'Zero-bottleneck ingestion, CDC streaming, and lakehouse normalization engineered to feed production AI models without stale warehouse lag.',
    outcome: '18x faster ingestion throughput with 99.9% pipeline reliability.',
    latencyTarget: '19ms stream ingest',
    deploymentWindow: '14-day sprint',
    capabilities: [
      'Change-data-capture (CDC) connectors from Postgres, Snowflake, and Kafka',
      'Automated schema evolution, deduplication, and PII redaction in flight',
      'Multi-region failover and observable dead-letter recovery',
    ],
    architectureNote:
      'Memory-mapped streaming transforms validate and index records in-flight prior to vector storage.',
    scopeLabel: 'Real-Time Data Engineering',
  },
];

export const SPEED_METRICS = [
  {
    value: '10x',
    label: 'Faster Deployment',
    detail: 'Concept to production in days',
  },
  {
    value: '<50ms',
    label: 'Model Latency',
    detail: 'P95 edge inference speed',
  },
  {
    value: '99.9%',
    label: 'Uptime SLA',
    detail: 'Redundant multi-region routing',
  },
  {
    value: '24/7',
    label: 'Autonomous Workflows',
    detail: 'Continuous self-healing orchestration',
  },
];
