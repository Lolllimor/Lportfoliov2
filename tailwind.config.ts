import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        tunes: {
          heading: '#2d2e32',
          subheading: '#555555',
          paragraph: '#767676',
          hero: '#f9f9f9',
          link: '#147efb',
          border: 'rgba(45,46,50,.5)',
          project: 'hsla(0,0%,46%,.2)',
        },
        dark: {
          base: '#0f0c29',
          card: '#1a1538',
          border: '#2d2654',
          hover: '#241f4a',
        },
        purple: {
          dark: '#2d1b69',
          mid: '#5b2c91',
          bright: '#8b5cf6',
          light: '#a78bfa',
          glow: '#c084fc',
        },
        coral: {
          bright: '#ff6b9d',
          light: '#ff8fb3',
          soft: '#ffa8c5',
        },
        accent: {
          primary: '#8b5cf6',
          secondary: '#ff6b9d',
          glow: '#c084fc',
        },
      },
      boxShadow: {
        sm: '0 0 10px rgba(0,0,0,.09)',
        md: '0 0 24px rgba(0,0,0,.09)',
        lg: '0 0 10px rgba(0,0,0,.1)',
        xl: '0 20px 60px rgba(0, 0, 0, 0.15)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.2)',
        glow: '0 0 20px rgba(102, 126, 234, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
