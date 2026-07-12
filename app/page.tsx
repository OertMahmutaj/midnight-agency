'use client';
import { motion } from 'framer-motion';
import MidnightButton from '@/src/components/MidnightButton';
import WordScrambleText from '@/src/components/WordScrambleText';
import { pageContainer, pageRise } from '@/src/lib/pageMotion';

export default function HomePage() {
  // const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  return (
    <>
      {/* {!isAnimationComplete && (
        <MidnightEntrance onComplete={() => setIsAnimationComplete(true)} />
      )} */}

      {/* The rest of your content that only shows after animation */}
      <motion.main
        variants={pageContainer}
        initial="hidden"
        animate="show"
        className="pt-32 px-8 md:px-24 flex flex-col justify-center min-h-[80vh]"
      >
        <motion.div variants={pageContainer} className="max-w-4xl">
          <motion.h1 variants={pageRise} className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
            The road to {" "}
            <WordScrambleText
              value="SUCCESS"
              hoverValue="GREATNESS"
              // steps={5}
              className="inline-block cursor-pointer text-[#E37D30] normal-case"
            /> starts with being{" "}
            <WordScrambleText
              value="BOLD"
              hoverValue="BRAVE"
              className="inline-block cursor-pointer text-[#E37D30] normal-case"
            />
          </motion.h1>
          <motion.div variants={pageRise} className="flex w-full max-w-[19rem] overflow-visible px-3 py-3 sm:px-0">
            <MidnightButton href="/work">
              View Our Work
            </MidnightButton>
          </motion.div>
        </motion.div>
      </motion.main>
    </>
  );
}
