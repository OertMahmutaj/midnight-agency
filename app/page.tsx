'use client';

import { motion } from 'framer-motion';
import MidnightButton from '@/src/components/MidnightButton';
import WordScrambleText from '@/src/components/WordScrambleText';
import { pageContainer, pageRise } from '@/src/lib/pageMotion';

export default function HomePage() {
  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="flex min-h-[72svh] items-start overflow-x-clip px-5 pb-16 pt-48 sm:min-h-[100svh] sm:items-center sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16"
    >
      <motion.div variants={pageContainer} className="mx-auto w-full max-w-7xl">
        <motion.div variants={pageContainer} className="max-w-5xl">
          <motion.h1
            variants={pageRise}
            className="max-w-[15ch] text-[clamp(2.75rem,12vw,8rem)] font-black uppercase leading-[0.88] tracking-[-0.045em] sm:leading-[0.86]"
          >
            The road to{' '}
            <WordScrambleText
              value="SUCCESS"
              hoverValue="GREATNESS"
              className="inline-grid cursor-pointer normal-case text-[#E37D30]"
            />{' '}
            starts with being{' '}
            <WordScrambleText
              value="BOLD"
              hoverValue="BRAVE"
              className="inline-grid cursor-pointer normal-case text-[#E37D30]"
            />
          </motion.h1>

          <motion.div
            variants={pageRise}
            className="mt-8 w-full max-w-[19rem] overflow-visible px-2 py-2 sm:mt-10 sm:px-0"
          >
            <MidnightButton href="/work">View Our Work</MidnightButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
