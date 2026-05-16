import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Industry Data ───────────────────────────────────────────

type IndustryKey =
  | 'nuclear' | 'pharma' | 'power' | 'steel'
  | 'foundry' | 'engineering' | 'construction' | 'oil';

interface IndustryDatum {
  key: IndustryKey;
  code: string;
  methods: string[];
  standards: string[];
  image: string;
}

const INDUSTRIES: IndustryDatum[] = [
  {
    key: 'nuclear', code: 'NUC.01',
    methods: ['UT', 'RT', 'VT', 'TOFD', 'PAUT'],
    standards: ['ASME XI', 'RCC-M', 'EN ISO 19285'],
    image: 'nuclear.png',
  },
  {
    key: 'pharma', code: 'PHA.02',
    methods: ['PT', 'VT', 'UT', 'ET'],
    standards: ['EN ISO 15614', 'GMP', 'EHEDG'],
    image: 'pharma.png',
  },
  {
    key: 'power', code: 'PWR.03',
    methods: ['UT', 'RT', 'MT', 'PT', 'TOFD'],
    standards: ['EN 13480', 'AD 2000', 'PED 2014/68/EU'],
    image: 'power.png',
  },
  {
    key: 'steel', code: 'STL.04',
    methods: ['UT', 'MT', 'VT', 'RT'],
    standards: ['EN 1090', 'EN 13445', 'SRPS EN ISO 17635'],
    image: 'steel.png',
  },
  {
    key: 'foundry', code: 'FND.05',
    methods: ['UT', 'MT', 'RT', 'VT'],
    standards: ['EN 12680', 'ASTM A609', 'EN 1369'],
    image: 'foundry.png',
  },
  {
    key: 'engineering', code: 'ENG.06',
    methods: ['UT', 'MT', 'PT', 'VT', 'ET'],
    standards: ['EN ISO 9712', 'ISO 17638', 'EN 13018'],
    image: 'engineering.png',
  },
  {
    key: 'construction', code: 'CON.07',
    methods: ['VT', 'UT', 'GPR', 'MT'],
    standards: ['EN 13791', 'EN 12504', 'EN 1090'],
    image: 'construction.png',
  },
  {
    key: 'oil', code: 'OIL.08',
    methods: ['UT', 'RT', 'MFL', 'PT', 'ET'],
    standards: ['API 570', 'EN 15085', 'DIN 27201'],
    image: 'oil.png',
  },
];

// ─── Shared industry content block ───────────────────────────

interface IndustryContentProps {
  datum: IndustryDatum;
  title: string;
  description: string;
}

const IndustryContent: React.FC<IndustryContentProps> = ({ datum, title, description }) => (
  <div className="w-full md:max-w-[540px]">
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EXPO_OUT }}
      className="flex items-center gap-4 mb-5"
    >
      <div className="h-px w-8 bg-[#0071e3]/40" />
      <p className="font-mono text-[10px] tracking-[0.2em] text-[#0071e3] uppercase">
        {datum.code}
      </p>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-white leading-[1.04] mb-6"
      style={{ textWrap: 'balance' } as React.CSSProperties}
    >
      {title}
    </motion.h2>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EXPO_OUT, delay: 0.2 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {datum.methods.map((m, idx) => (
        <motion.span
          key={m}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EXPO_OUT, delay: 0.2 + (idx * 0.05) }}
          className="font-mono text-[11px] tracking-[0.08em] text-[#0071e3] border border-[#0071e3]/30 bg-[#0071e3]/[0.05] backdrop-blur-md px-3 py-1.5 uppercase transition-colors hover:bg-[#0071e3]/20"
        >
          {m}
        </motion.span>
      ))}
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EXPO_OUT, delay: 0.3 }}
      className="text-[#f5f5f7]/80 text-base md:text-lg leading-relaxed max-w-[52ch] mb-8 font-light"
    >
      {description}
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: EXPO_OUT, delay: 0.4 }}
      className="flex items-center gap-3"
    >
      <div className="h-4 w-[1px] bg-white/10" />
      <p className="font-mono text-[10px] tracking-[0.14em] text-white/30 uppercase">
        {datum.standards.join('  /  ')}
      </p>
    </motion.div>
  </div>
);

// ─── Regular panel (pharma–oil) ───────────────────────────────

interface PanelProps {
  datum: IndustryDatum;
  index: number;
  title: string;
  description: string;
}

const IndustryPanel: React.FC<PanelProps> = ({ datum, index, title, description }) => {
  const reversed = index % 2 === 1;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section ref={containerRef} className="group relative min-h-[70vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={`/images/Panoge/${datum.image}`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#000000]/60 md:bg-transparent" />
      
      {/* Directional gradient: technical, precise fade */}
      <div className={`absolute inset-0 hidden md:block ${
        reversed
          ? 'bg-gradient-to-l from-[#050505] via-[#050505]/95 to-transparent'
          : 'bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent'
      }`} />

      {/* Edge Blends */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className={`relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 py-32 flex ${
        reversed ? 'md:justify-end text-left md:text-left' : 'md:justify-start'
      }`}>
        <IndustryContent datum={datum} title={title} description={description} />
      </div>
    </section>
  );
};

