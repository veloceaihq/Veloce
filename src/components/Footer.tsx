import { VeloceLogo } from './VeloceLogo';

interface FooterProps {
  customLogoUrl: string | null;
}

export function Footer({ customLogoUrl }: FooterProps) {
  return (
    <footer className="bg-[#180409] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <VeloceLogo customLogoUrl={customLogoUrl} size="sm" />
            <div>
              <div className="font-display text-base font-bold text-[#FAF5F6]">
                VeloceAI Solutions
              </div>
              <div className="text-xs text-[#D4A5B0]">
                AI Performance &amp; Analytics
              </div>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#D4A5B0]"
          >
            <a
              href="#solutions"
              className="hover:text-[#FAF5F6] transition-colors"
            >
              Solutions
            </a>
            <a
              href="#benchmarks"
              className="hover:text-[#FAF5F6] transition-colors"
            >
              Speed Benchmarks
            </a>
            <a
              href="#about"
              className="hover:text-[#FAF5F6] transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-[#FAF5F6] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#E5C1C8]">
            <a
              href="mailto:veloceaihq@gmail.com"
              className="hover:text-[#F4B8C6] transition-colors"
            >
              veloceaihq@gmail.com
            </a>
            <span aria-hidden="true" className="text-[#E5C1C8]/30">
              ·
            </span>
            <a
              href="tel:0549094209"
              className="tabular-nums hover:text-[#F4B8C6] transition-colors"
            >
              0549094209
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[#E5C1C8]/10 pt-6 text-xs text-[#D4A5B0]">
          <p>© {new Date().getFullYear()} VeloceAI Solutions. All rights reserved.</p>
          <p>Founded by Mahnoor Asim · VeloceAI HQ</p>
        </div>
      </div>
    </footer>
  );
}
