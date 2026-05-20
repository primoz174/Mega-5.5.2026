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
import MethodIllustrations from './MethodIllustrations';

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
  hidden: { opacity: 0, x: -4 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 14 } },
};

interface TelemetryData {
  logTitle: string;
  blockLabel: string;
  blockVal: string;
  deviceLabel: string;
  deviceVal: string;
  paramLabel: string;
  paramVal: string;
  statusLabel: string;
  statusVal: string;
  ledBlink: boolean;
}

const getMethodStandards = (id: string, lang: 'sl' | 'en'): Array<{ code: string; desc: string }> => {
  const map: Record<string, Array<{ code: string; desc: string }>> = {
    vt: [
      { code: 'EN ISO 17637', desc: lang === 'sl' ? 'Vizualna kontrola zvarnih spojev' : 'NDT of welds — Visual testing of fusion-welded joints' },
      { code: 'ASME Sec. V Art. 9', desc: lang === 'sl' ? 'Vizualni pregled tlačne opreme' : 'ASME Section V Article 9 — Visual Examination' }
    ],
    pt: [
      { code: 'EN ISO 3452-1', desc: lang === 'sl' ? 'Preiskave s penetranti — Splošna načela' : 'NDT — Penetrant testing — General principles' },
      { code: 'ASME Sec. V Art. 6', desc: lang === 'sl' ? 'Preiskava s tekočimi penetranti' : 'ASME Section V Article 6 — Liquid Penetrant Examination' }
    ],
    mt: [
      { code: 'EN ISO 17638', desc: lang === 'sl' ? 'Magnetnofluksna kontrola zvarov' : 'NDT of welds — Magnetic particle testing' },
      { code: 'ASME Sec. V Art. 7', desc: lang === 'sl' ? 'Magnetna preiskava' : 'ASME Section V Article 7 — Magnetic Particle Examination' }
    ],
    ut: [
      { code: 'EN ISO 17640', desc: lang === 'sl' ? 'Ultrazvočna preiskava zvarnih spojev' : 'NDT of welds — Ultrasonic testing — Techniques' },
      { code: 'ASME Sec. V Art. 5', desc: lang === 'sl' ? 'Ultrazvočna preiskava materiala in zvarov' : 'ASME Section V Article 5 — Ultrasonic Examination' }
    ],
    utt: [
      { code: 'EN 15317', desc: lang === 'sl' ? 'Ultrazvočno merjenje debeline stene' : 'NDT — Ultrasonic testing — Thickness measurement' },
      { code: 'ASTM E797', desc: lang === 'sl' ? 'Standardna praksa za merjenje debeline z ultrazvokom' : 'Standard Practice for Measuring Thickness by Manual Ultrasonic' }
    ],
    lt: [
      { code: 'EN 1779 / 13185', desc: lang === 'sl' ? 'Preiskava tesnosti — Izbira metode' : 'NDT — Leak testing — Criteria for method selection' },
      { code: 'ASME Sec. V Art. 10', desc: lang === 'sl' ? 'Preiskava tesnosti tlačne opreme' : 'ASME Section V Article 10 — Leak Testing' }
    ],
    rt: [
      { code: 'EN ISO 17636-1', desc: lang === 'sl' ? 'Radiografska kontrola zvarov — Rentgenski in gama žarki s filmom' : 'NDT of welds — Radiographic testing — Film techniques' },
      { code: 'ASME Sec. V Art. 2', desc: lang === 'sl' ? 'Radiografska preiskava' : 'ASME Section V Article 2 — Radiographic Examination' }
    ],
    'rt-eval': [
      { code: 'EN ISO 10675-1', desc: lang === 'sl' ? 'Sprejemni nivoji za radiografsko kontrolo jekla' : 'NDT of welds — Acceptance levels for radiographic testing' },
      { code: 'EN ISO 5817', desc: lang === 'sl' ? 'Stopnje kakovosti glede na nepravilnosti' : 'Welding — Quality levels for imperfections in steel' }
    ],
    uci: [
      { code: 'DIN 50159-1', desc: lang === 'sl' ? 'Merjenje trdote po UCI metodi' : 'Metallic materials — Hardness testing to the UCI method' },
      { code: 'ASTM A1038', desc: lang === 'sl' ? 'Standardna metoda za testiranje trdote z UCI' : 'Standard Test Method for Portable Hardness Testing by UCI' }
    ],
    leeb: [
      { code: 'EN ISO 16859-1', desc: lang === 'sl' ? 'Merjenje trdote po Leebovi metodi' : 'Metallic materials — Leeb hardness test' },
      { code: 'ASTM A956', desc: lang === 'sl' ? 'Standardna metoda za testiranje trdote po Leebu' : 'Standard Test Method for Leeb Hardness Testing' }
    ],
    varilni: [
      { code: 'EN ISO 3834', desc: lang === 'sl' ? 'Zahteve za kakovost pri talilnem varjenju kovinskih materialov' : 'Quality requirements for fusion welding of metallic materials' },
      { code: 'EN 1090-2', desc: lang === 'sl' ? 'Izvedba jeklenih konstrukcij' : 'Execution of steel structures and aluminium structures' }
    ],
    prevzemi: [
      { code: 'EN 10204 3.1/3.2', desc: lang === 'sl' ? 'Kovinski izdelki — Vrste inšpekcijskih dokumentov' : 'Metallic products — Types of inspection documents' },
      { code: 'PED 2014/68/EU', desc: lang === 'sl' ? 'Direktiva o tlačni opremi' : 'Pressure Equipment Directive (PED)' }
    ],
    'third-party': [
      { code: 'EN ISO/IEC 17020', desc: lang === 'sl' ? 'Zahteve za delovanje različnih organov, ki izvajajo kontrolne preglede' : 'Requirements for the operation of various types of bodies performing inspection' }
    ],
    vhodna: [
      { code: 'EN 10204', desc: lang === 'sl' ? 'Vrste inšpekcijskih dokumentov za materiale' : 'Types of inspection documents for materials' },
      { code: 'ISO 2768', desc: lang === 'sl' ? 'Splošne tolerance za linearne in kotne mere' : 'General tolerances for linear and angular dimensions' }
    ],
    koordinacija: [
      { code: 'EN ISO 14731', desc: lang === 'sl' ? 'Koordinacija varjenja — Naloge in odgovornosti' : 'Welding coordination — Tasks and responsibilities' },
      { code: 'EN ISO 3834-2', desc: lang === 'sl' ? 'Celovite zahteve za kakovost varjenja' : 'Comprehensive quality requirements for welding' }
    ]
  };
  return map[id] || [
    { code: 'EN ISO 9001', desc: lang === 'sl' ? 'Sistemi vodenja kakovosti' : 'Quality management systems' }
  ];
};

