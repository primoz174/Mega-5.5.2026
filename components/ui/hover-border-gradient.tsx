import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

const movingMap: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  BOTTOM:
    'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  RIGHT:
    'radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
};

const highlight =
  'radial-gradient(75% 181.15942028985506% at 50% 50%, #00a8ff 0%, rgba(255, 255, 255, 0) 100%)';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType | string;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
    [key: string]: any;
  }
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('BOTTOM');

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  const background = hovered ? highlight : movingMap[direction];

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-2xl border border-white/10 bg-white/10 box-decoration-clone p-[1px] backdrop-blur-3xl transition duration-500 hover:bg-white/15',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-black/80 px-8 py-4 text-white',
          className
        )}
      >
        {children}
      </div>
      {/* Use CSS transition instead of framer-motion WAAPI to avoid gradient animation error */}
      <div
        className={cn('absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]')}
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background,
          transition: `background ${duration}s linear`,
        }}
      />
      <div className='absolute inset-px z-1 flex-none rounded-[inherit] bg-black/40 backdrop-blur-3xl' />
    </Element>
  );
}
