'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { WorkItem } from '@/src/data/works';
import { withLocale, type Locale } from '@/src/lib/i18n';
import { pageContainer, pageRise } from '@/src/lib/pageMotion';

const caseStudyCopy = {
  en: {
    back: 'Back to work',
    industry: 'Industry',
    services: 'Services',
    challenge: 'The challenge',
    solution: 'The solution',
    deliverables: 'Deliverables',
    deliverablesTitle: 'Built to work everywhere.',
    gallery: 'Project gallery',
    images: 'images',
    coverAlt: 'case study cover',
    imageAlt: 'case study image',
  },
  sq: {
    back: 'Kthehu te projektet',
    industry: 'Industria',
    services: 'Shërbimet',
    challenge: 'Sfida',
    solution: 'Zgjidhja',
    deliverables: 'Materialet',
    deliverablesTitle: 'Ndërtuar për të funksionuar kudo.',
    gallery: 'Galeria e projektit',
    images: 'imazhe',
    coverAlt: 'kopertina e studimit të rastit',
    imageAlt: 'imazh i studimit të rastit',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function CaseStudyContent({
  work,
  locale = 'en',
}: {
  work: WorkItem;
  locale?: Locale;
}) {
  const copy = caseStudyCopy[locale];

  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="min-h-screen overflow-x-clip px-5 pb-16 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16"
    >
      <motion.article variants={pageContainer} className="mx-auto max-w-7xl">
        <motion.div variants={pageRise}>
          <Link href={withLocale('/work', locale)} className="mb-8 inline-flex text-[10px] font-black uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-[#E37D30] sm:mb-10 sm:tracking-[0.28em]">
            {copy.back}
          </Link>
        </motion.div>

        <motion.header
          variants={pageContainer}
          className="grid gap-8 border-b border-white/12 pb-8 sm:gap-10 sm:pb-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
        >
          <motion.div variants={pageContainer} className="min-w-0">
            <motion.p variants={pageRise} className="mb-5 break-words text-[10px] font-black uppercase tracking-[0.34em] text-[#E37D30] sm:tracking-[0.42em]">
              {work.client} / {work.year}
            </motion.p>

            <motion.h1
              variants={pageRise}
              className="max-w-full whitespace-normal text-5xl font-black uppercase leading-[0.86] tracking-normal sm:text-7xl lg:text-7xl xl:text-[5.5rem] 2xl:text-8xl"
            >
              {work.title}
            </motion.h1>
          </motion.div>

          <motion.div variants={pageContainer} className="grid min-w-0 gap-7">
            <motion.p variants={pageRise} className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8 md:text-lg">
              {work.summary}
            </motion.p>

            <motion.dl variants={pageRise} className="grid gap-4 text-sm text-white/62 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/35">{copy.industry}</dt>
                <dd className="break-words">{work.industry}</dd>
              </div>
              <div className="min-w-0">
                <dt className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/35">{copy.services}</dt>
                <dd className="break-words">{work.services.join(', ')}</dd>
              </div>
            </motion.dl>
          </motion.div>
        </motion.header>

        <motion.div
          variants={pageRise}
          className="relative mx-auto mt-10 aspect-[737/921] w-full max-w-[737px] overflow-hidden bg-[#080808] sm:mt-14"
        >
          <Image
            src={work.image}
            alt={`${work.title} ${copy.coverAlt}`}
            fill
            priority
            sizes="(min-width: 768px) 737px, 100vw"
            quality={95}
            className="object-cover object-center"
          />
        </motion.div>

        <motion.section
          variants={pageContainer}
          className="mt-16 grid border-y border-white/12 lg:mt-24 lg:grid-cols-2"
        >
          <motion.div
            variants={pageRise}
            className="border-b border-white/12 py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#E37D30]">
              {copy.challenge}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              {work.challenge}
            </p>
          </motion.div>

          <motion.div
            variants={pageRise}
            className="py-10 lg:py-14 lg:pl-14"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#E37D30]">
              {copy.solution}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              {work.solution}
            </p>
          </motion.div>
        </motion.section>

        <motion.section
          variants={pageContainer}
          className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-[0.42fr_1fr] lg:gap-16"
        >
          <motion.div variants={pageRise}>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#E37D30]">
              {copy.deliverables}
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-normal sm:text-4xl">
              {copy.deliverablesTitle}
            </h2>
          </motion.div>

          <motion.ol variants={pageContainer} className="border-t border-white/12">
            {work.deliverables.map((deliverable, index) => (
              <motion.li
                key={deliverable}
                variants={pageRise}
                className="grid grid-cols-[2.5rem_1fr] items-center border-b border-white/12 py-5 text-sm uppercase sm:grid-cols-[3.5rem_1fr] sm:text-base"
              >
                <span className="font-mono text-[10px] text-white/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{deliverable}</span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.section>

        <motion.section variants={pageContainer} className="mt-20 lg:mt-28">
          <motion.header
            variants={pageRise}
            className="mb-8 flex items-end justify-between border-b border-white/12 pb-5"
          >
            <h2 className="text-3xl font-black uppercase leading-none tracking-normal sm:text-5xl">
              {copy.gallery}
            </h2>
            <p className="font-mono text-[10px] uppercase text-white/35">
              {String(work.gallery.length + 1).padStart(2, '0')} {copy.images}
            </p>
          </motion.header>

          <motion.div
            variants={pageContainer}
            className="grid gap-5 sm:gap-6 md:grid-cols-2"
          >
            {work.gallery.map((image, index) => (
              <motion.figure
                key={image}
                variants={pageRise}
                className="relative aspect-[737/921] overflow-hidden bg-[#080808]"
              >
                <Image
                  src={image}
                  alt={`${work.title} ${copy.imageAlt} ${index + 2}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={95}
                  className="object-cover object-center"
                />
              </motion.figure>
            ))}
          </motion.div>
        </motion.section>
      </motion.article>
    </motion.main>
  );
}
