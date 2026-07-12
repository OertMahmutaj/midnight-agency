'use client';

import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollToTopButton() {
  const shouldReduceMotion = useReducedMotion();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: 0.65 }}
      className="fixed bottom-5 right-5 z-[140] grid h-12 w-12 cursor-pointer place-items-center rounded-[2px] border border-white/28 bg-black/85 text-white shadow-lg shadow-black/35 backdrop-blur-md transition-colors hover:border-[#E37D30] hover:text-[#E37D30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E37D30] sm:bottom-7 sm:right-7"
    >
      <ArrowUp aria-hidden="true" size={20} strokeWidth={1.8} />
    </motion.button>
  );
}
