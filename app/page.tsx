'use client';

import { motion, Variants } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Mail,
  Clock,
  Download,
  User,
  Briefcase,
  Code2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { hobbyProjects, projects } from './constants/project-list';
import ScrollAnimation from './components/scroll-animation';
import InteractiveLink from './components/interactive-link';
import MobileSidebar from './components/mobile-sidebar';
import { socialLinks } from './constants/social-links';
import SmoothScroll from './components/smooth-scroll';
import ProjectCard from './components/project-card';
import SectionHeading from './components/section-heading';
import { navItems } from './constants/navlist';
import { experience } from './constants/experience';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Home() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
      }}
    >
      <SmoothScroll />

      <nav
        className="fixed z-50 top-4 md:top-6 left-4 right-4 md:left-8 md:right-8 lg:left-14 lg:right-14 flex items-center justify-between px-5 md:px-8 py-3.5 md:py-2 rounded-2xl"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.28)',
        }}
      >
        <a href="#home" className="pointer-events-auto block shrink-0">
          <Image
            src="/logo1.png"
            alt="Rodiat Morin"
            width={74}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </a>
        <ul className="hidden md:flex items-center gap-8 pointer-events-auto">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                className="text-sm font-medium tracking-wide transition-colors hover:[color:var(--accent-primary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 pointer-events-auto">
          <MobileSidebar />
        </div>
      </nav>

      {/* Landing — full-bleed split */}
      <section
        id="home"
        className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden"
      >
        <div className="relative z-30 flex items-center px-6 md:px-12 lg:px-16 xl:px-20 pt-28 pb-16 lg:py-0 bg-[var(--bg-base)] lg:bg-transparent">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="w-full max-w-xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] mb-6"
              style={{ color: 'var(--accent-primary)' }}
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-7xl xl:text-[5.5rem] font-bold mb-4 leading-[1.02] tracking-tight whitespace-nowrap"
              style={{ color: 'var(--text-primary)' }}
            >
              Rodiat Morin
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold mb-7"
              style={{ color: 'var(--accent-primary)' }}
            >
              Frontend Developer
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl mb-9 leading-relaxed max-w-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              I solve complex product problems with clean, accessible
              frontend code — using React, Next.js, and TypeScript to turn
              tricky requirements into software that just works.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'white',
                }}
              >
                View Projects
                <span aria-hidden>→</span>
              </motion.a>
              <motion.a
                href="/Rodiat_Morin_Resume.pdf"
                download="Rodiat_Morin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm md:text-base"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-strong)',
                }}
              >
                Download CV
                <Download size={16} aria-hidden />
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6 md:gap-8"
            >
              {socialLinks.map(({ Icon, link }, idx) => {
                const isEmail = link.startsWith('mailto:');
                const label = link.includes('github')
                  ? 'GitHub'
                  : link.includes('linkedin')
                    ? 'LinkedIn'
                    : 'Email';
                return (
                  <motion.a
                    key={idx}
                    href={link}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:[color:var(--accent-primary)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon size={18} aria-hidden />
                    {label}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-0 min-h-[58vh] sm:min-h-[65vh] lg:min-h-screen order-first lg:order-none lg:absolute lg:inset-y-0 lg:right-0 lg:left-[56%]"
        >
          <Image
            src="/profile-hero.jpeg"
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 100vw, 44vw"
            alt="Rodiat Morin"
            className="object-cover object-bottom"
          />
          {/* Mobile: fade into content below */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 lg:hidden"
            style={{
              background:
                'linear-gradient(to top, var(--bg-base), transparent)',
            }}
            aria-hidden
          />
        </motion.div>

        {/* Full-width left-to-right blend — solid behind the text, easing out across the photo so it reads as one continuous scene */}
        <div
          className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, var(--bg-base) 0%, var(--bg-base) 56%, rgba(15,23,42,0.3) 61%, rgba(15,23,42,0.12) 67%, transparent 74%)',
          }}
          aria-hidden
        />
      </section>

      {/* About */}
      <section
        id="about"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-20"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <ScrollAnimation delay={100}>
            <div>
              <SectionHeading icon={User} title="About Me" />
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                I&apos;m a frontend developer passionate about building modern,
                performant web applications. I love turning complex problems
                into simple, beautiful, and intuitive interfaces.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 content-start md:pt-2">
              {[
                {
                  Icon: Calendar,
                  label: 'Experience',
                  value: '2+ Years',
                },
                {
                  Icon: MapPin,
                  label: 'Location',
                  value: 'Lagos, Nigeria',
                },
                {
                  Icon: Mail,
                  label: 'Email',
                  value: 'rodiat.morin@gmail.com',
                },
                {
                  Icon: Clock,
                  label: 'Availability',
                  value: 'Open to opportunities',
                },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    <Icon size={22} aria-hidden />
                  </span>
                  <div>
                    <p
                      className="text-base font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm mt-0.5 break-all"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        id="projects"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-20"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={100}>
            <SectionHeading
              icon={Code2}
              title="Featured Projects"
              action={{
                label: 'View all projects',
                href: 'https://github.com/Lolllimor',
              }}
            />
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[...projects, ...hobbyProjects].map((project, idx) => (
              <ScrollAnimation key={`${project.name}-${idx}`} delay={idx * 80}>
                <ProjectCard
                  project={project}
                  isMobileOrTablet={isMobileOrTablet}
                />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-20"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation delay={100}>
            <SectionHeading icon={Briefcase} title="Experience" />
          </ScrollAnimation>

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <ScrollAnimation
                key={`${job.company}-${job.period}`}
                delay={idx * 60}
              >
                <article
                  className="p-6 md:p-8 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                    <div>
                      <h3
                        className="text-xl md:text-2xl font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {job.company}
                      </h3>
                      <p
                        className="text-base mt-1"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        {job.role}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                    </div>
                    <span
                      className="text-sm shrink-0"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {job.period}
                      {job.employmentType ? ` · ${job.employmentType}` : ''}
                    </span>
                  </div>

                  {job.projects ? (
                    <div className="space-y-7">
                      {job.projects.map((project) => (
                        <div key={project.name}>
                          <h4
                            className="text-sm md:text-base font-semibold mb-3"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {project.name}
                          </h4>
                          <ul className="space-y-2.5 mb-4">
                            {project.highlights.map((line) => (
                              <li
                                key={line}
                                className="flex gap-3 text-sm md:text-base leading-relaxed"
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                <span
                                  className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: 'var(--accent-primary)' }}
                                  aria-hidden
                                />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                          {project.tech && (
                            <ul className="flex flex-wrap gap-2">
                              {project.tech.map((tech) => (
                                <li
                                  key={tech}
                                  className="text-xs font-medium px-3 py-1.5 rounded-md"
                                  style={{
                                    color: 'var(--accent-secondary)',
                                    backgroundColor: 'var(--bg-base)',
                                  }}
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
                    <ul className="space-y-2.5">
                      {job.highlights?.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-sm md:text-base leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span
                            className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--accent-primary)' }}
                            aria-hidden
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-20"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <ScrollAnimation delay={100}>
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--accent-primary)' }}
            >
              Get In Touch
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Let&apos;s work together
            </h2>
            <p
              className="text-base md:text-lg mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <a
              href="mailto:rodiat.morin@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'white',
              }}
            >
              Send Email
              <span aria-hidden>→</span>
            </a>
          </ScrollAnimation>
        </div>
      </section>

      <footer
        className="py-10 px-6 md:px-12 lg:px-16 xl:px-20 border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <p
            className="text-sm"
            style={{ color: 'var(--text-tertiary)' }}
          >
            © 2026 Rodiat Morin. Built with Next.js
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ Icon, link }, idx) => (
              <InteractiveLink
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                }}
              >
                <Icon size={18} />
              </InteractiveLink>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
