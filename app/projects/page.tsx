import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

import {
  featuredProjects,
  hobbyProjects,
  moreProjects,
} from '../constants/project-list';
import ProjectCard from '../components/project-card';
import ScrollAnimation from '../components/scroll-animation';
import SiteFooter from '../components/site-footer';
import SiteNav from '../components/site-nav';
import WorldBackground from '../components/world-background';

export const metadata: Metadata = {
  title: 'Projects — Rodiat Morin',
  description:
    'The full collection of products, platforms and websites Rodiat Morin has designed and built.',
};

const groups = [
  { title: 'Featured projects', subtitle: 'The highlights', items: featuredProjects },
  { title: 'More projects', subtitle: 'Products built with teams and clients', items: moreProjects },
  { title: 'Hobby projects', subtitle: 'Websites built for friends and communities', items: hobbyProjects },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative" style={{ color: 'var(--text-primary)' }}>
      <WorldBackground />
      <SiteNav />

      <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-extrabold mb-8 transition-transform hover:-translate-x-1"
            style={{ color: 'var(--accent-primary)' }}
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>

          <p
            className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] mb-3"
            style={{ color: 'var(--accent-pink)' }}
          >
            The full collection <Sparkles size={15} aria-hidden />
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
            All <span className="gradient-text">projects</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mb-14" style={{ color: 'var(--text-secondary)' }}>
            A closer look at the platforms, products and websites I&apos;ve
            helped bring to life — from enterprise systems used across whole
            organisations to playful, design-led sites.
          </p>

          <div className="space-y-16">
            {groups.map((group, groupIdx) => (
              <div key={group.title}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="pin-badge shrink-0">
                    {String(groupIdx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide">
                      {group.title}
                    </h2>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                      {group.subtitle}
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((project, idx) => (
                    <ScrollAnimation key={project.image} delay={(idx % 3) * 80}>
                      <ProjectCard project={project} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
