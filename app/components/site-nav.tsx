'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, Home as HomeIcon, Send } from 'lucide-react';

import Magnetic from './magnetic';
import MobileSidebar from './mobile-sidebar';
import { navItems, sectionIds } from '../constants/navlist';
import { useActiveSection } from '../hooks/use-active-section';
import { useNavHref } from '../hooks/use-nav-href';
import { gsap, prefersReducedMotion } from '../lib/gsap';

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const scrolledSection = useActiveSection(sectionIds);
  const activeSection = isHome
    ? scrolledSection
    : pathname.startsWith('/projects')
      ? 'projects'
      : null;
  const navHref = useNavHref();

  // A single white pill slides between links: to the hovered one, then back
  // to the active one when the pointer leaves the menu.
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const placed = useRef(false);

  const movePill = useCallback((target: HTMLElement | null | undefined) => {
    const pill = pillRef.current;
    if (!pill) return;
    if (!target) {
      gsap.to(pill, { autoAlpha: 0, duration: 0.2 });
      return;
    }
    const instant = !placed.current || prefersReducedMotion();
    placed.current = true;
    gsap.to(pill, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      autoAlpha: 1,
      duration: instant ? 0 : 0.6,
      ease: 'elastic.out(1, 0.75)',
      overwrite: 'auto',
    });
  }, []);

  const activeLink = () =>
    activeSection ? linkRefs.current[`#${activeSection}`] : null;

  useEffect(() => {
    movePill(activeSection ? linkRefs.current[`#${activeSection}`] : null);
    const onResize = () => {
      placed.current = false;
      movePill(activeSection ? linkRefs.current[`#${activeSection}`] : null);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSection, movePill]);

  return (
    <nav className="fixed z-50 top-4 md:top-5 left-4 right-4 md:left-8 md:right-8 lg:left-10 lg:right-10 flex items-center justify-between gap-4">
      <a
        href={navHref('#home')}
        className="glass-card !rounded-full font-script text-3xl font-bold px-5 py-1 flex items-center gap-1 md:!bg-transparent md:!border-transparent md:!shadow-none md:!backdrop-blur-none md:px-0"
        style={{ color: 'var(--text-primary)' }}
      >
        Rodiat.
        <span data-hop className="inline-flex">
          <Heart size={18} strokeWidth={2.5} style={{ color: 'var(--accent-pink)' }} aria-hidden />
        </span>
      </a>

      <ul
        className="relative hidden md:flex items-center gap-1 glass-card !rounded-full p-1.5"
        onMouseLeave={() => movePill(activeLink())}
      >
        <span
          ref={pillRef}
          className="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-white invisible"
          style={{ boxShadow: '0 4px 14px -4px rgba(236,72,153,0.35)' }}
          aria-hidden
        />
        {navItems.map((item) => {
          const isActive = activeSection === item.link.slice(1);
          return (
            <li key={item.link}>
              <a
                ref={(el) => {
                  linkRefs.current[item.link] = el;
                }}
                href={navHref(item.link)}
                onMouseEnter={(e) => movePill(e.currentTarget)}
                aria-current={isActive ? 'location' : undefined}
                className="relative flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-extrabold uppercase tracking-wide transition-colors"
                style={{ color: isActive ? 'var(--accent-pink)' : 'var(--text-primary)' }}
              >
                {item.name === 'Home' && <HomeIcon size={14} aria-hidden />}
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <Magnetic className="hidden sm:inline-block">
          <a
            href={navHref('#contact')}
            className="btn-candy inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold"
          >
            Let&apos;s Connect
            <Send size={15} aria-hidden />
          </a>
        </Magnetic>
        <div className="glass-card !rounded-full p-1 md:hidden">
          <MobileSidebar />
        </div>
      </div>
    </nav>
  );
}
