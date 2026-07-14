'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
// import NavScramble from '@/src/components/NavScramble';
import WordScrambleText from '@/src/components/WordScrambleText';

const menuDots = [
  { closedX: -9, closedY: -9, openX: -4.5, openY: -4.5, rotate: 45 },
  { closedX: 9, closedY: -9, openX: 4.5, openY: -4.5, rotate: -45 },
  { closedX: -9, closedY: 9, openX: -4.5, openY: 4.5, rotate: -45 },
  { closedX: 9, closedY: 9, openX: 4.5, openY: 4.5, rotate: 45 },
];

const menuEase = [0.76, 0, 0.24, 1] as const;

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'People', href: '/people' },
  { label: 'Contact', href: '/contact' },
];

const mobileNavLinks = [{ label: 'Home', href: '/' }, ...navLinks];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <nav className="fixed left-0 top-0 z-[150] w-full border-b border-white/10 bg-black/30 px-5 py-4 shadow-lg backdrop-blur-md sm:px-8 sm:py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          aria-label="Midnight home"
          onClick={() => setIsOpen(false)}
          className="relative z-[201] inline-flex shrink-0 items-center"
        >
          <Image
            src="/logo/MDNT-ICON-WHITE.png"
            alt="Midnight"
            width={5010}
            height={1240}
            priority
            className="h-auto w-[clamp(7.25rem,34vw,11rem)] sm:w-[clamp(8rem,22vw,11rem)]"
          />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="relative z-[202] -mr-2 grid h-16 w-16 cursor-pointer place-items-center md:hidden"
        >
          <motion.span
            className="relative block h-14 w-14"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            {menuDots.map((dot, index) => (
              <motion.span
                key={index}
                className="absolute left-1/2 top-1/2 block bg-white"
                initial={false}
                animate={
                  isOpen
                    ? {
                        x: [dot.closedX, dot.closedX, dot.openX],
                        y: [dot.closedY, dot.closedY, dot.openY],
                        rotate: [0, dot.rotate, dot.rotate],
                        width: [7, 22, 16],
                        height: [7, 4, 4],
                        borderRadius: [999, 999, 999],
                      }
                    : {
                        x: [dot.openX, dot.closedX, dot.closedX],
                        y: [dot.openY, dot.closedY, dot.closedY],
                        rotate: [dot.rotate, dot.rotate, 0],
                        width: [16, 22, 7],
                        height: [4, 4, 7],
                        borderRadius: [999, 999, 999],
                      }
                }
                transition={{
                  duration: 0.42,
                  times: [0, 0.52, 1],
                  ease: menuEase,
                }}
                style={{
                  translateX: '-50%',
                  translateY: '-50%',
                }}
              />
            ))}
          </motion.span>
        </button>

        <div className="hidden items-center gap-6 text-sm font-bold uppercase tracking-widest md:flex lg:gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="inline-flex cursor-pointer transition-colors hover:text-[#E37D30]"
            >
              <WordScrambleText
                value={label}
                hoverValue={label.toUpperCase()}
                // frames={30}
                className="inline-grid whitespace-nowrap"
              />
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[180] min-h-dvh overflow-y-auto bg-black text-white md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 cursor-default"
            />

            <div className="relative z-10 min-h-dvh px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
              <div className="mx-auto w-full max-w-2xl border-t border-white/35">
                {mobileNavLinks.map(({ label, href }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{
                      delay: 0.08 + index * 0.055,
                      duration: 0.4,
                      ease: menuEase,
                    }}
                    className="border-b border-white/35"
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="font-k2d flex min-h-[4.75rem] cursor-pointer items-center justify-between gap-5 py-4 text-5xl font-black uppercase leading-none tracking-normal transition-colors hover:text-[#E37D30] sm:min-h-[5.75rem] sm:text-6xl"
                      style={{
                        fontFamily:
                          '"K2D ExtraBold", Arial, Helvetica, sans-serif',
                      }}
                    >
                      <span>{label}</span>
                      <span className="font-mono text-[10px] font-black tracking-[0.18em] text-white/38">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.08 + mobileNavLinks.length * 0.055,
                    duration: 0.4,
                    ease: menuEase,
                  }}
                  className="flex items-center justify-between gap-5 pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-white/38"
                >
                  <span>Midnight Agency</span>
                  <span>Tirana, Albania</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
