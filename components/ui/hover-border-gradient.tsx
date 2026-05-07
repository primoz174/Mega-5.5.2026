import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType | string;
  containerClassName?: string;
  className?: string;
  [key: string]: any;
}>) {
  return (
    <Element
      className={cn(
        'hbg-root relative flex h-min w-fit flex-nowrap content-center items-center justify-center rounded-2xl p-px overflow-hidden',
        'border border-white/[0.08]',
        containerClassName
      )}
      {...props}
    >
      <span className="hbg-ring hbg-ring-idle" />
      <span className="hbg-ring hbg-ring-hover" />
      <div className={cn('relative z-10 w-auto rounded-[inherit] bg-black/80 px-8 py-4 text-white', className)}>
        {children}
      </div>
    </Element>
  );
}
