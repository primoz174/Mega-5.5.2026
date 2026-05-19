import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import {
  X, CheckCircle2, Send, ArrowRight,
  Eye, Droplet, Magnet, Activity, Ruler, Wind, Radiation, FileSearch, Hammer,
  Shield, CheckSquare, Users, PackageCheck, Network,
  FileText, Factory, FileSignature, BookOpen,
  Settings, Award, Lightbulb, Book, GraduationCap,
  ScanEye, ShieldCheck, ClipboardCheck, HelpCircle,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { GlowCard } from './ui/glow-card';
import { getServicesData } from '../data/services';
import { ServiceCategory, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const CATEGORY_GLOW: Record<string, 'blue' | 'orange' | 'green' | 'purple'> = {
  ndt: 'blue',
  nadzori: 'orange',
  qa: 'green',
  svetovanje: 'purple',
};

const CATEGORY_HEX: Record<string, string> = {
  ndt: '#3b82f6',
  nadzori: '#f97316',
  qa: '#10b981',
  svetovanje: '#a855f7',
};

const CAPABILITY_IMAGES: Record<string, string> = {
  ndt: '/images/home/cap-01-ndt.webp',
  nadzori: '/images/home/cap-02-nadzori.webp',
  qa: '/images/home/cap-03-qaqc.webp',
  svetovanje: '/images/home/cap-04-svetovanje.webp',
};

// Mobile focal point per image — keeps the key subject in view when the
// section becomes a tall narrow viewport.
const MOBILE_FOCAL: Record<string, string> = {
  ndt: '32% 62%',         // Olympus tablet measuring weld on pipe
  nadzori: '68% 50%',     // welder with sparks
  qa: '40% 50%',          // "Quality Assurance / Project Specs" booklet
  svetovanje: '50% 60%',  // two engineers + pressure-vessel schematic
};

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  Eye, Droplet, Magnet, Activity, Ruler, Wind, Radiation, FileSearch, Hammer,
  Shield, CheckSquare, Users, PackageCheck, Network,
  FileText, Factory, FileSignature, BookOpen,
  Settings, Award, Lightbulb, Book, GraduationCap,
  ScanEye, ShieldCheck, ClipboardCheck,
};

function ItemIcon({ name, size = 16, className, style }: { name?: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const Icon = (name && ICON_MAP[name]) ? ICON_MAP[name] : HelpCircle;
  return <Icon size={size} className={className} style={style} />;
}

type SelectedItem = { item: ServiceItem; category: ServiceCategory } | null;

export default function Services() {
  const { language } = useLanguage();
  const lang = language as 'sl' | 'en';
  const servicesData = getServicesData(lang);
  const [selected, setSelected] = useState<SelectedItem>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
      <section id="services" className="relative w-full bg-black text-white">
        <ServicesHeader lang={lang} />
        <div className="w-full flex flex-col">
          {servicesData.map((cat, i) => (
            <CapabilityRow
              key={cat.id}
              index={i + 1}
              category={cat}
              imageUrl={CAPABILITY_IMAGES[cat.id]}
              flip={i % 2 === 1}
              onItemClick={(item) => setSelected({ item, category: cat })}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ServiceModal
            initialItem={selected.item}
            category={selected.category}
            allCategories={servicesData}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const HEADER_COPY = {
  line1: { sl: 'Štiri področja.', en: 'Four capabilities.' },
  line2: { sl: 'Ena obljuba.', en: 'One promise.' },
  desc: {
    sl: 'Od ultrazvočne preiskave zvarov do kakovostne dokumentacije — celotna pot tehnične varnosti pod eno streho.',
    en: 'From ultrasonic weld inspection to quality documentation — the complete path to technical safety, under one roof.',
  },
};

function ServicesHeader({ lang }: { lang: 'sl' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const stiriOpacity = useTransform(scrollYProgress, [0.02, 0.2], [0, 1]);
  const stiriY = useTransform(scrollYProgress, [0.02, 0.2], [40, 0]);
  const promiseOpacity = useTransform(scrollYProgress, [0.12, 0.42], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.35, 0.52], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.35, 0.52], [0, 1]);
  const descOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.42, 0.58], [20, 0]);

  return (
    <div ref={ref} className="px-6 pt-20 md:pt-44 pb-14 md:pb-32 flex flex-col items-center text-center">
      <motion.h2 style={{ opacity: stiriOpacity, y: stiriY }}
        className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.0] text-white">
        {HEADER_COPY.line1[lang]}
      </motion.h2>
      <motion.h2 style={{ opacity: promiseOpacity }}
        className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.0] text-white mt-1">
        {HEADER_COPY.line2[lang]}
      </motion.h2>
      <motion.div style={{ scaleX: lineScale, opacity: lineOpacity }}
        className="mt-10 h-px w-64 bg-gradient-to-r from-transparent via-[#0071e3]/70 to-transparent origin-center" />
      <motion.p style={{ opacity: descOpacity, y: descY }}
        className="mt-6 text-base md:text-xl text-white/60 max-w-xl leading-relaxed font-light px-2 md:px-0">
        {HEADER_COPY.desc[lang]}
      </motion.p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared CTA button — same style as HoverBorderGradient, category color
// ---------------------------------------------------------------------------

type Dir = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';
const DIRS: Dir[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];

function CategoryCTA({ onClick, hex, children, fullWidth = false }: { onClick: () => void; hex: string; children: React.ReactNode; fullWidth?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [dir, setDir] = useState<Dir>('BOTTOM');

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setDir(d => DIRS[(DIRS.indexOf(d) - 1 + 4) % 4]), 1000);
    return () => clearInterval(id);
  }, [hovered]);

  // Identical to HoverBorderGradient movingMap — only hex color changes
  const movingMap: Record<Dir, string> = {
    TOP:    `radial-gradient(20.7% 50% at 50% 0%,                ${hex} 0%, rgba(255,255,255,0) 100%)`,
    LEFT:   `radial-gradient(16.6% 43.1% at 0% 50%,              ${hex} 0%, rgba(255,255,255,0) 100%)`,
    BOTTOM: `radial-gradient(20.7% 50% at 50% 100%,              ${hex} 0%, rgba(255,255,255,0) 100%)`,
    RIGHT:  `radial-gradient(16.2% 41.199999999999996% at 100% 50%,${hex} 0%, rgba(255,255,255,0) 100%)`,
  };
  const highlight = `radial-gradient(75% 181.15942028985506% at 50% 50%, ${hex} 0%, rgba(255,255,255,0) 100%)`;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex h-min flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-2xl border border-white/10 bg-white/10 box-decoration-clone p-[1px] backdrop-blur-3xl transition duration-500 hover:bg-white/15 ${fullWidth ? 'w-full' : 'w-fit'}`}
    >
      <div className={`z-10 rounded-[inherit] bg-black/80 group-hover:bg-transparent px-6 py-3 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-500 ${fullWidth ? 'w-full' : 'w-auto'}`}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)', position: 'absolute', width: '100%', height: '100%' }}
        animate={{ background: hovered ? highlight : movingMap[dir] }}
        transition={{ ease: 'linear', duration: 1 }}
      />
      <div className="absolute inset-px z-[1] flex-none rounded-[inherit] bg-black/40 group-hover:bg-transparent backdrop-blur-3xl transition-colors duration-500" />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Capability row
// ---------------------------------------------------------------------------

interface RowProps {
  index: number;
  category: ServiceCategory;
  imageUrl?: string;
  flip: boolean;
  onItemClick: (item: ServiceItem) => void;
}

function CapabilityRow({ index, category, imageUrl, flip, onItemClick }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '-8%'] : ['0%', '-22%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 1], isMobile ? [1.0, 1.0, 1.0] : [1.12, 1.0, 1.0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);
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
  const ctaOpacity = useTransform(scrollYProgress, [0.36, 0.47], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.36, 0.47], [12, 0]);
  const numStr = String(index).padStart(2, '0');
  const hex = CATEGORY_HEX[category.id] ?? '#ffffff';

  return (
    <div ref={ref} id={`services-${category.id}`} className="relative w-full min-h-screen overflow-hidden bg-black">
      {imageUrl && (
        <motion.div className="absolute inset-x-0 top-0 w-full h-full md:h-[130%] pointer-events-none" style={{ y: imageY, scale: imageScale }}>
          <img src={imageUrl} alt="" loading="lazy" decoding="async"
            style={isMobile ? { objectPosition: MOBILE_FOCAL[category.id] ?? '50% 50%' } : undefined}
            className={`w-full h-full object-cover ${flip ? 'md:object-left' : 'md:object-right'} opacity-80 md:opacity-85`}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </motion.div>
      )}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />
      <div className={`hidden md:block absolute inset-0 z-10 ${flip ? 'bg-gradient-to-l from-black via-black/85 to-transparent' : 'bg-gradient-to-r from-black via-black/85 to-transparent'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 md:hidden z-10" />

      <motion.div style={{ y: contentY }}
        className={`relative z-20 w-full max-w-[1200px] mx-auto px-6 min-h-screen flex flex-col justify-center py-24 md:py-40 ${flip ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
        <div className={`max-w-2xl flex flex-col ${flip ? 'md:items-end' : 'md:items-start'}`}>
          <motion.div style={{ opacity: numOpacity, y: numY }}
            className="text-base text-white/40 mb-5 font-medium tabular-nums font-mono">
            {numStr}
          </motion.div>
          <motion.h3 style={{ opacity: titleOpacity, y: titleY }}
            className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.03em] text-white mb-4 leading-[1.05] max-md:[text-shadow:0_2px_16px_rgba(0,0,0,1),0_8px_40px_rgba(0,0,0,0.8)]">
            {category.title}
          </motion.h3>
          {category.subtitle && (
            <motion.h4 style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="text-xl md:text-2xl text-white/90 font-medium mb-6 max-md:[text-shadow:0_1px_10px_rgba(0,0,0,0.9)]">
              {category.subtitle}
            </motion.h4>
          )}
          <motion.p style={{ opacity: descOpacity, y: descY }}
            className={`text-lg md:text-xl text-white/60 max-md:text-white/95 leading-snug mb-10 font-light max-w-lg max-md:[text-shadow:0_1px_8px_rgba(0,0,0,0.9)] ${flip ? 'md:text-right' : 'md:text-left'}`}>
            {category.description}
          </motion.p>
          {category.items && category.items.length > 0 && (
            <motion.div style={{ opacity: chipsOpacity, y: chipsY }}
              className={`flex flex-wrap gap-2 max-w-lg ${flip ? 'md:justify-end' : ''}`}>
              {category.items.map((item) => (
                <button key={item.id} onClick={() => onItemClick(item)}
                  className="px-4 py-2 rounded-xl bg-white/5 max-md:bg-neutral-700/70 text-sm text-white/80 font-medium hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-left">
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}

          {category.items && category.items.length > 0 && (
            <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-6">
              <CategoryCTA onClick={() => onItemClick(category.items[0])} hex={hex}>
                {language === 'sl' ? 'Preglej podrobnosti' : 'View details'}
                <ArrowRight size={15} />
              </CategoryCTA>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal — sidebar + 3D card
// ---------------------------------------------------------------------------

const sidebarListVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.055 } },
};

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 130, damping: 16 } },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 14 } },
};

function ServiceModal({
  initialItem,
  category: initialCategory,
  allCategories,
  onClose,
}: {
  initialItem: ServiceItem;
  category: ServiceCategory;
  allCategories: ServiceCategory[];
  onClose: () => void;
}) {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [current, setCurrent] = useState(initialItem);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [stripDir, setStripDir] = useState<Dir>('BOTTOM');
  const { language } = useLanguage();
  const hex = CATEGORY_HEX[currentCategory.id] ?? '#3b82f6';

  useEffect(() => {
    const id = setInterval(() => setStripDir(d => DIRS[(DIRS.indexOf(d) - 1 + 4) % 4]), 1000);
    return () => clearInterval(id);
  }, []);

  const stripMovingMap: Record<Dir, string> = {
    TOP:    `radial-gradient(20.7% 50% at 50% 0%,                   ${hex} 0%, rgba(255,255,255,0) 100%)`,
    LEFT:   `radial-gradient(16.6% 43.1% at 0% 50%,                 ${hex} 0%, rgba(255,255,255,0) 100%)`,
    BOTTOM: `radial-gradient(20.7% 50% at 50% 100%,                 ${hex} 0%, rgba(255,255,255,0) 100%)`,
    RIGHT:  `radial-gradient(16.2% 41.2% at 100% 50%,               ${hex} 0%, rgba(255,255,255,0) 100%)`,
  };

  const switchCategory = (cat: ServiceCategory) => {
    setCurrentCategory(cat);
    setCurrent(cat.items[0]);
    const el = document.getElementById(`services-${cat.id}`);
    if (!el) return;
    // @ts-ignore
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquiry = () => {
    window.dispatchEvent(new CustomEvent('prefillContact', {
      detail: { categoryId: currentCategory.id, itemLabel: current.label },
    }));
    onClose();
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (!el) return;
      // @ts-ignore
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const quickFacts = current.quickFacts
    ? [
        { label: language === 'sl' ? 'Standard' : 'Standard', value: current.quickFacts.standard },
        { label: language === 'sl' ? 'Področje' : 'Application', value: current.quickFacts.application },
        { label: language === 'sl' ? 'Rezultat' : 'Result', value: current.quickFacts.result },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/85 backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundImage: `radial-gradient(circle at center, ${hex}0f 0%, transparent 65%)`
      }}
      onClick={onClose}
    >
      {/* Outer flex wrapper: sidebar + card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotateX: 6, y: 30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, rotateX: 4, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        className="flex flex-col md:flex-row md:items-start gap-3 w-full max-w-[840px] h-full md:h-auto md:max-h-[92vh] overflow-y-auto overflow-x-hidden md:overflow-visible p-3 pb-24 md:p-0 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── SIDEBAR ── */}
        <div
          className="rounded-3xl max-md:p-0 p-px shrink-0 w-full md:w-[270px] md:self-start md:max-h-[85vh] md:[background:linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.12)_100%)] md:shadow-[0_32px_80px_rgba(0,0,0,0.85),0_8px_20px_rgba(0,0,0,0.6)]"
        >
          <div className="rounded-3xl bg-[#080808] p-3 pb-0 md:pb-3 md:h-full md:overflow-y-auto max-md:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">

            {/* Sticky top: category switcher + header + mobile label + icon strip */}
            <div className="sticky top-0 z-10 bg-[#080808] -mt-3 pt-3 pb-3 md:-mx-3 md:px-3 md:border-b md:border-white/[0.04]">
              {/* Category switcher — 2×2 grid */}
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {allCategories.map((cat) => {
                  const catHex = CATEGORY_HEX[cat.id] ?? '#fff';
                  const isActive = cat.id === currentCategory.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => switchCategory(cat)}
                      className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: isActive ? `${catHex}18` : 'rgba(255,255,255,0.03)',
                        color: isActive ? catHex : 'rgba(255,255,255,0.4)',
                        border: `1px solid ${isActive ? `${catHex}35` : 'rgba(255,255,255,0.04)'}`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          background: catHex,
                          opacity: isActive ? 1 : 0.4,
                          boxShadow: isActive ? `0 0 5px 1.5px ${catHex}70` : 'none',
                        }}
                      />
                      <span>{cat.shortTitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Category header */}
              <div className="relative rounded-2xl bg-[#121212] px-4 py-3.5 overflow-hidden border border-white/[0.03] mb-3">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${currentCategory.color}`}>
                  {currentCategory.shortTitle}
                </span>
                <p className="text-xs text-white/40 mt-0.5 leading-snug line-clamp-2">{currentCategory.title}</p>
              </div>

              {/* Mobile: active label + icon strip (sticky with the rest) */}
              <div className="md:hidden flex flex-col gap-2">
                {/* Active item label */}
                <div className="flex items-center gap-2 px-1">
                  <ItemIcon name={current.icon} size={12} style={{ color: hex }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider truncate" style={{ color: hex }}>
                    {current.label}
                  </span>
                </div>
                {/* Icon strip with rotating glow border */}
                <div className="relative rounded-2xl border border-white/10 bg-white/10 p-[1px] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 z-0 rounded-[inherit]"
                    style={{ filter: 'blur(2px)', width: '100%', height: '100%' }}
                    animate={{ background: stripMovingMap[stripDir] }}
                    transition={{ ease: 'linear', duration: 1 }}
                  />
                  <div className="absolute inset-px z-[1] rounded-[inherit] bg-[#080808]" />
                  <div className="relative z-[2] flex gap-1.5 overflow-x-auto scrollbar-none p-1">
                    {currentCategory.items.map((item) => {
                      const isActive = item.id === current.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setCurrent(item)}
                          title={item.label}
                          style={{
                            backgroundColor: isActive ? `${hex}22` : undefined,
                            borderColor: isActive ? `${hex}50` : 'transparent',
                          }}
                          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border border-transparent bg-white/[0.03] transition-all duration-200"
                        >
                          <ItemIcon
                            name={item.icon}
                            size={15}
                            style={{ color: isActive ? hex : undefined }}
                            className={isActive ? '' : 'text-white/35'}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-[3]" />
                </div>
              </div>
            </div>{/* end sticky */}

            {/* Items list — desktop only */}
            <motion.ul
              key={currentCategory.id}
              role="list"
              className="space-y-1.5 md:block hidden mt-1 pb-3"
              variants={sidebarListVariants}
              initial="hidden"
              animate="visible"
            >
              {currentCategory.items.map((item) => {
                const isActive = item.id === current.id;
                const isHovered = hoveredId === item.id;
                const lit = isActive || isHovered;
                return (
                  <motion.li key={item.id} role="listitem" className="relative" variants={sidebarItemVariants}>
                    <button
                      onClick={() => setCurrent(item)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="w-full relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left border border-transparent transition-all duration-200 overflow-hidden"
                    >
                      {/* Active sliding indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="active-modal-indicator"
                          className="absolute inset-0 z-0 rounded-xl"
                          style={{
                            backgroundColor: `${hex}12`,
                            border: `1px solid ${hex}35`,
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Hover subtle overlay */}
                      {!isActive && isHovered && (
                        <div
                          className="absolute inset-0 z-0 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-3 w-full">
                        <div
                          style={{
                            backgroundColor: lit ? `${hex}18` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${lit ? `${hex}30` : 'transparent'}`,
                            transition: 'all 180ms ease',
                          }}
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden"
                        >
                          <ItemIcon
                            name={item.icon}
                            size={14}
                            style={{ color: lit ? hex : undefined, transition: 'color 180ms ease' }}
                            className={lit ? '' : 'text-white/35'}
                          />
                        </div>
                        <span
                          style={{
                            color: isActive ? '#fff' : isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
                            transition: 'color 180ms ease'
                          }}
                          className={`text-xs leading-snug transition-all ${lit ? 'font-semibold tracking-wide' : 'font-medium'}`}
                        >
                          {item.label}
                        </span>

                        {/* Active tiny glowing led dot on the far right */}
                        {isActive && (
                          <span
                            className="ml-auto w-1 h-1 rounded-full shrink-0 animate-pulse"
                            style={{
                              backgroundColor: hex,
                              boxShadow: `0 0 5px 1.5px ${hex}`,
                            }}
                          />
                        )}
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>

          </div>{/* end inner sidebar */}
        </div>{/* end p-px wrapper */}

        {/* ── MAIN CARD ── */}
        <GlowCard
          customSize
          glowColor={CATEGORY_GLOW[currentCategory.id] ?? 'blue'}
          className="flex-1 min-w-0 overflow-visible md:overflow-hidden shadow-[0_48px_120px_rgba(0,0,0,0.9),0_16px_40px_rgba(0,0,0,0.7)]"
        >
          <div className="rounded-[18px] bg-[#080808] p-3 pb-20 md:pb-3 overflow-y-auto md:max-h-[85vh] relative" style={{ touchAction: 'pan-y' }}>
            
            {/* Engineering technical blueprint layout underlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] select-none z-0">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="modal-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#modal-grid)" />
                {/* precise calibration marks */}
                <line x1="20" y1="50%" x2="40" y2="50%" stroke={hex} strokeWidth="1.5" />
                <line x1="50%" y1="20" x2="50%" y2="40" stroke={hex} strokeWidth="1.5" />
                <circle cx="50%" cy="50%" r="30" fill="none" stroke={hex} strokeWidth="0.5" strokeDasharray="3,3" />
                <circle cx="50%" cy="50%" r="4" fill={hex} />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative z-10"
              >

                {/* Header */}
                <div className="relative rounded-2xl bg-[#121212] p-6 mb-2 overflow-hidden border border-white/[0.03]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <button onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-300 hover:rotate-90 z-10">
                    <X size={16} />
                  </button>

                  {/* Icon + badge row */}
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <ItemIcon name={current.icon} size={18} className={currentCategory.color} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${currentCategory.color}`}>
                        {currentCategory.shortTitle}
                      </span>
                      <span className="text-[8px] font-mono text-white/30 tracking-wider">SEC: 00{currentCategory.id.toUpperCase()}</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug pr-8 mb-3.5 tracking-tight">
                    {current.label}
                  </h3>
                  {current.description && (
                    <p className="text-sm text-white/50 leading-relaxed font-light">{current.description}</p>
                  )}
                </div>

                {/* Details */}
                {current.details && current.details.length > 0 && (
                  <div className="relative rounded-2xl bg-[#121212] p-6 mb-2 overflow-hidden border border-white/[0.03]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <motion.ul role="list" className="space-y-2.5" variants={cardVariants} initial="hidden" animate="visible">
                      {current.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          role="listitem"
                          variants={cardItemVariants}
                          className="group flex items-start gap-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.02] hover:border-white/[0.06] px-4 py-3.5 transition-all duration-300 hover:translate-x-1 cursor-default"
                        >
                          <svg
                            className={`mt-0.5 shrink-0 w-3.5 h-3.5 ${currentCategory.color} transition-transform duration-300 group-hover:translate-x-1`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 17 5-5-5-5M13 17l5-5-5-5" />
                          </svg>
                          <span className="text-sm text-white/55 group-hover:text-white/80 transition-colors leading-snug">{detail}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}

                {/* Quick facts (Instrument Telemetry Card) */}
                {quickFacts.length > 0 && (
                  <div className="relative rounded-2xl bg-[#121212] p-6 overflow-hidden border border-white/[0.03]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {/* Glowing LED banner for standard verification */}
                    <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-3">
                      <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-400 font-mono">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        {language === 'sl' ? 'Skladnost potrjena' : 'Compliance verified'}
                      </span>
                      <span className="text-[7.5px] font-mono text-white/20">NDT_REF_CAL_010</span>
                    </div>

                    <motion.div className="grid grid-cols-3 gap-2.5" variants={cardVariants} initial="hidden" animate="visible">
                      {quickFacts.map(({ label, value }) => (
                        <motion.div
                          key={label}
                          variants={cardItemVariants}
                          className="relative rounded-xl bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.03] hover:border-white/[0.06] transition-all duration-300 px-3.5 py-3.5 flex flex-col gap-1.5"
                        >
                          {/* Corner bracket styling */}
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 rounded-tl-sm pointer-events-none" />
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 rounded-tr-sm pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 rounded-bl-sm pointer-events-none" />
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 rounded-br-sm pointer-events-none" />

                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 font-mono">{label}</span>
                          <span className="text-xs text-white/70 leading-snug font-mono select-all tracking-tight break-words">{value}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Inquiry CTA */}
                <motion.div variants={cardItemVariants} className="mt-2.5">
                  <CategoryCTA onClick={handleInquiry} hex={hex} fullWidth>
                    <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    {language === 'sl' ? 'Pošlji povpraševanje' : 'Send inquiry'}
                  </CategoryCTA>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>
        </GlowCard>

      </motion.div>
    </motion.div>
  );
}
