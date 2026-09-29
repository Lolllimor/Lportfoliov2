'use client';

import { usePathname } from 'next/navigation';

/** Section links are in-page anchors on the home page and "/#section" everywhere else. */
export function useNavHref() {
  const isHome = usePathname() === '/';
  return (link: string) => (isHome ? link : `/${link}`);
}
