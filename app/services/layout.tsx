import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Branding, Web Development & SEO Services',
  description:
    'Brand strategy, identity design, high-performance web development, SEO, motion, and digital design services from Midnight in Tirana, Albania.',
  path: '/services',
  alternatePath: '/sq/services',
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
