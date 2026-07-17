'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import PageNumber from '@/src/components/PageNumber';
import type { Locale } from '@/src/lib/i18n';
import {
  pageContainer,
  pageRise,
} from '@/src/lib/pageMotion';

type TeamMember = {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  skills: string[];
  image: string;
};

const teamByLocale: Record<Locale, TeamMember[]> = {
  en: [
    {
      name: 'Oert Mahmutaj',
      role: 'Co-Founder & Lead Developer',
      specialty: 'Technology & Systems',
      bio: 'An analytical developer with a background in Physics and Economic Informatics. Oert turns ambitious ideas into scalable architecture, thoughtful automation, and high-performance digital experiences built to last.',
      skills: ['Next.js', 'React', 'MERN', 'Python', 'AI'],
      image: '/people/oert.webp',
    },
    {
      name: 'Albano Jasharaj',
      role: 'Co-Founder & Creative Director',
      specialty: 'Brand & Direction',
      bio: 'A creative strategist shaping brands through identity, motion, and art direction. Albano builds visual systems with a clear point of view, giving every digital experience a premium and memorable character.',
      skills: ['Branding', 'UI', 'Motion', 'Identity', 'Art Direction'],
      image: '/people/albano.webp',
    },
  ],
  sq: [
    {
      name: 'Oert Mahmutaj',
      role: 'Bashkëthemelues & Lead Developer',
      specialty: 'Teknologji & Sisteme',
      bio: 'Zhvillues analitik me formim në Fizikë dhe Informatikë Ekonomike. Oerti i kthen idetë ambicioze në arkitekturë të shkallëzueshme, automatizim të menduar mirë dhe eksperienca digjitale me performancë të lartë.',
      skills: ['Next.js', 'React', 'MERN', 'Python', 'AI'],
      image: '/people/oert.webp',
    },
    {
      name: 'Albano Jasharaj',
      role: 'Bashkëthemelues & Drejtor Kreativ',
      specialty: 'Markë & Drejtim Kreativ',
      bio: 'Strateg kreativ që ndërton marka përmes identitetit, motion dhe drejtimit artistik. Albano krijon sisteme vizuale me një këndvështrim të qartë, duke i dhënë çdo eksperience digjitale karakter premium dhe të paharrueshëm.',
      skills: ['Branding', 'UI', 'Motion', 'Identitet', 'Drejtim Artistik'],
      image: '/people/albano.webp',
    },
  ],
};

