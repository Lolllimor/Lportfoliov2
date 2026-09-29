'use client';

import { Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useRef } from 'react';
import { navItems } from '../constants/navlist';
import { useNavHref } from '../hooks/use-nav-href';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

/** Drawer contents mount on open, so the links slide in one by one each time. */
function DrawerLinks({ onNavigate }: { onNavigate: () => void }) {
  const ref = useRef<HTMLUListElement>(null);
  const navHref = useNavHref();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('li', {
        x: 60,
        autoAlpha: 0,
        duration: 0.6,
        delay: 0.15,
        stagger: 0.07,
        ease: 'back.out(1.6)',
      });
    },
    { scope: ref }
  );

  return (
    <ul ref={ref} className="flex flex-col gap-3">
      {navItems.map((item, idx) => (
        <li key={item.link}>
          <a
            href={navHref(item.link)}
            onClick={onNavigate}
            data-squish
            className="glass-card !rounded-2xl flex items-center gap-3 p-2 pr-4"
          >
            <span className="pin-badge !w-10 !h-10 !text-xs shrink-0">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span>
              <span
                className="block text-base font-extrabold uppercase tracking-wide"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.name}
              </span>
              <span className="block text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                {item.subtitle}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function MobileSidebar() {
  const [opened, { close, toggle }] = useDisclosure(false);
  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        className="md:hidden"
        size="lg"
        aria-label="Toggle navigation"
      />
      <Drawer
        radius="md"
        opened={opened}
        onClose={close}
        position="right"
        title={<span className="font-script text-3xl font-bold">Rodiat. ♡</span>}
        styles={{ content: { background: 'var(--bg-base)' }, header: { background: 'var(--bg-base)' } }}
      >
        <DrawerLinks onNavigate={close} />
      </Drawer>
    </>
  );
}

export default MobileSidebar;
