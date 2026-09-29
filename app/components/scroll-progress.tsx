'use client';

import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

/** Thin gradient bar across the top of the screen that fills as you scroll. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: prefersReducedMotion() ? true : 0.3 },
      }
    );
  });

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left pointer-events-none"
      style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899, #f59e0b)', transform: 'scaleX(0)' }}
      aria-hidden
    />
  );
}
