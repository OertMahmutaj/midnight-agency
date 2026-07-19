'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AnimatePresence,
  animate,
  motion,
  type MotionValue,
  type PanInfo,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import WordScrambleText from '@/src/components/WordScrambleText';
import PageNumber from '@/src/components/PageNumber';
import { getCarouselItems, getWorks, type WorkItem } from '@/src/data/works';
import { withLocale, type Locale } from '@/src/lib/i18n';
import { pageContainer, pageRise } from '@/src/lib/pageMotion';


const NAVBAR_HEIGHT = 96;
// Higher values place more cards on the same curve, making the stack tighter.
const VISIBLE_PLANE_COUNT = 18;
const PATH_SPAN = VISIBLE_PLANE_COUNT;

const DRAG_SENSITIVITY = 0.005;
const WHEEL_SENSITIVITY = 0.00165;
const INERTIA_STRENGTH = 0.00046;

const MOBILE_DRAG_SENSITIVITY = 0.01;
const MOBILE_WHEEL_SENSITIVITY = 0.0032;
const MOBILE_INERTIA_STRENGTH = 0.00072;

const CARD_MIN_WIDTH = 148;
const CARD_FLUID_WIDTH = 0.097;
const CARD_MAX_WIDTH = 188;
const CARD_HEIGHT_RATIO = 1801 / 1201;
const CARD_EDGE_PADDING = 24;
const STACK_CURVE_POWER = 1.35;
const CAROUSEL_Y_OFFSET = 55;
const CAROUSEL_X_OFFSET_RATIO = 0.21;
const CAROUSEL_X_OFFSET_MIN = 180;
const CAROUSEL_X_OFFSET_MAX = 360;
const CARD_HOVER_LIFT = 132;
const NUMBER_X_OFFSET = -48;
const TITLE_X_GAP = 40;
const NUMBER_REVEAL_POSITION = 0.69;
const NUMBER_REVEAL_FADE = 20;
const CARD_IMAGE_SIZES = '(max-width: 639px) 30vw, (max-width: 1023px) 20vw, 220px';
const INITIAL_LCP_PLANE_INDEX = 6;

function getPathSpan(width: number) {
  if (width < 640) return 10;
  if (width < 1024) return 14;

  return PATH_SPAN;
}

function getCardWidth(width: number) {
  if (width < 640) return Math.round(clamp(width * 0.36, 116, 150));
  if (width < 1024) return Math.round(clamp(width * 0.24, 150, 184));

  return Math.round(
    clamp(width * CARD_FLUID_WIDTH, CARD_MIN_WIDTH, CARD_MAX_WIDTH)
  );
}

const galleryCopy = {
  en: {
    selected: 'Selected work',
    description: 'Identity systems built to stay clear, coherent, and hard to forget across every touchpoint.',
    tags: ['Strategy', 'Identity', 'Digital'],
    headingFirst: 'Bold Builds',
    headingSecond: 'Brands.',
    drag: 'Drag to surf',
    view: 'View',
  },
  sq: {
    selected: 'Punë të përzgjedhura',
    description: 'Sisteme identiteti të krijuara për të mbetur të qarta, koherente dhe të paharrueshme në çdo pikë kontakti.',
    tags: ['Strategji', 'Identitet', 'Digjital'],
    headingFirst: 'Krijojmë Marka',
    headingSecond: 'Të Guximshme.',
    drag: 'Tërhiq për të shfletuar',
    view: 'Shiko',
  },
} satisfies Record<Locale, {
  selected: string;
  description: string;
  tags: string[];
  headingFirst: string;
  headingSecond: string;
  drag: string;
  view: string;
}>;

