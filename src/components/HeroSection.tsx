import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { WorkflowType } from '../types';

interface HeroSectionProps {
  onLaunchSolution: () => void;
  onExploreCapabilities: () => void;
  onSelectWorkloadForRoi: (workflow: WorkflowType) => void;
}

interface WorkloadProfile {
  id: WorkflowType;
  tabLabel: string;
  title: string;
  veloceLatencyMs: number;
  legacyLatencyMs: number;
  throughputLabel: string;
  speedGain: string;
  coldStartMs: number;
  curvePath: string;
  legacyPath: string;
  points: { label: string; veloce: number; legacy: number }[];
}

const WORKLOAD_PROFILES: WorkloadProfile[] = [
  {
    id: 'automation',
    tabLabel: 'Agentic Pipelines',
    title: 'Multi-Agent Execution Routing',
    veloceLatencyMs: 41,
    legacyLatencyMs: 620,
    throughputLabel: '14,200 tasks/min',
    speedGain: '15.1x faster',
    coldStartMs: 12,
    curvePath: 'M 0 116 C 55 112, 95 74, 155 64 C 215 54, 260 28, 340 20',
    legacyPath: 'M 0 124 C 70 122, 130 115, 195 104 C 250 96, 295 88, 340 82',
    points: [
      { label: 'Intake', veloce: 11, legacy: 165 },
      { label: 'Tool Route', veloce: 18, legacy: 240 },
      { label: 'Commit', veloce: 12, legacy: 215 },
    ],
  },
  {
    id: 'llm',
    tabLabel: 'LLM Inference',
    title: 'Speculative Edge Retrieval',
    veloceLatencyMs: 46,
    legacyLatencyMs: 740,
    throughputLabel: '3,800 req/sec',
    speedGain: '16.1x faster',
    coldStartMs: 9,
    curvePath: 'M 0 118 C 60 100, 105 56, 165 48 C 225 40, 275 24, 340 16',
    legacyPath: 'M 0 125 C 80 124, 145 118, 210 108 C 265 100, 305 92, 340 88',
    points: [
      { label: 'Embed', veloce: 8, legacy: 190 },
      { label: 'Hybrid RAG', veloce: 21, legacy: 310 },
      { label: 'First Token', veloce: 17, legacy: 240 },
    ],
  },
  {
    id: 'analytics',
    tabLabel: 'Stream Analytics',
    title: 'Vectorized Forecast Scoring',
    veloceLatencyMs: 34,
    legacyLatencyMs: 510,
    throughputLabel: '92,000 events/sec',
    speedGain: '15.0x faster',
    coldStartMs: 7,
    curvePath: 'M 0 112 C 50 94, 100 62, 160 44 C 220 28, 275 18, 340 12',
    legacyPath: 'M 0 122 C 65 118, 125 112, 195 98 C 255 90, 300 84, 340 76',
    points: [
      { label: 'Ingest', veloce: 7, legacy: 140 },
      { label: 'Feature Prep', veloce: 14, legacy: 210 },
      { label: 'Score', veloce: 13, legacy: 160 },
    ],
  },
];

