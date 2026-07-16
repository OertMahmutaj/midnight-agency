'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  INTRO_COMPLETE_EVENT,
  INTRO_COOKIE,
  INTRO_COOKIE_VERSION,
} from '@/src/lib/introCookie';

export default function MidnightCurtain() {
  const [isVisible, setIsVisible] = useState(true);

  const finishIntro = useCallback(() => {
    document.cookie = `${INTRO_COOKIE}=${INTRO_COOKIE_VERSION}; path=/; SameSite=Lax`;
    window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
    setIsVisible(false);
  }, []);

  useEffect(() => {
    /*
     * Safety fallback:
     * guarantees the curtain disappears even if the mobile
     * browser interrupts the animation.
     */
    const fallbackTimer = window.setTimeout(finishIntro, 1800);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [finishIntro]);

  if (!isVisible) {
    return null;
  }

  return (
    <div aria-hidden="true" className="midnight-curtain">
      <div
        className="midnight-curtain-panel"
        onAnimationEnd={(event) => {
          if (event.animationName === 'midnight-curtain-wipe') {
            finishIntro();
          }
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-black uppercase tracking-normal text-white sm:text-7xl lg:text-8xl">
            MIDNIGHT
          </h1>
        </div>
      </div>
    </div>
  );
}
