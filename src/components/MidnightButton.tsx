'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = SharedProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type NativeButtonProps = SharedProps & {
  href?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
};

type MidnightButtonProps = LinkButtonProps | NativeButtonProps;

export default function MidnightButton(props: MidnightButtonProps) {
  const router = useRouter();
  const { children, className = '' } = props;
  const classes = `group relative isolate inline-flex h-12 w-full cursor-pointer overflow-visible text-[10px] font-black uppercase tracking-[0.06em] text-black disabled:cursor-wait disabled:opacity-70 sm:h-14 sm:text-xs ${className}`;
  const content = (
    <>
      <span className="absolute inset-0 z-[1] translate-x-[5px] translate-y-[5px] rounded-[2px] bg-black transition-all duration-300 group-hover:translate-x-[7px] group-hover:translate-y-[6px] group-hover:bg-white sm:translate-x-[8px] sm:translate-y-[7px] sm:group-hover:translate-x-[12px] sm:group-hover:translate-y-[9px] sm:group-hover:rotate-[1.5deg]" />

      <span className="absolute inset-0 z-[3] rounded-[2px] bg-white transition-all duration-300 group-hover:-translate-x-[4px] group-hover:-translate-y-[2px] group-hover:bg-black sm:group-hover:-translate-x-[7px] sm:group-hover:-translate-y-[3px] sm:group-hover:-rotate-[1.2deg]" />

      <span className="relative z-[4] flex h-full w-full items-center justify-center px-4 text-center text-black transition-all duration-300 group-hover:text-white sm:px-6 sm:group-hover:-translate-x-2">
        {children}
      </span>
    </>
  );

  if ('href' in props && props.href) {
    const href = props.href;

    return (
      <Link
        href={href}
        prefetch={false}
        onMouseEnter={() => router.prefetch(href)}
        onFocus={() => router.prefetch(href)}
        onTouchStart={() => router.prefetch(href)}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
