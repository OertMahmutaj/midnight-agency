'use client';

import { motion } from 'framer-motion';

import MidnightButton from '@/src/components/MidnightButton';
import WordScrambleText from '@/src/components/WordScrambleText';
import CrtCommandInput from '@/src/components/CrtCommandInput';
import {
  pageContainer,
  pageRise,
} from '@/src/lib/pageMotion';

export default function HomePage() {
  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-x-hidden
        bg-[#020708]
        pt-24
        sm:pt-28
        md:pt-24
      "
    >
      {/* Background video and CRT interaction layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="
            absolute
            right-0
            top-1/2
            aspect-[1672/941]
            h-[max(100%,56.28vw)]
            -translate-y-1/2
          "
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/midnight-hero.png"
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
              object-fill
            "
          >
            <source
              src="/videos/midnight-hero.mp4"
              type="video/mp4"
            />
          </video>

          {/* Desktop terminal positioned over the CRT */}
          <div
            className="
              absolute
              left-[69.7%]
              top-[28.2%]
              hidden
              h-[21.3%]
              w-[16.1%]
              min-[1100px]:block
            "
          >
            <CrtCommandInput variant="screen" />
          </div>
        </div>
      </div>

      {/* Text-readability overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_38%,rgba(0,0,0,0.08)_72%)]
        "
      />

      {/* Main hero content */}
      <motion.div
        variants={pageContainer}
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100svh_-_6rem)]
          w-full
          max-w-7xl
          items-start
          px-5
          pb-14
          pt-10

          sm:min-h-[calc(100svh_-_7rem)]
          sm:px-8
          sm:pb-20
          sm:pt-12

          md:min-h-[calc(100svh_-_6rem)]
          md:px-10

          min-[1100px]:items-center
          min-[1100px]:py-12

          lg:px-16
        "
      >
        <motion.div
          variants={pageContainer}
          className="w-full max-w-5xl"
        >
          <motion.h1
            variants={pageRise}
            className="
              max-w-[15ch]
              text-[clamp(2.75rem,12vw,8rem)]
              font-black
              uppercase
              leading-[0.88]
              tracking-[-0.045em]
              sm:leading-[0.86]
            "
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
            className="
              mt-8
              w-full
              max-w-[19rem]
              overflow-visible
              px-2
              py-2
              sm:mt-10
              sm:px-0
            "
          >
            <MidnightButton href="/work">
              View Our Work
            </MidnightButton>
          </motion.div>

          {/* Mobile/tablet terminal */}
          <motion.div
            variants={pageRise}
            className="mt-8 min-[1100px]:hidden"
          >
            <CrtCommandInput variant="mobile" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}