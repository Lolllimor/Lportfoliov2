'use client';

import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

/**
 * Drop inside the experience timeline list: a gradient line that draws itself
 * as you scroll, and `.quest-node` markers that pop as the line reaches them.
 */
export default function QuestLine() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const line = lineRef.current;
    const list = line?.parentElement;
    if (!line || !list || prefersReducedMotion()) return;

    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      }
    );

    gsap.utils.toArray<HTMLElement>('.quest-node', list).forEach((node) => {
      gsap.from(node, {
        scale: 0,
        rotation: -120,
        duration: 0.7,
        ease: 'back.out(2.5)',
        scrollTrigger: { trigger: node, start: 'top 60%', once: true },
      });
    });
  });

  return (
    <span
      ref={lineRef}
      className="block absolute left-[0.9rem] md:left-[1.2rem] top-4 bottom-4 w-[3px] -translate-x-[1px] rounded-full origin-top"
      style={{ background: 'linear-gradient(180deg, #a855f7, #ec4899)' }}
      aria-hidden
    />
  );
}
