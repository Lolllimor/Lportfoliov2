import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { ThemeProvider } from './context/theme-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Rodiat Morin — Frontend Developer (React, Next.js, TypeScript)',
  description:
    'Frontend developer building scalable, responsive web apps with React, Next.js, and TypeScript. Focused on performance, reusable architecture, accessibility, and polished UX across web and mobile.',
  keywords: [
    'Software Developer',
    'Javascript',
    'React',
    'HTML 5',
    'CSS 3',
    'Frontend Developer',
    'Front-end Developer',
    'Nextjs',
    'TypeScript',
    'Mantine',
    'Material UI',
  ],
  authors: [{ name: 'Rodiat Morin ' }],
  icons: [
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
    },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-icon.png' },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans`}
      >
        <ThemeProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
