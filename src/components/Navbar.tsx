'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* 1. Navbar is now forced solid black */
    <nav className="fixed top-0 left-0 w-full z-[150] px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 2. Updated Branding */}
        <Link href="/" className="text-xl font-black uppercase tracking-tighter">
          MIDNIGHT
        </Link>

        {/* 3. Hamburger Button - z-index ensures it stays above the overlay */}
        <button
          className="md:hidden z-[200] relative w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
            className="w-6 h-0.5 bg-white absolute"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-white absolute"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
            className="w-6 h-0.5 bg-white absolute"
          />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 uppercase text-sm tracking-widest font-bold">
          {['Work', 'Services', 'People', 'Contact'].map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="hover:text-[#E37D30] transition-colors">
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Full-screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[80] pointer-events-none" // z-80 puts it behind the menu but over the page
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 z-[90] w-full bg-transparent overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 text-3xl font-black uppercase">
              {['Work', 'Services', 'People', 'Contact'].map((link) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href={`/${link.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#E37D30] transition-colors"
                  >
                    {link}
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