const peopleCopy = {
  en: {
    eyebrow: 'About Us',
    titleFirst: 'The',
    titleSecond: 'People',
    intro: 'Midnight is built by two founders combining engineering, branding, and digital strategy to create work that is sharp in both thought and execution.',
    founders: '02 Founders',
    location: 'Tirana, Albania',
    reach: 'Working Worldwide',
    portrait: 'Portrait of',
    closingEyebrow: 'Two disciplines. One studio.',
    closingTitle: 'Built Together.',
    closingText: 'Engineering gives ideas structure. Creative direction gives them a point of view. Midnight lives in the overlap.',
  },
  sq: {
    eyebrow: 'Rreth Nesh',
    titleFirst: 'Ekipi',
    titleSecond: 'Midnight',
    intro: 'Midnight është ndërtuar nga dy themelues që bashkojnë inxhinierinë, branding-un dhe strategjinë digjitale për të krijuar punë të mprehtë në ide dhe në realizim.',
    founders: '02 Themelues',
    location: 'Tiranë, Shqipëri',
    reach: 'Punojmë Globalisht',
    portrait: 'Portret i',
    closingEyebrow: 'Dy disiplina. Një studio.',
    closingTitle: 'Ndërtuar Bashkë.',
    closingText: 'Inxhinieria u jep strukturë ideve. Drejtimi kreativ u jep këndvështrim. Midnight jeton aty ku këto dy botë takohen.',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function PeoplePage({ locale = 'en' }: { locale?: Locale }) {
  const team = teamByLocale[locale];
  const copy = peopleCopy[locale];

  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="relative min-h-screen overflow-x-clip px-5 pb-16 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28vw_100%,100%_96px] md:bg-[size:10vw_100%,100%_120px]" />
      </div>

      <section
        className="relative z-10 mx-auto grid max-w-7xl gap-8 border-b border-white/14 pb-10 sm:pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.7fr)] lg:items-end lg:gap-16"
      >
        <div className="min-w-0">
          <p
            style={{ animationDelay: '160ms' }}
            className="page-rise-entry mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#E37D30] sm:text-xs"
          >
            {copy.eyebrow}
          </p>

          <h1
            style={{ animationDelay: '260ms' }}
            className="page-rise-entry w-fit max-w-full pb-[0.08em] pr-[0.08em] text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-normal"
          >
            <span className="block">{copy.titleFirst}</span>
            <span className="block">
              {copy.titleSecond}
              <PageNumber value="04" className="translate-y-2" />
            </span>
          </h1>
        </div>

        <div className="min-w-0 lg:pb-2">
          <p
            style={{ animationDelay: '360ms' }}
            className="page-rise-entry max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg"
          >
            {copy.intro}
          </p>

          <div
            style={{ animationDelay: '460ms' }}
            className="page-rise-entry mt-7 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/14 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/42 sm:grid-cols-3"
          >
            <span>{copy.founders}</span>
            <span>{copy.location}</span>
            <span className="col-span-2 sm:col-span-1">{copy.reach}</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl">
        {team.map((member, index) => {
          const isInitialPortrait = index === 0;
          const imageOrder = index % 2 === 0 ? 'lg:order-1' : 'lg:order-2';
          const contentOrder = index % 2 === 0 ? 'lg:order-2' : 'lg:order-1';

          return (
            <motion.article
              key={member.name}
              variants={isInitialPortrait ? undefined : pageContainer}
              initial={isInitialPortrait ? undefined : 'hidden'}
              whileInView={isInitialPortrait ? undefined : 'show'}
              viewport={isInitialPortrait ? undefined : { once: true, margin: '-12%' }}
              className="grid border-b border-white/14 lg:grid-cols-2"
            >
              <motion.figure
                variants={isInitialPortrait ? undefined : pageRise}
                style={isInitialPortrait ? { animationDelay: '560ms' } : undefined}
                className={`relative aspect-[1296/832] min-w-0 overflow-hidden bg-[#111111] ${isInitialPortrait ? 'page-rise-entry' : ''} ${imageOrder}`}
              >
                <Image
                  src={member.image}
                  alt={`${copy.portrait} ${member.name}`}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 50vw"
                  quality={95}
                  {...(isInitialPortrait
                    ? { preload: true, fetchPriority: 'high' as const }
                    : { loading: 'lazy' as const })}
                  className="object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent lg:hidden" />
                <span className="absolute bottom-4 left-4 font-mono text-[9px] font-black tracking-[0.18em] text-white/70 lg:hidden">
                  0{index + 1}
                </span>
              </motion.figure>

              <motion.div
                variants={pageContainer}
                className={`flex min-w-0 flex-col justify-between px-0 py-8 sm:py-10 lg:min-h-full lg:px-12 lg:py-12 xl:px-16 xl:py-16 ${contentOrder}`}
              >
                <motion.div variants={pageRise}>
                  <div className="flex items-center justify-between gap-6">
                    <span className="font-mono text-[10px] font-black tracking-[0.18em] text-[#E37D30]">
                      0{index + 1}
                    </span>
                    <span className="text-right text-[9px] font-black uppercase tracking-[0.2em] text-white/38 sm:text-[10px]">
                      {member.specialty}
                    </span>
                  </div>

                  <h2 className="mt-10 max-w-[10ch] text-[clamp(2.6rem,6vw,5.6rem)] font-black uppercase leading-[0.86] tracking-normal">
                    {member.name}
                  </h2>

                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                    {member.role}
                  </p>
                </motion.div>

                <motion.div variants={pageRise} className="mt-10 border-t border-white/14 pt-6 lg:mt-16">
                  <p className="max-w-xl text-sm leading-7 text-white/66 sm:text-base sm:leading-8">
                    {member.bio}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-white/14 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/58 sm:tracking-[0.2em]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.article>
          );
        })}
      </section>

      <motion.section
        variants={pageContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="relative z-10 mx-auto grid max-w-7xl gap-8 border-b border-white/14 py-14 sm:py-20 lg:grid-cols-[0.55fr_1fr] lg:items-end lg:gap-16"
      >
        <motion.p
          variants={pageRise}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E37D30]"
        >
          {copy.closingEyebrow}
        </motion.p>

        <motion.div variants={pageContainer}>
          <motion.h2
            variants={pageRise}
            className="max-w-[11ch] text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase leading-[0.84] tracking-normal"
          >
            {copy.closingTitle}
          </motion.h2>
          <motion.p
            variants={pageRise}
            className="mt-6 max-w-2xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8"
          >
            {copy.closingText}
          </motion.p>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
