'use client';

import { useRef, useState } from 'react';
import { Calendar, Check, Clock, Copy, LucideIcon, Mail, MapPin, Phone } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { gsap, prefersReducedMotion } from '../lib/gsap';

const EMAIL = 'rodiat.morin@gmail.com';

const facts: { Icon: LucideIcon; label: string; value: string; bg: string; copy?: boolean }[] = [
  { Icon: Calendar, label: 'Experience', value: '3+ Years', bg: '#ede4ff' },
  { Icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', bg: '#fde4f1' },
  { Icon: Mail, label: 'Email', value: EMAIL, bg: '#e0f2fe', copy: true },
  { Icon: Phone, label: 'Phone', value: '+234 903 603 3530', bg: '#fef3c7' },
  { Icon: Clock, label: 'Availability', value: 'Open to opportunities', bg: '#dcfce7' },
];

function spinIcon(icon: HTMLElement | null) {
  if (!icon || prefersReducedMotion() || gsap.isTweening(icon)) return;
  gsap.fromTo(
    icon,
    { rotation: 0, scale: 1 },
    {
      keyframes: { rotation: [0, 200, 360], scale: [1, 1.2, 1] },
      duration: 0.7,
      ease: 'power2.inOut',
    }
  );
}

function FactContent({ Icon, label, value, iconRef, trailing }: {
  Icon: LucideIcon;
  label: string;
  value: string;
  iconRef: React.RefObject<HTMLSpanElement | null>;
  trailing?: React.ReactNode;
}) {
  return (
    <>
      <span
        ref={iconRef}
        className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm"
        style={{ color: 'var(--accent-primary)' }}
      >
        <Icon size={18} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 text-left">
        <p className="eyebrow !text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
          {label}
        </p>
        <p className="text-sm font-bold [overflow-wrap:anywhere]" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>
      </div>
      {trailing}
    </>
  );
}

function Fact({ Icon, label, value, bg }: (typeof facts)[number]) {
  const iconRef = useRef<HTMLSpanElement>(null);
  return (
    <li
      className="flex items-center gap-3 rounded-2xl p-3.5"
      style={{ backgroundColor: bg }}
      onMouseEnter={() => spinIcon(iconRef.current)}
    >
      <FactContent Icon={Icon} label={label} value={value} iconRef={iconRef} />
    </li>
  );
}

/** The email tile copies the address and pops a little "Copied!" bubble. */
function CopyFact({ Icon, label, value, bg }: (typeof facts)[number]) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.location.href = `mailto:${value}`;
      return;
    }
    setCopied(true);
    trackEvent('email_copy');
    const bubble = bubbleRef.current;
    if (bubble && !prefersReducedMotion()) {
      gsap
        .timeline()
        .fromTo(bubble, { autoAlpha: 0, y: 8, scale: 0.6 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(2.5)' })
        .to(bubble, { autoAlpha: 0, y: -8, duration: 0.3, delay: 1.2 });
    }
    setTimeout(() => setCopied(false), 1900);
  };

  return (
    <li className="relative">
      <button
        type="button"
        data-squish
        onClick={copy}
        onMouseEnter={() => spinIcon(iconRef.current)}
        aria-label={`Copy email address ${value}`}
        className="w-full flex items-center gap-3 rounded-2xl p-3.5"
        style={{ backgroundColor: bg }}
      >
        <FactContent
          Icon={copied ? Check : Icon}
          label={label}
          value={value}
          iconRef={iconRef}
          trailing={
            <span className="shrink-0" style={{ color: 'var(--text-tertiary)' }} aria-hidden>
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </span>
          }
        />
      </button>
      <span
        ref={bubbleRef}
        role="status"
        className="pointer-events-none absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-extrabold text-white opacity-0"
        style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
      >
        {copied ? 'Copied! ✨' : ''}
      </span>
    </li>
  );
}

export default function QuickFacts() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {facts.map((fact) =>
        fact.copy ? <CopyFact key={fact.label} {...fact} /> : <Fact key={fact.label} {...fact} />
      )}
    </ul>
  );
}
