'use client';

import { motion } from 'framer-motion';

export default function MidnightCurtain() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <h1 className="text-6xl font-black text-white">MIDNIGHT</h1>
    </motion.div>
  );
}