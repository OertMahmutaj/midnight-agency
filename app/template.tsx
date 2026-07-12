'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const smoothEase = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        clipPath: 'inset(18% 0 0 0)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
      }}
      transition={{
        duration: 0.85,
        ease: smoothEase,
      }}
    >
      {children}
    </motion.div>
  );
}
