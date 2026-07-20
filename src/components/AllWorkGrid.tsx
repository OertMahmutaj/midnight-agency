'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import PageNumber from '@/src/components/PageNumber';
import { getWorks, type WorkItem } from '@/src/data/works';
import { withLocale, type Locale } from '@/src/lib/i18n';
import { pageContainer, pageRise, smoothEase } from '@/src/lib/pageMotion';

const copyByLocale = {
  en: {
    eyebrow: 'Project index',
    heading: ['All', 'Projects.'],
    intro:
      'Explore every Midnight case study in one place, from brand systems and campaigns to digital products and platforms.',
    back: 'Back to interactive view',
    view: 'View case study',
    projects: 'projects',
  },
  sq: {
    eyebrow: 'Indeksi i projekteve',
    heading: ['Të Gjitha', 'Projektet.'],
    intro:
      'Eksploroni të gjitha projektet e Midnight në një vend, nga sistemet e markës dhe fushatat te produktet dhe platformat digjitale.',
    back: 'Kthehu te pamja interaktive',
    view: 'Shiko projektin',
    projects: 'projekte',
  },
} satisfies Record<Locale, {
  eyebrow: string;
  heading: string[];
  intro: string;
  back: string;
  view: string;
  projects: string;
}>;

const hoverTransition = {
  duration: 0.48,
  ease: smoothEase,
};

function ProjectDetails({ work }: { work: WorkItem }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 bg-[#070707] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#E37D30]">
            {work.industry}
          </p>
          <h2 className="mt-2 break-words text-2xl font-black uppercase leading-none text-white sm:text-3xl">
            {work.title}
          </h2>
        </div>

        <ArrowUpRight className="mt-1 size-5 shrink-0 text-white" strokeWidth={1.6} />
      </div>

      <div className="flex items-end justify-between gap-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
        <p className="line-clamp-1 min-w-0">{work.services.join(' / ')}</p>
        <span className="shrink-0">{work.year}</span>
      </div>
    </div>
  );
}

function WorkCard({
  work,
  index,
  locale,
}: {
  work: WorkItem;
  index: number;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];

  return (
    <motion.article variants={pageRise} className="min-w-0">
      <Link
        href={withLocale(`/work/${work.slug}`, locale)}
        prefetch={false}
        aria-label={`${copy.view}: ${work.title}`}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#E37D30]"
      >
        <motion.div
          initial="rest"
          whileHover="hover"
          className="relative overflow-hidden bg-[#080808] md:aspect-[4/5]"
        >
          <motion.figure
            variants={{
              rest: { y: 0 },
              hover: { y: -132 },
            }}
            transition={hoverTransition}
            className="relative aspect-[4/5] md:absolute md:inset-0"
          >
            <Image
              src={work.image}
              alt={`${work.title} case study`}
              fill
              loading={index < 5 ? 'eager' : 'lazy'}
              fetchPriority={index < 2 ? 'high' : 'auto'}
              sizes="(max-width: 767px) 100vw, (max-width: 1399px) 50vw, 620px"
              quality={90}
              className="object-cover object-center"
            />
          </motion.figure>

          <motion.div
            variants={{
              rest: { y: 132 },
              hover: { y: 0 },
            }}
            transition={hoverTransition}
            className="absolute inset-x-0 bottom-0 hidden h-[132px] md:block"
          >
            <ProjectDetails work={work} />
          </motion.div>
        </motion.div>

        <div className="md:hidden">
          <ProjectDetails work={work} />
        </div>
      </Link>
    </motion.article>
  );
}

export default function AllWorkGrid({ locale = 'en' }: { locale?: Locale }) {
  const works = getWorks(locale);
  const copy = copyByLocale[locale];

  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="dark-site-content min-h-screen overflow-x-clip px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-32 md:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.header
          variants={pageContainer}
          className="grid gap-10 border-b border-white/12 pb-10 sm:pb-14 lg:grid-cols-[1fr_0.8fr] lg:items-end"
        >
          <motion.div variants={pageContainer}>
            <motion.p
              variants={pageRise}
              className="mb-5 text-[10px] font-black uppercase tracking-[0.34em] text-[#E37D30]"
            >
              {copy.eyebrow}
            </motion.p>

            <motion.h1
              variants={pageRise}
              className="max-w-[10ch] text-5xl font-black uppercase leading-[0.86] tracking-normal sm:text-7xl lg:text-[clamp(4.5rem,7vw,7rem)]"
            >
              {copy.heading.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index === copy.heading.length - 1 ? (
                    <PageNumber value="02" className="translate-y-2" />
                  ) : null}
                </span>
              ))}
            </motion.h1>
          </motion.div>

          <motion.div variants={pageRise} className="lg:pb-2">
            <p className="max-w-xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
              {copy.intro}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-5">
              <Link
                href={withLocale('/work', locale)}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:text-[#E37D30]"
              >
                <ArrowLeft className="size-4" strokeWidth={1.7} />
                {copy.back}
              </Link>

              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                {String(works.length).padStart(2, '0')} {copy.projects}
              </p>
            </div>
          </motion.div>
        </motion.header>

        <motion.section
          variants={pageContainer}
          aria-label={copy.eyebrow}
          className="mt-8 grid gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-12"
        >
          {works.map((work, index) => (
            <WorkCard
              key={work.slug}
              work={work}
              index={index}
              locale={locale}
            />
          ))}
        </motion.section>
      </div>
    </motion.main>
  );
}
