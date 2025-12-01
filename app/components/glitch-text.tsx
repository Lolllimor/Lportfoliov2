'use client';

import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({
  children,
  className = '',
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    const glitch = () => {
      setIsGlitching(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText(
          children
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return children[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iterations >= children.length) {
          clearInterval(interval);
          setDisplayText(children);
          setIsGlitching(false);
        }

        iterations += 1 / 3;
      }, 30);
    };

    const interval = setInterval(glitch, 5000);
    return () => clearInterval(interval);
  }, [children]);

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        filter: isGlitching ? 'blur(1px)' : 'none',
      }}
    >
      {displayText}
    </span>
  );
}
