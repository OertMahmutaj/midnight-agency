'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type WordScrambleTextProps = {
  value: string;
  hoverValue?: string;
  className?: string;
  chars?: string;
  intervalMs?: number;
  steps?: number;
  randomize?: boolean;
  playOnMount?: boolean;
};

// const DEFAULT_CHARS =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-=?';

const DEFAULT_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function WordScrambleText({
  value,
  hoverValue = value,
  className = '',
  chars = DEFAULT_CHARS,
  intervalMs = 40,
  steps,
  randomize = true,
  playOnMount = false,
}: WordScrambleTextProps) {
  const [text, setText] = useState(value);
  const timeoutRef = useRef<number | null>(null);

  const characterPool = useMemo(() => {
    const pool = Array.from(chars);

    return pool.length > 0 ? pool : Array.from(DEFAULT_CHARS);
  }, [chars]);

  const maxLength = Math.max(value.length, hoverValue.length);

  const clearScramble = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const getRandomCharacter = useCallback((index: number) => {
    if (!randomize) {
      return characterPool[index % characterPool.length];
    }

    const randomIndex = Math.floor(Math.random() * characterPool.length);
    return characterPool[randomIndex];
  }, [characterPool, randomize]);

  const scramble = useCallback((nextValue: string) => {
    clearScramble();

    const paddedValue = nextValue.padEnd(maxLength, ' ');
    const totalSteps = Math.max(
      maxLength,
      steps ?? maxLength * 2
    );

    let currentStep = 0;

    const tick = () => {
      const progress = Math.min(currentStep / totalSteps, 1);
      const revealedCharacters = Math.floor(progress * maxLength);

      const scrambledText = Array.from(paddedValue)
        .map((character, index) => {
          if (character === ' ') {
            return ' ';
          }

          if (index < revealedCharacters) {
            return character;
          }

          return getRandomCharacter(index + currentStep);
        })
        .join('');

      setText(scrambledText);

      currentStep += 1;

      if (currentStep <= totalSteps) {
        timeoutRef.current = window.setTimeout(tick, intervalMs);
      } else {
        setText(nextValue);
        timeoutRef.current = null;
      }
    };

    tick();
  }, [clearScramble, getRandomCharacter, intervalMs, maxLength, steps]);

  // useEffect(() => {
  //   setText(value);
  // }, [value]);

  useEffect(() => {
    return clearScramble;
  }, [clearScramble]);

  useEffect(() => {
    if (!playOnMount) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      scramble(hoverValue);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hoverValue, playOnMount, scramble]);

  return (
    <span
      onMouseEnter={() => scramble(hoverValue)}
      onMouseLeave={() => scramble(value)}
      aria-hidden="true"
      className={`relative inline-grid whitespace-nowrap ${className}`}
    >
      {/* Reserves enough width so the navbar does not resize. */}
      <span className="invisible [grid-area:1/1]">
        {value.padEnd(maxLength, ' ')}
      </span>

      <span className="invisible [grid-area:1/1]">
        {hoverValue.padEnd(maxLength, ' ')}
      </span>

      <span className="[grid-area:1/1] whitespace-pre">
        {text.padEnd(maxLength, ' ')}
      </span>
    </span>
  );
}
