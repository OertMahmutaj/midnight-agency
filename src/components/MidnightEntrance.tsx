'use client';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

export default function MidnightEntrance({ onComplete }: { onComplete: () => void }) {
  const [clicked, setClicked] = useState(false);

  const ROTATION_ANGLE = 240;

  // 1. New: Variant for the background container to fade out
  const containerVariants: Variants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" } 
    }
  };

  const letterVariants: Variants = {
    initial: { y: 0, opacity: 1, rotate: 0 },
    exit: (i: number) => ({
      y: i % 2 === 0 ? -1000 : 1000,
      opacity: 0,
      rotate: i % 2 === 0 ? ROTATION_ANGLE : -ROTATION_ANGLE,
      transition: { duration: 0.8, delay: i * 0.05, ease: "easeInOut" }
    })
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(onComplete, 1200);
  };

  return (
    <motion.div
  // bg-[#2A201A] (deep dark coffee) + text-white
  className="fixed inset-0 z-50 flex items-center justify-center text-white cursor-pointer"
  onClick={handleClick}
  variants={containerVariants}
  initial="initial"
  animate={clicked ? "exit" : "initial"}
>
  <div className="flex font-mono text-7xl md:text-9xl font-black uppercase tracking-tighter">
    {"CLICK".split("").map((letter, i) => (
      <motion.span 
        key={i} 
        custom={i}
        variants={letterVariants}
        className="inline-block"
      >
        {letter}
      </motion.span>
    ))}
  </div>
</motion.div>
  );
}