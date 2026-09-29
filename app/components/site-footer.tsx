import { Sparkles } from 'lucide-react';

import InteractiveLink from './interactive-link';
import { socialLabel, socialLinks } from '../constants/social-links';

export default function SiteFooter() {
  return (
    <footer className="pb-10 pt-4 px-4 md:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* No backdrop blur here: iOS Safari stops repainting animated content
            inside a blurred, rounded, overflow-hidden box. */}
        <div
          className="marquee-track w-full md:w-80 py-2.5 rounded-full overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: 'var(--card-shadow)',
          }}
          aria-hidden
        >
          <div className="marquee flex w-max gap-6 text-sm font-extrabold" style={{ color: 'var(--text-secondary)' }}>
            {[0, 1].map((copy) => (
              <span key={copy} className="flex gap-6 pl-6">
                {['Crafting', 'Coding', 'Creating', 'Growing', 'Repeat'].map((word) => (
                  <span key={word} className="flex items-center gap-6">
                    {word}
                    <Sparkles size={12} style={{ color: 'var(--accent-pink)' }} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>
          © 2026 Rodiat Morin · Built with Next.js & lots of ♡
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ Icon, link }) => (
            <InteractiveLink
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLabel(link)}
              className="transition-colors text-[var(--text-tertiary)] hover:text-[var(--accent-pink)]"
            >
              <span data-hop className="inline-flex">
                <Icon size={18} />
              </span>
            </InteractiveLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
