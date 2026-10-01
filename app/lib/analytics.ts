import { track } from '@vercel/analytics';
import { sendGAEvent } from '@next/third-parties/google';

/** Google Analytics 4 measurement ID. NEXT_PUBLIC_GA_ID overrides this. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XK8V4W2KC5';

export type AnalyticsEvent =
  | 'resume_download'
  | 'project_click'
  | 'email_click'
  | 'email_copy'
  | 'social_click'
  | 'music_play';

/** Records a visitor action in Vercel Analytics and (when configured) GA4. */
export function trackEvent(name: AnalyticsEvent, props?: Record<string, string>) {
  try {
    track(name, props);
  } catch {
    // Analytics must never break the page.
  }
  if (GA_ID) sendGAEvent('event', name, props ?? {});
}
