import { track } from '@vercel/analytics';
import { sendGAEvent } from '@next/third-parties/google';

/** Google Analytics 4 measurement ID (G-XXXXXXX). GA stays off until it's set. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
