import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CaseStudyContent from '@/src/components/CaseStudyContent';
import { getWorkBySlug, worksSq } from '@/src/data/works';
import { createPageMetadata } from '@/src/lib/seo';

export function generateStaticParams() {
  return worksSq.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug, 'sq');

  if (!work) {
    return {
      title: 'Projekti Nuk U Gjet',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: `Studim Rasti: ${work.title}`,
    description: `Studim rasti nga Midnight për ${work.title}. ${work.summary}`,
    path: `/sq/work/${work.slug}`,
    alternatePath: `/work/${work.slug}`,
    locale: 'sq',
    type: 'article',
    image: {
      url: work.image,
      width: 736,
      height: 920,
      alt: `${work.title}, studim rasti për markën dhe dizajnin digjital`,
    },
  });
}

export default async function AlbanianCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug, 'sq');

  if (!work) {
    notFound();
  }

  return <CaseStudyContent work={work} locale="sq" />;
}
