"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

export interface StepItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface VerticalTabsProps {
  title?: string;
  subtitle?: string;
  items: StepItem[];
}

const UltrasonicWaveOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center mix-blend-screen opacity-80 overflow-hidden">
      <style>{`
        @keyframes ut-probe-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes ut-scan1 {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          25%  { stroke-dashoffset: 0.5; opacity: 1; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          75%  { stroke-dashoffset: 0.5; opacity: 1; }
          100% { stroke-dashoffset: 1; opacity: 0; }
        }
        @keyframes ut-scan2 {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          25%  { stroke-dashoffset: 0.5; opacity: 1; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          75%  { stroke-dashoffset: 0.5; opacity: 1; }
          100% { stroke-dashoffset: 1; opacity: 0; }
        }
        @keyframes ut-ring1 {
          0%   { r: 0; opacity: 0; }
          50%  { opacity: 0.8; }
          100% { r: 15; opacity: 0; }
        }
        @keyframes ut-ring2 {
          0%   { r: 0; opacity: 0; }
          50%  { opacity: 0.8; }
          100% { r: 15; opacity: 0; }
        }
      `}</style>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="80%" stopColor="#00a8ff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="1 1" />
        <ellipse
          cx="60" cy="50" rx="3" ry="1.5"
          fill="#ff0044"
          style={{ animation: 'ut-probe-pulse 2s ease-in-out infinite 1s' }}
        />
        <path
          d="M 40 20 L 40 80"
          stroke="url(#scanGrad)" strokeWidth="3" strokeLinecap="round"
          fill="none"
          pathLength="1"
          style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'ut-scan1 2s linear infinite' }}
        />
        <path
          d="M 60 20 L 60 50"
          stroke="url(#scanGrad)" strokeWidth="3" strokeLinecap="round"
          fill="none"
          pathLength="1"
          style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'ut-scan2 2s linear infinite 0.8s' }}
        />
        <circle cx="40" cy="20" r="0" fill="transparent" stroke="#00a8ff" strokeWidth="0.2"
          style={{ animation: 'ut-ring1 2s ease-out infinite' }}
        />
        <circle cx="60" cy="20" r="0" fill="transparent" stroke="#00a8ff" strokeWidth="0.2"
          style={{ animation: 'ut-ring2 2s ease-out infinite 0.8s' }}
        />
        <g stroke="rgba(0, 168, 255, 0.08)" strokeWidth="0.2" opacity="0.6">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="100" />)}
          {[30, 40, 50, 60, 70].map(y => <line key={`y-${y}`} x1="0" y1={y} x2="100" y2={y} />)}
        </g>
      </svg>
    </div>
  );
};

function StepProgressBar({
  scrollYProgress,
  stepIndex,
  total,
  isActive,
}: {
  scrollYProgress: MotionValue<number>;
  stepIndex: number;
  total: number;
  isActive: boolean;
}) {
  const start = stepIndex / total;
  const end = (stepIndex + 1) / total;
  const scaleY = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  const dotTop = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-white/10">
      <motion.div
        className="absolute top-0 left-0 w-full bg-white origin-top"
        style={{ scaleY }}
        transition={{ ease: 'linear' }}
      />
      {/* Glow dot at head of progress */}
      {isActive && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] -translate-y-1/2"
          style={{ top: dotTop }}
        />
      )}
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

