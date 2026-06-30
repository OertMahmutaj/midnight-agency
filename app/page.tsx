'use client';
import Link from 'next/link';

export default function HomePage() {
  // const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  return (
    <>
      {/* {!isAnimationComplete && (
        <MidnightEntrance onComplete={() => setIsAnimationComplete(true)} />
      )} */}

      {/* The rest of your content that only shows after animation */}
      <main className="pt-32 px-8 md:px-24 flex flex-col justify-center min-h-[80vh]">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
            The road to {" "}
            <span className="text-[#E37D30]">success</span> starts with being{" "}
            <span
              className="text-[#E37D30] lowercase hover:uppercase hover:tracking-[0.01em] transition-all duration-500 cursor-pointer inline-block"
            >
              bold.
            </span>
          </h1>
          <div className="flex gap-4">
            <Link
              href="/work"
              className="group relative isolate inline-flex h-14 w-[min(100%,18rem)] overflow-visible text-xs font-black uppercase tracking-[0.08em] text-white sm:h-16 sm:text-sm"
            >
              <span className="absolute inset-0 z-[1] translate-x-[6px] translate-y-[6px] bg-white transition-all duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:translate-x-[9px] group-hover:translate-y-[7px] group-hover:bg-black sm:translate-x-[10px] sm:translate-y-[8px] sm:group-hover:translate-x-[15px] sm:group-hover:translate-y-[10px] sm:group-hover:rotate-[1.5deg]" />

              <span className="absolute inset-0 z-[2] -translate-x-[5px] -translate-y-[5px] bg-[#E37D30] transition-transform duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:-translate-x-[9px] group-hover:-translate-y-[7px] group-hover:-rotate-2 sm:-translate-x-[8px] sm:-translate-y-[7px] sm:group-hover:-translate-x-[16px] sm:group-hover:-translate-y-[10px]" />

              <span className="absolute inset-0 z-[3] bg-black transition-all duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:-translate-x-[5px] group-hover:-translate-y-[2px] group-hover:-rotate-[1.2deg] group-hover:bg-white sm:group-hover:-translate-x-[7px] sm:group-hover:-translate-y-[3px]" />

              <span className="relative z-[4] flex h-full w-full items-center justify-center px-5 text-center text-white transition-all duration-300 group-hover:-translate-x-1 group-hover:text-black sm:px-6 sm:group-hover:-translate-x-2">
                View Our Work
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}