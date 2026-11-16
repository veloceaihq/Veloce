interface VeloceLogoProps {
  customLogoUrl: string | null;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export function VeloceLogo({
  customLogoUrl,
  size = 'md',
  variant = 'light',
}: VeloceLogoProps) {
  const dimensions =
    size === 'sm'
      ? 'h-8 w-8'
      : size === 'lg'
        ? 'h-12 w-12'
        : 'h-10 w-10';

  if (customLogoUrl) {
    return (
      <div
        className={`${dimensions} shrink-0 overflow-hidden rounded-xl border ${
          variant === 'light'
            ? 'border-[#24070E]/15 bg-[#24070E]'
            : 'border-[#E5C1C8]/25 bg-[#361519]'
        } flex items-center justify-center`}
      >
        <img
          src={customLogoUrl}
          alt="VeloceAI Solutions custom brand mark"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`${dimensions} shrink-0 rounded-xl border border-[#24070E]/15 bg-[#24070E] flex items-center justify-center relative overflow-hidden shadow-sm`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
      >
        {/* Speed-trail horizontal streaks */}
        <path
          d="M4 11H13.5"
          stroke="#E5C1C8"
          strokeOpacity="0.65"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M2 17H11"
          stroke="#F4B8C6"
          strokeOpacity="0.9"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M6 23H12.5"
          stroke="#E5C1C8"
          strokeOpacity="0.45"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Geometric V-mark */}
        <path
          d="M13 10L21.5 30L32.5 10"
          stroke="#FAF5F6"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 10L22.2 21.5L27.5 10"
          stroke="#F4B8C6"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