function SelectedWorkIntro({
  compact = false,
  locale,
  workCount,
}: {
  compact?: boolean;
  locale: Locale;
  workCount: number;
}) {
  const copy = galleryCopy[locale];

  return (
    <>
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#E37D30]">
        {copy.selected} / 01-{String(workCount).padStart(2, '0')}
      </p>

      <p
        className={
          compact
            ? 'mt-4 max-w-sm text-sm leading-6 text-white/68'
            : 'mt-5 text-xl leading-8 text-white/68 xl:text-2xl xl:leading-9'
        }
      >
        {copy.description}
      </p>

      <div
        className={`flex flex-wrap gap-x-6 gap-y-2 border-t border-white/14 font-mono text-[9px] uppercase tracking-[0.18em] text-white/38 ${compact ? 'mt-4 pt-3' : 'mt-8 pt-4'
          }`}
      >
        {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </>
  );
}

function subscribeToHydration() {
  return () => { };
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;

  return ((((value - min) % range) + range) % range) + min;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function cubicBezier(
  start: number,
  controlOne: number,
  controlTwo: number,
  end: number,
  progress: number
) {
  const inverse = 1 - progress;

  return (
    inverse ** 3 * start +
    3 * inverse ** 2 * progress * controlOne +
    3 * inverse * progress ** 2 * controlTwo +
    progress ** 3 * end
  );
}

function projectOntoPath(x: number, y: number) {
  return (-x + y) / Math.SQRT2;
}

function getCompactGestureMovement(
  horizontal: number,
  vertical: number,
) {
  /*
   * Swipe down or swipe left:
   * cards move right → left.
   *
   * Swipe up or swipe right:
   * cards move left → right.
   */
  return Math.abs(vertical) >= Math.abs(horizontal)
    ? vertical
    : -horizontal;
}

function distributeTowardEdges(progress: number) {
  const fromStart = Math.pow(progress, STACK_CURVE_POWER);
  const fromEnd = Math.pow(1 - progress, STACK_CURVE_POWER);

  return fromStart / (fromStart + fromEnd);
}

type PlaneProps = {
  index: number;
  totalCount: number;
  work: WorkItem;
  isHovered: boolean;
  onHoverChange: (index: number | null) => void;
  travel: MotionValue<number>;
  stageWidth: MotionValue<number>;
  stageHeight: MotionValue<number>;
  locale: Locale;
};

function Plane({
  index,
  totalCount,
  work,
  isHovered,
  onHoverChange,
  travel,
  stageWidth,
  stageHeight,
  locale,
}: PlaneProps) {
  const copy = galleryCopy[locale];
  const caseStudyHref = withLocale(`/work/${work.slug}`, locale);
  const phase = useTransform(travel, (latestTravel) =>
    wrap(0, totalCount, index + latestTravel)
  );

  const progress = useTransform([phase, stageWidth], ([latestPhase, width]) =>
    clamp(Number(latestPhase) / getPathSpan(Number(width)), 0, 1)
  );
  const pathProgress = useTransform(progress, distributeTowardEdges);

  const cardWidth = useTransform(stageWidth, getCardWidth);
  const cardHeight = useTransform(
    cardWidth,
    (latestWidth) => latestWidth * CARD_HEIGHT_RATIO
  );

  const x = useTransform(
    [pathProgress, stageWidth, cardWidth],
    ([latestProgress, latestWidth, latestCardWidth]) => {
      const progressValue = Number(latestProgress);
      const width = Number(latestWidth);
      const currentCardWidth = Number(latestCardWidth);

      if (width < 1024) {
        const rightBiasStrength = width < 640 ? 0.32 : 0.24;
        const rightBias =
          Math.sin(progressValue * Math.PI) * width * rightBiasStrength;

        return (
          cubicBezier(
            width + currentCardWidth * 0.15,
            width * 0.76,
            width * 0.18 - currentCardWidth * 0.7,
            -currentCardWidth * 1.3,
            progressValue
          ) + rightBias
        );
      }

      const horizontalOffset = clamp(
        width * CAROUSEL_X_OFFSET_RATIO,
        CAROUSEL_X_OFFSET_MIN,
        CAROUSEL_X_OFFSET_MAX
      );

      return (
        cubicBezier(
          width - currentCardWidth * 0.3,
          width * 0.82,
          width * 0.48,
          width * 0.25,
          progressValue
        ) + horizontalOffset
      );
    }
  );

  const y = useTransform(
    [pathProgress, stageHeight, stageWidth],
    ([latestProgress, latestHeight, latestWidth]) => {
      const progressValue = Number(latestProgress);
      const height = Number(latestHeight);
      const width = Number(latestWidth);
      const edgeY = height + CARD_EDGE_PADDING;
      const centerY = width < 640
        ? Math.max(290, height * 0.42)
        : width < 1024
          ? Math.max(320, height * 0.44)
          : Math.max(32, height * 0.18) + CAROUSEL_Y_OFFSET;
      const arch = Math.pow(
        Math.max(0, Math.sin(progressValue * Math.PI)),
        0.92
      );

      return edgeY - (edgeY - centerY) * arch;
    }
  );

  const rotateY = useTransform(
    [pathProgress, stageWidth],
    ([latestProgress, latestWidth]) => {
      const width = Number(latestWidth);
      const maxRotation = width < 640 ? 56 : width < 1024 ? 62 : 68;

      return Math.cos(Number(latestProgress) * Math.PI) * maxRotation;
    }
  );

  const hoverProgress = useMotionValue(0);

  useEffect(() => {
    const hoverAnimation = animate(hoverProgress, isHovered ? 1 : 0, {
      type: 'spring',
      stiffness: 240,
      damping: 26,
      mass: 0.72,
    });

    return () => hoverAnimation.stop();
  }, [hoverProgress, isHovered]);

  const hoverY = useTransform(
    hoverProgress,
    (latestHover) => -CARD_HOVER_LIFT * latestHover
  );

  const visibility = useTransform([phase, stageWidth], ([latestPhase, width]) =>
    Number(latestPhase) < getPathSpan(Number(width)) ? 'visible' : 'hidden'
  );

  const pointerEvents = useTransform([phase, stageWidth], ([latestPhase, width]) =>
    Number(latestPhase) > 0.08 &&
      Number(latestPhase) < getPathSpan(Number(width)) - 0.08
      ? 'auto'
      : 'none'
  );

  const zIndex = useTransform([phase, stageWidth], ([latestPhase, width]) =>
    Number(latestPhase) < getPathSpan(Number(width))
      ? Math.floor(Number(latestPhase)) + 1
      : -1
  );
  const textZIndex = useTransform(zIndex, (latestZIndex) => latestZIndex + 20);
  const numberLeft = useTransform(
    [x, stageWidth],
    ([latestX, latestWidth]) => {
      const width = Number(latestWidth);
      const offset = width < 640 ? -22 : width < 1024 ? -32 : NUMBER_X_OFFSET;

      return Math.round(Number(latestX)) + offset;
    }
  );
  const numberTop = useTransform(
    [y, hoverY, stageWidth],
    ([latestY, latestHoverY, latestWidth]) =>
      Math.round(Number(latestY) + Number(latestHoverY)) -
      (Number(latestWidth) < 1024 ? 21 : 29)
  );
  const numberOpacity = useTransform(
    [x, stageWidth],
    ([latestX, latestWidth]) => {
      const width = Number(latestWidth);
      const revealPosition = width < 1024 ? 0.86 : NUMBER_REVEAL_POSITION;
      const revealX = width * revealPosition;

      return clamp((revealX - Number(latestX)) / NUMBER_REVEAL_FADE, 0, 1);
    }
  );
  const titleRight = useTransform(
    [x, stageWidth],
    ([latestX, latestWidth]) =>
      Math.round(Number(latestWidth) - Number(latestX) + TITLE_X_GAP)
  );
  const titleTop = useTransform(
    [y, hoverY, cardHeight],
    ([latestY, latestHoverY, latestHeight]) =>
      Math.round(
        Number(latestY) +
        Number(latestHoverY) +
        Number(latestHeight) * 0.08
      )
  );

  function handleClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (event.detail !== 0) {
      event.preventDefault();
    }
  }

  return (
    <>
      <motion.article
        data-work-plane
        data-work-index={index}
        data-work-slug={work.slug}
        className="absolute left-0 top-0"
        style={{
          width: cardWidth,
          x,
          y,
          rotateY,
          transformPerspective: 1200,
          zIndex,
          visibility,
          pointerEvents,
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        <motion.div className="relative" style={{ y: hoverY }}>
          <Link
            href={caseStudyHref}
            prefetch={false}
            aria-label={`${copy.view} ${work.title}`}
            draggable={false}
            onClick={handleClick}
            onPointerDown={() => onHoverChange(null)}
            onFocus={(event) => {
              if (event.currentTarget.matches(':focus-visible')) {
                onHoverChange(index);
              }
            }}
            onBlur={() => onHoverChange(null)}
            onDragStart={(event) => event.preventDefault()}
            className="group block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E37D30]"
          >
            <div className="relative aspect-[1201/1801] overflow-hidden bg-black shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                draggable={false}
                sizes={CARD_IMAGE_SIZES}
                quality={80}
                {...(index === INITIAL_LCP_PLANE_INDEX
                  ? { preload: true, fetchPriority: 'high' as const }
                  : { loading: 'lazy' as const })}
                className="pointer-events-none object-cover object-center"
              />
            </div>
          </Link>
        </motion.div>
      </motion.article>

      <motion.span
        className="pointer-events-none absolute font-mono text-[10px] font-black tracking-[0.16em] text-white [text-rendering:geometricPrecision]"
        style={{
          left: numberLeft,
          top: numberTop,
          zIndex,
          visibility,
          opacity: numberOpacity,
        }}
      >
        {String(index).padStart(2, '0')}
      </motion.span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={work.slug}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute flex min-w-max items-center gap-2"
            style={{
              right: titleRight,
              top: titleTop,
              zIndex: textZIndex,
              visibility,
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.18 }}
              className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-white [text-rendering:geometricPrecision]"
            >
              <WordScrambleText
                value={work.title.toUpperCase()}
                hoverValue={work.title.toUpperCase()}
                playOnMount
                intervalMs={42}
                steps={Math.max(18, work.title.length * 2)}
                className="inline-block min-w-[12ch]"
              />
            </motion.p>

            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{
                duration: 0.34,
                delay: 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="h-px w-[clamp(3.5rem,5vw,6.5rem)] shrink-0 bg-white"
              style={{ transformOrigin: 'right center' }}
            />

            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.16, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function WorkGallery({ locale = 'en' }: { locale?: Locale }) {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );

  if (!isHydrated) {
    const initialLcpWork = getCarouselItems(locale)[INITIAL_LCP_PLANE_INDEX];

    return (
      <div className="relative h-[100svh] min-h-[680px] overflow-hidden lg:min-h-[760px]">
        {initialLcpWork ? (
          <Image
            src={initialLcpWork.image}
            alt=""
            aria-hidden="true"
            width={1201}
            height={1801}
            sizes={CARD_IMAGE_SIZES}
            quality={80}
            preload
            fetchPriority="high"
            className="pointer-events-none absolute h-px w-px opacity-0"
          />
        ) : null}
      </div>
    );
  }

  return <InteractiveWorkGallery locale={locale} />;
}

function InteractiveWorkGallery({ locale }: { locale: Locale }) {
  const router = useRouter();
  const workItems = getWorks(locale);
  const carouselItems = getCarouselItems(locale);
  const copy = galleryCopy[locale];
  const containerRef = useRef<HTMLElement | null>(null);
  const [hoveredPlaneIndex, setHoveredPlaneIndex] = useState<number | null>(
    null
  );

  const galleryItems = carouselItems;

  const initialStageWidth = Math.max(
    1,
    document.documentElement.clientWidth
  );
  const minimumStageHeight = initialStageWidth < 1024 ? 680 : 760;
  const targetTravel = useMotionValue(0.55);
  const travel = useSpring(targetTravel, {
    stiffness: 220,
    damping: 32,
    mass: 0.7,
    restDelta: 0.0001,
  });

  const stageWidth = useMotionValue(initialStageWidth);
  const stageHeight = useMotionValue(
    Math.max(
      1,
      Math.max(window.innerHeight, minimumStageHeight) - NAVBAR_HEIGHT
    )
  );
  const didDragRef = useRef(false);
  const dragResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const inertiaRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateStageSize() {
      const activeContainer = containerRef.current;

      if (!activeContainer) {
        return;
      }

      const width = Math.max(1, activeContainer.clientWidth);
      const height = Math.max(
        1,
        activeContainer.clientHeight - NAVBAR_HEIGHT
      );

      stageWidth.set(width);
      stageHeight.set(height);
    }

    const resizeObserver = new ResizeObserver(updateStageSize);

    resizeObserver.observe(container);
    updateStageSize();

    return () => resizeObserver.disconnect();
  }, [stageHeight, stageWidth]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    function handleWheel(event: WheelEvent) {
      event.preventDefault();

      inertiaRef.current?.stop();
      inertiaRef.current = null;

      const isCompact = stageWidth.get() < 1024;

      const movement = isCompact
        ? getCompactGestureMovement(
          event.deltaX,
          event.deltaY,
        )
        : Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : -event.deltaX;

      const sensitivity = isCompact
        ? MOBILE_WHEEL_SENSITIVITY
        : WHEEL_SENSITIVITY;

      targetTravel.set(
        targetTravel.get() + movement * sensitivity,
      );
    }

    container.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener(
        'wheel',
        handleWheel,
      );
    };
  }, [stageWidth, targetTravel]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1023px)');
    const root = document.documentElement;

    function updateScrollLock() {
      root.classList.toggle(
        'work-page-scroll-locked',
        mobileQuery.matches,
      );
    }

    updateScrollLock();

    mobileQuery.addEventListener('change', updateScrollLock);

    return () => {
      mobileQuery.removeEventListener(
        'change',
        updateScrollLock,
      );

      root.classList.remove('work-page-scroll-locked');
    };
  }, []);

  useEffect(() => {
    return () => {
      inertiaRef.current?.stop();

      if (dragResetTimeoutRef.current) {
        clearTimeout(dragResetTimeoutRef.current);
      }
    };
  }, []);

  function handlePanStart() {
    inertiaRef.current?.stop();
    inertiaRef.current = null;
    didDragRef.current = false;
    setHoveredPlaneIndex(null);

    if (dragResetTimeoutRef.current) {
      clearTimeout(dragResetTimeoutRef.current);
    }
  }

  function handlePan(info: PanInfo) {
    const isCompact = stageWidth.get() < 1024;

    const movement = isCompact
      ? getCompactGestureMovement(
        info.delta.x,
        info.delta.y,
      )
      : projectOntoPath(
        info.delta.x,
        info.delta.y,
      );

    const passedDragThreshold = isCompact
      ? Math.max(
        Math.abs(info.offset.x),
        Math.abs(info.offset.y),
      ) > 7
      : Math.abs(info.offset.x) > 7 ||
      Math.abs(info.offset.y) > 7;

    if (passedDragThreshold) {
      didDragRef.current = true;
      setHoveredPlaneIndex(null);
    }

    const sensitivity = isCompact
      ? MOBILE_DRAG_SENSITIVITY
      : DRAG_SENSITIVITY;

    targetTravel.set(
      targetTravel.get() + movement * sensitivity,
    );
  }

  function handlePanEnd(info: PanInfo) {
    inertiaRef.current?.stop();

    const isCompact = stageWidth.get() < 1024;

    const directionalVelocity = isCompact
      ? getCompactGestureMovement(
        info.velocity.x,
        info.velocity.y,
      )
      : projectOntoPath(
        info.velocity.x,
        info.velocity.y,
      );

    const inertiaStrength = isCompact
      ? MOBILE_INERTIA_STRENGTH
      : INERTIA_STRENGTH;

    const currentTravel = targetTravel.get();

    const projectedTravel =
      currentTravel +
      directionalVelocity * inertiaStrength;

    const inertiaDuration = clamp(
      0.2 +
      Math.abs(projectedTravel - currentTravel) * 0.45,
      0.2,
      0.65,
    );

    inertiaRef.current = animate(
      targetTravel,
      projectedTravel,
      {
        duration: inertiaDuration,
        ease: [0.16, 1, 0.3, 1],
      },
    );

    dragResetTimeoutRef.current = setTimeout(() => {
      didDragRef.current = false;
    }, 180);
  }

  function findPlaneAtPoint(clientX: number, clientY: number) {
    return document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>('[data-work-plane]') ?? undefined;
  }

  function handleStagePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') {
      setHoveredPlaneIndex(null);
      return;
    }

    if (didDragRef.current) {
      setHoveredPlaneIndex(null);
      return;
    }

    const hoveredPlane = findPlaneAtPoint(event.clientX, event.clientY);
    const planeIndex = hoveredPlane?.dataset.workIndex;

    setHoveredPlaneIndex(planeIndex ? Number(planeIndex) : null);
  }

  function handleStagePointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (
      didDragRef.current ||
      (event.pointerType === 'mouse' && event.button !== 0) ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const clickedPlane = findPlaneAtPoint(event.clientX, event.clientY);

    const slug = clickedPlane?.dataset.workSlug;

    if (slug) {
      router.push(withLocale(`/work/${slug}`, locale));
    }
  }

  return (
    <motion.section
      ref={containerRef}
      onPanStart={handlePanStart}
      onPan={(_, info) => handlePan(info)}
      onPanEnd={(_, info) => handlePanEnd(info)}
      onPointerMove={handleStagePointerMove}
      onPointerUp={handleStagePointerUp}
      onPointerLeave={() => setHoveredPlaneIndex(null)}
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="
  relative
  h-[100svh]
  min-h-0
  cursor-grab
  touch-none
  select-none
  overflow-hidden
  overscroll-none
  text-white
  active:cursor-grabbing
  lg:min-h-[760px]
"
    >
      <motion.header
        variants={pageRise}
        className="pointer-events-none absolute left-5 right-5 top-28 z-[2] sm:left-8 sm:right-8 sm:top-32 md:left-10 md:right-10 lg:left-[5%] lg:right-auto lg:top-[161px] lg:w-[min(44vw,680px)]"
      >
        <h1 className="max-w-[11ch] text-5xl font-medium uppercase leading-[0.86] tracking-normal text-white sm:text-6xl md:text-7xl lg:max-w-none lg:text-[clamp(3.6rem,5vw,6rem)] lg:leading-[0.83]">
          <span className="block">{copy.headingFirst}</span>

          <span className="block">
            {copy.headingSecond}
            <PageNumber value="02" className="translate-y-2" />
          </span>
        </h1>

        <div
          className={`mt-6 max-w-sm ${locale === 'sq' ? 'lg:mt-14 lg:block' : 'lg:hidden'}`}
        >
          <SelectedWorkIntro compact locale={locale} workCount={workItems.length} />
        </div>
      </motion.header>

      {locale === 'en' ? (
        <motion.aside
          variants={pageRise}
          className="pointer-events-none absolute left-[5%] z-[2] hidden w-[min(32vw,420px)] lg:block"
          style={{ top: NAVBAR_HEIGHT + 350 }}
        >
          <SelectedWorkIntro locale={locale} workCount={workItems.length} />
        </motion.aside>
      ) : null}

      <motion.div
        variants={pageRise}
        className="absolute inset-x-0 bottom-0 z-10 overflow-hidden"
        style={{
          top: NAVBAR_HEIGHT,
          isolation: 'isolate',
        }}
      >
        <div className="absolute inset-0">
          {galleryItems.map((work, index) => (
            <Plane
              key={`${work.slug}-${index}`}
              index={index}
              totalCount={galleryItems.length}
              work={work}
              isHovered={hoveredPlaneIndex === index}
              onHoverChange={setHoveredPlaneIndex}
              travel={travel}
              stageWidth={stageWidth}
              stageHeight={stageHeight}
              locale={locale}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={pageRise}
        className="pointer-events-none absolute bottom-9 right-24 z-[20] hidden text-[9px] font-black uppercase tracking-[0.2em] text-white/65 lg:block"
      >
        {copy.drag}
      </motion.div>
    </motion.section>
  );
}
