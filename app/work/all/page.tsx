import type { Metadata } from 'next';

import AllWorkGrid from '@/src/components/AllWorkGrid';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'All Branding & Digital Projects',
  description:
    'Browse every Midnight branding, identity, web design, development, and digital project in one complete case-study index.',
  path: '/work/all',
  alternatePath: '/sq/work/all',
});

export default function AllWorkPage() {
  return <AllWorkGrid />;
}
