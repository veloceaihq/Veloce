import React, { useEffect, useState } from 'react';
import { X, Check, AlertCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  defaultTopic: string;
  onClose: () => void;
}

const TOPICS = [
  'Predictive Analytics',
  'Data Science Consulting',
  'AI Integration',
  'Speed Audit',
];

export function ContactModal({
  isOpen,
  defaultTopic,
  onClose,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(defaultTopic);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTopic(defaultTopic);
    setSubmitted(false);
    setErrors({});
  }, [defaultTopic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Valid work email is required.';
    }
    if (!message.trim()) nextErrors.message = 'Please add a short note.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#24070E]/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#24070E]/15 bg-white p-6 shadow-2xl text-[#24070E]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="contact-modal-title"
              className="font-display text-xl font-bold tracking-tight"
            >
              Connect with VeloceAI HQ
            </h2>
            <p className="mt-1 text-xs text-[#5C343C]">
              Founder: Mahnoor Asim · veloceaihq@gmail.com · 0549094209
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry modal"
            className="rounded-lg p-1.5 text-[#5C343C] hover:bg-[#FAF5F6] hover:text-[#24070E] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-xl bg-[#24070E] p-6 text-center text-[#FAF5F6]">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F4B8C6] text-[#24070E]">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">
              Request Logged
            </h3>
            <p className="mt-1.5 text-xs text-[#E5C1C8]">
              Thank you, {name}. Your {topic} inquiry has been received for{' '}
              {email}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-lg bg-[#F4B8C6] px-5 py-2 text-xs font-semibold text-[#24070E] hover:bg-[#FAF5F6] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="modal-name"
                className="block text-xs font-semibold text-[#24070E]"
              >
                Name
              </label>
              <input
                id="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-1 w-full rounded-xl border border-[#24070E]/18 px-3.5 py-2.5 text-sm text-[#24070E] focus:border-[#24070E] focus:outline-none"
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 text-xs text-[#9E1C35]">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="modal-company"
                  className="block text-xs font-semibold text-[#24070E]"
                >
                  Company
                </label>
                <input
                  id="modal-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Optional"
                  className="mt-1 w-full rounded-xl border border-[#24070E]/18 px-3.5 py-2.5 text-sm text-[#24070E] focus:border-[#24070E] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-email"
                  className="block text-xs font-semibold text-[#24070E]"
                >
                  Email
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-xl border border-[#24070E]/18 px-3.5 py-2.5 text-sm text-[#24070E] focus:border-[#24070E] focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#9E1C35]">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="modal-topic"
                className="block text-xs font-semibold text-[#24070E]"
              >
                Focus Area
              </label>
              <select
                id="modal-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#24070E]/18 bg-white px-3.5 py-2.5 text-sm text-[#24070E] focus:border-[#24070E] focus:outline-none"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="modal-message"
                className="block text-xs font-semibold text-[#24070E]"
              >
                Message
              </label>
              <textarea
                id="modal-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a brief overview of what you want to build..."
                className="mt-1 w-full rounded-xl border border-[#24070E]/18 px-3.5 py-2.5 text-sm text-[#24070E] focus:border-[#24070E] focus:outline-none"
              />
              {errors.message && (
                <p className="mt-1 flex items-center gap-1 text-xs text-[#9E1C35]">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#24070E] px-5 py-3 text-sm font-semibold text-[#FAF5F6] hover:bg-[#361519] transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4 text-[#F4B8C6]" />
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
