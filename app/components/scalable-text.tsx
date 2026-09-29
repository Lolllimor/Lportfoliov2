'use client';

import { useRef } from 'react';
import { canHover, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface ScalableTextProps {
  text: string;
  className?: string;
}

/** How far (px) from the cursor a letter still feels the magnification. */
const REACH = 90;
const MAX_SCALE = 0.45;
const MAX_LIFT = 10;

/**
 * Gradient headline text whose letters grow in on load and magnify around the
 * cursor like a dock (or ripple in a wave on tap, for touch screens).
 */
export default function ScalableText({ text, className = '' }: ScalableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const letters = gsap.utils.toArray<HTMLElement>('.scale-char', root);
      // Entrance animates the wrappers and hover animates the letters, so the
      // two never fight over the same transform.
      const wrappers = gsap.utils.toArray<HTMLElement>('.scale-char-wrap', root);

      // Each letter is its own inline-block, so stretch one shared gradient
      // across all of them to keep it looking like a single sweep.
      const paint = () => {
        const width = root.offsetWidth;
        // Measure the wrapper: once transformed it becomes the letter's offsetParent.
        letters.forEach((letter, i) => {
          letter.style.backgroundSize = `${width}px 100%`;
          letter.style.backgroundPosition = `${-wrappers[i].offsetLeft}px 0`;
        });
      };
      paint();
      const resizeObserver = new ResizeObserver(paint);
      resizeObserver.observe(root);

      if (prefersReducedMotion()) return () => resizeObserver.disconnect();

      gsap.from(wrappers, {
        scale: 0.2,
        yPercent: 45,
        autoAlpha: 0,
        transformOrigin: '50% 100%',
        duration: 1,
        delay: 0.5,
        stagger: 0.045,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.set(letters, { transformOrigin: '50% 100%' });
      // quickTo needs real properties, not the `scale` shorthand.
      const quick = { duration: 0.45, ease: 'power3.out' };
      const scaleTo = letters.map((l) => {
        const x = gsap.quickTo(l, 'scaleX', quick);
        const y = gsap.quickTo(l, 'scaleY', quick);
        return (value: number) => {
          x(value);
          y(value);
        };
      });
      const liftTo = letters.map((l) => gsap.quickTo(l, 'y', quick));

      // The springy settle runs alongside the quickTo tweens rather than
      // overwriting (and killing) them; moving again simply cancels it.
      let settle: gsap.core.Tween | null = null;

      const onMove = (e: MouseEvent) => {
        settle?.kill();
        letters.forEach((letter, i) => {
          const rect = letter.getBoundingClientRect();
          const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
          const influence = Math.max(0, 1 - distance / REACH);
          scaleTo[i](1 + influence * MAX_SCALE);
          liftTo[i](-influence * MAX_LIFT);
        });
      };
      const onLeave = () => {
        settle = gsap.to(letters, {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.02,
          ease: 'elastic.out(1, 0.4)',
        });
      };
      const onTap = () => {
        gsap.to(letters, {
          keyframes: { scaleX: [1, 1.35, 1], scaleY: [1, 1.35, 1], y: [0, -10, 0] },
          duration: 0.6,
          stagger: 0.035,
          ease: 'power1.inOut',
          overwrite: 'auto',
        });
      };

      if (canHover()) {
        root.addEventListener('mousemove', onMove);
        root.addEventListener('mouseleave', onLeave);
      } else {
        root.addEventListener('click', onTap);
      }

      return () => {
        resizeObserver.disconnect();
        root.removeEventListener('mousemove', onMove);
        root.removeEventListener('mouseleave', onLeave);
        root.removeEventListener('click', onTap);
      };
    },
    { scope: ref, dependencies: [text] }
  );

  const words = text.split(' ');

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, wordIdx) => (
          <span key={wordIdx}>
            <span className="whitespace-nowrap">
              {Array.from(word).map((char, charIdx) => (
                <span key={charIdx} className="scale-char-wrap inline-block">
                  <span className="scale-char">{char}</span>
                </span>
              ))}
            </span>
            {wordIdx < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </span>
  );
}
