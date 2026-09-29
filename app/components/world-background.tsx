const clouds = [
  { top: '8%', scale: 1.1, duration: 95, delay: -20, opacity: 0.9 },
  { top: '22%', scale: 0.7, duration: 120, delay: -70, opacity: 0.7 },
  { top: '46%', scale: 1.4, duration: 140, delay: -40, opacity: 0.6 },
  { top: '64%', scale: 0.9, duration: 110, delay: -95, opacity: 0.75 },
  { top: '82%', scale: 1.2, duration: 150, delay: -10, opacity: 0.55 },
];

const sparkles = [
  { top: '12%', left: '8%', size: 14, delay: 0 },
  { top: '18%', left: '46%', size: 10, delay: 1.2 },
  { top: '9%', left: '72%', size: 12, delay: 0.6 },
  { top: '38%', left: '92%', size: 16, delay: 2 },
  { top: '55%', left: '4%', size: 12, delay: 1.6 },
  { top: '70%', left: '58%', size: 10, delay: 0.3 },
  { top: '88%', left: '28%', size: 14, delay: 2.4 },
  { top: '92%', left: '84%', size: 12, delay: 1 },
];

function Cloud() {
  return (
    <svg viewBox="0 0 220 90" className="w-[220px] h-[90px]" aria-hidden>
      <path
        d="M40 78c-19 0-32-12-32-27s13-26 30-26c4-15 18-25 35-25 16 0 30 9 35 23 5-4 12-6 19-6 17 0 30 12 31 27 18 0 31 11 31 26s-12 20-29 20H40z"
        fill="white"
      />
    </svg>
  );
}

export function Sparkle({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Fixed dreamy sky behind the whole page: gradient, drifting clouds, twinkling sparkles. */
export default function WorldBackground() {
  return (
    <div className="sky fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud absolute left-0"
          style={{
            top: c.top,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div style={{ transform: `scale(${c.scale})` }}>
            <Cloud />
          </div>
        </div>
      ))}
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute text-violet-400"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
        >
          <Sparkle size={s.size} />
        </span>
      ))}
    </div>
  );
}
