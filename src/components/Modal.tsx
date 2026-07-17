'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const smoothEase = [0.76, 0, 0.24, 1] as const;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'pokopia';
  logoSrc?: string;
  logoAlt?: string;
  closeLabel?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  title,
  description,
  className = '',
  variant = 'default',
  logoSrc,
  logoAlt = 'Logo',
  closeLabel = 'Close modal',
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[900] overflow-y-auto px-3 py-3 text-white sm:px-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.button
            aria-label={closeLabel}
            className="fixed inset-0 cursor-pointer bg-black/70 backdrop-blur-[1px]"
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="relative z-10 mx-auto flex min-h-full w-full items-center justify-center">
            {variant === 'pokopia' ? (
              <motion.div
                className={`relative w-full max-w-xl overflow-hidden border-[3px] border-white bg-[#E37D30] p-2 shadow-2xl shadow-black/70 sm:p-3 ${className}`}
                initial={{ opacity: 0, y: 36, scale: 0.94, rotate: -2, borderRadius: 32 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, borderRadius: 30 }}
                exit={{ opacity: 0, y: 24, scale: 0.96, rotate: 2, borderRadius: 32 }}
                transition={{ duration: 0.55, ease: smoothEase }}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-30 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[4px] border-white bg-black shadow-2xl shadow-black/40 sm:h-28 sm:w-28"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: [1, 1, 0], scale: [1, 1.12, 0.72] }}
                  transition={{ duration: 0.7, times: [0, 0.5, 1], ease: smoothEase }}
                >
                  {logoSrc ? (
                    <Image src={logoSrc} alt="" width={160} height={40} className="h-auto w-16 sm:w-20" priority />
                  ) : (
                    <span className="text-lg font-black uppercase text-white sm:text-xl">MDNT</span>
                  )}
                </motion.div>

                <button
                  type="button"
                  aria-label={closeLabel}
                  onClick={onClose}
                  className="absolute right-3 top-3 z-40 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-black text-white transition-colors hover:bg-[#E37D30] sm:right-4 sm:top-4"
                >
                  <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
                  <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
                </button>

                <motion.div
                  className="relative z-10 max-h-[calc(100dvh-2.25rem)] overflow-y-auto overscroll-contain rounded-[18px] bg-white text-black sm:max-h-[calc(100dvh-4.5rem)]"
                  initial={{ opacity: 0, clipPath: 'inset(44% 40% 44% 40% round 34px)' }}
                  animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 18px)' }}
                  exit={{ opacity: 0, clipPath: 'inset(44% 40% 44% 40% round 34px)' }}
                  transition={{ delay: 0.18, duration: 0.52, ease: smoothEase }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.48, duration: 0.3, ease: smoothEase }}
                  >
                    {title || description ? (
                      <header className="border-b border-black/10 px-4 pb-5 pt-6 sm:px-6">
                        {logoSrc ? (
                          <span className="mb-5 inline-flex rounded-[2px] bg-black px-3 py-2">
                            <Image src={logoSrc} alt={logoAlt} width={220} height={55} className="h-auto w-20" priority />
                          </span>
                        ) : null}

                        {title ? (
                          <h2 className="max-w-[10ch] text-3xl font-black uppercase leading-[0.82] text-black sm:text-4xl">{title}</h2>
                        ) : null}

                        {description ? (
                          <p className="mt-5 max-w-xl text-sm leading-6 text-black/58">{description}</p>
                        ) : null}
                      </header>
                    ) : null}

                    <div className="px-4 py-5 sm:px-6 sm:py-6">{children}</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className={`relative w-full max-w-2xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain border border-white/12 bg-[#050505] shadow-2xl shadow-black/60 sm:max-h-[calc(100dvh-4rem)] ${className}`}
                initial={{ opacity: 0, y: 48, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.45, ease: smoothEase }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.11]">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:20%_100%,100%_88px]" />
                </div>

                <button
                  type="button"
                  aria-label={closeLabel}
                  onClick={onClose}
                  className="absolute right-3 top-3 z-20 grid h-11 w-11 cursor-pointer place-items-center text-white/60 transition-colors hover:text-white sm:right-5 sm:top-5"
                >
                  <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
                  <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
                </button>

                {title || description ? (
                  <header className="relative z-10 border-b border-white/10 px-5 pb-6 pt-8 sm:px-8">
                    {title ? (
                      <h2 className="max-w-[10ch] pr-10 text-3xl font-black uppercase leading-[0.82] sm:text-5xl">{title}</h2>
                    ) : null}

                    {description ? (
                      <p className="mt-5 max-w-xl text-sm leading-6 text-white/58">{description}</p>
                    ) : null}
                  </header>
                ) : null}

                <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">{children}</div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
