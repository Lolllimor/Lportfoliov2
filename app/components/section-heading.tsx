'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface SectionHeadingProps {
  number: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function SectionHeading({
  number,
  icon: Icon,
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  const pinRef = useRef<HTMLSpanElement>(null);

  // The map pin spins in with a pop when the heading scrolls into view.
  useGSAP(() => {
    if (!pinRef.current || prefersReducedMotion()) return;
    gsap.from(pinRef.current, {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      delay: 0.15,
      ease: 'back.out(2.2)',
      scrollTrigger: { trigger: pinRef.current, start: 'top 90%', once: true },
    });
  });

  return (
    <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
      <div className="flex items-center gap-4">
        <span ref={pinRef} data-jelly className="pin-badge shrink-0 cursor-default">
          {String(number).padStart(2, '0')}
        </span>
        <div>
          <h2
            className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h2>
          <p
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {subtitle}
            <Icon size={14} aria-hidden />
          </p>
        </div>
      </div>
      {action && (
        <motion.a
          href={action.href}
          target={action.href.startsWith('http') ? '_blank' : undefined}
          rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="hidden sm:inline-flex items-center gap-2 text-sm md:text-base font-bold shrink-0"
          style={{ color: 'var(--accent-primary)' }}
          whileHover="hover"
        >
          {action.label}
          <motion.span
            className="inline-block"
            variants={{ hover: { x: 4 } }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.a>
      )}
    </div>
  );
}
