import type { Metadata } from 'next';
import { Caveat, JetBrains_Mono, Nunito } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { theme } from '../theme';
import MicroInteractions from './components/micro-interactions';
import ScrollProgress from './components/scroll-progress';
import { GA_ID } from './lib/analytics';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'Rodiat Morin, Solutions Architect (Node.js, NestJS, React, Next.js)',
  description:
    'Solutions architect with 4+ years designing and shipping full-stack products: Node.js and NestJS services, React and Next.js interfaces. Focused on clear system design, secure workflows, and software that scales.',
  keywords: [
    'Software Developer',
    'Javascript',
    'React',
    'HTML 5',
    'CSS 3',
    'Solutions Architect',
    'Full-stack Developer',
    'Node.js',
    'NestJS',
    'Nextjs',
    'TypeScript',
    'Mantine',
    'Material UI',
  ],
  authors: [{ name: 'Rodiat Morin ' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        className={`${nunito.variable} ${jetbrainsMono.variable} ${caveat.variable} font-sans`}
      >
        <MantineProvider theme={theme}>
          <MicroInteractions />
          <ScrollProgress />
          {children}
        </MantineProvider>
        <Analytics />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
