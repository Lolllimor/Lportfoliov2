'use client';

import { Info } from 'lucide-react';
import { Tooltip } from '@mantine/core';
import Image from 'next/image';

import { useRef } from 'react';

import { useIsMobileOrTablet } from '../hooks/use-is-mobile-or-tablet';
import { canHover, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

interface ProjectCardProject {
  image: string;
  name: string;
  description: string;
  technologies: string[];
  codeLink?: string;
  liveLink?: string;
  info?: string;
}

interface ProjectCardProps {
  project: ProjectCardProject;
}

/**
 * Touch screens have no cursor to tilt toward, so instead the card tilts in 3D
 * as it scrolls past, and presses in with a shine sweep when tapped.
 */
function touchCard(card: HTMLElement, shine: HTMLElement) {
  gsap.set(card, { transformPerspective: 900 });
  gsap.fromTo(
    card,
    { rotationX: 10 },
    {
      rotationX: -6,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
    }
  );

  const press = () => {
    gsap.to(card, { scale: 0.97, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
    gsap.fromTo(
      shine,
      { opacity: 1, '--shine-x': '-20%', '--shine-y': '30%' },
      { opacity: 0, '--shine-x': '120%', '--shine-y': '70%', duration: 0.8, ease: 'power2.out' }
    );
  };
  const release = () =>
    gsap.to(card, { scale: 1, duration: 0.6, ease: 'elastic.out(1.1, 0.4)', overwrite: 'auto' });

  card.addEventListener('pointerdown', press);
  card.addEventListener('pointerup', release);
  card.addEventListener('pointercancel', release);
  card.addEventListener('pointerleave', release);
  return () => {
    card.removeEventListener('pointerdown', press);
    card.removeEventListener('pointerup', release);
    card.removeEventListener('pointercancel', release);
    card.removeEventListener('pointerleave', release);
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isMobileOrTablet = useIsMobileOrTablet();
  const isLocked = isMobileOrTablet && !!project.info;
  const href = project.liveLink || project.codeLink || '#';
  const cardRef = useRef<HTMLElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  // 3D tilt toward the cursor, with a glossy shine that follows it.
  useGSAP(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine || prefersReducedMotion()) return;
    if (!canHover()) return touchCard(card, shine);

    gsap.set(card, { transformPerspective: 900 });
    const ease = { duration: 0.5, ease: 'power3.out' };
    const rotateX = gsap.quickTo(card, 'rotationX', ease);
    const rotateY = gsap.quickTo(card, 'rotationY', ease);
    const lift = gsap.quickTo(card, 'y', ease);

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY((px - 0.5) * 12);
      rotateX((0.5 - py) * 12);
      shine.style.setProperty('--shine-x', `${px * 100}%`);
      shine.style.setProperty('--shine-y', `${py * 100}%`);
    };
    const onEnter = () => {
      lift(-8);
      gsap.to(shine, { opacity: 1, duration: 0.3 });
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      lift(0);
      gsap.to(shine, { opacity: 0, duration: 0.4 });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  });

  return (
    <article
      ref={cardRef}
      className="group glass-card relative flex flex-col h-full overflow-hidden p-2.5 will-change-transform"
    >
      <span
        ref={shineRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
        style={{
          background:
            'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.55), transparent 55%)',
        }}
        aria-hidden
      />
      <a
        href={isLocked ? undefined : href}
        target={project.liveLink ? '_blank' : undefined}
        rel={project.liveLink ? 'noopener noreferrer' : undefined}
        className="relative block h-40 overflow-hidden rounded-2xl"
        onClick={(e) => {
          if (isLocked) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        style={{
          pointerEvents: isLocked ? 'none' : 'auto',
          cursor: isLocked ? 'default' : 'pointer',
        }}
      >
        <Image
          src={project.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={project.name}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>

      <div className="flex flex-col flex-1 px-2 pt-3.5 pb-2">
        <h3
          className="text-base font-extrabold mb-1.5 flex items-center gap-1.5 leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.name}
          {project.info && (
            <Tooltip label={project.info}>
              <span
                className="cursor-help shrink-0"
                style={{ color: 'var(--accent-primary)' }}
              >
                <Info size={13} />
              </span>
            </Tooltip>
          )}
        </h3>

        <p
          className="text-xs leading-relaxed mb-3 line-clamp-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <li
              key={tech}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                color: 'var(--accent-secondary)',
                backgroundColor: 'var(--bg-chip)',
              }}
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.liveLink || project.codeLink) && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1 text-xs font-extrabold transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent-primary)' }}
            onClick={(e) => {
              if (isLocked) {
                e.preventDefault();
              }
            }}
          >
            View Project
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </article>
  );
}
