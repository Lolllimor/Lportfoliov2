'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { canHover, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

const HEARTS = ['💜', '💗', '✨', '💖'];

const random = (min: number, max: number) => min + Math.random() * (max - min);

/** The big hero avatar: leans toward the cursor, and says hi with hearts when clicked. */
export default function AvatarFrame() {
  const frameRef = useRef<HTMLButtonElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const frame = frameRef.current;
    if (!frame || prefersReducedMotion() || !canHover()) return;

    gsap.set(frame, { transformPerspective: 1000 });
    const ease = { duration: 0.8, ease: 'power3.out' };
    const rotateX = gsap.quickTo(frame, 'rotationX', ease);
    const rotateY = gsap.quickTo(frame, 'rotationY', ease);

    const onMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      rotateY(((e.clientX - rect.left) / rect.width - 0.5) * 10);
      rotateX((0.5 - (e.clientY - rect.top) / rect.height) * 10);
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
    };
    frame.addEventListener('mousemove', onMove);
    frame.addEventListener('mouseleave', onLeave);
    return () => {
      frame.removeEventListener('mousemove', onMove);
      frame.removeEventListener('mouseleave', onLeave);
    };
  });

  const sayHi = () => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer || prefersReducedMotion()) return;

    gsap
      .timeline()
      .to(frame, { scaleX: 1.04, scaleY: 0.96, duration: 0.1, ease: 'power2.out' })
      .to(frame, { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'elastic.out(1.1, 0.35)' });

    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('span');
      heart.textContent = HEARTS[i % HEARTS.length];
      Object.assign(heart.style, {
        position: 'absolute',
        left: `${random(25, 75)}%`,
        bottom: '12%',
        fontSize: `${random(18, 30)}px`,
      });
      layer.appendChild(heart);
      gsap.fromTo(
        heart,
        { y: 0, x: 0, scale: 0.3, opacity: 1 },
        {
          y: -random(160, 300),
          x: random(-50, 50),
          rotation: random(-30, 30),
          scale: 1,
          opacity: 0,
          duration: random(1.2, 1.8),
          delay: i * 0.04,
          ease: 'power1.out',
          onComplete: () => heart.remove(),
        }
      );
    }
  };

  return (
    <button
      ref={frameRef}
      type="button"
      onClick={sayHi}
      aria-label="Say hi to Rodiat"
      className="relative block w-full aspect-[4/5] rounded-[3rem] border-[6px] border-white cursor-pointer"
      style={{
        boxShadow: '0 30px 70px -20px rgba(91, 33, 182, 0.45), 0 0 0 10px rgba(255,255,255,0.35)',
      }}
    >
      <span className="absolute inset-0 overflow-hidden rounded-[2.6rem]">
        <Image
          src="/avatar.webp"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 36vw"
          alt="Illustrated avatar of Rodiat Morin in a purple hoodie, working on a laptop"
          className="object-cover"
        />
      </span>
      <span ref={layerRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden />
    </button>
  );
}
