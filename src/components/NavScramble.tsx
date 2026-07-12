'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type NavScrambleProps = {
  value: string;
  hoverValue?: string;
  className?: string;
  chars?: string;
  frames?: number;
  scrambleEvery?: number;
};

const DEFAULT_CHARS =
  '⌬?⎔⏣⧈⧉!⧫⟁⟐⟡⟢⟣⟤⟥⟰⟱⟲⟴⊛⊙⊚⊞⊟⊠⋇⋈⋉⋊⋮⌁⌗⌖⌘⌑⍟⎊⎋⎌⎍▣▤▥▦▧▨▩';

export default function NavScramble({
  value,
  hoverValue = value,
  className = '',
  chars = DEFAULT_CHARS,
  frames = 90,
  scrambleEvery = 10,
}: NavScrambleProps) {
  const [text, setText] = useState(value);
  const animationFrameRef = useRef<number | null>(null);

  const characterPool = useMemo(() => {
    const characters = Array.from(chars);

    return characters.length > 0
      ? characters
      : Array.from(DEFAULT_CHARS);
  }, [chars]);

  function stopAnimation() {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  function getRandomCharacter() {
    const randomIndex = Math.floor(
      Math.random() * characterPool.length
    );

    return characterPool[randomIndex];
  }

  function scramble(nextValue: string) {
    stopAnimation();

    const maximumLength = Math.max(
      value.length,
      hoverValue.length,
      nextValue.length
    );

    const paddedValue = nextValue.padEnd(maximumLength, ' ');
    const refreshRate = Math.max(
      1,
      Math.round(scrambleEvery)
    );

    let currentFrame = 0;
    let randomCharacters = Array.from(
      { length: maximumLength },
      getRandomCharacter
    );

    const tick = () => {
      if (currentFrame >= frames) {
        setText(nextValue);
        animationFrameRef.current = null;
        return;
      }

      if (currentFrame % refreshRate === 0) {
        randomCharacters = Array.from(
          { length: maximumLength },
          getRandomCharacter
        );
      }

      const scrambledText = Array.from(paddedValue)
        .map((character, index) => {
          if (character === ' ') {
            return ' ';
          }

          return randomCharacters[index];
        })
        .join('');

      setText(scrambledText);
      currentFrame += 1;

      animationFrameRef.current =
        requestAnimationFrame(tick);
    };

    tick();
  }

  // useEffect(() => {
  //   setText(value);
  // }, [value]);

  useEffect(() => {
    return stopAnimation;
  }, []);

  return (
    <span
      className={`relative inline-grid whitespace-nowrap ${className}`}
      onMouseEnter={() => scramble(hoverValue)}
      onMouseLeave={() => scramble(value)}
      aria-hidden="true"
    >
      {/* These invisible elements permanently reserve the link width. */}
      <span
        className="invisible [grid-area:1/1]"
        aria-hidden="true"
      >
        {value}
      </span>

      <span
        className="invisible [grid-area:1/1]"
        aria-hidden="true"
      >
        {hoverValue}
      </span>

      {/* Absolute positioning prevents symbols from resizing the navbar. */}
      <span
        className="absolute inset-0 whitespace-nowrap"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}