'use client';

import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface XpBarProps {
  /** Fill amount, 0–100. */
  value: number;
  className?: string;
}

/** Progress bar that fills with a springy overshoot when scrolled into view. */
export default function XpBar({ value, className = '' }: XpBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fill = fillRef.current;
    if (!fill) return;
    if (prefersReducedMotion()) {
      gsap.set(fill, { width: `${value}%` });
      return;
    }
    gsap.fromTo(
      fill,
      { width: '0%' },
      {
        width: `${value}%`,
        duration: 1.6,
        delay: 0.3,
        ease: 'elastic.out(1, 0.55)',
        scrollTrigger: { trigger: trackRef.current, start: 'top 92%', once: true },
      }
    );
  });

  return (
    <div
      ref={trackRef}
      className={`xp-track ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={fillRef} className="xp-fill" style={{ width: 0 }} />
    </div>
  );
}
