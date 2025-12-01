'use client';

import { useTheme } from '../context/theme-context';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-lg transition-all duration-300 flex items-center justify-center hover:-translate-y-1 group"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <HiSun
        size={24}
        className={`
       text-yellow-500 transition-all duration-300 ${
         theme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
       }`}
      />
      <HiMoon
        size={24}
        className={` transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
        }`}
        style={{ color: 'var(--accent-primary)' }}
      />
    </button>
  );
}
