import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  ScanEye, ShieldCheck, ClipboardCheck, Lightbulb,
  Eye, Droplet, Magnet, Activity, Ruler, Wind, Radiation, FileSearch, Hammer,
  Shield, CheckSquare, Users, PackageCheck, Network, FileText, Factory, FileSignature, BookOpen,
  Settings, Award, Book, GraduationCap, ArrowRight, Download, FileBadge, ChevronDown,
} from 'lucide-react';
import { servicesData } from '../data/services';
import { ServiceCategory, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import MethodIllustrations from '../components/MethodIllustrations';
import { GlowCard } from '../components/ui/spotlight-card';

/* ── Icon map ── */
const iconMap: Record<string, React.ReactNode> = {
  ScanEye: <ScanEye size={22} />,
  ShieldCheck: <ShieldCheck size={22} />,
  ClipboardCheck: <ClipboardCheck size={22} />,
  Lightbulb: <Lightbulb size={22} />,
  Eye: <Eye size={20} />,
  Droplet: <Droplet size={20} />,
  Magnet: <Magnet size={20} />,
  Activity: <Activity size={20} />,
  Ruler: <Ruler size={20} />,
  Wind: <Wind size={20} />,
  Radiation: <Radiation size={20} />,
  FileSearch: <FileSearch size={20} />,
  Hammer: <Hammer size={20} />,
  Shield: <Shield size={20} />,
  CheckSquare: <CheckSquare size={20} />,
  Users: <Users size={20} />,
  PackageCheck: <PackageCheck size={20} />,
  Network: <Network size={20} />,
  FileText: <FileText size={20} />,
  Factory: <Factory size={20} />,
  FileSignature: <FileSignature size={20} />,
  BookOpen: <BookOpen size={20} />,
  Settings: <Settings size={20} />,
  Award: <Award size={20} />,
  Book: <Book size={20} />,
  GraduationCap: <GraduationCap size={20} />,
};

/* ── Color themes — blue family, soft-pour transitions ── */
interface ColorTheme {
  accent: string;
  accentMuted: string;
  glow: string;
  border: string;
  bg: string;
  sectionBg: string;
  nextBg: string;
  glowPos: string;
}

const COLOR_THEMES: Record<string, ColorTheme> = {
  ndt: {
    accent: '#4da8ff',
    accentMuted: '#4da8ff70',
    glow: 'rgba(0, 113, 227, 0.20)',
    border: 'rgba(0, 113, 227, 0.28)',
    bg: 'rgba(0, 113, 227, 0.09)',
    sectionBg: '#04080f',
    nextBg: '#050a12',
    glowPos: '12% 50%',
  },
  nadzori: {
    accent: '#38bdf8',
    accentMuted: '#38bdf870',
    glow: 'rgba(14, 165, 233, 0.18)',
    border: 'rgba(14, 165, 233, 0.24)',
    bg: 'rgba(14, 165, 233, 0.08)',
    sectionBg: '#050a12',
    nextBg: '#030c15',
    glowPos: '88% 20%',
  },
  qa: {
    accent: '#22d3ee',
    accentMuted: '#22d3ee70',
    glow: 'rgba(8, 145, 178, 0.16)',
    border: 'rgba(8, 145, 178, 0.24)',
    bg: 'rgba(8, 145, 178, 0.08)',
    sectionBg: '#030c15',
    nextBg: '#07060f',
    glowPos: '50% 8%',
  },
  svetovanje: {
    accent: '#a5b4fc',
    accentMuted: '#a5b4fc70',
    glow: 'rgba(99, 102, 241, 0.16)',
    border: 'rgba(99, 102, 241, 0.22)',
    bg: 'rgba(99, 102, 241, 0.08)',
    sectionBg: '#07060f',
    nextBg: '#050505',
    glowPos: '74% 70%',
  },
};

const PARTICLE_COLORS: Record<string, string> = {
  ndt: '#0071e3',
  nadzori: '#0ea5e9',
  qa: '#0891b2',
  svetovanje: '#6366f1',
};

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Per-section CTA copy ── */
const SECTION_CTA_COPY: Record<string, { sl: string; en: string }> = {
  ndt: {
    sl: 'Povejte nam material, standard in obseg — ocenimo metode in rok.',
    en: 'Tell us the material, standard and scope — we assess methods and timeline.',
  },
  nadzori: {
    sl: 'Opišite projekt — nastopimo kot tretja stranka ali pogodbeni nadzor.',
    en: 'Describe the project — we join as third party or contracted supervisor.',
  },
  qa: {
    sl: 'Pokažite specifikacijo — kompletiramo celotno dokumentacijo projekta.',
    en: 'Share your specification — we complete all required project documentation.',
  },
  svetovanje: {
    sl: 'Opišite izziv — strokovno mnenje brez zavez.',
    en: 'Describe the challenge — expert opinion without commitment.',
  },
};

const CERTS = [
  { code: 'EN ISO 9712', sl: 'Osebje NDT', en: 'NDT personnel' },
  { code: 'EN ISO/IEC 17020', sl: 'Inšpekcijski organ', en: 'Inspection body' },
  { code: 'EN ISO 17637', sl: 'Vizualna preiskava', en: 'Visual testing' },
  { code: 'EN ISO 3834', sl: 'Kakovost varjenja', en: 'Welding quality' },
];

/* ── Helpers ── */
function getParenAbbr(label: string): string | null {
  const m = label.match(/\(([^)]+)\)\*?$/);
  return m ? m[1] : null;
}
function getMethodName(label: string): string {
  return label.replace(/\s*\([^)]+\)\*?$/, '').trim();
}

