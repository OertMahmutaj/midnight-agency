import type { MetadataRoute } from 'next';

import { works } from '@/src/data/works';
import { absoluteUrl } from '@/src/lib/seo';

type RoutePair = {
  en: string;
  sq: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
};

function localizedEntries(pair: RoutePair): MetadataRoute.Sitemap {
  const languages = {
    en: absoluteUrl(pair.en),
    sq: absoluteUrl(pair.sq),
    'x-default': absoluteUrl(pair.en),
  };

  return [pair.en, pair.sq].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: pair.changeFrequency,
    priority: pair.priority,
    alternates: {
      languages,
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPairs: RoutePair[] = [
    { en: '/', sq: '/sq', changeFrequency: 'monthly', priority: 1 },
    { en: '/work', sq: '/sq/work', changeFrequency: 'monthly', priority: 0.9 },
    { en: '/work/all', sq: '/sq/work/all', changeFrequency: 'monthly', priority: 0.9 },
    { en: '/services', sq: '/sq/services', changeFrequency: 'monthly', priority: 0.9 },
    { en: '/people', sq: '/sq/people', changeFrequency: 'monthly', priority: 0.7 },
    { en: '/contact', sq: '/sq/contact', changeFrequency: 'yearly', priority: 0.8 },
  ];

  const workPairs: RoutePair[] = works.map((work) => ({
    en: `/work/${work.slug}`,
    sq: `/sq/work/${work.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPairs, ...workPairs].flatMap(localizedEntries);
}
