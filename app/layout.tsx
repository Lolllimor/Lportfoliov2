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
  title: 'Rodiat Morin, Solutions Architect (React, Next.js, TypeScript)',
  description:
    'Solutions architect with 3+ years turning complex requirements into full-stack systems, from Node.js and NestJS services to React and Next.js interfaces.',
  keywords: [
    'Solutions Architect',
    'Frontend Developer',
    'Javascript',
    'React',
    'HTML 5',
    'CSS 3',
    'Nextjs',
    'TypeScript',
    'Redux',
    'Tailwind CSS',
    'Chakra UI',
    'Mantine',
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
