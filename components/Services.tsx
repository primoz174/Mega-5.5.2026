import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/services';
import { ServiceCategory } from '../types';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const CAPABILITY_IMAGES: Record<string, string> = {
  ndt: '/images/home/cap-01-ndt.webp',
  nadzori: '/images/home/cap-02-nadzori.webp',
  qa: '/images/home/cap-03-qaqc.webp',
  svetovanje: '/images/home/cap-04-svetovanje.webp',
};

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-black text-white">
      <ServicesHeader />
      <div className="w-full flex flex-col">
        {servicesData.map((cat, i) => (
          <CapabilityRow
            key={cat.id}
            index={i + 1}
            category={cat}
            imageUrl={CAPABILITY_IMAGES[cat.id]}
            flip={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

function ServicesHeader() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // "Štiri področja." fades in from below as section enters viewport
  const stiriOpacity = useTransform(scrollYProgress, [0.02, 0.2], [0, 1]);
  const stiriY = useTransform(scrollYProgress, [0.02, 0.2], [40, 0]);

  // "Ena obljuba." starts pitch black + heavily blurred, clears on scroll
  const promiseOpacity = useTransform(scrollYProgress, [0.12, 0.42], [0, 1]);
  const promiseBlur = useTransform(scrollYProgress, [0.12, 0.42], [28, 0]);
  const promiseFilter = useMotionTemplate`blur(${promiseBlur}px)`;
  // Color ramps from almost-invisible dark to pure white
  const promiseBrightness = useTransform(scrollYProgress, [0.12, 0.42], [0.05, 1]);
  const promiseBrightnessFilter = useMotionTemplate`blur(${promiseBlur}px) brightness(${promiseBrightness})`;

  // Decorative center line scales out after promise reveals
  const lineScale = useTransform(scrollYProgress, [0.35, 0.52], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.35, 0.52], [0, 1]);

  // Description fades in last
  const descOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.42, 0.58], [20, 0]);

  return (
    <div ref={ref} className="px-6 pt-32 md:pt-44 pb-24 md:pb-32 flex flex-col items-center text-center">
      {/* "Štiri področja." — enters first */}
      <motion.h2
        style={{ opacity: stiriOpacity, y: stiriY }}
        className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.0] text-white"
      >
        Štiri področja.
      </motion.h2>

      {/* "Ena obljuba." — scroll-driven dark → light reveal */}
      <motion.h2
        style={{ opacity: promiseOpacity, filter: promiseBrightnessFilter }}
        className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.0] text-white mt-1"
      >
        Ena obljuba.
      </motion.h2>

      {/* Decorative line draws from center outward after promise reveals */}
      <motion.div
        style={{ scaleX: lineScale, opacity: lineOpacity }}
        className="mt-10 h-px w-64 bg-gradient-to-r from-transparent via-[#0071e3]/70 to-transparent origin-center"
      />

      {/* Description — fades in last */}
      <motion.p
        style={{ opacity: descOpacity, y: descY }}
        className="mt-8 text-xl text-white/60 max-w-xl leading-snug font-light"
      >
        Od ultrazvočne preiskave zvarov do kakovostne dokumentacije —
        celotna pot tehnične varnosti pod eno streho.
      </motion.p>
    </div>
  );
}

interface RowProps {
  index: number;
  category: ServiceCategory;
  imageUrl?: string;
  flip: boolean;
}

function CapabilityRow({ index, category, imageUrl, flip }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Track scroll relative to this section: 0 = section bottom at viewport bottom, 1 = section top at viewport top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: image moves up slowly as you scroll past (creates depth illusion)
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);

  // Image zooms in slightly when section first appears, then settles — the "arrival" feel
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 1], [1.12, 1.0, 1.0]);

  // Content drifts up subtly as you read through the section
  const contentY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  // Staggered text entrance — each element fades in sequentially as section scrolls into view
  const numOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const numY = useTransform(scrollYProgress, [0.05, 0.18], [20, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.17, 0.3], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.17, 0.3], [28, 0]);

  const descOpacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.22, 0.35], [20, 0]);

  const chipsOpacity = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);
  const chipsY = useTransform(scrollYProgress, [0.28, 0.4], [16, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.33, 0.44], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.33, 0.44], [12, 0]);

  const chips = (category.items || []).slice(0, 4);
  const numStr = String(index).padStart(2, '0');

  return (
    <div
      ref={ref}
      id={`services-${category.id}`}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Parallax background image — larger than container so parallax has room */}
      {imageUrl && (
        <motion.div
          className="absolute inset-x-0 top-0 w-full h-[130%] pointer-events-none"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover ${flip ? 'object-left' : 'object-right'} opacity-60 md:opacity-85`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      )}

      {/* Top fade from black — seamless entry from previous section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />
      {/* Bottom fade to black — seamless exit to next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />

      {/* Left/right directional gradient for text legibility */}
      <div
        className={`hidden md:block absolute inset-0 z-10 ${
          flip
            ? 'bg-gradient-to-l from-black via-black/85 to-transparent'
            : 'bg-gradient-to-r from-black via-black/85 to-transparent'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:hidden z-10" />

      {/* Content — drifts up subtly with scroll */}
      <motion.div
        style={{ y: contentY }}
        className={`relative z-20 w-full max-w-[1200px] mx-auto px-6 min-h-screen flex flex-col justify-center py-40 ${
          flip ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
        }`}
      >
        <div className={`max-w-2xl flex flex-col ${flip ? 'md:items-end' : 'md:items-start'}`}>

          <motion.div
            style={{ opacity: numOpacity, y: numY }}
            className="text-base text-white/40 mb-5 font-medium tabular-nums font-mono"
          >
            {numStr}
          </motion.div>

          <motion.h3
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.03em] text-white mb-4 leading-[1.05]"
          >
            {category.title}
          </motion.h3>

          {category.subtitle && (
            <motion.h4
              style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="text-xl md:text-2xl text-white/90 font-medium mb-6"
            >
              {category.subtitle}
            </motion.h4>
          )}

          <motion.p
            style={{ opacity: descOpacity, y: descY }}
            className={`text-lg md:text-xl text-white/60 leading-snug mb-10 font-light max-w-lg ${
              flip ? 'md:text-right' : 'md:text-left'
            }`}
          >
            {category.description}
          </motion.p>

          {chips.length > 0 && (
            <motion.div
              style={{ opacity: chipsOpacity, y: chipsY }}
              className="grid grid-cols-2 gap-2 mb-12 w-full max-w-lg"
            >
              {chips.map((chip) => (
                <span
                  key={chip.id}
                  className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md text-sm text-white/80 font-medium text-center"
                >
                  {chip.label}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
            <HoverBorderGradient
              as="button"
              onClick={() => navigate('/storitve', { state: { categoryId: category.id } })}
              containerClassName="self-start"
              className="inline-flex items-center gap-2 font-medium hover:bg-[#0071e3]/10 hover:shadow-[0_8px_32px_rgba(0,113,227,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300 group/cta"
            >
              {category.ctaText || 'Več o področju'}
              <ArrowRight size={18} className="transition-transform group-hover/cta:translate-x-1" />
            </HoverBorderGradient>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
