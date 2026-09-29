'use client';

import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { canHover, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

const notes = [
  'Progress, not perfection.',
  'Ship it, then polish.',
  'Ask "why?" twice.',
  'Simple scales.',
  'Rest is part of the work.',
];

/** Sticky note that swings on hover and flips to the next note on click. */
export default function StickyNote() {
  const ref = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !canHover()) return;
    const swing = () => {
      if (gsap.isTweening(el)) return;
      gsap.to(el, {
        keyframes: { rotation: [2, -4, 3.5, -2, 1, 2] },
        duration: 1.1,
        ease: 'sine.inOut',
        transformOrigin: '50% 0%',
      });
    };
    el.addEventListener('mouseenter', swing);
    return () => el.removeEventListener('mouseenter', swing);
  });

  const flip = () => {
    const el = ref.current;
    const next = () => setIndex((i) => (i + 1) % notes.length);
    if (!el || prefersReducedMotion()) return next();
    gsap
      .timeline()
      .to(el, { rotationX: 90, duration: 0.18, ease: 'power2.in', transformPerspective: 600 })
      .add(next)
      .to(el, { rotationX: 0, duration: 0.5, ease: 'back.out(2)' });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={flip}
      aria-label="Show another note to self"
      className="sticky-note relative block w-full text-left p-6 pt-7 rounded-md"
      style={{ transform: 'rotate(2deg)' }}
    >
      <span className="eyebrow flex items-center gap-2 !tracking-[0.08em]">
        Note to self
        <Heart size={14} style={{ color: 'var(--accent-pink)' }} aria-hidden />
      </span>
      <span
        className="block font-script text-3xl font-bold leading-tight mt-2"
        style={{ color: 'var(--text-primary)' }}
        aria-live="polite"
      >
        {notes[index]}
      </span>
      <span className="block mt-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
        tap for another
      </span>
    </button>
  );
}
