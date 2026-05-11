'use client';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdInfoOutline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import { Tooltip } from '@mantine/core';
import Image from 'next/image';

import { hobbyProjects, projects } from './constants/project-list';
import ParticleBackground from './components/particle-background';
import ScrollAnimation from './components/scroll-animation';
import InteractiveLink from './components/interactive-link';
import InteractiveDiv from './components/interactive-div';
import MobileSidebar from './components/mobile-sidebar';
import { socialLinks } from './constants/social-links';
import SmoothScroll from './components/smooth-scroll';
import ThemeToggle from './components/theme-toggle';
import { techStack } from './constants/tech-stack';
import { navItems } from './constants/navlist';
import { experience, skillCategories } from './constants/experience';

export default function Home() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      <nav
        className="fixed z-50 w-full top-0 flex items-center justify-between px-4 md:px-12 py-5 transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-base)',
          borderBottom: '1px solid var(--border-color)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <a
          href="#home"
          className="text-2xl md:text-3xl font-bold font-mono transition-transform duration-300 hover:scale-105"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          RM
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                className="text-sm md:text-base font-medium uppercase tracking-widest relative group transition-all duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="font-mono text-xs mr-2 opacity-50">
                  0{idx + 1}.
                </span>
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                  }}
                ></span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileSidebar />
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-20 relative"
      >
        <div className="max-w-[95%] md:max-w-[80%] xl:max-w-[75%] w-full relative z-10">
          <ScrollAnimation delay={100}>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="h-px w-16"
                style={{
                  background:
                    'linear-gradient(90deg, var(--accent-primary), transparent)',
                }}
              ></div>
              <p
                className="text-base md:text-lg font-mono uppercase tracking-widest"
                style={{ color: 'var(--accent-primary)' }}
              >
                Frontend Developer
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <h1
              className="text-7xl md:text-9xl xl:text-[10rem] font-black mb-8 leading-[0.9] tracking-tight"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display), serif',
              }}
            >
              Rodiat
              <br />
              <span
                className="inline-block"
                style={{
                  background:
                    'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Morin
              </span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <p
              className="text-2xl md:text-3xl mb-16 max-w-4xl leading-relaxed font-light"
              style={{ color: 'var(--text-secondary)' }}
            >
              Frontend developer building scalable, responsive web applications
              with React, Next.js, TypeScript, and modern UI stacks. I care about
              performance, reusable architecture, accessibility, and shipping
              polished experiences across web and mobile.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <div className="flex flex-wrap items-center gap-6 mb-20">
              {socialLinks.map(({ Icon, link }, idx) => (
                <InteractiveLink
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl transition-all duration-300 relative group"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                    e.currentTarget.style.transform =
                      'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.boxShadow =
                      '0 10px 30px rgba(139, 92, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={22} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap pointer-events-none">
                    {link.includes('github') ? 'GitHub' : 'LinkedIn'}
                  </span>
                </InteractiveLink>
              ))}
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group"
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 15px 40px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get in Touch
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={500}>
            <div className="flex flex-wrap items-center gap-8">
              <span
                className="text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Tech Stack
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {techStack.map((item, idx) => (
                  <InteractiveDiv
                    key={idx}
                    className="p-3 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        'var(--accent-primary)';
                      e.currentTarget.style.transform =
                        'translateY(-4px) scale(1.1)';
                      e.currentTarget.style.boxShadow =
                        '0 8px 20px rgba(139, 92, 246, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.transform =
                        'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Image
                      width={60}
                      height={34}
                      className="h-7 w-auto opacity-70 transition-opacity duration-300"
                      src={item}
                      alt="tech"
                      loading="lazy"
                    />
                  </InteractiveDiv>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section id="about" className="py-32 px-4 md:px-8 relative">
        <div className="max-w-[95%] md:max-w-[80%] xl:max-w-[75%] mx-auto">
          <ScrollAnimation delay={100}>
            <div className="flex items-center gap-6 mb-16">
              <span
                className="font-mono text-2xl opacity-30"
                style={{ color: 'var(--accent-primary)' }}
              >
                01.
              </span>
              <h2
                className="text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                About Me
              </h2>
              <div
                className="flex-1 h-px ml-8"
                style={{
                  background:
                    'linear-gradient(90deg, var(--border-color), transparent)',
                }}
              ></div>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-16 items-start mt-10">
            <ScrollAnimation delay={200}>
              <div className="space-y-6">
                <p
                  className="text-xl md:text-3xl  leading-relaxed font-light"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Hello! I&apos;m Rodiat, a frontend developer based in Lagos,
                  Nigeria. I partner with teams to ship interfaces that scale—from
                  design systems and state management to API integration and
                  performance tuning.
                </p>
                <p
                  className="text-xl md:text-3xl  leading-relaxed font-light"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  I enjoy turning complex product requirements into clear,
                  maintainable UI. Strong focus on clean code, accessibility, and
                  collaborative delivery with designers, PMs, and stakeholders.
                </p>
                <p
                  className="text-xl md:text-3xl leading-relaxed font-light"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Core technologies I use day to day:
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <ul className="grid grid-cols-2 gap-4">
                  {[
                    'TypeScript',
                    'JavaScript (ES6+)',
                    'React',
                    'Next.js',
                    'Redux',
                    'HTML5 & CSS3',
                  ].map((tech, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-lg md:text-xl font-mono"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span
                        className="mr-3 text-lg"
                        style={{ color: 'var(--accent-secondary)' }}
                      >
                        ▹
                      </span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={400}>
            <div
              className="mt-16 p-8 md:p-10 rounded-2xl space-y-10"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold font-mono uppercase tracking-widest"
                style={{ color: 'var(--text-primary)' }}
              >
                Skills & tooling
              </h3>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
                {skillCategories.map((cat) => (
                  <div key={cat.title} className="space-y-4">
                    <p
                      className="text-sm font-mono uppercase tracking-widest"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {cat.title}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm md:text-base px-3 py-1.5 rounded-lg font-mono"
                          style={{
                            color: 'var(--text-secondary)',
                            backgroundColor: 'var(--bg-base)',
                            border: '1px solid var(--border-color)',
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

      <section id="experience" className="py-32 px-4 md:px-8 relative">
        <div className="max-w-[95%] md:max-w-[80%] xl:max-w-[75%] mx-auto">
          <ScrollAnimation delay={100}>
            <div className="flex items-center gap-6 mb-16">
              <span
                className="font-mono text-2xl opacity-30"
                style={{ color: 'var(--accent-primary)' }}
              >
                02.
              </span>
              <h2
                className="text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Experience
              </h2>
              <div
                className="flex-1 h-px ml-8"
                style={{
                  background:
                    'linear-gradient(90deg, var(--border-color), transparent)',
                }}
              ></div>
            </div>
          </ScrollAnimation>

          <div className="space-y-12 md:space-y-16">
            {experience.map((job, idx) => (
              <ScrollAnimation key={`${job.company}-${job.period}`} delay={idx * 80}>
                <article
                  className="p-8 md:p-10 rounded-2xl"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {job.company}
                      </h3>
                      <p
                        className="text-lg md:text-xl mt-1 font-mono"
                        style={{ color: 'var(--accent-secondary)' }}
                      >
                        {job.role}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                    </div>
                    <span
                      className="text-sm md:text-base font-mono uppercase tracking-widest shrink-0"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {job.highlights.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-lg md:text-xl leading-relaxed"
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
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-4 md:px-8 relative">
        <div className="max-w-[95%] md:max-w-[90%] xl:max-w-[75%] mx-auto">
          <ScrollAnimation delay={100}>
            <div className="flex items-center gap-6 mb-16">
              <span
                className="font-mono text-2xl opacity-30"
                style={{ color: 'var(--accent-primary)' }}
              >
                03.
              </span>
              <h2
                className="text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Featured Projects
              </h2>
              <div
                className="flex-1 h-px ml-8"
                style={{
                  background:
                    'linear-gradient(90deg, var(--border-color), transparent)',
                }}
              ></div>
            </div>
          </ScrollAnimation>

          <div className="space-y-32 md:mt-20">
            {projects.map((project, idx) => (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div
                  className={`flex items-center gap-12 ${
                    idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  } flex-col md:flex-row`}
                >
                  <div className="flex-1 w-full md:w-auto group">
                    <div className="relative overflow-hidden rounded-lg">
                      <a
                        href={
                          isMobileOrTablet && (project as any).info
                            ? undefined
                            : project.liveLink || project.codeLink || '#'
                        }
                        target={project.liveLink ? '_blank' : undefined}
                        rel={
                          project.liveLink ? 'noopener noreferrer' : undefined
                        }
                        className="block"
                        onClick={(e) => {
                          if (isMobileOrTablet && (project as any).info) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                          }
                        }}
                        onTouchStart={(e) => {
                          if (isMobileOrTablet && (project as any).info) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                          }
                        }}
                        style={{
                          pointerEvents:
                            isMobileOrTablet && (project as any).info
                              ? 'none'
                              : 'auto',
                          cursor:
                            isMobileOrTablet && (project as any).info
                              ? 'default'
                              : 'pointer',
                        }}
                      >
                        <Image
                          src={project.image}
                          width={700}
                          height={450}
                          alt={project.name}
                          className=" object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <span
                        className="text-sm md:text-base font-mono uppercase tracking-widest"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        Featured Project
                      </span>
                      <h3
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mt-3 mb-4 flex items-center gap-3"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.name}
                        {project.info && (
                          <Tooltip label={project.info}>
                            <span
                              className="cursor-help"
                              style={{ color: 'var(--accent-secondary)' }}
                            >
                              <MdInfoOutline size={24} />
                            </span>
                          </Tooltip>
                        )}
                      </h3>
                    </div>

                    <div
                      className="p-6 rounded-lg"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <p
                        className="text-xl md:text-2xl leading-relaxed mb-6"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {typeof project.description === 'string'
                          ? project.description
                          : project.description}
                      </p>

                      <ul className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, id) => (
                          <li
                            key={id}
                            className="text-base md:text-lg font-mono"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {tech}
                            {id < project.technologies.length - 1 && (
                              <span className="mx-2">•</span>
                            )}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4">
                        {project.codeLink && (
                          <InteractiveLink
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base md:text-lg font-mono transition-all"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                'var(--accent-primary)';
                              e.currentTarget.style.transform =
                                'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                'var(--text-secondary)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <FiGithub size={20} />
                            <span>Code</span>
                          </InteractiveLink>
                        )}
                        {project.liveLink && (
                          <InteractiveLink
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base md:text-lg font-mono transition-all"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                'var(--accent-primary)';
                              e.currentTarget.style.transform =
                                'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                'var(--text-secondary)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <HiOutlineExternalLink size={20} />
                            <span>Live</span>
                          </InteractiveLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      <section id="hobby-projects" className="py-32 px-4 md:px-8 relative">
        <div className="max-w-[95%] md:max-w-[90%] xl:max-w-[75%] mx-auto">
          <ScrollAnimation delay={100}>
            <div className="flex items-center gap-6 mb-16">
              <span
                className="font-mono text-2xl opacity-30"
                style={{ color: 'var(--accent-primary)' }}
              >
                04.
              </span>
              <h2
                className="text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Hobby Projects
              </h2>
              <div
                className="flex-1 h-px ml-8"
                style={{
                  background:
                    'linear-gradient(90deg, var(--border-color), transparent)',
                }}
              ></div>
            </div>
          </ScrollAnimation>

          <div className="space-y-32 md:mt-20">
            {hobbyProjects.map((project, idx) => (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div
                  className={`flex items-center gap-12 ${
                    idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  } flex-col md:flex-row`}
                >
                  <div className="flex-1 w-full md:w-auto group">
                    <div className="relative overflow-hidden rounded-lg">
                      <a
                        href={project.liveLink || project.codeLink || '#'}
                        target={project.liveLink ? '_blank' : undefined}
                        rel={
                          project.liveLink ? 'noopener noreferrer' : undefined
                        }
                        className="block"
                        onClick={(e) => {
                          if (isMobileOrTablet && (project as any).info) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Image
                          src={project.image}
                          width={700}
                          height={450}
                          alt={project.name}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <span
                        className="text-sm md:text-base font-mono uppercase tracking-widest"
                        style={{ color: 'var(--accent-secondary)' }}
                      >
                        Hobby Project
                      </span>
                      <h3
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mt-3 mb-4 flex items-center gap-3"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.name}
                        {/* {project?.info && (
                          <Tooltip label={project?.info}>
                            <span
                              className="cursor-help"
                              style={{ color: 'var(--accent-secondary)' }}
                            >
                              <MdInfoOutline size={24} />
                            </span>
                          </Tooltip>
                        )} */}
                      </h3>
                    </div>

                    <div
                      className="p-6 rounded-lg"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <p
                        className="text-xl md:text-2xl leading-relaxed mb-6"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {typeof project.description === 'string'
                          ? project.description
                          : project.description}
                      </p>

                      <ul className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, id) => (
                          <li
                            key={id}
                            className="text-base md:text-lg font-mono"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {tech}
                            {id < project.technologies.length - 1 && (
                              <span className="mx-2">•</span>
                            )}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4">
                        {project.codeLink && (
                          <InteractiveLink
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base md:text-lg font-mono transition-all"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                'var(--accent-primary)';
                              e.currentTarget.style.transform =
                                'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                'var(--text-secondary)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <FiGithub size={20} />
                            <span>Code</span>
                          </InteractiveLink>
                        )}
                        {project.liveLink && (
                          <InteractiveLink
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base md:text-lg font-mono transition-all"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                'var(--accent-primary)';
                              e.currentTarget.style.transform =
                                'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                'var(--text-secondary)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            <HiOutlineExternalLink size={20} />
                            <span>Live</span>
                          </InteractiveLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-4 md:px-8 relative">
        <div className="max-w-[95%] md:max-w-[85%] lg:max-w-[80%] mx-auto text-center">
          <ScrollAnimation delay={100}>
            <span
              className="font-mono text-3xl md:text-4xl opacity-30 block mb-4"
              style={{ color: 'var(--accent-primary)' }}
            >
              05.
            </span>
            <p
              className="text-base md:text-lg font-mono uppercase tracking-widest mb-6"
              style={{ color: 'var(--accent-primary)' }}
            >
              Get In Touch
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <h2
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Let&apos;s work together
            </h2>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <p
              className="text-xl md:text-2xl lg:text-3xl mb-12 leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <a
              href="mailto:ololade_morin@hotmail.com"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-xl font-semibold text-xl md:text-2xl transition-all duration-300 relative overflow-hidden group"
              style={{
                background:
                  'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow =
                  '0 20px 50px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Send Email
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>
          </ScrollAnimation>
        </div>
      </section>

      <footer
        className="py-12 px-4 md:px-8 border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="max-w-[95%] md:max-w-[92%] lg:max-w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="text-base md:text-lg font-mono"
            style={{ color: 'var(--text-tertiary)' }}
          >
            © 2026 Rodiat Morin. Built with Next.js
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ Icon, link }, idx) => (
              <InteractiveLink
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.transform =
                    'translateY(-3px) scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <Icon size={20} />
              </InteractiveLink>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
