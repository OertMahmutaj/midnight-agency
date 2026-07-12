import type { Variants } from 'framer-motion';

export const smoothEase = [0.76, 0, 0.24, 1] as const;

export const pageContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.16,
    },
  },
};

export const pageRise: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    clipPath: 'inset(18% 0 0 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

export const headingRise = pageRise;
