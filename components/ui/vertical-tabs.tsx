"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  activeIndex,
}: {
  item: StepItem;
  index: number;
  activeIndex: number;
}) {
  const isActive = activeIndex === index;
  const isPast = activeIndex > index;

  return (
    <motion.div
      className="absolute inset-0 origin-center"
      animate={{
        opacity: isActive || isPast ? 1 : 0,
        scale: isActive ? 1 : isPast ? 1.04 : 1.1,
      }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ zIndex: index }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-center"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      {item.id === '02' && <UltrasonicWaveOverlay />}
    </motion.div>
  );
}

function renderTitle(title: string) {
  if (title.includes('?')) {
    const idx = title.indexOf('?');
    const line1 = title.slice(0, idx + 1);
    const line2 = title.slice(idx + 1).trim();
    return line2 ? <>{line1}<br />{line2}.</> : <>{line1}</>;
  }
  return <>{title}.</>;
}

export function VerticalTabs({
  title = "Imate projekt? Zagotovite si varno izvedbo",
  subtitle = "Vaše povpraševanje spremenimo v strukturiran inženirski proces — od prvega tehničnega načrta do končnega revizijsko varnega poročila.",
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
        /* ── Desktop: sticky split layout ── */
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Top/bottom fades */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

          <div className="absolute inset-0 z-10 flex items-center">
            <div className="max-w-[1200px] mx-auto w-full px-6">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                {/* Left: title + steps + CTA */}
                <div className="lg:col-span-5">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-6 flex items-center gap-3">
                    <span className="w-4 h-px bg-[#0071e3]/40" />
                    Kako delamo
                  </div>

                  <h2 className="text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.03em] leading-[1.08] text-white mb-4">
                    {renderTitle(title)}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed font-light mb-8 max-w-[300px]">
                    {subtitle}
                  </p>

                  <div className="flex flex-col space-y-0 mb-7">
                    {items.map((item, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToStep(index)}
                          className={cn(
                            "group relative flex items-start gap-4 py-4 px-5 text-left transition-all duration-500 border border-white/10 rounded-2xl mb-2",
                            isActive
                              ? "text-white bg-white/10 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]"
                              : "text-white/40 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md"
                          )}
                        >
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00a8ff]/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none blur-2xl group-hover:opacity-100" />

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
                                ? { scale: 1.1, opacity: 1, x: 2, color: "#ffffff" }
                                : { scale: 1, opacity: 0.5, x: 0, color: "rgba(255,255,255,0.5)" }
                            }
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-sm font-medium tabular-nums mt-0.5 origin-left inline-block"
                          >
                            /{item.id}
                          </motion.span>

                          <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                            <span className={cn(
                              "text-xl font-semibold tracking-[-0.02em] transition-all duration-500 leading-tight",
                              isActive ? "text-white translate-x-1 drop-shadow-[0_0_10px_rgba(0,168,255,0.6)]" : "translate-x-0"
                            )}>
                              {item.title}
                            </span>
                            <div style={{
                              overflow: 'hidden',
                              maxHeight: isActive ? '100px' : '0px',
                              opacity: isActive ? 1 : 0,
                              transition: 'max-height 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.25s ease',
                            }}>
                              <p className="text-white/55 text-sm font-light leading-snug pb-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-white/60 hover:text-white group/cta"
                  >
                    Začnite projekt tukaj
                    <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-1 text-[#0071e3]" />
                  </a>
                </div>

                {/* Right: contained image panel */}
                <div className="lg:col-span-7 relative">
                  <div
                    className="relative rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]"
                    style={{ height: 'calc(100vh - 9rem)' }}
                  >
                    {items.map((item, index) => (
                      <ScrollLinkedImage
                        key={item.id}
                        item={item}
                        index={index}
                        activeIndex={activeIndex}
                      />
                    ))}

                    {/* Bottom overlay strip */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-20" />

                    {/* Step label + counter */}
                    <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between">
                      <div className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                        {items[activeIndex].title}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                        {items[activeIndex].id} / {String(items.length).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile: simple stacked layout ── */
        <div className="px-6 py-24">
          <div className="mb-12">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-5 flex items-center gap-3">
              <span className="w-4 h-px bg-[#0071e3]/40" />
              Kako delamo
            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] leading-[1.0] text-white mb-4">
              {renderTitle(title)}
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
                  <span className="font-mono text-[11px] text-white/25 mt-1 shrink-0">/{item.id}</span>
                  <div>
                    <div className="text-lg font-semibold text-white mb-1">{item.title}</div>
                    <p className="text-sm text-white/50 font-light leading-snug">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white/60 hover:text-white group/cta"
            >
              Začnite projekt tukaj
              <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-1 text-[#0071e3]" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerticalTabs;
