import { useState } from 'react';
import { ArrowRight, Check, Gauge } from 'lucide-react';
import { SOLUTIONS } from '../data/solutions';
import { WorkflowType } from '../types';

interface SolutionsSectionProps {
  onEstimateRoi: (workflow: WorkflowType) => void;
  onScopeSolution: (scopeLabel: string) => void;
}

export function SolutionsSection({
  onEstimateRoi,
  onScopeSolution,
}: SolutionsSectionProps) {
  const [selectedId, setSelectedId] = useState<WorkflowType>('automation');

  return (
    <section
      id="solutions"
      className="border-b border-[#E5C1C8]/12 bg-[#24070E] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#F4B8C6]">
              Core Capabilities
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF5F6]"
              style={{ textWrap: 'balance' }}
            >
              Four high-velocity systems engineered for measurable speed.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#D4A5B0]">
            Select any capability below to inspect its architecture specifications, target latency, and ROI profile.
          </p>
        </div>

        {/* Interactive 2x2 Grid with subtle asymmetric span highlight on desktop */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {SOLUTIONS.map((item) => {
            const isActive = selectedId === item.id;
            return (
              <article
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group relative rounded-2xl border p-6 sm:p-7 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-[#F4B8C6]/55 bg-[#361519] shadow-[0_16px_44px_rgba(244,184,198,0.08)]'
                    : 'border-[#E5C1C8]/14 bg-[#361519]/60 hover:border-[#E5C1C8]/35 hover:bg-[#361519]/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#F4B8C6]">
                      {item.number}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-[#D4A5B0] font-mono tabular-nums">
                      <span>{item.latencyTarget}</span>
                      <span aria-hidden="true" className="text-[#E5C1C8]/35">
                        ·
                      </span>
                      <span>{item.deploymentWindow}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#FAF5F6]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#D4A5B0]">
                    {item.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-[#E5C1C8]/12 pt-5">
                    {item.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2.5 text-sm text-[#FAF5F6]/90"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F4B8C6]" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-[#E5C1C8]/12 pt-5">
                  <div className="text-xs font-medium text-[#E5C1C8]">
                    Verified Outcome:{' '}
                    <span className="text-[#FAF5F6]">{item.outcome}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#D4A5B0]">
                    {item.architectureNote}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(item.id);
                        onEstimateRoi(item.id);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4B8C6] px-4 py-2 text-xs font-semibold text-[#24070E] hover:bg-[#FAF5F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Gauge className="h-3.5 w-3.5" />
                      Estimate ROI
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(item.id);
                        onScopeSolution(item.scopeLabel);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5C1C8]/25 bg-[#24070E]/60 px-4 py-2 text-xs font-semibold text-[#FAF5F6] hover:border-[#F4B8C6]/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Scope This System
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
