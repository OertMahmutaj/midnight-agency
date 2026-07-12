import { notFound } from 'next/navigation';
import CaseStudyContent from '@/src/components/CaseStudyContent';
import { getWorkBySlug, works } from '@/src/data/works';

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
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
