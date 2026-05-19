import React, { useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { base, spread } = glowColorMap[glowColor];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', x.toFixed(2));
    card.style.setProperty('--xp', (x / rect.width).toFixed(2));
    card.style.setProperty('--y', y.toFixed(2));
    card.style.setProperty('--yp', (y / rect.height).toFixed(2));
  };

  const handlePointerEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--bg-spot-opacity', '0.06');
    card.style.setProperty('--border-spot-opacity', '1');
    card.style.setProperty('--border-light-opacity', '1');
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--bg-spot-opacity', '0');
    card.style.setProperty('--border-spot-opacity', '0');
    card.style.setProperty('--border-light-opacity', '0');
  };

  const getSizeClasses = () => (customSize ? '' : sizeMap[size]);

  const getInlineStyles = (): React.CSSProperties => {
    const s: Record<string, string> = {
      '--base': String(base),
      '--spread': String(spread),
      '--radius': '20',
      '--border': '2',
      '--backdrop': 'transparent',
      '--backup-border': 'rgba(255,255,255,0.08)',
      '--size': '280',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0.2) * var(--spread, 0)))',
      '--bg-spot-opacity': '0',
      '--border-spot-opacity': '0',
      '--border-light-opacity': '0',
      '--x': '0',
      '--y': '0',
      '--xp': '0.2',
      '--yp': '0.2',
    };
    const result: React.CSSProperties = {
      ...(s as React.CSSProperties),
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: '100% 100%',
      backgroundPosition: '50% 50%',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'pan-y',
      willChange: 'transform, opacity',
      transform: 'translate3d(0,0,0)',
      WebkitTransform: 'translate3d(0,0,0)',
    };
    if (width !== undefined) result.width = typeof width === 'number' ? `${width}px` : width;
    if (height !== undefined) result.height = typeof height === 'number' ? `${height}px` : height;
    return result;
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`${getSizeClasses()} ${!customSize ? 'aspect-[3/4]' : ''} rounded-[20px] relative shadow-[0_1rem_2rem_-1rem_black] ${className}`}
    >
      <div data-glow />
      {children}
    </div>
  );
};

export { GlowCard };
