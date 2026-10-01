'use client';

import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Cloud,
  Code2,
  Download,
  Gem,
  Heart,
  RotateCw,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react';

import { navItems } from '../constants/navlist';
import { experience } from '../constants/experience';
import { hobbyProjects, projects } from '../constants/project-list';
import { Sparkle } from './world-background';
import AvatarFrame from './avatar-frame';
import Badge from './badge';
import Magnetic from './magnetic';
import ScalableText from './scalable-text';
import StickyNote from './sticky-note';
import VibePlayer from './vibe-player';
import XpBar from './xp-bar';
import { trackEvent } from '../lib/analytics';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import WasdExplorer from './wasd-explorer';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Map pins floating around the avatar; skip "Home" since we're already here.
const pinPositions = [
  'top-[4%] -left-[6%]',
  'top-[10%] -right-[8%]',
  'top-[52%] -right-[12%]',
  'bottom-[6%] -right-[2%]',
];

const signs = [
  { label: 'Dream', Icon: Cloud },
  { label: 'Plan', Icon: Star },
  { label: 'Code', Icon: Code2 },
  { label: 'Create', Icon: Heart },
  { label: 'Repeat', Icon: RotateCw },
];

const badges = [
  { label: 'Shipped to production', Icon: Star, color: '#ec4899' },
  { label: 'End-to-end owner', Icon: Trophy, color: '#8b5cf6' },
  { label: 'Clean, accessible code', Icon: Code2, color: '#3b82f6' },
  { label: 'Pixel-perfect UI', Icon: Gem, color: '#10b981' },
];

const projectCount = projects.length + hobbyProjects.length;

function Balloon() {
  return (
    <svg viewBox="0 0 80 120" className="w-full h-full" aria-hidden>
      <defs>
        <clipPath id="balloon-clip">
          <path d="M40 2C18 2 4 18 4 38c0 22 22 40 30 52h12c8-12 30-30 30-52C76 18 62 2 40 2z" />
        </clipPath>
      </defs>
      <g clipPath="url(#balloon-clip)">
        <rect width="80" height="100" fill="#f9a8d4" />
        <rect x="14" width="12" height="100" fill="#fff" opacity="0.85" />
        <rect x="34" width="12" height="100" fill="#c4b5fd" />
        <rect x="54" width="12" height="100" fill="#fff" opacity="0.85" />
      </g>
      <path d="M34 90l-4 14M46 90l4 14" stroke="#7c5132" strokeWidth="1.5" />
      <rect x="28" y="104" width="24" height="14" rx="3" fill="#9a6a43" />
    </svg>
  );
}

