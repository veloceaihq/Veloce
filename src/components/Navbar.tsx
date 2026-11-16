import { useState } from 'react';
import { Menu, X, Upload } from 'lucide-react';
import { VeloceLogo } from './VeloceLogo';

interface NavbarProps {
  customLogoUrl: string | null;
  onOpenLogoModal: () => void;
  onBookAudit: () => void;
}

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Speed Benchmarks', href: '#benchmarks' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({
  customLogoUrl,
  onOpenLogoModal,
  onBookAudit,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5C1C8]/12 bg-[#24070E]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 h-16">
        {/* Zone 1: Brand wordmark + clickable logo upload trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenLogoModal}
            title="Click to upload or replace brand logo"
            aria-label="Upload or replace VeloceAI Solutions logo"
            className="group relative rounded-lg focus-visible:outline-2 focus-visible:outline-[#F4B8C6]"
          >
            <VeloceLogo customLogoUrl={customLogoUrl} size="md" />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-[#24070E]/85 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Upload className="h-3.5 w-3.5 text-[#F4B8C6]" />
            </span>
          </button>
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-[#FAF5F6] whitespace-nowrap shrink-0 hover:text-[#F4B8C6] transition-colors"
          >
            VeloceAI Solutions
          </a>
        </div>

        {/* Zone 2: 4 single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D4A5B0]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#FAF5F6] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#F4B8C6] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookAudit}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#F4B8C6] px-4 py-2 text-xs font-semibold text-[#24070E] shadow-[0_0_24px_rgba(244,184,198,0.28)] transition-all duration-150 hover:bg-[#FAF5F6] hover:shadow-[0_0_30px_rgba(244,184,198,0.45)] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B8C6]"
          >
            Book a Speed Audit
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-[#E5C1C8]/18 bg-[#361519]/80 text-[#FAF5F6] hover:border-[#F4B8C6]/50 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5C1C8]/12 bg-[#24070E]/95 backdrop-blur-xl px-4 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleMobileNav(link.href)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-[#FAF5F6] hover:bg-[#361519] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-[#E5C1C8]/12 pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookAudit();
              }}
              className="w-full rounded-lg bg-[#F4B8C6] px-4 py-3 text-sm font-semibold text-[#24070E] shadow-[0_0_24px_rgba(244,184,198,0.28)]"
            >
              Book a Speed Audit
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenLogoModal();
              }}
              className="w-full rounded-lg border border-[#E5C1C8]/20 px-4 py-2.5 text-xs font-medium text-[#E5C1C8]"
            >
              Upload / Replace Custom Logo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
