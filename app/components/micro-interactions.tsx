'use client';

import { useEffect } from 'react';
import { canHover, gsap, prefersReducedMotion } from '../lib/gsap';

const SQUISHABLE = 'a.btn-candy, button.btn-candy, a.btn-soft, [data-squish]';
const JELLY = '[data-jelly]';
const HOP = '[data-hop]';

const TRAIL_COLORS = ['#a855f7', '#ec4899', '#f59e0b', '#60a5fa'];
/** Minimum cursor travel (px²) between sparkles, so the trail stays sparse. */
const TRAIL_SPACING = 45 * 45;

const random = (min: number, max: number) => min + Math.random() * (max - min);

function jelly(el: Element) {
  gsap.to(el, {
    keyframes: {
      scaleX: [1, 1.15, 0.92, 1.04, 1],
      scaleY: [1, 0.88, 1.08, 0.97, 1],
    },
    duration: 0.6,
    ease: 'none',
  });
}

function hop(el: Element) {
  gsap
    .timeline()
    .to(el, { y: -10, scaleX: 0.9, scaleY: 1.1, rotation: -8, duration: 0.18, ease: 'power2.out' })
    .to(el, { y: 0, rotation: 0, scaleX: 1.12, scaleY: 0.88, duration: 0.14, ease: 'power2.in' })
    .to(el, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' });
}

function sparkle(x: number, y: number) {
  const spark = document.createElement('span');
  spark.textContent = '✦';
  spark.setAttribute('aria-hidden', 'true');
  Object.assign(spark.style, {
    position: 'fixed',
    left: `${x}px`,
    top: `${y}px`,
    zIndex: '70',
    pointerEvents: 'none',
    fontSize: `${random(8, 14)}px`,
    color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
  });
  document.body.appendChild(spark);
  gsap.fromTo(
    spark,
    { xPercent: -50, yPercent: -50, scale: 1, opacity: 0.9 },
    {
      x: random(-15, 15),
      y: random(20, 50),
      rotation: random(-180, 180),
      scale: 0,
      opacity: 0,
      duration: 0.9,
      ease: 'power1.out',
      onComplete: () => spark.remove(),
    }
  );
}

/**
 * Site-wide micro-interactions via a few delegated listeners:
 * - squishy press on buttons (`.btn-candy`, `.btn-soft`, `[data-squish]`)
 * - jelly wobble on hover (`[data-jelly]`) and a squash-and-stretch hop (`[data-hop]`)
 * - a light sparkle trail following the cursor
 */
export default function MicroInteractions() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest(SQUISHABLE);
      if (!el) return;

      gsap.to(el, {
        scaleX: 1.08,
        scaleY: 0.9,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      const release = () => {
        gsap.to(el, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.7,
          ease: 'elastic.out(1.2, 0.35)',
          overwrite: 'auto',
        });
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
      };
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
    };

    // pointerover bubbles (unlike mouseenter), so one listener covers the page;
    // the relatedTarget check makes it fire once per entry, not per child.
    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target as Element | null;
      const entered = (selector: string) => {
        const el = target?.closest(selector);
        if (!el || el.contains(e.relatedTarget as Node | null) || gsap.isTweening(el)) return null;
        return el;
      };
      const jellyEl = entered(JELLY);
      if (jellyEl) jelly(jellyEl);
      const hopEl = entered(HOP);
      if (hopEl) hop(hopEl);
    };

    let lastX = 0;
    let lastY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < TRAIL_SPACING) return;
      lastX = e.clientX;
      lastY = e.clientY;
      sparkle(e.clientX, e.clientY);
    };

    const trail = canHover();
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerover', onPointerOver);
    if (trail) window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return null;
}
