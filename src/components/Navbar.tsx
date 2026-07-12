'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import NavScramble from '@/src/components/NavScramble';
// import WordScrambleText from '@/src/components/WordScrambleText';

const menuDots = [
  {
    closedX: -9,
    closedY: -9,
    openX: -4.5,
    openY: -4.5,
    rotate: 45,
  },
  {
    closedX: 9,
    closedY: -9,
    openX: 4.5,
    openY: -4.5,
    rotate: -45,
  },
  {
    closedX: -9,
    closedY: 9,
    openX: -4.5,
    openY: 4.5,
    rotate: -45,
  },
  {
    closedX: 9,
    closedY: 9,
    openX: 4.5,
    openY: 4.5,
    rotate: 45,
  },
];

const menuEase = [0.76, 0, 0.24, 1] as const;

// const menuTransition = {
//   duration: 0.38,
//   ease: [0.76, 0, 0.24, 1] as const,
// };

const navLinks = [
  {
    label: 'Work',
    href: '/work',
    words: ['▩◆▣●', '◈⋮□✦', '▩◉◇⌗'],
  },
  {
    label: 'Services',
    href: '/services',
    words: ['▣◆◉⋮□✦▪◇', '⧈♠▩●⌗◈▲◎', '▢✶◆⋯◉□✦▣'],
  },
  {
    label: 'People',
    href: '/people',
    words: ['?◆◈⨳▣✦', '⧉⋮□♠◎▩', '⌬◇✶▪▲◉'],
  },
  {
    label: 'Contact',
    href: '/contact',
    words: ['▣◆◉⋮□✦▪', '⧈♠▩●⌗◈▲', '▢✶◆⋯◉□✦'],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-[150] w-full px-8 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          aria-label="Midnight home"
          className="relative z-[201] inline-flex shrink-0 items-center"
        >
          <Image
            src="/logo/MDNT-ICON-WHITE.png"
            alt="Midnight"
            width={5010}
            height={1240}
            priority
            className="h-auto w-[clamp(7.5rem,18vw,11rem)]"
          />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="relative z-[200] grid h-14 w-14 cursor-pointer place-items-center md:hidden"
        >
          <motion.span
            className="relative block h-12 w-12"
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
                      width: [7, 21, 14],
                      height: [7, 6, 6],
                      borderRadius: [999, 999, 999],
                    }
                    : {
                      x: [dot.openX, dot.closedX, dot.closedX],
                      y: [dot.openY, dot.closedY, dot.closedY],
                      rotate: [dot.rotate, dot.rotate, 0],
                      width: [14, 21, 7],
                      height: [6, 6, 7],
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

            {/* Static center dot */}
            {/* <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            /> */}
          </motion.span>
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-widest md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="inline-flex cursor-pointer transition-colors hover:text-[#E37D30]"
            >
              <NavScramble
                value={label}
                hoverValue={label.toUpperCase()}
                frames={90}
                className="inline-grid whitespace-nowrap"
              />
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
            }}
            animate={{
              opacity: 1,
              backdropFilter: 'blur(30px)',
            }}
            exit={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
            }}
            className="pointer-events-none fixed inset-0 z-[80]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="absolute left-0 top-full z-[90] flex w-full flex-col items-center justify-center overflow-hidden bg-transparent"
          >
            <div className="flex flex-col items-center gap-8 text-3xl font-black uppercase">
              {navLinks.map(({ label, href }, index) => (
                <motion.div
                  key={href}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2 + index * 0.06,
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer transition-colors hover:text-[#E37D30]"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}