export function HeroSection({
  onLaunchSolution,
  onExploreCapabilities,
  onSelectWorkloadForRoi,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProfile = WORKLOAD_PROFILES[activeIndex];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#E5C1C8]/12 bg-[#24070E] veloce-grid-bg"
    >
      {/* Subtle architectural radial glow in top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[440px] w-[440px] rounded-full bg-[#F4B8C6]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 h-[280px] w-[360px] rounded-full bg-[#361519]/90 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Proposition */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-medium tracking-wide text-[#F4B8C6]">
              AI Performance &amp; Analytics
              <span className="mx-2 text-[#D4A5B0]/50" aria-hidden="true">
                ·
              </span>
              <span className="text-[#E5C1C8]">Founded by Mahnoor Asim</span>
            </p>

            <h1
              className="mt-4 font-display font-bold tracking-tight text-[#FAF5F6] leading-[1.06]"
              style={{
                fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Enterprise AI, Built to Outpace.
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#D4A5B0]">
              VeloceAI Solutions engineers rapid AI deployment, autonomous workflow automation, and sub-50ms predictive analytics—turning fragmented enterprise data into decisive operational velocity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onLaunchSolution}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4B8C6] px-6 py-3.5 text-sm font-semibold text-[#24070E] shadow-[0_0_28px_rgba(244,184,198,0.28)] transition-all duration-150 hover:bg-[#FAF5F6] hover:shadow-[0_0_36px_rgba(244,184,198,0.42)] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B8C6]"
              >
                Launch Your Solution
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onExploreCapabilities}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E5C1C8]/30 bg-[#361519]/55 px-6 py-3.5 text-sm font-semibold text-[#FAF5F6] backdrop-blur-md transition-all duration-150 hover:border-[#F4B8C6]/70 hover:bg-[#361519] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C1C8]"
              >
                Explore Capabilities
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#D4A5B0]">
              <span>10-day production sprints</span>
              <span aria-hidden="true" className="text-[#E5C1C8]/35">
                /
              </span>
              <span>Zero-lock-in VPC &amp; edge deployment</span>
              <span aria-hidden="true" className="text-[#E5C1C8]/35">
                /
              </span>
              <span>Deterministic latency SLAs</span>
            </div>
          </div>

          {/* Right Column: Interactive Animated Speed & Latency Visualizer */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-2xl border border-[#E5C1C8]/16 bg-[#361519]/80 p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between shadow-[0_24px_60px_rgba(12,2,5,0.45)]">
              {/* Workload Segmented Tabs */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-medium text-[#D4A5B0]">
                    Interactive Speed Benchmark
                  </div>
                  <h2 className="mt-0.5 font-display text-base font-semibold text-[#FAF5F6]">
                    {activeProfile.title}
                  </h2>
                </div>

                <div
                  role="tablist"
                  aria-label="Select AI workload benchmark"
                  className="inline-flex items-center gap-1 rounded-xl border border-[#E5C1C8]/14 bg-[#24070E]/85 p-1 self-start sm:self-auto"
                >
                  {WORKLOAD_PROFILES.map((profile, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={profile.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveIndex(idx)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#F4B8C6] text-[#24070E] font-semibold'
                            : 'text-[#D4A5B0] hover:text-[#FAF5F6]'
                        }`}
                      >
                        {profile.tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vector Speed Curve Visualizer */}
              <div className="mt-5 rounded-xl border border-[#E5C1C8]/12 bg-[#24070E]/90 p-4">
                <div className="flex items-center justify-between text-xs text-[#D4A5B0] mb-2">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-[#FAF5F6] font-medium">
                      <span className="inline-block h-2 w-4 rounded-sm bg-[#F4B8C6]" />
                      VeloceAI Edge
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#D4A5B0]/75">
                      <span className="inline-block h-2 w-4 rounded-sm bg-[#E5C1C8]/30" />
                      Legacy Pipeline
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-[#F4B8C6] font-medium">
                    {activeProfile.speedGain}
                  </span>
                </div>

                <svg
                  viewBox="0 0 340 136"
                  className="w-full h-36 overflow-visible"
                  role="img"
                  aria-label={`Latency and throughput comparison for ${activeProfile.title}`}
                >
                  <defs>
                    <linearGradient id="veloceArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F4B8C6" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#F4B8C6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal subtle reference hairlines */}
                  <line x1="0" y1="32" x2="340" y2="32" stroke="#E5C1C8" strokeOpacity="0.08" />
                  <line x1="0" y1="68" x2="340" y2="68" stroke="#E5C1C8" strokeOpacity="0.08" />
                  <line x1="0" y1="104" x2="340" y2="104" stroke="#E5C1C8" strokeOpacity="0.08" />

                  {/* Legacy baseline */}
                  <path
                    d={activeProfile.legacyPath}
                    fill="none"
                    stroke="#E5C1C8"
                    strokeOpacity="0.3"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* VeloceAI shaded area */}
                  <path
                    d={`${activeProfile.curvePath} L 340 136 L 0 136 Z`}
                    fill="url(#veloceArea)"
                  />

                  {/* VeloceAI base curve */}
                  <path
                    d={activeProfile.curvePath}
                    fill="none"
                    stroke="#F4B8C6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Animated speed-trail pulse along curve */}
                  <path
                    d={activeProfile.curvePath}
                    fill="none"
                    stroke="#FAF5F6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-speed-dash"
                  />
                </svg>

                {/* Stage-by-stage millisecond comparison */}
                <div className="mt-3 grid grid-cols-3 gap-3 border-t border-[#E5C1C8]/10 pt-3">
                  {activeProfile.points.map((pt) => (
                    <div key={pt.label}>
                      <div className="text-[11px] text-[#D4A5B0]">{pt.label}</div>
                      <div className="mt-1 flex items-baseline gap-2 font-mono tabular-nums">
                        <span className="text-sm font-semibold text-[#FAF5F6]">
                          {pt.veloce}ms
                        </span>
                        <span className="text-[11px] text-[#D4A5B0]/60 line-through">
                          {pt.legacy}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary KPI strip inside visualizer */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#E5C1C8]/12 bg-[#24070E]/65 px-3.5 py-3">
                  <div className="text-[11px] text-[#D4A5B0]">P95 Latency</div>
                  <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#F4B8C6]">
                    {activeProfile.veloceLatencyMs}ms
                  </div>
                </div>
                <div className="rounded-xl border border-[#E5C1C8]/12 bg-[#24070E]/65 px-3.5 py-3">
                  <div className="text-[11px] text-[#D4A5B0]">Throughput</div>
                  <div className="mt-1 font-mono text-sm sm:text-base font-semibold tabular-nums text-[#FAF5F6]">
                    {activeProfile.throughputLabel}
                  </div>
                </div>
                <div className="rounded-xl border border-[#E5C1C8]/12 bg-[#24070E]/65 px-3.5 py-3">
                  <div className="text-[11px] text-[#D4A5B0]">Cold Start</div>
                  <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#E5C1C8]">
                    {activeProfile.coldStartMs}ms
                  </div>
                </div>
              </div>

              {/* Action link to ROI Calculator */}
              <div className="mt-4 flex items-center justify-between border-t border-[#E5C1C8]/10 pt-3.5">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#D4A5B0]">
                  <Zap className="h-3.5 w-3.5 text-[#F4B8C6]" />
                  Legacy avg: {activeProfile.legacyLatencyMs}ms
                </span>
                <button
                  type="button"
                  onClick={() => onSelectWorkloadForRoi(activeProfile.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#F4B8C6] hover:text-[#FAF5F6] transition-colors cursor-pointer"
                >
                  Simulate ROI for {activeProfile.tabLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