/* ── Ambient particles ── */
function ParticleField({ color, count = 10 }: { color: string; count?: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 7,
      driftY: -(12 + Math.random() * 28),
      driftX: (Math.random() - 0.5) * 16,
    })), [count]
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: color }}
          animate={{ opacity: [0, 0.35, 0.5, 0.15, 0], y: [0, p.driftY], x: [0, p.driftX] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

/* ── Scroll reveal ── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={inView ? (shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }) : {}}
      transition={{ duration: shouldReduce ? 0.2 : 0.8, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section header ── */
function SectionHeader({ category, theme, lang, index }: {
  category: ServiceCategory;
  theme: ColorTheme;
  lang: 'sl' | 'en';
  index: number;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ color: theme.accentMuted }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ color: theme.accent }}>{iconMap[category.icon]}</span>
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: theme.accent }}
          >
            {lang === 'sl' ? 'Področje ekspertize' : 'Area of expertise'}
          </span>
        </div>
        <h2
          className="font-heading font-bold text-white leading-[0.93] tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
        >
          {category.title}
        </h2>
        <p className="mt-5 text-slate-400 text-base font-light leading-relaxed max-w-xl">
          {category.description}
        </p>
      </div>
      {/* Item count — right-aligned, typographic, not a badge */}
      <div className="shrink-0 self-end pb-1">
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color: theme.accentMuted }}
        >
          {category.items.length} {lang === 'sl' ? 'storitev' : 'services'}
        </span>
      </div>
    </div>
  );
}

