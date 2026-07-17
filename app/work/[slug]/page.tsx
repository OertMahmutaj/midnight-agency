import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyContent from '@/src/components/CaseStudyContent';
import { getWorkBySlug, works } from '@/src/data/works';
import { createPageMetadata } from '@/src/lib/seo';

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return {
      title: 'Project Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: `${work.title} Case Study`,
    description: `${work.title} case study by Midnight. ${work.summary}`,
    path: `/work/${work.slug}`,
    alternatePath: `/sq/work/${work.slug}`,
    type: 'article',
    image: {
      url: work.image,
      width: 737,
      height: 921,
      alt: `${work.title} brand and digital design case study`,
    },
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <CaseStudyContent work={work} />;
}
