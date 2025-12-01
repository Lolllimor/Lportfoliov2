'use client';

import { ReactNode } from 'react';

interface InteractiveDivProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  [key: string]: any;
}

export default function InteractiveDiv({
  children,
  className = '',
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props
}: InteractiveDivProps) {
  return (
    <div
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
