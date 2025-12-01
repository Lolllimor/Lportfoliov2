'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export default function MagneticButton({
  children,
  className = '',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const strength = (1 - distance / maxDistance) * 0.3;
        setPosition({
          x: x * strength,
          y: y * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', () => setPosition({ x: 0, y: 0 }));

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
