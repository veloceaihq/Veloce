import { useEffect, useState } from 'react';
import { ArrowRight, Check, Upload } from 'lucide-react';
import { VeloceLogo } from './components/VeloceLogo';
import { LogoModal } from './components/LogoModal';
import { ContactModal } from './components/ContactModal';

const LOGO_STORAGE_KEY = 'veloceai_custom_logo_v1';

type NavTab = 'solutions' | 'platform' | 'about' | 'content';

interface TabContentItem {
  id: NavTab;
  label: string;
  kicker: string;
  headline: string;
  description: string;
  ctaLabel: string;
}

const TAB_ITEMS: TabContentItem[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    kicker: 'AI Performance & Analytics',
    headline: 'Enterprise AI, Built to Outpace.',
    description:
      'VeloceAI Solutions delivers rapid AI deployment, custom workflow automation, and high-velocity analytics designed to turn fragmented enterprise operations into measurable speed.',
    ctaLabel: 'Book a Speed Audit',
  },
  {
    id: 'platform',
    label: 'Platform',
    kicker: 'Sub-50ms Execution Architecture',
    headline: 'Engineered for Real-Time Throughput.',
    description:
      'Built around low-latency model routing, automated pipelines, and resilient 99.9% uptime orchestration so production AI runs reliably at enterprise scale.',
    ctaLabel: 'Request Architecture Brief',
  },
  {
    id: 'about',
    label: 'About',
    kicker: 'Founded by Mahnoor Asim',
    headline: 'Lean Precision Over Bloated Timelines.',
    description:
      'VeloceAI Solutions partners directly with B2B leadership to ship tailored AI infrastructure in focused sprints—eliminating long discovery cycles and guesswork.',
    ctaLabel: 'Connect with Mahnoor',
  },
  {
    id: 'content',
    label: 'Content',
    kicker: 'VeloceAI HQ · Briefings & Contact',
    headline: 'Benchmarks, Playbooks & Direct Access.',
    description:
      'Explore technical case briefs and deployment frameworks, or reach VeloceAI HQ directly at veloceaihq@gmail.com and 0549094209.',
    ctaLabel: 'Contact VeloceAI HQ',
  },
];

type ServiceId = 'predictive' | 'consulting' | 'integration';

interface ServiceBoxItem {
  id: ServiceId;
  number: string;
  title: string;
  summary: string;
  highlights: string[];
}

const SERVICE_BOXES: ServiceBoxItem[] = [
  {
    id: 'predictive',
    number: '01.',
    title: 'Predictive Analytics',
    summary:
      'Forecasting models and real-time anomaly detection built to surface trends before markets move.',
    highlights: [
      'Demand, churn & revenue forecasting',
      'Live KPI scoring under 50ms latency',
    ],
  },
  {
    id: 'consulting',
    number: '02.',
    title: 'Data Science Consulting',
    summary:
      'Strategic modeling, feature engineering, and clear roadmaps tailored to your enterprise data stack.',
    highlights: [
      'Data readiness & pipeline audits',
      'Custom model validation & ROI design',
    ],
  },
  {
    id: 'integration',
    number: '03.',
    title: 'AI Integration',
    summary:
      'Production LLMs, autonomous agents, and seamless API workflows wired directly into your tools.',
    highlights: [
      'Custom LLM & RAG deployment',
      'Zero-friction ERP, CRM & cloud sync',
    ],
  },
];

