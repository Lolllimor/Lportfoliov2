'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function SectionHeading({
  icon: Icon,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-6 mb-8 md:mb-10">
      <div className="flex items-center gap-3">
        <Icon size={22} strokeWidth={2} style={{ color: 'var(--accent-primary)' }} />
        <h2
          className="text-xl md:text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
      </div>
      {action && (
        <motion.a
          href={action.href}
          target={action.href.startsWith('http') ? '_blank' : undefined}
          rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="hidden sm:inline-flex items-center gap-2 text-sm md:text-base font-medium shrink-0"
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