/* ── Section CTA ── */
function SectionCTA({ category, theme, lang, focusRing }: {
  category: ServiceCategory;
  theme: ColorTheme;
  lang: 'sl' | 'en';
  focusRing: string;
}) {
  const copy = SECTION_CTA_COPY[category.id] ?? SECTION_CTA_COPY.ndt;
  return (
    <Reveal delay={0.05}>
      <div
        className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t"
        style={{ borderColor: theme.border }}
      >
        <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
          {lang === 'sl' ? copy.sl : copy.en}
        </p>
        <Link
          to="/#contact"
          state={{ service: category.id, serviceLabel: category.title }}
          className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.03] ${focusRing}`}
          style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.accent }}
        >
          {lang === 'sl' ? 'Pošlji povpraševanje' : 'Send inquiry'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </Reveal>
  );
}

/* ── Method Card ── */
function MethodCard({
  item, isActive, theme, onClick, index, focusRing,
}: {
  item: ServiceItem;
  isActive: boolean;
  theme: ColorTheme;
  onClick: () => void;
  index: number;
  focusRing: string;
}) {
  const abbrev = getParenAbbr(item.label);
  const name = abbrev ? getMethodName(item.label) : item.label;
  const badge = abbrev ?? String(index + 1).padStart(2, '0');

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: EASE_OUT_EXPO }}
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`text-left w-full relative rounded-2xl border p-5 transition-all duration-300 group overflow-hidden ${focusRing}`}
      style={{
        background: isActive ? theme.bg : 'rgba(255,255,255,0.015)',
        borderColor: isActive ? theme.border : 'rgba(255,255,255,0.06)',
        boxShadow: isActive ? `0 0 28px -8px ${theme.glow}` : 'none',
      }}
    >
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${theme.glow}, transparent 70%)` }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <span
          className="font-mono text-[13px] font-bold tracking-widest px-2.5 py-1 rounded-lg border"
          style={{
            color: theme.accent,
            background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
            borderColor: isActive ? theme.border : 'rgba(255,255,255,0.06)',
          }}
        >
          {badge}
        </span>
        {item.level3 && (
          <span
            className="flex items-center gap-1 font-mono text-[9px] px-2 py-1 rounded-md border"
            style={{ color: theme.accentMuted, borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <ShieldCheck size={9} style={{ color: theme.accent }} />
            III
          </span>
        )}
      </div>

      {/* Title */}
      <h4
        className="font-heading font-bold leading-snug tracking-tight mb-2 relative z-10 text-[15px]"
        style={{ color: isActive ? '#f1f5f9' : '#94a3b8' }}
      >
        {name}
      </h4>

      {/* Description preview */}
      <p
        className="text-[12px] leading-relaxed line-clamp-2 relative z-10"
        style={{ color: isActive ? '#64748b' : '#334155' }}
      >
        {item.description}
      </p>

      {/* Standard */}
      {item.quickFacts?.standard && (
        <div className="mt-3 relative z-10">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded"
            style={{
              color: isActive ? theme.accent : '#334155',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            {item.quickFacts.standard}
          </span>
        </div>
      )}

      {/* Active bottom line */}
      {isActive && (
        <div
          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
        />
      )}
    </motion.button>
  );
}

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
  const isEn = lang === 'en';
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

/* ── Active method detail panel ── */
function ActiveMethodPanel({
  item, theme, lang, focusRing,
}: {
  item: ServiceItem;
  theme: ColorTheme;
  lang: 'sl' | 'en';
  focusRing: string;
}) {
  const abbrev = getParenAbbr(item.label);
  const name = abbrev ? getMethodName(item.label) : item.label;
  const standards = getMethodStandards(item.id, lang);
  const tele = getMethodTelemetry(item.id, lang);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="rounded-2xl border p-6 md:p-8 relative overflow-hidden"
      style={{
        background: theme.bg,
        borderColor: theme.border,
        boxShadow: `0 0 60px -20px ${theme.glow}`,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 80% at 80% 50%, ${theme.glow}, transparent 65%)` }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Description & Compliance Standards */}
        <div className="lg:col-span-7 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-3 mb-5">
              {abbrev && (
                <span
                  className="font-mono text-[13px] font-bold tracking-widest px-3 py-1.5 rounded-lg border shrink-0"
                  style={{ color: theme.accent, background: 'rgba(255,255,255,0.06)', borderColor: theme.border }}
                >
                  {abbrev}
                </span>
              )}
              <h4 className="font-heading font-bold text-white text-xl md:text-2xl tracking-tight leading-snug">{name}</h4>
            </div>

            <p className="text-slate-400 text-[14px] leading-relaxed mb-6 font-light">{item.description}</p>

            {item.details && item.details.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-6">
                {item.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-[7px] w-[4px] h-[4px] rounded-full shrink-0" style={{ background: theme.accent }} />
                    <span className="text-[13px] text-slate-400 leading-relaxed font-light">{d}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Dynamic Standards Block */}
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  {lang === 'sl' ? '// VELJAVNI STANDARDI IN SKLADNOST' : '// APPLICABLE STANDARDS & COMPLIANCE'}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {standards.map((std, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
                      <span className="font-mono text-[12px] font-bold text-white tracking-wide">{std.code}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-light leading-relaxed">{std.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level III indicator */}
            {item.level3 && (
              <div className="mt-5 flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 rounded-lg border"
                  style={{ color: theme.accentMuted, borderColor: theme.border, background: 'rgba(255,255,255,0.02)' }}
                >
                  <ShieldCheck size={11} style={{ color: theme.accent }} />
                  {lang === 'sl' ? 'EN ISO 9712 Nivo III Certifikacija' : 'EN ISO 9712 Level III Certified'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3D Visualization, Diagnostics, Inquiry CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* 3D Visual Section */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                {lang === 'sl' ? '// 3D INTERAKTIVNA VIZUALIZACIJA' : '// 3D INTERACTIVE VISUALIZATION'}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                </span>
                R3F GLSL
              </span>
            </div>

            <div className="relative w-full h-[280px] rounded-xl bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center group/viewfinder shadow-inner">
              <MethodIllustrations methodId={item.id} color={theme.accent} />
              
              {/* Telemetry Grid overlay */}
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none rounded-xl" />
              
              {/* Interaction Hint */}
              <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none opacity-0 group-hover/viewfinder:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur border border-white/10 rounded-md py-1 text-[10px] font-mono tracking-wider text-slate-400">
                {lang === 'sl' 
                  ? 'Povlecite za rotacijo 3D modela | Premaknite miško za video' 
                  : 'Drag to rotate 3D model | Hover for video demonstration'}
              </div>
            </div>
          </div>

          {/* Telemetry Calibration Block */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/[0.05] bg-black/50 font-mono text-[11px] relative overflow-hidden">
            {/* Diagonal grid lines background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-2 relative z-10">
              <span className="font-bold text-slate-400 tracking-wider">[{tele.logTitle}]</span>
              <span className="text-[9px] text-slate-600">SYS_V2.1.0</span>
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
              <span className="flex items-center text-[10px] font-bold text-emerald-400 tracking-wide">
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

          {/* Action Button */}
          <Link
            to="/#contact"
            state={{ service: item.id, serviceLabel: name }}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-bold text-sm hover:scale-[1.02] transition-transform ${focusRing} w-full text-center`}
            style={{ 
              background: theme.bg, 
              border: `1px solid ${theme.border}`, 
              color: theme.accent,
              boxShadow: `0 0 15px -5px ${theme.glow}`
            }}
          >
            {lang === 'sl' ? 'Pošlji povpraševanje za to metodo' : 'Send inquiry for this method'}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   SERVICE SECTION
   ════════════════════════════════════════════ */
function ServiceSection({ category, theme, lang, focusRing, index, sectionRef }: {
  category: ServiceCategory;
  theme: ColorTheme;
  lang: 'sl' | 'en';
  focusRing: string;
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const [activeItem, setActiveItem] = useState(category.items[0].id);
  const activeItemData = category.items.find(i => i.id === activeItem) ?? category.items[0];

  return (
    <section
      id={`section-${category.id}`}
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${theme.sectionBg} 0%, ${theme.sectionBg} 75%, ${theme.nextBg} 100%)`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 65% at ${theme.glowPos}, ${theme.glow}, transparent 65%)`,
        }}
      />
      <ParticleField color={PARTICLE_COLORS[category.id]} count={10} />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 relative z-10">
        <Reveal>
          <SectionHeader category={category} theme={theme} lang={lang} index={index} />
        </Reveal>

        {/* Method cards grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {category.items.map((item, idx) => (
            <MethodCard
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              theme={theme}
              focusRing={focusRing}
              onClick={() => setActiveItem(item.id)}
              index={idx}
            />
          ))}
        </div>

        {/* Active method detail panel */}
        <div className="mt-5">
          <AnimatePresence mode="wait">
            <ActiveMethodPanel
              key={activeItem}
              item={activeItemData}
              theme={theme}
              lang={lang}
              focusRing={focusRing}
            />
          </AnimatePresence>
        </div>

        {/* Section CTA */}
        <SectionCTA category={category} theme={theme} lang={lang} focusRing={focusRing} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════ */
function ServicesPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('ndt');
  const { language } = useLanguage();
  const lang = language as 'sl' | 'en';
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (location.state?.categoryId) {
      const el = sectionRefs.current[location.state.categoryId];
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    }
  }, [location.state]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id.replace('section-', ''));
        });
      },
      { threshold: 0.18 }
    );
    servicesData.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans overflow-x-clip">

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] flex items-end pb-20 overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/images/references/hero_bg.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.13 }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 2.4, ease: [0.25, 1, 0.5, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(0,80,200,0.06) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#4da8ff] mb-6"
          >
            Megama — {lang === 'sl' ? 'Storitve' : 'Services'}
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="font-heading font-bold text-white leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem, 9.5vw, 8.5rem)' }}
            >
              {lang === 'sl' ? 'Storitve &' : 'Services &'}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="font-heading font-bold leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem, 9.5vw, 8.5rem)', color: 'oklch(0.55 0.18 230)' }}
            >
              {lang === 'sl' ? 'Ekspertiza' : 'Expertise'}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52, ease: EASE_OUT_EXPO }}
            className="mt-8 text-slate-400 max-w-xl text-lg font-light leading-relaxed"
          >
            {lang === 'sl'
              ? 'NDT preiskave, inženirski nadzor, kakovost in svetovanje — certificirano po EN ISO.'
              : 'NDT testing, engineering supervision, quality management and consulting — certified to EN ISO.'}
          </motion.p>

          {/* Credential pills */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { icon: <Award size={13} />, label: 'EN ISO 9712', sub: lang === 'sl' ? 'Nivo III' : 'Level III' },
              { icon: <ShieldCheck size={13} />, label: 'ISO/IEC 17020', sub: lang === 'sl' ? 'Inšpekcijski organ' : 'Inspection body' },
              { icon: null, label: '15+', sub: lang === 'sl' ? 'let izkušenj' : 'years experience' },
            ].map(({ icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
              >
                {icon && <span style={{ color: '#4da8ff' }}>{icon}</span>}
                <span className="text-[12px] font-semibold text-white">{label}</span>
                <span className="text-[11px] text-slate-500">{sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY OVERVIEW GRID ── */}
      <section className="relative py-16 md:py-20" style={{ background: '#04080f' }}>
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {servicesData.map((cat, i) => {
              const t = COLOR_THEMES[cat.id] || COLOR_THEMES.ndt;
              const glowColors: Record<string, 'blue' | 'purple' | 'green' | 'red' | 'orange'> = {
                ndt: 'blue',
                nadzori: 'blue',
                qa: 'green',
                svetovanje: 'purple',
              };
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE_OUT_EXPO }}
                >
                  <GlowCard
                    glowColor={glowColors[cat.id] ?? 'blue'}
                    customSize
                    className="w-full h-auto aspect-auto min-h-[260px] p-7 flex flex-col gap-5 cursor-pointer group"
                    style={{ background: 'rgba(5,10,20,0.85)' } as React.CSSProperties}
                  >
                    {/* icon + number */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: t.bg, border: `1px solid ${t.border}` }}
                      >
                        <span style={{ color: t.accent }}>{iconMap[cat.icon]}</span>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest" style={{ color: t.accentMuted }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* title + subtitle */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div
                        className="font-mono text-[11px] font-bold tracking-widest uppercase"
                        style={{ color: t.accent }}
                      >
                        {cat.shortTitle}
                      </div>
                      <h3 className="font-heading font-bold text-white text-xl leading-snug tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-slate-500 text-[13px] leading-relaxed mt-1">{cat.subtitle}</p>
                    </div>

                    {/* footer: method count + CTA */}
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${t.border}` }}>
                      <span className="font-mono text-[11px]" style={{ color: t.accentMuted }}>
                        {cat.items.length} {lang === 'sl' ? 'metod' : 'methods'}
                      </span>
                      <button
                        onClick={() => scrollToSection(cat.id)}
                        className="flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-200 group-hover:gap-3"
                        style={{ color: t.accent }}
                      >
                        {lang === 'sl' ? 'Preberi več' : 'Learn more'}
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STICKY NAV ── */}
      <div className="sticky top-16 z-40 w-full border-b border-white/[0.06] bg-[#050505]/92 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div
            className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide"
            role="tablist"
            aria-label={lang === 'sl' ? 'Področja storitev' : 'Service areas'}
          >
            {servicesData.map((cat) => {
              const t = COLOR_THEMES[cat.id] || COLOR_THEMES.ndt;
              const active = activeSection === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => scrollToSection(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${focusRing}`}
                  style={active
                    ? { background: t.bg, border: `1px solid ${t.border}`, color: t.accent }
                    : { border: '1px solid transparent', color: '#6b7280' }}
                >
                  <span style={{ color: active ? t.accent : '#4b5563' }}>{iconMap[cat.icon]}</span>
                  {cat.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CERT STRIP ── */}
      <div
        className="border-b border-white/[0.04]"
        style={{ background: '#04080f' }}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold flex items-center gap-1.5 shrink-0">
              <FileBadge size={12} className="text-[#4da8ff]" />
              {lang === 'sl' ? 'Akreditirano' : 'Accredited'}
            </span>
            <div className="flex flex-wrap gap-5">
              {CERTS.map((cert) => (
                <div key={cert.code} className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-white font-semibold">{cert.code}</span>
                  <span className="text-[10px] text-slate-600">{lang === 'sl' ? cert.sl : cert.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICE SECTIONS — unified pattern, soft-pour transitions ── */}
      {servicesData.map((cat, i) => (
        <ServiceSection
          key={cat.id}
          category={cat}
          theme={COLOR_THEMES[cat.id] || COLOR_THEMES.ndt}
          lang={lang}
          focusRing={focusRing}
          index={i}
          sectionRef={(el) => { sectionRefs.current[cat.id] = el; }}
        />
      ))}

      {/* ── GLOBAL CTA ── */}
      <section className="py-24 md:py-32" style={{ background: '#050505' }}>
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-600 mb-5 flex items-center gap-2">
                  <Award size={12} className="text-[#4da8ff]" />
                  {lang === 'sl' ? 'Akreditirani izvajalec' : 'Accredited provider'}
                </div>
                <h2
                  className="font-heading font-bold text-white leading-[0.93] tracking-tight max-w-2xl"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                >
                  {lang === 'sl' ? 'Pripravljeni na sodelovanje?' : 'Ready to work with us?'}
                </h2>
                <p className="mt-5 text-slate-400 max-w-lg text-lg font-light leading-relaxed">
                  {lang === 'sl'
                    ? 'Pošljite nam opis projekta — pripravimo ponudbo s certificiranimi metodami in jasnim rokom.'
                    : 'Send us your project brief — we prepare a proposal with certified methods and a clear timeline.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/#contact"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-[1.03] hover:brightness-110 ${focusRing}`}
                  style={{ background: '#0071e3', color: '#fff' }}
                >
                  {lang === 'sl' ? 'Pošljite povpraševanje' : 'Send inquiry'}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/certifikati"
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border border-white/15 hover:bg-white/5 rounded-full font-semibold text-sm transition-colors ${focusRing}`}
                >
                  <Download size={16} />
                  {lang === 'sl' ? 'Certifikati' : 'Certificates'}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

export default ServicesPage;
