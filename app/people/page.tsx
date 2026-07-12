'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageContainer, pageRise, smoothEase } from '@/src/lib/pageMotion';

const team = [
  {
    name: "Oert Mahmutaj",
    role: "Co-Founder & Lead Developer",
    bio: "Analytical developer with a background in Physics and Economic Informatics. Focused on scalable architecture, automation and high-performance web experiences.",
    skills: ["Next.js", "React", "MERN", "Python", "AI"],
  },
  {
    name: "Albano Jasharaj",
    role: "Co-Founder & Creative Director",
    bio: "Creative strategist focused on branding, identity systems, motion and digital experiences that feel premium and memorable.",
    skills: ["Branding", "UI", "Motion", "Identity", "Art Direction"],
  },
];

export default function PeoplePage() {
  const [active, setActive] = useState(0);

  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="min-h-screen px-6 lg:px-16 pt-32 pb-20 text-white"
    >
      <motion.section
        variants={pageContainer}
        className="mx-auto max-w-7xl grid gap-12 lg:gap-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <motion.div variants={pageContainer} className="lg:sticky lg:top-32 lg:self-start">
          <motion.p variants={pageRise} className="text-xs font-black tracking-[0.35em] uppercase text-[#E37D30] mb-5">
            About Us
          </motion.p>

          <motion.h1 variants={pageRise} className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.78] font-black uppercase">
            The<br />People
          </motion.h1>

          <motion.p variants={pageRise} className="mt-8 max-w-md text-white/60 leading-7 text-base lg:text-lg">
            Midnight Coffee is built by two founders combining engineering, 
            branding and digital strategy to create products that stand out.
          </motion.p>

          <motion.div variants={pageContainer} className="mt-14 space-y-6">
            {team.map((member, index) => (
              <motion.button
                key={member.name}
                variants={pageRise}
                type="button"
                onClick={() => setActive(index)}
                className={`group flex items-center gap-5 text-left transition-all duration-300 cursor-pointer w-full ${
                  active === index ? "text-white" : "text-white/35"
                }`}
              >
                <span className="font-black text-[#E37D30] text-lg">0{index + 1}</span>
                <div>
                  <h3 className="font-black uppercase tracking-wide text-lg">{member.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em]">{member.role}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={pageRise} className="relative">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: smoothEase }}
            className="border border-white/10 bg-black/40 backdrop-blur-md p-6 lg:p-10"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[#E37D30] text-sm font-black">0{active + 1}</span>
                <h2 className="mt-2 text-3xl lg:text-5xl font-black uppercase leading-none">
                  {team[active].name}
                </h2>
                <p className="mt-3 uppercase tracking-[0.2em] text-[10px] text-white/45">
                  {team[active].role}
                </p>
              </div>

              <div className="h-16 w-16 lg:h-28 lg:w-28 border border-white/10 bg-white/5 flex items-center justify-center text-xl lg:text-3xl font-black text-[#E37D30] shrink-0">
                {team[active].name.split(' ').map(x => x[0]).join('')}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-white/65 leading-7 text-base lg:text-lg">
                {team[active].bio}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {team[active].skills.map(skill => (
                  <span key={skill} className="border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em]">
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
