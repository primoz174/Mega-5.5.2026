import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

const movingMap: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
};

const highlight =
  'radial-gradient(75% 181.16% at 50% 50%, #0071e3 0%, rgba(255, 255, 255, 0) 100%)';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType | string;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  [key: string]: any;
}>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = (current: Direction): Direction => {
    const dirs: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const idx = dirs.indexOf(current);
    return clockwise
      ? dirs[(idx - 1 + dirs.length) % dirs.length]
      : dirs[(idx + 1) % dirs.length];
  };

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(
      () => setDirection((d) => rotateDirection(d)),
      duration * 1000
    );
    return () => clearInterval(interval);
  }, [hovered, duration, clockwise]);

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-nowrap content-center items-center justify-center overflow-visible rounded-full border border-white/20 bg-white/10 p-px backdrop-blur-3xl',
        containerClassName
      )}
      {...props}
    >
      <div className={cn('z-10 w-auto rounded-[inherit] bg-black px-7 py-3.5 text-white', className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)', position: 'absolute', width: '100%', height: '100%' }}
        animate={{ background: hovered ? highlight : movingMap[direction] }}
        transition={{ ease: 'linear', duration: duration }}
      />
      <div className="absolute inset-[1px] z-[1] flex-none rounded-[inherit] bg-black/90" />
    </Element>
  );
}
