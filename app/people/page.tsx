'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageNumber from '@/src/components/PageNumber';
import {
  pageContainer,
  pageRise,
  headingRise,
  smoothEase,
} from '@/src/lib/pageMotion';

const team = [
  {
    name: 'Oert Mahmutaj',
    role: 'Co-Founder & Lead Developer',
    bio: 'Analytical developer with a background in Physics and Economic Informatics. Focused on scalable architecture, automation and high-performance web experiences.',
    skills: ['Next.js', 'React', 'MERN', 'Python', 'AI'],
  },
  {
    name: 'Albano Jasharaj',
    role: 'Co-Founder & Creative Director',
    bio: 'Creative strategist focused on branding, identity systems, motion and digital experiences that feel premium and memorable.',
    skills: ['Branding', 'UI', 'Motion', 'Identity', 'Art Direction'],
  },
];

export default function PeoplePage() {
  const [active, setActive] = useState(0);

  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="min-h-screen overflow-x-clip px-5 pb-16 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16"
    >
      <motion.section
        variants={pageContainer}
        className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:gap-20"
      >
        <motion.div variants={pageContainer} className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <motion.p variants={pageRise} className="mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#E37D30] sm:text-xs">
            About Us
          </motion.p>

          <motion.h1
            variants={headingRise}
            className="w-fit max-w-full pb-[0.08em] pr-[0.08em] text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.04em]"
          >
            <span className="block">The</span>
            <span className="block">
              People<PageNumber value="04" className="translate-y-2" />
            </span>
          </motion.h1>

          <motion.p variants={pageRise} className="mt-7 max-w-md text-sm leading-7 text-white/60 sm:mt-8 sm:text-base lg:text-lg">
            Midnight Coffee is built by two founders combining engineering, branding and digital strategy to create products that stand out.
          </motion.p>

          <motion.div variants={pageContainer} className="mt-10 space-y-4 sm:mt-14 sm:space-y-6">
            {team.map((member, index) => (
              <motion.button
                key={member.name}
                variants={pageRise}
                type="button"
                onClick={() => setActive(index)}
                className={`group flex w-full min-w-0 cursor-pointer items-center gap-4 text-left transition-all duration-50 sm:gap-5 ${active === index ? 'text-white' : 'text-white/35'
                  }`}
              >
                <span className="shrink-0 text-base font-black text-[#E37D30] sm:text-lg">0{index + 1}</span>
                <div className="min-w-0">
                  <h3 className="break-words text-base font-black uppercase tracking-wide sm:text-lg">{member.name}</h3>
                  <p className="break-words text-[9px] uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em]">{member.role}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={pageRise} className="relative min-w-0">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="min-w-0 border border-white/10 bg-black/40 p-5 backdrop-blur-md sm:p-6 lg:p-10"
          >
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <span className="text-sm font-black text-[#E37D30]">0{active + 1}</span>
                <h2 className="mt-2 break-words text-3xl font-black uppercase leading-none sm:text-4xl lg:text-5xl">
                  {team[active].name}
                </h2>
                <p className="mt-3 break-words text-[9px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-[0.2em]">
                  {team[active].role}
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-white/10 bg-white/5 text-xl font-black text-[#E37D30] lg:h-28 lg:w-28 lg:text-3xl">
                {team[active].name.split(' ').map((part) => part[0]).join('')}
              </div>
            </div>

            <div className="mt-7 border-t border-white/10 pt-7 sm:mt-8 sm:pt-8">
              <p className="text-sm leading-7 text-white/65 sm:text-base lg:text-lg">{team[active].bio}</p>
              <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
                {team[active].skills.map((skill) => (
                  <span key={skill} className="border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