function ScrollLinkedImage({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: StepItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const stepSize = 1 / total;

  // fullyIn: image is at 100% opacity
  const fullyIn = index * stepSize;

  // fullyOut: image starts sinking/scaling up as the NEXT image fades over it
  const fullyOut = (index + 1) * stepSize;

  // startIn must be >= 0 — WAAPI does not allow negative keyframe offsets.
  // For index 0, (index-0.5)*stepSize is negative, so clamp to 0.
  const startIn = Math.max(0, (index - 0.5) * stepSize);

  // When startIn === fullyIn (index 0), the image is pre-revealed at scroll=0.
  const preRevealed = startIn >= fullyIn;

  const opacity = useTransform(
    scrollYProgress,
    preRevealed ? [0, 0.001] : [startIn, fullyIn],
    preRevealed ? [1, 1] : [0, 1],
    { clamp: true }
  );

  const scale = useTransform(
    scrollYProgress,
    preRevealed ? [0, fullyOut] : [startIn, fullyIn, fullyOut],
    preRevealed ? [1, 1.05] : [1.15, 1, 1.05],
    { clamp: true }
  );

  return (
    <motion.div
      className="absolute inset-0 origin-center"
      style={{ opacity, scale, zIndex: index }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-right"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      {item.id === '02' && <UltrasonicWaveOverlay />}
    </motion.div>
  );
}

export function VerticalTabs({
  title = "Kako delamo",
  subtitle = "Od tehničnega povpraševanja do revizijsko varnega poročila. Strukturiran proces, ki zagotavlja 100 % skladnost s standardi.",
  items,
}: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!isDesktop) return;
    const step = Math.min(Math.floor(progress * items.length), items.length - 1);
    setActiveIndex(step);
  });

  const scrollToStep = useCallback((index: number) => {
    const outer = outerRef.current;
    if (!outer || !isDesktop) return;
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const targetY = outerTop + (index / items.length) * (outer.offsetHeight - window.innerHeight);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, [items.length, isDesktop]);

  return (
    <div
      ref={outerRef}
      id="process"
      className="relative bg-black"
      style={isDesktop ? { height: `${items.length * 100}vh` } : {}}
    >
      {isDesktop ? (
        /* ── Desktop: sticky scroll layout ── */
        <div className="sticky top-0 h-screen w-full overflow-hidden relative bg-black">
          {/* Full-width background images tied directly to scroll progress */}
          {items.map((item, index) => (
            <ScrollLinkedImage
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Gradient overlay for text legibility — dark on left, fades out */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none z-10" />
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

          {/* Step counter badge */}
          <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase z-20">
            {items[activeIndex].id} / {String(items.length).padStart(2, '0')}
          </div>

          {/* Left column — original design, overlaid on image */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-[1200px] mx-auto w-full px-6">
              <div className="lg:w-5/12">
                <div className="space-y-4 mb-12">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.0] text-white">
                    {title}.
                  </h2>
                  <p className="text-xl text-white/60 max-w-xl leading-snug font-light">
                    {subtitle}
                  </p>
                </div>

                <div className="flex flex-col space-y-0">
                  {items.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToStep(index)}
                        className={cn(
                          "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border border-white/10 rounded-2xl md:p-6 mb-2",
                          isActive
                            ? "text-white bg-white/10 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]"
                            : "text-white/40 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md"
                        )}
                      >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00a8ff]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none blur-2xl group-hover:opacity-100" />

                        <StepProgressBar
                          scrollYProgress={scrollYProgress}
                          stepIndex={index}
                          total={items.length}
                          isActive={isActive}
                        />

                        <motion.span
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={
                            isActive
                              ? { scale: 1.2, opacity: 1, x: 4, color: "#ffffff" }
                              : { scale: 1, opacity: 0.6, x: 0, color: "rgba(255,255,255,0.6)" }
                          }
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="text-sm font-medium tabular-nums mt-1 origin-left group-hover:opacity-80 transition-colors inline-block"
                        >
                          /{item.id}
                        </motion.span>

                        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                          <span className={cn(
                            "text-2xl md:text-[1.75rem] font-semibold tracking-[-0.02em] transition-all duration-500 leading-tight group-hover:drop-shadow-[0_0_10px_rgba(0,168,255,0.8)]",
                            isActive ? "text-white translate-x-2" : "translate-x-0"
                          )}>
                            {item.title}
                          </span>
                          <div style={{
                            overflow: 'hidden',
                            maxHeight: isActive ? '120px' : '0px',
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? '8px' : '0px',
                            transition: 'max-height 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.25s ease, margin-top 0.35s ease',
                          }}>
                            <p className="text-white/55 text-base font-light leading-snug max-w-sm pb-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ── Mobile: simple stacked layout ── */
        <div className="px-6 py-24">
          <div className="mb-12">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-5">
              Proces
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] leading-[1.0] text-white mb-4">
              {title}.
            </h2>
            <p className="text-base text-white/50 leading-snug font-light">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {item.id === '02' && <UltrasonicWaveOverlay />}
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[11px] text-white/25 mt-1 shrink-0">{item.id}</span>
                  <div>
                    <div className="text-lg font-semibold text-white mb-1">{item.title}</div>
                    <p className="text-sm text-white/50 font-light leading-snug">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VerticalTabs;
