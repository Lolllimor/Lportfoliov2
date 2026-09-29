'use client';

import { useCallback, useEffect, useRef } from 'react';
import { MousePointer2 } from 'lucide-react';
import { sectionIds } from '../constants/navlist';
import { gsap, prefersReducedMotion } from '../lib/gsap';

const KEYS = ['w', 'a', 's', 'd'] as const;
type Key = (typeof KEYS)[number];

const isBackKey = (key: Key) => key === 'w' || key === 'a';

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  );
}

function currentSectionIndex() {
  const middle = window.innerHeight / 2;
  let index = 0;
  sectionIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= middle) index = i;
  });
  return index;
}

/** Jumps between sections with W/A (back) and S/D (forward) — by keyboard or by clicking the keycaps. */
export default function WasdExplorer() {
  const capRefs = useRef<Partial<Record<Key, HTMLButtonElement | null>>>({});

  const go = useCallback((key: Key) => {
    const step = isBackKey(key) ? -1 : 1;
    const next = Math.min(
      sectionIds.length - 1,
      Math.max(0, currentSectionIndex() + step)
    );
    document
      .getElementById(sectionIds[next])
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const pressCap = (key: Key) => {
    const cap = capRefs.current[key];
    if (!cap) return;
    cap.dataset.pressed = 'true';
    const release = () => delete cap.dataset.pressed;
    if (prefersReducedMotion()) {
      setTimeout(release, 150);
      return;
    }
    gsap
      .timeline({ onComplete: release })
      .to(cap, { y: 4, scaleX: 1.08, scaleY: 0.86, duration: 0.08, ease: 'power2.out' })
      .to(cap, { y: 0, scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1.2, 0.35)' });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as Key;
      if (!KEYS.includes(key) || e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      go(key);
      pressCap(key);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go]);

  return (
    <div className="hidden lg:flex flex-col items-center gap-3">
      <div
        className="flex items-center gap-2.5 px-4 py-2 rounded-2xl border border-dashed text-sm font-bold"
        style={{
          borderColor: 'var(--border-strong)',
          color: 'var(--text-secondary)',
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
      >
        <MousePointer2 size={16} aria-hidden />
        Scroll / use WASD to explore
      </div>
      <div className="flex gap-2">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            ref={(el) => {
              capRefs.current[key] = el;
            }}
            className="keycap"
            aria-label={isBackKey(key) ? 'Previous section' : 'Next section'}
            onClick={() => {
              go(key);
              pressCap(key);
            }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
