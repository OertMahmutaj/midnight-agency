import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About the Midnight Creative Team',
  description:
    "Meet Midnight's founders, combining software engineering, brand strategy, identity, motion, and art direction in Tirana, Albania.",
  path: '/people',
  alternatePath: '/sq/people',
});

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return children;
}
