import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { VeloceLogo } from './VeloceLogo';

interface AboutSectionProps {
  customLogoUrl: string | null;
  onOpenLogoModal: () => void;
}

const PROOF_CASES = [
  {
    client: 'B2B Logistics & Freight Network',
    before: '4.5-hour manual manifest triage & route quoting',
    outcome: '38ms automated dispatch scoring · 610 hrs saved monthly',
  },
  {
    client: 'Series-B Fintech Analytics Platform',
    before: 'Overnight batch risk reporting with 19% false alerts',
    outcome: 'Real-time stream scoring · +31% fraud catch accuracy in 6 weeks',
  },
];

export function AboutSection({
  customLogoUrl,
  onOpenLogoModal,
}: AboutSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="border-b border-[#E5C1C8]/12 bg-[#361519]/45 py-16 sm:py-22"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-[#E5C1C8]/18 bg-[#24070E] aspect-[4/3] lg:aspect-auto lg:flex-1 min-h-[280px]">
              {!imgError ? (
                <img
                  src="/src/assets/images/veloce_ai_architecture_1794841890045.jpg"
                  alt="VeloceAI Solutions dark obsidian glass and rose-champagne kinetic architecture sculpture"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#361519] via-[#24070E] to-[#180409] p-8 text-center">
                  <VeloceLogo customLogoUrl={customLogoUrl} size="lg" />
                  <p className="mt-4 font-display text-base font-semibold text-[#FAF5F6]">
                    VeloceAI Solutions
                  </p>
                  <p className="mt-1 text-xs text-[#D4A5B0]">
                    AI Performance &amp; Analytics
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#24070E]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-display text-sm font-bold text-[#FAF5F6]">
                    Mahnoor Asim
                  </div>
                  <div className="text-xs text-[#E5C1C8]">
                    Founder &amp; Principal AI Architect
                  </div>
                </div>
                <span className="font-mono text-xs tabular-nums text-[#F4B8C6]">
                  VeloceAI HQ
                </span>
              </div>
            </div>

            {/* Custom Logo Upload Slot for Brand Kit */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5C1C8]/16 bg-[#24070E]/85 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <VeloceLogo customLogoUrl={customLogoUrl} size="md" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#FAF5F6] truncate">
                    Brand Emblem Slot
                  </div>
                  <div className="text-[11px] text-[#D4A5B0] truncate">
                    {customLogoUrl
                      ? 'Custom logo uploaded'
                      : 'Geometric V-logo active'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenLogoModal}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#F4B8C6]/35 bg-[#361519] px-3 py-2 text-xs font-semibold text-[#F4B8C6] hover:bg-[#F4B8C6] hover:text-[#24070E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                Replace Logo
              </button>
            </div>
          </div>

          {/* Right Narrative & Proof Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#F4B8C6]">
              About VeloceAI Solutions
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF5F6]"
              style={{ textWrap: 'balance' }}
            >
              Built to eliminate the gap between AI strategy and production speed.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#D4A5B0]">
              Founded by <strong className="font-semibold text-[#FAF5F6]">Mahnoor Asim</strong>, VeloceAI Solutions partners with ambitious B2B teams that cannot afford six-month discovery cycles or sluggish off-the-shelf wrappers. We architect lean, deterministic AI automation, custom LLM integrations, and real-time analytics pipelines engineered for sub-50ms responsiveness.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#D4A5B0]">
              Every engagement follows a disciplined sprint cadence: benchmark existing bottlenecks, ship production infrastructure into your environment in days, and tie every model directly to verifiable operational savings.
            </p>

            {/* Quantified Client Outcomes */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROOF_CASES.map((proof) => (
                <div
                  key={proof.client}
                  className="rounded-xl border border-[#E5C1C8]/14 bg-[#24070E]/75 p-5"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C1C8]">
                    <Sparkles className="h-3.5 w-3.5 text-[#F4B8C6] shrink-0" />
                    <span>{proof.client}</span>
                  </div>
                  <p className="mt-2.5 text-xs text-[#D4A5B0]">
                    Before: {proof.before}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#FAF5F6]">
                    {proof.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
