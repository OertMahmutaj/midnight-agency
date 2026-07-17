import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Branding & Digital Case Studies',
  description:
    'Explore selected branding, identity, web design, and digital work by Midnight, a creative digital agency based in Tirana, Albania.',
  path: '/work',
  alternatePath: '/sq/work',
});

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
