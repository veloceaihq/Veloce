import { SPEED_METRICS } from '../data/solutions';

export function MetricsBar() {
  return (
    <section
      aria-label="Speed and performance metrics"
      className="border-b border-[#E5C1C8]/14 bg-[#361519]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5C1C8]/12">
          {SPEED_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="py-6 sm:px-6 first:pl-0 last:pr-0 flex flex-col justify-between"
            >
              <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight tabular-nums text-[#F4B8C6]">
                {metric.value}
              </div>
              <div className="mt-1.5 font-display text-sm font-semibold text-[#FAF5F6]">
                {metric.label}
              </div>
              <div className="mt-0.5 text-xs text-[#D4A5B0]">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
