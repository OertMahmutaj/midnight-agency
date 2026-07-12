'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { works, type WorkItem } from '@/src/data/works';
import { pageContainer as container, pageRise as reveal, smoothEase } from '@/src/lib/pageMotion';

const imageMotion: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -152,
    transition: {
      duration: 0.35,
      ease: smoothEase,
    },
  },
};

const desktopDetails: Variants = {
  rest: {
    opacity: 0,
    y: 56,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: smoothEase,
    },
  },
};

function WorkDetails({ work }: { work: WorkItem }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/38">
        <span>{work.client}</span>
        <span className="h-px w-8 bg-white/18" />
        <span>{work.industry}</span>
      </div>

      <h2 className="text-xl font-black uppercase leading-none text-white md:text-2xl">
        {work.title}
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {work.services.map((service) => (
          <span
            key={service}
            className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/52"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}

function WorkCard({ work, index }: { work: WorkItem; index: number }) {
  return (
    <motion.div variants={reveal}>
      <Link href={`/work/${work.slug}`} className="group block outline-none">
        <motion.article
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          className="relative overflow-hidden rounded-[8px] border border-white/8 bg-[#080808] outline-none"
        >
          <motion.div
            variants={imageMotion}
            className="relative z-10 aspect-[1.5/1] overflow-hidden bg-[#080808] will-change-transform"
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              loading={index < 4 ? 'eager' : 'lazy'}
              className={`${work.imageFit ?? 'object-cover'} object-center`}
            />

            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 group-focus-visible:bg-black/10" />

            <div className="absolute left-4 top-4 flex gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/82">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="text-white/28">/</span>
              <span>{work.year}</span>
            </div>
          </motion.div>

          <div className="p-4 md:hidden">
            <WorkDetails work={work} />
          </div>

          <motion.div
            variants={desktopDetails}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden p-5 md:block"
          >
            <WorkDetails work={work} />
          </motion.div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 pb-20 pt-28 text-white md:px-10 lg:px-16 lg:pt-32">
      <section className="mx-auto max-w-7xl">
        <motion.header
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[0.72fr_1fr] lg:items-end"
        >
          <div>
            <motion.p
              variants={reveal}
              className="mb-5 text-[10px] font-black uppercase tracking-[0.42em] text-[#E37D30]"
            >
              Selected Work
            </motion.p>

            <motion.h1
              variants={reveal}
              className="max-w-[8ch] text-[clamp(3.4rem,10vw,8rem)] font-black uppercase leading-[0.78]"
            >
              Bold Builds Brands.
            </motion.h1>
          </div>

          <motion.div variants={reveal} className="grid gap-8 lg:justify-items-end">
            <p className="max-w-xl text-sm leading-7 text-white/58 md:text-base">
              A growing archive of brand systems, launch pages, interactive builds, and digital tools shaped for sharp first impressions.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
              <span>Branding</span>
              <span className="text-white/18">/</span>
              <span>Web</span>
              <span className="text-white/18">/</span>
              <span>Motion</span>
              <span className="text-white/18">/</span>
              <span>Systems</span>
            </div>
          </motion.div>
        </motion.header>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-14"
        >
          {works.map((work, index) => (
            <WorkCard key={work.slug} work={work} index={index} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}