const getMethodTelemetry = (id: string, lang: 'sl' | 'en'): TelemetryData => {
  const isEn = lang === 'en';
  switch (id) {
    case 'ut':
    case 'utt':
      return {
        logTitle: isEn ? "ULTRASONIC TELEMETRY LOG" : "ULTRAZVOČNA TELEMETRIJA",
        blockLabel: isEn ? "Cal. Block" : "Kalibr. blok",
        blockVal: "V1 (EN 12223) / V2",
        deviceLabel: isEn ? "Transducer" : "Sonda",
        deviceVal: "4MHz Dual-Element (SE)",
        paramLabel: isEn ? "Velocity" : "Hitrost",
        paramVal: "5920 m/s (Steel)",
        statusLabel: isEn ? "System status" : "Stanje sistema",
        statusVal: isEn ? "CALIBRATED & SECURE" : "KALIBRIRANO & VARNO",
        ledBlink: true,
      };
    case 'vt':
      return {
        logTitle: isEn ? "VISUAL AUDIT LOG" : "VIZUALNI REVIZIJSKI DNEVNIK",
        blockLabel: isEn ? "Lux Level" : "Osvetljenost",
        blockVal: "> 550 Lux (ISO 3059)",
        deviceLabel: isEn ? "Optics" : "Optika",
        deviceVal: "6.0mm HD Endoscope / Weld Gauge",
        paramLabel: isEn ? "Contrast" : "Kontrast",
        paramVal: isEn ? "Visual ratio > 1:10" : "Vizualno razmerje > 1:10",
        statusLabel: isEn ? "Illumination" : "Osvetlitev",
        statusVal: isEn ? "OPTIMAL ILLUMINANCE" : "OPTIMALNA OSVETLITEV",
        ledBlink: true,
      };
    case 'pt':
      return {
        logTitle: isEn ? "PENETRANT TELEMETRY" : "PENETRANTSKA TELEMETRIJA",
        blockLabel: isEn ? "TAM Panel" : "Kontrolna ploščica",
        blockVal: "ISO 3452-3 TAM Panel",
        deviceLabel: isEn ? "Chemicals" : "Kemikalije",
        deviceVal: "Class 2 Solvent / Red Dye",
        paramLabel: isEn ? "Dwell Time" : "Čas delovanja",
        paramVal: "10 min @ 20°C",
        statusLabel: isEn ? "Capillary action" : "Kapilarni vlek",
        statusVal: isEn ? "CAPILLARY ACTIVE" : "KAPILARNO AKTIVNO",
        ledBlink: true,
      };
    case 'mt':
      return {
        logTitle: isEn ? "MAGNETIC PARTICLE TELEMETRY" : "MAGNETNA TELEMETRIJA",
        blockLabel: isEn ? "Field Indicator" : "Indikator polja",
        blockVal: "Castrol Strip / Berthold Ring",
        deviceLabel: isEn ? "Yoke Device" : "Magnetni jarem",
        deviceVal: "AC Yoke Y-2 (4.5kg Lift)",
        paramLabel: isEn ? "Suspension" : "Suspenzija",
        paramVal: isEn ? "Fluorescent / Water suspension" : "Fluorescentna / Vodna",
        statusLabel: isEn ? "Field intensity" : "Jakost polja",
        statusVal: isEn ? "MAGNETIC FIELD ACTIVE" : "MAGNETNO POLJE AKTIVNO",
        ledBlink: true,
      };
    case 'rt':
    case 'rt-eval':
      return {
        logTitle: isEn ? "RADIOGRAPHIC TELEMETRY" : "RADIOGRAFSKA TELEMETRIJA",
        blockLabel: isEn ? "Source/Tube" : "Izvor sevanja",
        blockVal: "Ir-192 (Gamma) / X-Ray 220kV",
        deviceLabel: isEn ? "IQI Indicator" : "IQI indikator",
        deviceVal: "EN ISO 19232-1 Fe 10/16 W",
        paramLabel: isEn ? "Density" : "Optična gostota",
        paramVal: "2.35 - 2.50 H&D (Target)",
        statusLabel: isEn ? "Dosimetry" : "Dozimetrija",
        statusVal: isEn ? "DOSIMETRY STABLE" : "DOZIMETRIJA STABILNA",
        ledBlink: true,
      };
    case 'lt':
      return {
        logTitle: isEn ? "LEAK TESTING COMPLIANCE" : "PREISKAVA TESNOSTI",
        blockLabel: isEn ? "Cal. Leak" : "Kalibr. puščanje",
        blockVal: "10^-5 Pa m^3/s Cal.",
        deviceLabel: isEn ? "Apparatus" : "Aparatura",
        deviceVal: "Vacuum Box / Surfactant Formulation",
        paramLabel: isEn ? "Pressure" : "Tlak / Vakuum",
        paramVal: "-0.3 bar vacuum (Target)",
        statusLabel: isEn ? "Tightness status" : "Stanje tesnosti",
        statusVal: isEn ? "PRESSURE SEAL SECURE" : "TLAK STABILEN / TESNO",
        ledBlink: true,
      };
    case 'uci':
    case 'leeb':
      return {
        logTitle: isEn ? "HARDNESS TESTING LOG" : "MERJENJE TRDOTE",
        blockLabel: isEn ? "Cal. Block" : "Kalibr. ploščica",
        blockVal: "Test Block (240 HV5)",
        deviceLabel: isEn ? "Method / Probe" : "Metoda / Sonda",
        deviceVal: id === 'uci' ? "UCI 10N Rod" : "Leeb Type D Impact Device",
        paramLabel: isEn ? "Scale conversion" : "Konverzija lestvic",
        paramVal: "HV / HB / HRC (Automatic)",
        statusLabel: isEn ? "Sensor alignment" : "Poravnava sonde",
        statusVal: isEn ? "REBOUND READY" : "PRIPRAVLJEN NA MERITEV",
        ledBlink: true,
      };
    default:
      return {
        logTitle: isEn ? "COMPLIANCE & SUPERVISION AUDIT" : "REVIZIJA SKLADNOSTI & NADZORA",
        blockLabel: isEn ? "Framework" : "Okvir delovanja",
        blockVal: "EN ISO 3834 / ISO/IEC 17020",
        deviceLabel: isEn ? "Auditor Role" : "Vloga auditorja",
        deviceVal: "IWE / NDT Level III Inspector",
        paramLabel: isEn ? "Assessment" : "Ocenjevanje",
        paramVal: isEn ? "Third-Party Neutrality" : "Nevtralnost tretje stranke",
        statusLabel: isEn ? "Compliance status" : "Status skladnosti",
        statusVal: isEn ? "AUDIT ACTIVE / EN ISO SECURE" : "REVIZIJA AKTIVNA / SKLADNO",
        ledBlink: true,
      };
  }
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
  const lang = language as 'sl' | 'en';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-hidden">
      {/* Separated Backdrop Layer (GPU-isolated for Safari backdrop-filter performance) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${hex}0f 0%, transparent 65%)`
        }}
        onClick={onClose}
      />

      {/* Outer flex wrapper: sidebar + card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ touchAction: 'pan-y' }}
        data-lenis-prevent
        className="flex flex-col md:flex-row md:items-stretch gap-3 w-full max-w-[1080px] h-full md:h-[75vh] md:min-h-[580px] md:max-h-[720px] overflow-y-auto overflow-x-hidden md:overflow-visible p-3 pb-24 md:p-0 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── SIDEBAR ── */}
        <div
          className="rounded-3xl max-md:p-0 p-px shrink-0 w-full md:w-[270px] md:h-full md:[background:linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.12)_100%)] md:shadow-[0_32px_80px_rgba(0,0,0,0.85),0_8px_20px_rgba(0,0,0,0.6)]"
        >
          <div data-lenis-prevent className="rounded-3xl bg-[#080808] p-3 pb-0 md:pb-3 md:h-full md:overflow-y-auto max-md:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">

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
          className="flex-1 min-w-0 md:h-full md:flex md:flex-col overflow-visible md:overflow-hidden shadow-[0_48px_120px_rgba(0,0,0,0.9),0_16px_40px_rgba(0,0,0,0.7)]"
        >
          {/* Inner unified container */}
          <div className="rounded-[18px] bg-[#080808] flex flex-col flex-1 h-full overflow-hidden relative">
            
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

            {/* Scrollable Content Area */}
            <div data-lenis-prevent className="p-5 md:p-6 overflow-y-auto flex-1 min-h-0 relative z-10" style={{ touchAction: 'pan-y' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative z-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                    {/* Left Column: Description & Compliance Standards */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      {/* Header */}
                      <div className="relative rounded-2xl bg-[#121212] p-6 overflow-hidden border border-white/[0.03]">
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
                        <div className="relative rounded-2xl bg-[#121212] p-6 overflow-hidden border border-white/[0.03]">
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          <ul role="list" className="space-y-2.5">
                            {current.details.map((detail, i) => (
                              <li
                                key={i}
                                role="listitem"
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
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Dynamic Standards Block */}
                      {(() => {
                        const standards = getMethodStandards(current.id, lang);
                        if (!standards || standards.length === 0) return null;
                        return (
                          <div className="relative rounded-2xl bg-[#121212] p-6 overflow-hidden border border-white/[0.03]">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                                {lang === 'sl' ? '// VELJAVNI STANDARDI IN SKLADNOST' : '// APPLICABLE STANDARDS & COMPLIANCE'}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {standards.map((std, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col gap-1 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: hex }} />
                                    <span className="font-mono text-[11px] font-bold text-white tracking-wide">{std.code}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-light leading-relaxed">{std.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Level III indicator */}
                      {current.level3 && (
                        <div className="flex items-center gap-2 px-1">
                          <span
                            className="flex items-center gap-1.5 font-mono text-[9px] px-3 py-1.5 rounded-lg border"
                            style={{ color: `${hex}bb`, borderColor: `${hex}40`, background: `${hex}05` }}
                          >
                            <ShieldCheck size={11} style={{ color: hex }} />
                            {lang === 'sl' ? 'EN ISO 9712 Nivo III Certifikacija' : 'EN ISO 9712 Level III Certified'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: 3D Visualization & Telemetry */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      {/* 3D Visual Section */}
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                            {lang === 'sl' ? '// 3D INTERAKTIVNA VIZUALIZACIJA' : '// 3D INTERACTIVE VISUALIZATION'}
                          </span>
                          <span className="flex items-center gap-1.5 font-mono text-[8px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-400">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                            </span>
                            R3F GLSL
                          </span>
                        </div>

                        <div className="relative w-full h-[240px] rounded-xl bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center group/viewfinder shadow-inner">
                          <MethodIllustrations methodId={current.id} color={hex} />
                          
                          {/* Telemetry Grid overlay */}
                          <div className="absolute inset-0 border border-white/[0.03] pointer-events-none rounded-xl" />
                          
                          {/* Interaction Hint */}
                          <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none opacity-0 group-hover/viewfinder:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur border border-white/10 rounded-md py-1 text-[9px] font-mono tracking-wider text-slate-400">
                            {lang === 'sl' 
                              ? 'Povlecite za rotacijo 3D modela | Premaknite miško za video' 
                              : 'Drag to rotate 3D model | Hover for video demonstration'}
                          </div>
                        </div>
                      </div>

                      {/* Telemetry Calibration Block */}
                      {(() => {
                        const tele = getMethodTelemetry(current.id, lang);
                        return (
                          <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/[0.05] bg-black/50 font-mono text-[10px] relative overflow-hidden">
                            {/* Diagonal grid lines background effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
                            
                            <div className="flex items-center justify-between border-b border-white/5 pb-2 relative z-10">
                              <span className="font-bold text-slate-400 tracking-wider">[{tele.logTitle}]</span>
                              <span className="text-[8px] text-slate-600">SYS_V2.1.0</span>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 relative z-10">
                              <div className="text-slate-500">{tele.blockLabel}:</div>
                              <div className="text-slate-300 text-right font-semibold">{tele.blockVal}</div>

                              <div className="text-slate-500">{tele.deviceLabel}:</div>
                              <div className="text-slate-300 text-right font-semibold">{tele.deviceVal}</div>

                              <div className="text-slate-500">{tele.paramLabel}:</div>
                              <div className="text-slate-300 text-right font-semibold">{tele.paramVal}</div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1 relative z-10">
                              <span className="text-slate-500">{tele.statusLabel}:</span>
                              <span className="flex items-center text-[9px] font-bold text-emerald-400 tracking-wide">
                                {tele.ledBlink && (
                                  <span className="relative flex h-2 w-2 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                  </span>
                                )}
                                {tele.statusVal}
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Static Premium Inquiry Footer */}
            <div className="p-5 pt-3.5 border-t border-white/[0.04] bg-[#080808] relative z-20 rounded-b-[18px]">
              <CategoryCTA onClick={handleInquiry} hex={hex} fullWidth>
                <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                {language === 'sl' ? 'Pošlji povpraševanje' : 'Send inquiry'}
              </CategoryCTA>
            </div>

          </div>
        </GlowCard>

      </motion.div>
    </div>
  );
}
