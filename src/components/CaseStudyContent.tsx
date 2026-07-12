'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { WorkItem } from '@/src/data/works';
import { pageContainer, pageRise } from '@/src/lib/pageMotion';

export default function CaseStudyContent({ work }: { work: WorkItem }) {
  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="min-h-screen px-5 pb-20 pt-28 text-white md:px-10 lg:px-16 lg:pt-32"
    >
      <motion.article variants={pageContainer} className="mx-auto max-w-7xl">
        <motion.div variants={pageRise}>
          <Link
            href="/work"
            className="mb-10 inline-flex text-[10px] font-black uppercase tracking-[0.28em] text-white/50 transition-colors hover:text-[#E37D30]"
          >
            Back to work
          </Link>
        </motion.div>

        <motion.header
          variants={pageContainer}
          className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[0.8fr_1fr] lg:items-end"
        >
          <motion.div variants={pageContainer}>
            <motion.p variants={pageRise} className="mb-5 text-[10px] font-black uppercase tracking-[0.42em] text-[#E37D30]">
              {work.client} / {work.year}
            </motion.p>

            <motion.h1 variants={pageRise} className="max-w-[9ch] text-[clamp(3.4rem,10vw,8rem)] font-black uppercase leading-[0.78]">
              {work.title}
            </motion.h1>
          </motion.div>

          <motion.div variants={pageContainer} className="grid gap-7">
            <motion.p variants={pageRise} className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">
              {work.summary}
            </motion.p>

            <motion.dl variants={pageRise} className="grid gap-4 text-sm text-white/62 sm:grid-cols-2">
              <div>
                <dt className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
                  Industry
                </dt>
                <dd>{work.industry}</dd>
              </div>

              <div>
                <dt className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
                  Services
                </dt>
                <dd>{work.services.join(', ')}</dd>
              </div>
            </motion.dl>
          </motion.div>
        </motion.header>

        <motion.div variants={pageRise} className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[8px] border border-white/10 bg-[#080808]">
          <Image
            src={work.image}
            alt={work.title}
            fill
            priority
            sizes="100vw"
            className={`${work.imageFit ?? 'object-cover'} object-center`}
          />
        </motion.div>

        <motion.section variants={pageContainer} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {work.stats.map((stat) => (
            <motion.div key={stat.label} variants={pageRise} className="border border-white/10 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
                {stat.label}
              </p>

              <p className="mt-5 text-3xl font-black uppercase leading-none text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.section>
      </motion.article>
    </motion.main>
  );
}
