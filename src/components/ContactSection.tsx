import React, { useEffect, useState } from 'react';
import { Check, Copy, Mail, Phone, MapPin, AlertCircle, Send } from 'lucide-react';
import { InquiryPrefill } from '../types';

interface ContactSectionProps {
  prefill: InquiryPrefill | null;
}

const SCOPE_OPTIONS = [
  'Speed Audit',
  'Rapid AI Automation & Agents',
  'High-Velocity Predictive Analytics',
  'Custom LLM & Workflow Integration',
  'Real-Time Data Engineering',
];

export function ContactSection({ prefill }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState(SCOPE_OPTIONS[0]);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    company: string;
    email: string;
    scope: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

  useEffect(() => {
    if (prefill) {
      if (SCOPE_OPTIONS.includes(prefill.scope)) {
        setScope(prefill.scope);
      }
      if (prefill.message) {
        setMessage(prefill.message);
      }
      setSubmittedRecord(null);
    }
  }, [prefill]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!company.trim()) nextErrors.company = 'Please enter your company name.';
    if (!email.trim()) {
      nextErrors.email = 'Please enter your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please share a brief overview (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmittedRecord({
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      scope,
    });
  };

  const handleCopy = async (value: string, field: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const handleNewInquiry = () => {
    setName('');
    setCompany('');
    setEmail('');
    setMessage('');
    setErrors({});
    setSubmittedRecord(null);
  };

  return (
    <section
      id="contact"
      className="border-b border-[#E5C1C8]/12 bg-[#24070E] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#F4B8C6]">VeloceAI HQ</p>
          <h2
            className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF5F6]"
            style={{ textWrap: 'balance' }}
          >
            Start your 10-day AI deployment or speed audit.
          </h2>
          <p className="mt-3 text-base text-[#D4A5B0]">
            Tell us what slows your operations down. Our engineering team responds directly with an architectural plan and latency target.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Working Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-[#E5C1C8]/16 bg-[#361519]/80 p-6 sm:p-8">
            {submittedRecord ? (
              <div
                className="flex h-full flex-col justify-center py-6"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B8C6] text-[#24070E]">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#FAF5F6]">
                  Inquiry Received at VeloceAI HQ
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#D4A5B0]">
                  Thank you, <span className="text-[#FAF5F6] font-semibold">{submittedRecord.name}</span>. Your{' '}
                  <span className="text-[#F4B8C6] font-medium">{submittedRecord.scope}</span> request for{' '}
                  <span className="text-[#FAF5F6] font-medium">{submittedRecord.company}</span> has been logged for Mahnoor Asim&apos;s engineering team. We will reply to{' '}
                  <span className="text-[#FAF5F6] font-mono text-xs">{submittedRecord.email}</span> within 4 business hours.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleNewInquiry}
                    className="rounded-xl border border-[#E5C1C8]/25 bg-[#24070E] px-5 py-2.5 text-xs font-semibold text-[#FAF5F6] hover:border-[#F4B8C6] transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#FAF5F6]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                      }}
                      placeholder="Alex Mercer"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-1.5 w-full rounded-xl border border-[#E5C1C8]/20 bg-[#24070E]/85 px-4 py-3 text-sm text-[#FAF5F6] placeholder-[#D4A5B0]/50 focus:border-[#F4B8C6] focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#F4B8C6]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-semibold text-[#FAF5F6]"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (errors.company)
                          setErrors((p) => ({ ...p, company: '' }));
                      }}
                      placeholder="Northstar Logistics"
                      aria-invalid={Boolean(errors.company)}
                      className="mt-1.5 w-full rounded-xl border border-[#E5C1C8]/20 bg-[#24070E]/85 px-4 py-3 text-sm text-[#FAF5F6] placeholder-[#D4A5B0]/50 focus:border-[#F4B8C6] focus:outline-none transition-colors"
                    />
                    {errors.company && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#F4B8C6]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#FAF5F6]"
                    >
                      Work Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                      }}
                      placeholder="alex@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className="mt-1.5 w-full rounded-xl border border-[#E5C1C8]/20 bg-[#24070E]/85 px-4 py-3 text-sm text-[#FAF5F6] placeholder-[#D4A5B0]/50 focus:border-[#F4B8C6] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#F4B8C6]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-scope"
                      className="block text-xs font-semibold text-[#FAF5F6]"
                    >
                      Project Scope
                    </label>
                    <select
                      id="contact-scope"
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E5C1C8]/20 bg-[#24070E]/85 px-4 py-3 text-sm text-[#FAF5F6] focus:border-[#F4B8C6] focus:outline-none transition-colors"
                    >
                      {SCOPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#24070E]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#FAF5F6]"
                  >
                    Project Brief &amp; Latency Goals
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message)
                        setErrors((p) => ({ ...p, message: '' }));
                    }}
                    placeholder="Describe your current workflow bottlenecks, data stack, or target timeline..."
                    aria-invalid={Boolean(errors.message)}
                    className="mt-1.5 w-full rounded-xl border border-[#E5C1C8]/20 bg-[#24070E]/85 px-4 py-3 text-sm text-[#FAF5F6] placeholder-[#D4A5B0]/50 focus:border-[#F4B8C6] focus:outline-none transition-colors resize-y"
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#F4B8C6]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#F4B8C6] px-6 py-3.5 text-sm font-semibold text-[#24070E] shadow-[0_0_24px_rgba(244,184,198,0.24)] hover:bg-[#FAF5F6] transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  Send Inquiry to VeloceAI HQ
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Details Card */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E5C1C8]/16 bg-[#361519]/60 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#F4B8C6]">
                <MapPin className="h-4 w-4" />
                <span>VeloceAI HQ</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-[#FAF5F6]">
                Direct Studio Desk
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#D4A5B0]">
                Skip generic intake queues. Reach founder-led engineering directly for architecture scoping, speed audits, and custom enterprise retainers.
              </p>

              <dl className="mt-7 space-y-5 border-t border-[#E5C1C8]/12 pt-6">
                <div>
                  <dt className="text-xs font-medium text-[#D4A5B0]">Founder</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-[#FAF5F6]">
                    Mahnoor Asim
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <dt className="text-xs font-medium text-[#D4A5B0]">Phone</dt>
                    <dd className="mt-1">
                      <a
                        href="tel:0549094209"
                        className="inline-flex items-center gap-2 font-mono text-base font-semibold tabular-nums text-[#FAF5F6] hover:text-[#F4B8C6] transition-colors"
                      >
                        <Phone className="h-4 w-4 text-[#F4B8C6]" />
                        0549094209
                      </a>
                    </dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('0549094209', 'phone')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5C1C8]/20 bg-[#24070E]/75 px-3 py-1.5 text-xs font-medium text-[#E5C1C8] hover:border-[#F4B8C6]/60 hover:text-[#FAF5F6] transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#F4B8C6]" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-[#D4A5B0]">Email</dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:veloceaihq@gmail.com"
                        className="inline-flex items-center gap-2 font-mono text-sm sm:text-base font-semibold text-[#FAF5F6] hover:text-[#F4B8C6] transition-colors truncate"
                      >
                        <Mail className="h-4 w-4 text-[#F4B8C6] shrink-0" />
                        <span className="truncate">veloceaihq@gmail.com</span>
                      </a>
                    </dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('veloceaihq@gmail.com', 'email')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5C1C8]/20 bg-[#24070E]/75 px-3 py-1.5 text-xs font-medium text-[#E5C1C8] hover:border-[#F4B8C6]/60 hover:text-[#FAF5F6] transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#F4B8C6]" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-[#E5C1C8]/12 pt-5 text-xs leading-relaxed text-[#D4A5B0]">
              Response guarantee: Direct founder &amp; systems review within 4 business hours for all B2B audit requests.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
