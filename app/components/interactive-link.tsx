'use client';

import { ReactNode } from 'react';

interface InteractiveLinkProps {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

export default function InteractiveLink({
  children,
  href,
  className = '',
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props
}: InteractiveLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}
