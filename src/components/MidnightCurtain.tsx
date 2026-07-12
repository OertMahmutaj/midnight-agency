'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const INTRO_COOKIE = 'midnight_intro_seen';

export default function MidnightCurtain() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.cookie = `${INTRO_COOKIE}=true; path=/; SameSite=Lax`;
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center bg-black"
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      <h1 className="text-6xl font-black text-white">MIDNIGHT</h1>
    </motion.div>
  );
}