export default function HeroWorld() {
  const pinsRef = useRef<HTMLDivElement>(null);

  // Map pins drop onto the map with a bounce.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.map-pin', {
        y: -70,
        autoAlpha: 0,
        duration: 1.1,
        delay: 0.7,
        stagger: 0.15,
        ease: 'bounce.out',
      });
    },
    { scope: pinsRef }
  );

  const hop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const pin = e.currentTarget;
    if (prefersReducedMotion() || gsap.isTweening(pin)) return;
    gsap
      .timeline()
      .to(pin, { y: -12, rotation: -3, duration: 0.18, ease: 'power2.out' })
      .to(pin, { y: 0, rotation: 0, duration: 0.7, ease: 'bounce.out' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 lg:pt-32 pb-12 px-4 md:px-8 lg:px-10"
    >
      <div className="max-w-[88rem] mx-auto grid gap-10 lg:gap-8 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_17rem] items-start">
        {/* Left: intro + current quest */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] mb-4"
            style={{ color: 'var(--accent-pink)' }}
          >
            Hey, I&apos;m Rodiat <Sparkles size={15} aria-hidden />
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-[2.6rem] sm:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            I architect &amp; build
            <br />
            <ScalableText text="scalable products" className="cursor-default" />
            <br />
            <span className="font-script font-bold text-[3.2rem] sm:text-6xl xl:text-7xl inline-flex items-center gap-2 mt-1">
              that just work.
              <Heart
                size={30}
                strokeWidth={2.5}
                style={{ color: 'var(--accent-pink)' }}
                aria-hidden
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg leading-relaxed max-w-md mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            A solutions architect with 3+ years of turning complex business
            requirements into full-stack systems, from Node.js and NestJS
            services to React and Next.js interfaces people love to use.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <Magnetic>
              <a
                href="#about"
                className="btn-candy inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-extrabold"
              >
                Explore My World
                <Sparkles size={16} aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Rodiat_Morin_Resume.pdf"
                download="Rodiat_Morin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('resume_download')}
                className="btn-soft inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-extrabold"
              >
                Download CV
                <Download size={16} aria-hidden />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass-card p-5 md:p-6 max-w-lg flex items-center gap-5"
          >
            <div className="flex-1 min-w-0">
              <p className="eyebrow flex items-center gap-2 mb-2">
                Current quest
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--accent-pink)' }}
                  aria-hidden
                />
              </p>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Architecting insurance products at{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Etap Insure</strong>, from spec to production ✨
              </p>
              <div className="flex items-center gap-3 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                <span>Lv. {experience.length}</span>
                <XpBar value={72} className="flex-1" />
                <span>72%</span>
              </div>
              <p className="mt-2 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                EXP · {projectCount} projects shipped
              </p>
            </div>
            <div className="relative shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg hidden sm:block">
              <Image
                src="/avatar.webp"
                fill
                sizes="112px"
                alt=""
                className="object-cover object-[50%_22%] scale-[1.6]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Center: avatar in the world, with map pins */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[24rem] lg:max-w-[26rem] xl:max-w-[25rem] lg:mt-4"
        >
          <div className="absolute -top-8 right-2 w-14 h-20 bob hidden sm:block" style={{ animationDelay: '-2s' }}>
            <Balloon />
          </div>
          <Sparkle size={22} className="twinkle absolute top-6 left-4 text-pink-400 z-10" />
          <Sparkle size={14} className="twinkle absolute bottom-24 right-6 text-violet-400 z-10" />

          <div className="bob relative">
            <AvatarFrame />
          </div>

          {/* Map pins */}
          <div ref={pinsRef}>
          <ul className="hidden md:block">
            {navItems.slice(1).map((item, idx) => (
              <li
                key={item.link}
                className={`map-pin absolute z-20 ${pinPositions[idx]}`}
              >
                <a
                  href={item.link}
                  onMouseEnter={hop}
                  className="glass-card !rounded-2xl flex items-center gap-2.5 pl-1.5 pr-4 py-1.5"
                >
                  <span className="pin-badge !w-9 !h-9 !text-xs">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className="block text-sm font-extrabold uppercase leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="block text-[11px] font-semibold"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {item.subtitle}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Phones: the same pins as a row of chips under the avatar */}
          <ul className="md:hidden mt-6 grid grid-cols-2 gap-2.5">
            {navItems.slice(1).map((item, idx) => (
              <li key={item.link} className="map-pin">
                <a
                  href={item.link}
                  data-jelly
                  className="glass-card !rounded-2xl flex items-center gap-2 p-1.5 pr-3"
                >
                  <span className="pin-badge !w-8 !h-8 !text-[11px] !border-2">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-extrabold uppercase leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </span>
                    <span className="block text-[10px] font-semibold truncate" style={{ color: 'var(--text-tertiary)' }}>
                      {item.subtitle}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          </div>

          {/* Wooden signpost */}
          <div className="hidden xl:flex flex-col items-start gap-1.5 absolute -left-12 -bottom-6 z-20" aria-hidden>
            {signs.map(({ label, Icon }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
                className="sign-plank font-script text-xl font-bold flex items-center gap-2 pl-3 pr-4 py-0.5"
                style={{ transform: `rotate(${idx % 2 ? 3 : -4}deg)` }}
              >
                {label}
                <Icon size={14} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: profile, vibe, note */}
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-5 sm:grid-cols-3 lg:col-span-2 xl:col-span-1 xl:grid-cols-1"
        >
          <motion.div variants={fadeUp} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-5">
              <div data-jelly className="relative w-14 h-14 rounded-full overflow-hidden border-[3px] border-white shadow-md shrink-0">
                <Image
                  src="/avatar.webp"
                  fill
                  sizes="56px"
                  alt=""
                  className="object-cover object-[50%_22%] scale-[1.6]"
                />
              </div>
              <div>
                <p className="font-extrabold flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                  Rodiat <Sparkles size={13} style={{ color: 'var(--accent-pink)' }} aria-hidden />
                </p>
                <p className="text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  Designing systems, one decision at a time 💻
                </p>
              </div>
            </div>
            <p className="eyebrow mb-2">Daily XP</p>
            <div className="flex items-center gap-2 mb-5 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
              <span className="px-1.5 py-0.5 rounded-md text-white text-[10px]" style={{ backgroundColor: '#f59e0b' }}>
                XP
              </span>
              <span>260 / 500</span>
              <XpBar value={52} className="flex-1" />
            </div>
            <p className="eyebrow mb-3">Badges</p>
            <ul className="flex justify-between">
              {badges.map(({ label, Icon, color }) => (
                <li key={label}>
                  <Badge label={label} Icon={Icon} color={color} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <VibePlayer />
          </motion.div>

          <motion.div variants={fadeUp}>
            <StickyNote />
          </motion.div>
        </motion.aside>
      </div>

      <div className="mt-12 flex justify-center">
        <WasdExplorer />
      </div>

      <a
        href="#about"
        className="lg:hidden mt-10 mx-auto flex w-fit items-center gap-2 text-sm font-bold"
        style={{ color: 'var(--accent-primary)' }}
      >
        Scroll to explore <ArrowRight size={14} className="rotate-90" aria-hidden />
      </a>
    </section>
  );
}
