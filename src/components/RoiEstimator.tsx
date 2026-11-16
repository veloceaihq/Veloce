import { useMemo } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { BusinessSize, DeploymentTier, WorkflowType } from '../types';

interface RoiEstimatorProps {
  workflow: WorkflowType;
  onChangeWorkflow: (workflow: WorkflowType) => void;
  businessSize: BusinessSize;
  onChangeBusinessSize: (size: BusinessSize) => void;
  weeklyHours: number;
  onChangeWeeklyHours: (hours: number) => void;
  monthlyEventsK: number;
  onChangeMonthlyEventsK: (eventsK: number) => void;
  deploymentTier: DeploymentTier;
  onChangeDeploymentTier: (tier: DeploymentTier) => void;
  onLockArchitecture: (summaryText: string, scopeLabel: string) => void;
}

const BUSINESS_SIZES: {
  id: BusinessSize;
  label: string;
  teamNote: string;
  hourlyRate: number;
  efficiencyBoost: number;
}[] = [
  {
    id: 'growth',
    label: 'Growth (10–50)',
    teamNote: 'Lean ops teams',
    hourlyRate: 68,
    efficiencyBoost: 0.72,
  },
  {
    id: 'mid-market',
    label: 'Mid-Market (50–250)',
    teamNote: 'Scaling departments',
    hourlyRate: 85,
    efficiencyBoost: 0.78,
  },
  {
    id: 'enterprise',
    label: 'Enterprise (250+)',
    teamNote: 'Multi-region scale',
    hourlyRate: 110,
    efficiencyBoost: 0.84,
  },
];

const WORKFLOW_OPTIONS: {
  id: WorkflowType;
  label: string;
  scopeLabel: string;
  baseSpeedGain: number;
  baseLatencyMs: number;
  automationRatio: number;
}[] = [
  {
    id: 'automation',
    label: 'AI Automation & Agents',
    scopeLabel: 'Rapid AI Automation & Agents',
    baseSpeedGain: 14.5,
    baseLatencyMs: 41,
    automationRatio: 0.82,
  },
  {
    id: 'analytics',
    label: 'Predictive Analytics',
    scopeLabel: 'High-Velocity Predictive Analytics',
    baseSpeedGain: 16.2,
    baseLatencyMs: 34,
    automationRatio: 0.74,
  },
  {
    id: 'llm',
    label: 'Custom LLM Integration',
    scopeLabel: 'Custom LLM & Workflow Integration',
    baseSpeedGain: 12.8,
    baseLatencyMs: 46,
    automationRatio: 0.76,
  },
  {
    id: 'data-engineering',
    label: 'Real-Time Data Engineering',
    scopeLabel: 'Real-Time Data Engineering',
    baseSpeedGain: 18.4,
    baseLatencyMs: 22,
    automationRatio: 0.85,
  },
];

