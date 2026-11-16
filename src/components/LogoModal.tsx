import React, { useRef, useState } from 'react';
import { Upload, RotateCcw, X, Check } from 'lucide-react';
import { VeloceLogo } from './VeloceLogo';

interface LogoModalProps {
  isOpen: boolean;
  customLogoUrl: string | null;
  onClose: () => void;
  onSaveLogo: (dataUrl: string | null) => void;
}

export function LogoModal({
  isOpen,
  customLogoUrl,
  onClose,
  onSaveLogo,
}: LogoModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (SVG, PNG, JPG, or WebP).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('File size must be under 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSaveLogo(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Could not read the selected file. Please try another.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#180409]/80 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logo-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E5C1C8]/20 bg-[#361519] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="logo-modal-title"
              className="font-display text-lg font-bold tracking-tight text-[#FAF5F6]"
            >
              Brand Mark Customization
            </h2>
            <p className="mt-1 text-sm text-[#D4A5B0]">
              Upload your custom VeloceAI Solutions logo file (SVG, PNG, JPG, or WebP) to preview it live across the header and footer.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close logo customizer"
            className="rounded-lg p-2 text-[#D4A5B0] hover:bg-[#24070E] hover:text-[#FAF5F6] transition-colors focus-visible:outline-2 focus-visible:outline-[#F4B8C6]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#E5C1C8]/14 bg-[#24070E]/80 p-4">
          <VeloceLogo customLogoUrl={customLogoUrl} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-[#FAF5F6]">
              {customLogoUrl ? 'Custom Brand Mark Active' : 'Default Geometric V-Logo'}
            </div>
            <div className="text-xs text-[#D4A5B0] mt-0.5">
              {customLogoUrl
                ? 'Saved locally in your browser session.'
                : 'Precision vector V-emblem with speed-trail lines.'}
            </div>
          </div>
          {customLogoUrl && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#F4B8C6]">
              <Check className="h-3.5 w-3.5" />
              Active
            </span>
          )}
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-4 rounded-xl border border-dashed p-6 text-center transition-colors ${
            isDragging
              ? 'border-[#F4B8C6] bg-[#F4B8C6]/10'
              : 'border-[#E5C1C8]/25 bg-[#24070E]/45 hover:border-[#F4B8C6]/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.svg"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="mx-auto h-6 w-6 text-[#F4B8C6]" />
          <p className="mt-2.5 text-sm font-medium text-[#FAF5F6]">
            Drop your logo file here, or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[#F4B8C6] underline underline-offset-4 hover:text-[#FAF5F6] focus-visible:outline-2 focus-visible:outline-[#F4B8C6]"
            >
              browse files
            </button>
          </p>
          <p className="mt-1 text-xs text-[#D4A5B0]">
            Recommended: transparent SVG or PNG, max 2 MB.
          </p>
        </div>

        {errorMsg && (
          <p className="mt-3 text-xs font-medium text-[#F4B8C6]" role="alert">
            Error: {errorMsg}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onSaveLogo(null);
              setErrorMsg(null);
            }}
            disabled={!customLogoUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E5C1C8]/20 px-4 py-2 text-xs font-medium text-[#E5C1C8] hover:border-[#E5C1C8]/40 hover:text-[#FAF5F6] disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Default
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#F4B8C6] px-5 py-2 text-xs font-semibold text-[#24070E] hover:bg-[#FAF5F6] transition-colors whitespace-nowrap shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
