'use client';

import { useRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

interface BadgeProps {
  label: string;
  Icon: LucideIcon;
  color: string;
}

const SPARKS = 7;

/** Achievement badge that wiggles and bursts sparkles on hover or tap. */
export default function Badge({ label, Icon, color }: BadgeProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);

  const celebrate = () => {
    const el = ref.current;
    if (!el || busy.current || prefersReducedMotion()) return;
    busy.current = true;

    gsap
      .timeline({ onComplete: () => void (busy.current = false) })
      .to(el, {
        keyframes: { rotation: [0, -16, 13, -8, 4, 0], scale: [1, 1.18, 1.12, 1.06, 1] },
        duration: 0.7,
        ease: 'power1.inOut',
      });

    for (let i = 0; i < SPARKS; i++) {
      const spark = document.createElement('span');
      spark.textContent = '✦';
      spark.setAttribute('aria-hidden', 'true');
      spark.className = 'pointer-events-none absolute left-1/2 top-1/2 text-xs';
      spark.style.color = i % 2 ? '#ec4899' : color;
      el.appendChild(spark);

      const angle = (i / SPARKS) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 26 + Math.random() * 12;
      gsap.fromTo(
        spark,
        { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0, opacity: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 1.2,
          opacity: 0,
          rotation: 180,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => spark.remove(),
        }
      );
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      title={label}
      aria-label={label}
      onMouseEnter={celebrate}
      onClick={celebrate}
      className="relative flex w-11 h-11 items-center justify-center rounded-full bg-white shadow-md"
      style={{ color }}
    >
      <Icon size={20} fill={color} fillOpacity={0.2} aria-hidden />
    </button>
  );
}
