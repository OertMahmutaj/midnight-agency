import type { Metadata } from 'next';

import ContactPage from '@/app/contact/page';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Kontaktoni Agjencinë Digjitale Midnight',
  description:
    'Nisni një projekt me Midnight. Kontaktoni agjencinë tonë digjitale në Tiranë për branding, zhvillim web, SEO, motion dhe dizajn digjital.',
  path: '/sq/contact',
  alternatePath: '/contact',
  locale: 'sq',
});

export default function AlbanianContactPage() {
  return <ContactPage locale="sq" />;
}
