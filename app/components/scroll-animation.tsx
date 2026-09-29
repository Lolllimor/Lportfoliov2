'use client';

import { useRef, ReactNode } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in milliseconds, handy for staggering siblings. */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const offsets = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
};

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current, {
        ...offsets[direction],
        autoAlpha: 0,
        scale: 0.97,
        duration: 0.9,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { dependencies: [delay, direction] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
