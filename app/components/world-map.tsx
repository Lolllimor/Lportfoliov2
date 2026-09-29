'use client';

import { MapPin } from 'lucide-react';
import { navItems, sectionIds } from '../constants/navlist';
import { useActiveSection } from '../hooks/use-active-section';

/** Fixed vertical trail on the right edge showing which "level" you're on. */
export default function WorldMap() {
  const active = useActiveSection(sectionIds);
  const activeIndex = sectionIds.indexOf(active);

  return (
    <nav
      aria-label="World map"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center glass-card !rounded-full py-4 px-2"
    >
      <MapPin size={16} className="mb-3" style={{ color: 'var(--accent-pink)' }} aria-hidden />
      <ol className="relative flex flex-col items-center gap-5">
        <span
          className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 border-l-2 border-dashed"
          style={{ borderColor: 'var(--border-strong)' }}
          aria-hidden
        />
        {navItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isVisited = idx < activeIndex;
          return (
            <li key={item.link} className="relative group">
              <a
                href={item.link}
                aria-label={item.name}
                aria-current={isActive ? 'location' : undefined}
                className="relative flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-extrabold transition-transform hover:scale-110"
                style={{
                  background: isActive || isVisited
                    ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                    : '#fff',
                  color: isActive || isVisited ? '#fff' : 'var(--text-tertiary)',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(124,58,237,0.25)',
                }}
              >
                {isActive && (
                  <span
                    className="ping-soft absolute inset-0 rounded-full"
                    style={{ backgroundColor: '#ec4899' }}
                    aria-hidden
                  />
                )}
                <span className="relative">{idx + 1}</span>
              </a>
              <span
                className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: 'var(--text-primary)', color: '#fff' }}
              >
                {item.name}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
