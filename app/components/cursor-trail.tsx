'use client';

import { useEffect, useState } from 'react';

export default function CursorTrail() {
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    const trailLength = 15;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      setTrail((prev) => {
        const newTrail = [{ x: mouseX, y: mouseY }, ...prev];
        return newTrail.slice(0, trailLength);
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${20 - index * 1}px`,
            height: `${20 - index * 1}px`,
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            transform: 'translate(-50%, -50%)',
            opacity: 1 - index / trail.length,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  );
}