// ─── Page ────────────────────────────────────────────────────

const Industries: React.FC = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);

  const titles: Record<IndustryKey, string> = {
    nuclear: t.industriesPage.title_nuclear,
    pharma: t.industriesPage.title_pharma,
    power: t.industriesPage.title_power,
    steel: t.industriesPage.title_steel,
    foundry: t.industriesPage.title_foundry,
    engineering: t.industriesPage.title_engineering,
    construction: t.industriesPage.title_construction,
    oil: t.industriesPage.title_oil,
  };

  const descs: Record<IndustryKey, string> = {
    nuclear: t.industriesPage.desc_nuclear,
    pharma: t.industriesPage.desc_pharma,
    power: t.industriesPage.desc_power,
    steel: t.industriesPage.desc_steel,
    foundry: t.industriesPage.desc_foundry,
    engineering: t.industriesPage.desc_engineering,
    construction: t.industriesPage.desc_construction,
    oil: t.industriesPage.desc_oil,
  };

  const nuclear = INDUSTRIES[0];

  const lang = language as 'sl' | 'en';

  return (
    <>
      <Helmet>
        <title>
          {lang === 'sl'
            ? 'Industrijske Panoge – Megama NDT | Jedrska energetika, Farmacija, Energetika'
            : 'Industrial Sectors – Megama NDT | Nuclear, Pharma, Power, Steel'}
        </title>
        <meta
          name="description"
          content={
            lang === 'sl'
              ? 'NDT preiskave v jedrski energetiki, farmaciji, konvencionalni energetiki, jeklenih konstrukcijah, livarstvu, gradbeništvu in naftni industriji.'
              : 'NDT inspections in nuclear energy, pharmaceuticals, power generation, steel structures, foundry, construction and oil & gas industries.'
          }
        />
      </Helmet>
      <main className="w-full min-h-screen bg-[#050505] text-[#f5f5f7] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">

      {/* ── Hero + Jedrska energetika — ena sama slika ────────── */}
      <section ref={heroRef} className="group relative overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img
            src="/images/Panoge/nuclear.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover grayscale-[0.1] transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Static Overlays - kept outside parallax to maintain blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/60 to-[#000000]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 md:h-72 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

        {/* Hero heading — centered */}
        <div className="relative z-10 pt-36 pb-6 md:pt-44 md:pb-10 text-center max-w-[780px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EXPO_OUT }}
          >
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EXPO_OUT, delay: 0.2 }}
              className="font-mono text-[11px] tracking-[0.25em] text-[#0071e3] uppercase mb-6"
            >
              {t.industriesPage.hero_badge}
            </motion.p>
            <h1
              className="text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5rem] font-semibold tracking-tight text-white mb-6 leading-[1.04]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t.industriesPage.hero_title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-[50ch] mx-auto mb-16">
              {t.industriesPage.hero_subtitle}
            </p>

            {/* Scroll Indicator - Positioned exactly under hero text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col items-center justify-center gap-4 hidden md:flex"
            >
              <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#0071e3] to-transparent relative overflow-hidden">
                <motion.div 
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-x-0 top-0 h-1/2 bg-white/40"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Nuclear industry content — left aligned */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12 pt-4 pb-16 md:pt-8 md:pb-28 flex md:justify-start">
          <IndustryContent
            datum={nuclear}
            title={titles.nuclear}
            description={descs.nuclear}
          />
        </div>
      </section>

      {/* ── Remaining industries ─────────────────────────────── */}
      {INDUSTRIES.slice(1).map((datum, i) => (
        <IndustryPanel
          key={datum.code}
          datum={datum}
          index={i + 1}
          title={titles[datum.key]}
          description={descs[datum.key]}
        />
      ))}

      {/* CTA Section */}
      <section className="relative py-48 md:py-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EXPO_OUT }}
          className="relative z-10 max-w-[800px] mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-10 leading-tight">
            {language === 'sl'
              ? 'Iščete certificiranega NDT partnerja za vaš sektor?'
              : 'Looking for a certified NDT partner for your sector?'}
          </h2>
          
          <Link
            to="/#contact"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-semibold text-base tracking-tight overflow-hidden transition-all duration-300 hover:pr-12 active:scale-[0.98]"
          >
            <span className="relative z-10">{t.aboutPage.cta_btn}</span>
            <motion.span 
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-[#0071e3] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="absolute inset-0 z-0 bg-white group-hover:text-white" />
          </Link>
        </motion.div>
      </section>

    </main>
    </>
  );
};

export default Industries;
