'use client';

import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip } from '@mantine/core';
import Image from 'next/image';

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
  isMobileOrTablet: boolean;
}

export default function ProjectCard({
  project,
  isMobileOrTablet,
}: ProjectCardProps) {
  const isLocked = isMobileOrTablet && !!project.info;
  const href = project.liveLink || project.codeLink || '#';

  return (
    <motion.article
      className="group flex flex-col h-full rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <a
        href={isLocked ? undefined : href}
        target={project.liveLink ? '_blank' : undefined}
        rel={project.liveLink ? 'noopener noreferrer' : undefined}
        className="relative block h-36 overflow-hidden"
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

      <div className="flex flex-col flex-1 p-4">
        <h3
          className="text-base font-semibold mb-1.5 flex items-center gap-1.5 leading-snug"
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
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{
                color: 'var(--accent-secondary)',
                backgroundColor: 'var(--bg-base)',
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
            className="mt-auto inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-80"
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
    </motion.article>
  );
}
