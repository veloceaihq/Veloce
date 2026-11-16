export type WorkflowType =
  | 'automation'
  | 'analytics'
  | 'llm'
  | 'data-engineering';

export type BusinessSize = 'growth' | 'mid-market' | 'enterprise';

export type DeploymentTier = 'edge-turbo' | 'dedicated-vpc';

export interface SolutionItem {
  id: WorkflowType;
  number: string;
  title: string;
  summary: string;
  outcome: string;
  latencyTarget: string;
  deploymentWindow: string;
  capabilities: string[];
  architectureNote: string;
  scopeLabel: string;
}

export interface InquiryPrefill {
  scope: string;
  message: string;
}
