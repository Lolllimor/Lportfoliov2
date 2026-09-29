'use client';

import { ReactNode, useRef } from 'react';
import { canHover, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface MagneticProps {
  children: ReactNode;
  /** How far the element follows the cursor, as a fraction of the offset. */
  strength?: number;
  className?: string;
}

/** Wraps a button so it leans toward the cursor and springs back on leave. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !canHover()) return;

    const spring = { duration: 0.9, ease: 'elastic.out(1, 0.4)' };
    const xTo = gsap.quickTo(el, 'x', spring);
    const yTo = gsap.quickTo(el, 'y', spring);

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
