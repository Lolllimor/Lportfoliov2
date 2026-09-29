'use client';

import {
  ArrowRight,
  Briefcase,
  Code2,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import {
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';

import { featuredProjects } from './constants/project-list';
import ScrollAnimation from './components/scroll-animation';
import { socialLabel, socialLinks } from './constants/social-links';
import SmoothScroll from './components/smooth-scroll';
import ProjectCard from './components/project-card';
import SectionHeading from './components/section-heading';
import { experience, skillCategories } from './constants/experience';
import WorldBackground from './components/world-background';
import WorldMap from './components/world-map';
import HeroWorld from './components/hero-world';
import ConfettiBurst, { ConfettiHandle } from './components/confetti-burst';
import Magnetic from './components/magnetic';
import QuestLine from './components/quest-line';
import QuickFacts from './components/quick-facts';
import SiteNav from './components/site-nav';
import SiteFooter from './components/site-footer';

const techStack = [
  { name: 'React', Icon: SiReact, color: '#149eca' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#111111' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#e5b900' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5fa04e' },
  { name: 'NestJS', Icon: SiNestjs, color: '#e0234e' },
  { name: 'Redux', Icon: SiRedux, color: '#764abc' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06b6d4' },
];

const focusAreas = [
  'Solution & system design',
  'API design',
  'Full-stack delivery',
  'Access control & security flows',
  'Payments & approval workflows',
  'Real-time features',
];

const chipColors = ['#ede4ff', '#fde4f1', '#e0f2fe', '#dcfce7', '#fef3c7'];

export default function Home() {
  const confettiRef = useRef<ConfettiHandle>(null);
  return (
    <main className="min-h-screen relative" style={{ color: 'var(--text-primary)' }}>
      <SmoothScroll />
      <WorldBackground />
      <WorldMap />

      <SiteNav />

      <HeroWorld />

      {/* About */}
      <section id="about" className="py-20 md:py-28 px-4 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={100}>
            <SectionHeading number={1} icon={User} title="About Me" subtitle="Get to know me" />
          </ScrollAnimation>

          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-5">
            <ScrollAnimation delay={100}>
              <div className="glass-card p-6 md:p-8 h-full">
                <div className="space-y-4 text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  <p>
                    I&apos;m a <strong style={{ color: 'var(--text-primary)' }}>solutions architect</strong> with
                    4+ years of experience turning messy business requirements into
                    systems that are simple to use and built to scale. I started on
                    the frontend — and I still sweat the details there — but my work
                    now spans the whole stack, from designing APIs and services in
                    Node.js and NestJS to shaping the React and Next.js apps on top
                    of them.
                  </p>
                  <p>
                    I&apos;ve built across insurance, payments and internal enterprise
                    platforms: role-based access for admins and underwriters,
                    PIN-protected payout flows, claims and policy workflows, budget
                    approvals, HR systems, and real-time chat over WebSockets. Along
                    the way I&apos;ve learned that good architecture is mostly good
                    decisions — clear module boundaries, predictable data flow, and
                    building blocks a team can extend without fear.
                  </p>
                  <p>
                    Today I focus on end-to-end solution design: mapping how
                    services, data and interfaces fit together before a line of code
                    is written, choosing the right tools for the job, translating
                    between product, design and engineering — and staying hands-on
                    enough to ship it.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <li
                      key={area}
                      data-jelly
                      className="text-xs md:text-sm font-bold px-3 py-1.5 rounded-full cursor-default"
                      style={{ color: 'var(--accent-secondary)', backgroundColor: 'var(--bg-chip)' }}
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>

            <div className="grid gap-5 content-start">
              <ScrollAnimation delay={150}>
                <div className="glass-card p-6">
                  <p className="eyebrow mb-4">Quick facts</p>
                  <QuickFacts />
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={200}>
                <div className="glass-card p-6">
                  <p className="eyebrow mb-4">Tech stack</p>
                  <ul className="grid grid-cols-4 gap-3">
                    {techStack.map(({ name, Icon, color }) => (
                      <li key={name} className="flex flex-col items-center gap-1.5 group">
                        <span data-hop className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                          <Icon size={24} color={color} aria-hidden />
                        </span>
                        <span className="text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={300}>
                <div className="glass-card p-6">
                  <p className="eyebrow mb-4">Let&apos;s connect</p>
                  <ul className="flex gap-4">
                    {socialLinks.map(({ Icon, link }) => {
                      const isEmail = link.startsWith('mailto:');
                      const label = socialLabel(link);
                      return (
                        <li key={link}>
                          <a
                            href={link}
                            target={isEmail ? undefined : '_blank'}
                            rel={isEmail ? undefined : 'noopener noreferrer'}
                            className="flex flex-col items-center gap-1.5 group"
                          >
                            <span data-hop className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center" style={{ color: 'var(--accent-primary)' }}>
                              <Icon size={22} aria-hidden />
                            </span>
                            <span className="text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                              {label}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
          </div>

          <ScrollAnimation delay={150}>
            <div className="glass-card p-6 md:p-8 mt-5">
              <p className="eyebrow mb-5 flex items-center gap-2">
                Skill inventory <Sparkles size={14} style={{ color: 'var(--accent-pink)' }} aria-hidden />
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, idx) => (
                  <div key={category.title}>
                    <p className="text-sm font-extrabold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                      {category.title}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          data-jelly
                          className="text-xs font-bold px-2.5 py-1 rounded-full cursor-default"
                          style={{
                            backgroundColor: chipColors[idx % chipColors.length],
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 md:py-28 px-4 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={100}>
            <SectionHeading
              number={2}
              icon={Code2}
              title="Projects"
              subtitle="Things I've built"
              action={{
                label: 'More on GitHub',
                href: 'https://github.com/Lolllimor',
              }}
            />
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, idx) => (
              <ScrollAnimation key={project.image} delay={(idx % 3) * 80}>
                <ProjectCard project={project} />
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={100}>
            <div className="mt-10 flex justify-center">
              <Magnetic>
                <Link
                  href="/projects"
                  className="btn-candy inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-extrabold"
                >
                  See more projects
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Magnetic>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Experience — quest log */}
      <section id="experience" className="py-20 md:py-28 px-4 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={100}>
            <SectionHeading number={3} icon={Briefcase} title="Experience" subtitle="My quest log" />
          </ScrollAnimation>

          <ol className="relative space-y-6 pl-12 md:pl-14">
            <span
              className="absolute left-[1.2rem] top-4 bottom-4 border-l-[3px] border-dashed"
              style={{ borderColor: 'var(--border-strong)' }}
              aria-hidden
            />
            <QuestLine />
            {experience.map((job, idx) => {
              const isCurrent = job.period.includes('Present');
              return (
                <li key={`${job.company}-${job.period}`} className="relative">
                  <span
                    className="quest-node flex absolute -left-[2.95rem] top-6 w-9 h-9 text-xs md:-left-14 md:w-10 md:h-10 md:text-sm rounded-full items-center justify-center font-extrabold border-[3px] border-white"
                    style={{
                      background: isCurrent ? 'linear-gradient(135deg, #a855f7, #ec4899)' : '#fff',
                      color: isCurrent ? '#fff' : 'var(--accent-primary)',
                      boxShadow: '0 6px 16px -6px rgba(124,58,237,0.5)',
                    }}
                    aria-hidden
                  >
                    {isCurrent ? '★' : experience.length - idx}
                  </span>
                  <ScrollAnimation delay={idx * 60}>
                    <article className="glass-card p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                            {job.company}
                          </h3>
                          <p className="text-base font-bold mt-1" style={{ color: 'var(--accent-primary)' }}>
                            {job.role}
                            {job.location ? ` · ${job.location}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {isCurrent && (
                            <span className="btn-candy text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                              Current quest
                            </span>
                          )}
                          <span className="text-sm font-bold" style={{ color: 'var(--text-tertiary)' }}>
                            {job.period}
                            {job.employmentType ? ` · ${job.employmentType}` : ''}
                          </span>
                        </div>
                      </div>

                      {job.projects ? (
                        <div className="space-y-7">
                          {job.projects.map((project) => (
                            <div key={project.name}>
                              <h4 className="text-sm md:text-base font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>
                                {project.name}
                              </h4>
                              <HighlightList lines={project.highlights} />
                              {project.tech && (
                                <ul className="flex flex-wrap gap-2 mt-4">
                                  {project.tech.map((tech) => (
                                    <li
                                      key={tech}
                                      data-jelly
                                      className="text-xs font-bold px-3 py-1 rounded-full cursor-default"
                                      style={{ color: 'var(--accent-secondary)', backgroundColor: 'var(--bg-chip)' }}
                                    >
                                      {tech}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <HighlightList lines={job.highlights ?? []} />
                      )}
                    </article>
                  </ScrollAnimation>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Contact — final level */}
      <section id="contact" className="py-20 md:py-28 px-4 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={100}>
            <SectionHeading number={4} icon={Send} title="Contact" subtitle="Let's connect" />
          </ScrollAnimation>
          <ScrollAnimation delay={150}>
            <div className="glass-card relative overflow-hidden p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
              <ConfettiBurst ref={confettiRef} />
              <div className="relative mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
                <Image
                  src="/avatar.webp"
                  fill
                  sizes="208px"
                  alt=""
                  className="object-cover object-[50%_30%] scale-125"
                />
              </div>
              <div className="text-center md:text-left">
                <button
                  type="button"
                  data-squish
                  onClick={() => confettiRef.current?.burst()}
                  className="text-sm font-extrabold uppercase tracking-[0.14em] mb-3"
                  style={{ color: 'var(--accent-pink)' }}
                  aria-label="Final level unlocked — celebrate again"
                >
                  Final level unlocked 🎉
                </button>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Let&apos;s build something
                </h2>
                <p className="font-script text-4xl md:text-5xl font-bold gradient-text mb-5">
                  fun together.
                </p>
                <p className="text-base md:text-lg mb-8 leading-relaxed max-w-lg mx-auto md:mx-0" style={{ color: 'var(--text-secondary)' }}>
                  I&apos;m always open to discussing new projects, creative ideas,
                  or opportunities to be part of your vision.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Magnetic>
                    <a
                      href="mailto:rodiat.morin@gmail.com"
                      className="btn-candy inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-extrabold"
                    >
                      Send Email
                      <Send size={16} aria-hidden />
                    </a>
                  </Magnetic>
                  {socialLinks
                    .filter(({ link }) => !link.startsWith('mailto:'))
                    .map(({ Icon, link }) => (
                      <Magnetic key={link}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-soft inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-extrabold"
                        >
                          <Icon size={18} aria-hidden />
                          {socialLabel(link)}
                        </a>
                      </Magnetic>
                    ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function HighlightList({ lines }: { lines: string[] }) {
  return (
    <ul className="space-y-2.5">
      {lines.map((line) => (
        <li
          key={line}
          className="flex gap-3 text-sm md:text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Sparkles size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent-pink)' }} aria-hidden />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}