export default function App() {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOGO_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<NavTab>('solutions');
  const [selectedService, setSelectedService] =
    useState<ServiceId>('predictive');

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('Speed Audit');

  useEffect(() => {
    try {
      if (customLogoUrl) {
        localStorage.setItem(LOGO_STORAGE_KEY, customLogoUrl);
      } else {
        localStorage.removeItem(LOGO_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [customLogoUrl]);

  const currentTabContent =
    TAB_ITEMS.find((t) => t.id === activeTab) ?? TAB_ITEMS[0];
  const currentService =
    SERVICE_BOXES.find((s) => s.id === selectedService) ?? SERVICE_BOXES[0];

  const openContactWith = (topic: string) => {
    setContactTopic(topic);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#24070E] flex flex-col">
      {/* Centered Top Header: Logo + Name in the Middle Top, 4 Tabs Directly Below */}
      <header className="w-full border-b border-[#24070E]/10 bg-white pt-8 pb-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Logo & Brand Name Centered */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsLogoModalOpen(true)}
              title="Click to upload or replace brand logo"
              aria-label="Upload or replace VeloceAI Solutions logo"
              className="group relative rounded-xl focus-visible:outline-2 focus-visible:outline-[#24070E] cursor-pointer"
            >
              <VeloceLogo customLogoUrl={customLogoUrl} size="md" />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-[#24070E]/85 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Upload className="h-3.5 w-3.5 text-[#F4B8C6]" />
              </span>
            </button>

            <span className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-[#24070E] whitespace-nowrap">
              VeloceAI Solutions
            </span>
          </div>

          {/* 4 Centered Options / Tabs Below Logo & Name */}
          <nav
            aria-label="Primary sections"
            role="tablist"
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-xl border border-[#24070E]/10 bg-[#FAF6F7] p-1.5"
          >
            {TAB_ITEMS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#24070E] ${
                    isActive
                      ? 'bg-[#24070E] text-[#FAF5F6] shadow-sm'
                      : 'text-[#5C343C] hover:text-[#24070E] hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Centered Boxed Layout */}
      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
          {/* Coloured Box Below Tabs */}
          <section
            aria-live="polite"
            className="rounded-2xl border border-[#24070E]/15 bg-gradient-to-br from-[#24070E] via-[#2D0B13] to-[#361519] px-6 py-10 sm:px-12 sm:py-14 text-center shadow-[0_18px_48px_rgba(36,7,14,0.12)]"
          >
            <div className="mx-auto max-w-2xl">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#F4B8C6]">
                {currentTabContent.kicker}
              </p>

              <h1
                className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF5F6]"
                style={{ textWrap: 'balance' }}
              >
                {currentTabContent.headline}
              </h1>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E5C1C8]">
                {currentTabContent.description}
              </p>

              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => openContactWith('Speed Audit')}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4B8C6] px-6 py-3 text-xs sm:text-sm font-semibold text-[#24070E] hover:bg-[#FAF5F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B8C6]"
                >
                  {currentTabContent.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* 3 Interactive Boxes Side by Side */}
          <section aria-label="Core Services">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {SERVICE_BOXES.map((box) => {
                const isSelected = selectedService === box.id;
                return (
                  <button
                    key={box.id}
                    type="button"
                    onClick={() => setSelectedService(box.id)}
                    aria-pressed={isSelected}
                    className={`group rounded-2xl border p-6 text-left transition-all duration-150 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#24070E] ${
                      isSelected
                        ? 'border-[#24070E] bg-[#FAF6F7] shadow-[0_10px_28px_rgba(36,7,14,0.08)]'
                        : 'border-[#24070E]/14 bg-white hover:border-[#24070E]/45 hover:bg-[#FAF6F7]/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#7A3544]">
                          {box.number}
                        </span>
                        <span
                          className={`text-[11px] font-semibold transition-colors ${
                            isSelected ? 'text-[#24070E]' : 'text-[#5C343C]/70'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                      </div>

                      <h2 className="mt-3 font-display text-lg font-bold tracking-tight text-[#24070E]">
                        {box.title}
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-[#5C343C]">
                        {box.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#24070E]/10 flex items-center justify-between text-xs font-semibold text-[#24070E]">
                      <span>Explore details</span>
                      <ArrowRight
                        className={`h-3.5 w-3.5 transition-transform duration-150 ${
                          isSelected
                            ? 'translate-x-0.5 text-[#24070E]'
                            : 'group-hover:translate-x-0.5 text-[#5C343C]'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Minimal Interactive Detail Strip for the Selected Service Box */}
            <div className="mt-5 rounded-2xl border border-[#24070E]/12 bg-[#FAF6F7] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="font-display text-sm font-bold text-[#24070E]">
                  {currentService.number} {currentService.title}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#5C343C]">
                  {currentService.highlights.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#24070E] shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => openContactWith(currentService.title)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24070E] px-4 py-2.5 text-xs font-semibold text-[#FAF5F6] hover:bg-[#361519] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inquire About {currentService.title}
                <ArrowRight className="h-3.5 w-3.5 text-[#F4B8C6]" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Clean Minimal Centered Footer */}
      <footer className="border-t border-[#24070E]/10 bg-white py-7">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C343C]">
          <div>
            © {new Date().getFullYear()} VeloceAI Solutions · Founded by Mahnoor Asim
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono">
            <a
              href="mailto:veloceaihq@gmail.com"
              className="hover:text-[#24070E] transition-colors"
            >
              veloceaihq@gmail.com
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="tel:0549094209"
              className="tabular-nums hover:text-[#24070E] transition-colors"
            >
              0549094209
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsLogoModalOpen(true)}
              className="font-sans font-semibold text-[#24070E] hover:underline cursor-pointer"
            >
              Replace Logo
            </button>
          </div>
        </div>
      </footer>

      <LogoModal
        isOpen={isLogoModalOpen}
        customLogoUrl={customLogoUrl}
        onClose={() => setIsLogoModalOpen(false)}
        onSaveLogo={(url) => setCustomLogoUrl(url)}
      />

      <ContactModal
        isOpen={isContactOpen}
        defaultTopic={contactTopic}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
