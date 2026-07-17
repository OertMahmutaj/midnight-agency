import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Midnight Digital Agency',
  description:
    'Start a project with Midnight. Contact our Tirana-based digital agency for branding, web development, SEO, motion, and digital design.',
  path: '/contact',
  alternatePath: '/sq/contact',
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