export function RoiEstimator({
  workflow,
  onChangeWorkflow,
  businessSize,
  onChangeBusinessSize,
  weeklyHours,
  onChangeWeeklyHours,
  monthlyEventsK,
  onChangeMonthlyEventsK,
  deploymentTier,
  onChangeDeploymentTier,
  onLockArchitecture,
}: RoiEstimatorProps) {
  const results = useMemo(() => {
    const sizeCfg =
      BUSINESS_SIZES.find((b) => b.id === businessSize) ?? BUSINESS_SIZES[1];
    const wfCfg =
      WORKFLOW_OPTIONS.find((w) => w.id === workflow) ?? WORKFLOW_OPTIONS[0];

    const tierLatencyDelta = deploymentTier === 'edge-turbo' ? -4 : 6;
    const tierSpeedMultiplier = deploymentTier === 'edge-turbo' ? 1.12 : 0.96;

    const volumeFactor = 1 + Math.min(monthlyEventsK / 5000, 0.35);
    const speedGain = Number(
      (wfCfg.baseSpeedGain * tierSpeedMultiplier * volumeFactor).toFixed(1)
    );
    const projectedLatency = Math.max(
      14,
      Math.round(wfCfg.baseLatencyMs + tierLatencyDelta)
    );

    const monthlyManualHours = weeklyHours * 4.33;
    const savedHoursPerMonth = Math.round(
      monthlyManualHours * wfCfg.automationRatio * sizeCfg.efficiencyBoost
    );
    const savedHoursPerYear = savedHoursPerMonth * 12;
    const annualValueUsd = Math.round(savedHoursPerYear * sizeCfg.hourlyRate);
    const legacyMinutesPerBatch = Math.round(speedGain * 3.8);
    const veloceMinutesPerBatch = 3.8;
    const paybackWeeks = Math.max(
      2.5,
      Number((160000 / Math.max(annualValueUsd, 30000) * 8).toFixed(1))
    );

    return {
      sizeCfg,
      wfCfg,
      speedGain,
      projectedLatency,
      savedHoursPerMonth,
      savedHoursPerYear,
      annualValueUsd,
      legacyMinutesPerBatch,
      veloceMinutesPerBatch,
      paybackWeeks,
    };
  }, [workflow, businessSize, weeklyHours, monthlyEventsK, deploymentTier]);

  const handleReset = () => {
    onChangeBusinessSize('mid-market');
    onChangeWorkflow('automation');
    onChangeWeeklyHours(160);
    onChangeMonthlyEventsK(850);
    onChangeDeploymentTier('edge-turbo');
  };

  const formattedEvents =
    monthlyEventsK >= 1000
      ? `${(monthlyEventsK / 1000).toFixed(1)}M`
      : `${monthlyEventsK}K`;

  const handleBookWithSpecs = () => {
    const summary = `ROI Estimator Specs: ${results.sizeCfg.label} | Workflow: ${results.wfCfg.label} | Tier: ${
      deploymentTier === 'edge-turbo' ? 'Edge Turbo' : 'Dedicated VPC'
    } | Weekly Manual Hours: ${weeklyHours} hrs | Monthly Volume: ${formattedEvents} ops | Projected Savings: ${results.savedHoursPerMonth.toLocaleString()} hrs/mo ($${results.annualValueUsd.toLocaleString()}/yr) at ${results.speedGain}x speed gain (${results.projectedLatency}ms P95).`;
    onLockArchitecture(summary, results.wfCfg.scopeLabel);
  };

  return (
    <section
      id="benchmarks"
      className="border-b border-[#E5C1C8]/12 bg-[#24070E] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#F4B8C6]">
              AI Speed &amp; ROI Estimator
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF5F6]"
              style={{ textWrap: 'balance' }}
            >
              Quantify your throughput gains before writing a line of code.
            </h2>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 self-start md:self-auto rounded-lg border border-[#E5C1C8]/20 bg-[#361519]/60 px-3.5 py-2 text-xs font-medium text-[#E5C1C8] hover:border-[#F4B8C6]/50 hover:text-[#FAF5F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Defaults
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Left Inputs Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-[#E5C1C8]/16 bg-[#361519]/75 p-6 sm:p-7 flex flex-col justify-between gap-7">
            {/* Business Size Toggle */}
            <div>
              <label className="block text-sm font-semibold text-[#FAF5F6]">
                1. Organization Scale
              </label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {BUSINESS_SIZES.map((size) => {
                  const active = businessSize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => onChangeBusinessSize(size.id)}
                      className={`rounded-xl border px-3.5 py-3 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#F4B8C6] bg-[#F4B8C6] text-[#24070E]'
                          : 'border-[#E5C1C8]/16 bg-[#24070E]/65 text-[#FAF5F6] hover:border-[#E5C1C8]/40'
                      }`}
                    >
                      <div className="text-xs font-bold whitespace-nowrap">
                        {size.label}
                      </div>
                      <div
                        className={`mt-0.5 text-[11px] ${
                          active ? 'text-[#24070E]/80 font-medium' : 'text-[#D4A5B0]'
                        }`}
                      >
                        {size.teamNote}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workflow Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-[#FAF5F6]">
                2. Target AI Workflow
              </label>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WORKFLOW_OPTIONS.map((wf) => {
                  const active = workflow === wf.id;
                  return (
                    <button
                      key={wf.id}
                      type="button"
                      onClick={() => onChangeWorkflow(wf.id)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'border-[#F4B8C6]/75 bg-[#24070E] text-[#F4B8C6] shadow-[0_0_0_1px_rgba(244,184,198,0.4)]'
                          : 'border-[#E5C1C8]/14 bg-[#24070E]/55 text-[#FAF5F6] hover:border-[#E5C1C8]/35'
                      }`}
                    >
                      <span className="truncate">{wf.label}</span>
                      <span className="ml-2 font-mono text-[11px] tabular-nums text-[#D4A5B0] shrink-0">
                        {wf.baseLatencyMs}ms
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="weekly-hours-slider"
                    className="font-semibold text-[#FAF5F6]"
                  >
                    3. Weekly Manual Hours
                  </label>
                  <span className="font-mono font-semibold tabular-nums text-[#F4B8C6]">
                    {weeklyHours} hrs/wk
                  </span>
                </div>
                <input
                  id="weekly-hours-slider"
                  type="range"
                  min={20}
                  max={800}
                  step={10}
                  value={weeklyHours}
                  onChange={(e) => onChangeWeeklyHours(Number(e.target.value))}
                  className="veloce-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-mono tabular-nums text-[#D4A5B0]">
                  <span>20 hrs</span>
                  <span>800 hrs</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="events-slider"
                    className="font-semibold text-[#FAF5F6]"
                  >
                    4. Monthly AI Throughput
                  </label>
                  <span className="font-mono font-semibold tabular-nums text-[#F4B8C6]">
                    {formattedEvents} ops/mo
                  </span>
                </div>
                <input
                  id="events-slider"
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={monthlyEventsK}
                  onChange={(e) =>
                    onChangeMonthlyEventsK(Number(e.target.value))
                  }
                  className="veloce-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-mono tabular-nums text-[#D4A5B0]">
                  <span>50K ops</span>
                  <span>5.0M ops</span>
                </div>
              </div>
            </div>

            {/* Deployment Tier Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E5C1C8]/12 pt-5">
              <div>
                <div className="text-sm font-semibold text-[#FAF5F6]">
                  5. Runtime Topology
                </div>
                <div className="text-xs text-[#D4A5B0]">
                  Choose global edge routing or isolated VPC security.
                </div>
              </div>
              <div className="inline-flex rounded-xl border border-[#E5C1C8]/16 bg-[#24070E]/85 p-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => onChangeDeploymentTier('edge-turbo')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    deploymentTier === 'edge-turbo'
                      ? 'bg-[#F4B8C6] text-[#24070E]'
                      : 'text-[#D4A5B0] hover:text-[#FAF5F6]'
                  }`}
                >
                  Edge Turbo
                </button>
                <button
                  type="button"
                  onClick={() => onChangeDeploymentTier('dedicated-vpc')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    deploymentTier === 'dedicated-vpc'
                      ? 'bg-[#F4B8C6] text-[#24070E]'
                      : 'text-[#D4A5B0] hover:text-[#FAF5F6]'
                  }`}
                >
                  Dedicated VPC
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Output Panel */}
          <div className="lg:col-span-5 rounded-2xl border border-[#F4B8C6]/30 bg-gradient-to-b from-[#361519] to-[#24070E] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#E5C1C8]">
                  Projected Performance Profile
                </span>
                <span className="font-mono text-xs font-semibold tabular-nums text-[#F4B8C6]">
                  {results.projectedLatency}ms P95
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#E5C1C8]/14 bg-[#24070E]/80 p-4">
                  <div className="text-xs text-[#D4A5B0]">Hours Saved / Mo</div>
                  <div className="mt-1.5 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-[#F4B8C6]">
                    {results.savedHoursPerMonth.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[11px] font-mono tabular-nums text-[#E5C1C8]">
                    {results.savedHoursPerYear.toLocaleString()} hrs/yr
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5C1C8]/14 bg-[#24070E]/80 p-4">
                  <div className="text-xs text-[#D4A5B0]">Speed Multiplier</div>
                  <div className="mt-1.5 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-[#FAF5F6]">
                    {results.speedGain}x
                  </div>
                  <div className="mt-1 text-[11px] text-[#E5C1C8]">
                    vs manual &amp; batch stack
                  </div>
                </div>
              </div>

              {/* Annual Value Highlight */}
              <div className="mt-4 rounded-xl border border-[#F4B8C6]/25 bg-[#24070E]/90 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#D4A5B0]">
                      Estimated Annual Efficiency Value
                    </div>
                    <div className="mt-1 font-mono text-3xl font-bold tracking-tight tabular-nums text-[#FAF5F6]">
                      ${results.annualValueUsd.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[#D4A5B0]">Est. Payback</div>
                    <div className="font-mono text-sm font-semibold tabular-nums text-[#F4B8C6]">
                      {results.paybackWeeks} weeks
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Processing Time Comparison Bar */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-medium text-[#E5C1C8]">
                  Batch Processing Window Comparison
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-[#D4A5B0] mb-1">
                    <span>Legacy Pipeline</span>
                    <span className="font-mono tabular-nums">
                      {results.legacyMinutesPerBatch} min
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#24070E] overflow-hidden">
                    <div className="h-full w-full rounded-full bg-[#E5C1C8]/30" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-[#FAF5F6] mb-1">
                    <span>VeloceAI Architecture</span>
                    <span className="font-mono tabular-nums text-[#F4B8C6]">
                      {results.veloceMinutesPerBatch} min
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#24070E] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#F4B8C6] transition-all duration-300"
                      style={{
                        width: `${Math.max(
                          7,
                          Math.min(28, Math.round(100 / results.speedGain))
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-[#E5C1C8]/14">
              <button
                type="button"
                onClick={handleBookWithSpecs}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4B8C6] px-5 py-3.5 text-sm font-semibold text-[#24070E] shadow-[0_0_24px_rgba(244,184,198,0.25)] hover:bg-[#FAF5F6] transition-colors cursor-pointer"
              >
                Book Speed Audit With These Specs
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
