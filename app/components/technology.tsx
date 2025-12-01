import { Mulish } from 'next/font/google';
import React from 'react';

const mulish = Mulish({ subsets: ['latin'] });

function Technology({ tech }: { tech: string }) {
  return (
    <p
      className={`whitespace-nowrap text-slate-dark text-primary font-mono py-[0.5rem] px-[1rem] rounded transition-all duration-300 ${mulish.className}`}
    >
      {tech}
    </p>
  );
}

export default Technology;
