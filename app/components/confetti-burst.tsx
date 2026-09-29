'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';

const COLORS = ['#a855f7', '#ec4899', '#f59e0b', '#60a5fa', '#34d399'];
const PIECES = 46;

const random = (min: number, max: number) => min + Math.random() * (max - min);

export interface ConfettiHandle {
  burst: () => void;
}

/**
 * Absolutely-positioned confetti layer. Bursts once when scrolled into view,
 * and again whenever `burst()` is called through the ref.
 */
const ConfettiBurst = forwardRef<ConfettiHandle>(function ConfettiBurst(_, handle) {
  const ref = useRef<HTMLDivElement>(null);

  const burst = () => {
    const layer = ref.current;
    if (!layer || prefersReducedMotion()) return;
    const { width, height } = layer.getBoundingClientRect();

    for (let i = 0; i < PIECES; i++) {
      const piece = document.createElement('span');
      const size = random(6, 11);
      Object.assign(piece.style, {
        position: 'absolute',
        left: '50%',
        top: '35%',
        width: `${size}px`,
        height: `${size * random(0.4, 1)}px`,
        background: COLORS[i % COLORS.length],
        borderRadius: Math.random() > 0.5 ? '9999px' : '2px',
      });
      layer.appendChild(piece);

      gsap
        .timeline({ onComplete: () => piece.remove() })
        .to(piece, {
          x: random(-width / 2, width / 2),
          y: random(-height * 0.35, -height * 0.05),
          rotation: random(-360, 360),
          duration: random(0.5, 0.8),
          ease: 'power3.out',
        })
        .to(piece, {
          y: `+=${height * random(0.6, 0.9)}`,
          x: `+=${random(-40, 40)}`,
          rotation: `+=${random(-270, 270)}`,
          opacity: 0,
          duration: random(1.2, 1.8),
          ease: 'power1.in',
        });
    }
  };

  useImperativeHandle(handle, () => ({ burst }));

  useGSAP(() => {
    if (!ref.current) return;
    ScrollTrigger.create({ trigger: ref.current, start: 'top 70%', once: true, onEnter: burst });
  });

  return <div ref={ref} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden />;
});

export default ConfettiBurst;
