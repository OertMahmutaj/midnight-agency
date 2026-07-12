'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const INTRO_COOKIE = 'midnight_intro_seen';

export default function MidnightCurtain() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.cookie = `${INTRO_COOKIE}=true; path=/; SameSite=Lax`;
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] h-[100dvh] overflow-hidden bg-black"
      initial={{ x: '0%' }}
      animate={{ x: '-100%' }}
      exit={{ x: '-100%' }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 1.05,
        delay: shouldReduceMotion ? 0 : 0.3,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{
        width: 'calc(100vw + 22vh)',
        clipPath:
          'polygon(0 0, calc(100% - 22vh) 0, 100% 100%, 0 100%)',
        willChange: 'transform',
      }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      <div className="absolute inset-y-0 left-0 flex w-screen items-center justify-center">
        <h1 className="text-5xl font-black uppercase tracking-normal text-white sm:text-7xl lg:text-8xl">
          MIDNIGHT
        </h1>
      </div>
    </motion.div>
  );
}
