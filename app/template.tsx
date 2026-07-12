'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { pageRise } from '@/src/lib/pageMotion';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageRise}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}
