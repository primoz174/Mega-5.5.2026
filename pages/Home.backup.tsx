import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Globe2, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import IndustrySectors from '../components/IndustrySectors';
import Services from '../components/Services';
import WhyMegama from '../components/WhyMegama';

import { HoverBorderGradient } from '../components/ui/hover-border-gradient';

const HERO_BG = '/images/home/hero-bg.webp';
const RECIPIENT_EMAIL = 'info@megama.si';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as 'sl' | 'en';

  return (
    <main className="w-full bg-black text-white antialiased">
      <Hero lang={lang} />
      <Stats lang={lang} />
      <IndustrySectors lang={lang} />
      <Services />
      <GlobalPresence lang={lang} />
      <WhyMegama />
      <Contact t={t} />
    </main>
  );
};

export default Home;

/* ──────────────────────────────────────────────────────────────
   HERO — word-by-word blur reveal + subtle scan line
   ────────────────────────────────────────────────────────────── */

const HERO_COPY = {
  headline: {
    sl: 'Zagotavljamo varnost in integriteto vaše industrijske infrastrukture.',
    en: 'We ensure the safety and integrity of your industrial infrastructure.',
  },
  sub: {
    sl: 'Specialistične NDT preiskave, nadzor in zagotavljanje kakovosti po najvišjih mednarodnih standardih.',
    en: 'Specialist NDT inspections, supervision and quality assurance to the highest international standards.',
  },
  cta1: { sl: 'Pridobite strokovno mnenje', en: 'Get expert opinion' },
  cta2: { sl: 'Naše storitve', en: 'Our services' },
  cert: {
    sl: { c1: 'Certificirano', c2: 'Standard', c3: 'Strokovnost', c4: 'Skladnost' },
    en: { c1: 'Certified', c2: 'Standard', c3: 'Expertise', c4: 'Compliance' },
  },
  location: { sl: 'Krško, Slovenija', en: 'Krško, Slovenia' },
};

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, delay: 0.15 + i * 0.065, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.26em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

function Hero({ lang }: { lang: 'sl' | 'en' }) {
  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex items-end overflow-hidden bg-black"
    >
      <style>{`
        @keyframes megama-kenburns {
          0%   { transform: scale(1.0)  translate3d(0,0,0); }
          100% { transform: scale(1.07) translate3d(-1.5%, -1.2%, 0); }
        }
        .megama-kenburns {
          animation: megama-kenburns 24s ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .megama-kenburns { animation: none; }
        }
        @keyframes hero-scan {
          0%   { top: -2px; opacity: 0; }
          4%   { opacity: 1; }
          94%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .hero-scan-line {
          animation: hero-scan 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-scan-line { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Background photo */}
      <img
        src={HERO_BG}
        alt=""
        className="megama-kenburns absolute inset-0 w-full h-full object-cover opacity-90"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-black -z-10" />

      {/* Scan line */}
      <div className="hero-scan-line absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0071e3]/50 to-transparent z-[5] pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent md:via-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent md:from-black/50 md:via-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-0" />

      {/* Location pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-28 md:top-32 left-6 md:left-[max(1.5rem,calc(50%-600px+1.5rem))] z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
          {HERO_COPY.location[lang]}
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-14 md:pb-20">
        <AnimatedHeadline
          text={HERO_COPY.headline[lang]}
          className="text-[clamp(2.25rem,4.8vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.06] text-white max-w-4xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-7 text-lg md:text-2xl text-white/70 max-w-2xl leading-snug font-light"
        >
          {HERO_COPY.sub[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-7 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <HoverBorderGradient
            as="a"
            href="#contact"
            containerClassName="w-full sm:w-auto p-0"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-medium bg-black/80 hover:bg-[#0071e3]/10 hover:shadow-[0_8px_32px_rgba(0,113,227,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300 group/link"
          >
            {HERO_COPY.cta1[lang]}
          </HoverBorderGradient>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md border border-white/10 hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,113,227,0.2)] group/link2"
          >
            {HERO_COPY.cta2[lang]} <ArrowRight size={18} className="transition-transform group-hover/link2:translate-x-1" />
          </a>
        </motion.div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 md:mt-12 pt-5 md:pt-8 border-t border-white/10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 md:gap-12"
        >
          {[
            { icon: <Check className="w-5 h-5 text-white/80" />, shape: 'rounded-full', label: HERO_COPY.cert[lang].c1, value: 'ISO 9001' },
            { icon: <span className="text-[11px] font-bold text-white/80 tracking-wider">NDT</span>, shape: 'rounded', label: HERO_COPY.cert[lang].c2, value: 'EN ISO 9712' },
            { icon: <span className="font-serif font-bold italic text-base text-white/80">A</span>, shape: 'rounded-sm', label: HERO_COPY.cert[lang].c3, value: 'ASNT Level III' },
            { icon: <span className="font-serif font-bold text-base text-white/80">S</span>, shape: 'rounded-[40%]', label: HERO_COPY.cert[lang].c4, value: 'ASME Sec. XI' },
          ].map((b, i) => (
            <a
              key={i}
              href="#certifikati"
              onClick={(e) => { e.preventDefault(); document.getElementById('why-megama')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-3 opacity-55 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              <div className={`w-10 h-10 ${b.shape} border-[1.5px] border-white/60 flex items-center justify-center group-hover:border-[#0071e3]/80 transition-colors`}>
                {b.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] leading-[1.2] text-white/50 uppercase tracking-[0.15em] font-medium">{b.label}</span>
                <span className="text-sm font-semibold tracking-wide text-white/90">{b.value}</span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   STATS — 4 verified stats: expertise, credit, export %, countries
   Source: ebonitete.si (credit), SloExport / GZS (export share & countries)
   ────────────────────────────────────────────────────────────── */

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS_DATA: Record<'sl' | 'en', StatItem[]> = {
  sl: [
    { value: 15, suffix: '+', label: 'let NDT izkušenj', sub: 'Jedrska energetika, petrokemija in energetika.' },
    { value: 10, suffix: '/10', label: 'bonitetna ocena', sub: 'Odlično — potrjena bonitetna ocena' },
    { value: 55, suffix: '%', label: 'prihodkov iz tujine', sub: 'Avstrija · Hrvaška · ZAE' },
    { value: 3, suffix: '', label: 'izvozne destinacije', sub: 'AUT · HRV · UAE' },
  ],
  en: [
    { value: 15, suffix: '+', label: 'years NDT expertise', sub: 'Nuclear energy, petrochemical and power.' },
    { value: 10, suffix: '/10', label: 'credit rating', sub: 'Excellent — verified credit rating' },
    { value: 55, suffix: '%', label: 'international revenue', sub: 'Austria · Croatia · UAE' },
    { value: 3, suffix: '', label: 'export countries', sub: 'AUT · HRV · UAE' },
  ],
};

function Stats({ lang }: { lang: 'sl' | 'en' }) {
  const stats = STATS_DATA[lang];
  return (
    <section className="relative w-full bg-[#030303] py-16 md:py-36 overflow-hidden">
      {/* Top fade from hero */}
      <div className="absolute inset-x-0 top-0 h-28 md:h-36 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((s, i) => (
            <StatCell key={i} item={s} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ item, delay }: { item: StatItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(item.value);
      return;
    }
    const controls = animate(0, item.value, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, item.value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-left group"
    >
      <div className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tracking-[-0.04em] leading-none text-white tabular-nums group-hover:drop-shadow-[0_0_30px_rgba(0,113,227,0.4)] transition-all duration-500">
        {count}
        <span className="text-white/35">{item.suffix}</span>
      </div>
      <div className="mt-4 text-base text-white font-medium leading-snug">{item.label}</div>
      <div className="mt-1.5 text-sm text-white/45 font-light leading-relaxed">{item.sub}</div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   GLOBAL PRESENCE — verified: 55 % export, AUT / HRV / UAE
   Source: SloExport (Zbornica GZS), financial year 2024
   ────────────────────────────────────────────────────────────── */

const COUNTRIES = [
  { code: 'SVN', flag: '🇸🇮', name: { sl: 'Slovenija', en: 'Slovenia' }, detail: null },
  { code: 'AUT', flag: '🇦🇹', name: { sl: 'Avstrija', en: 'Austria' }, detail: null },
  { code: 'HRV', flag: '🇭🇷', name: { sl: 'Hrvaška', en: 'Croatia' }, detail: null },
  {
    code: 'UAE',
    flag: '🇦🇪',
    name: { sl: 'Arabski emirati', en: 'United Arab Emirates' },
    detail: {
      sl: 'Strokovni nadzor in svetovanje pri vzdrževanju jedrske infrastrukture.',
      en: 'Expert supervision and consulting for nuclear infrastructure maintenance.',
    },
  },
  { code: 'INT', flag: '🌍', name: { sl: 'In drugje', en: 'And elsewhere' }, detail: null },
];

function GlobalPresence({ lang }: { lang: 'sl' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [pct, setPct] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPct(55); return; }
    const ctrl = animate(0, 55, { duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1], onUpdate: v => setPct(Math.round(v)) });
    return () => ctrl.stop();
  }, [inView]);

  return (
    <section className="relative bg-[#030303] py-20 md:py-44 overflow-hidden">
      {/* Top fade from Process section */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]" />
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_35%,transparent_100%)] pointer-events-none" />
      {/* Ambient blue glow right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/6 rounded-full blur-[130px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: copy + country tags */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-7 flex items-center gap-3">
              <Globe2 size={12} className="text-[#0071e3]" />
              {lang === 'sl' ? 'Globalna prisotnost' : 'Global presence'}
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.05] text-white mb-5 md:mb-6">
              {lang === 'sl'
                ? <>Delujemo po<br />Evropi in Bližnjem vzhodu.</>
                : <>Operating across<br />Europe and the Middle East.</>}
            </h2>

            <p className="text-base md:text-lg text-white/55 font-light leading-relaxed max-w-md mb-8 md:mb-12">
              {lang === 'sl'
                ? <>55 % prihodkov ustvarimo z mednarodnimi projekti. Naša ekipa zagotavlja vrhunski nadzor na terenu v štirih državah — od nuklearnih elektrarn do rafinerij, vedno v strogi skladnosti z{' '}<span className="text-white/85 font-medium tracking-tight">ASME Sec. XI</span> in <span className="text-white/85 font-medium tracking-tight">FANR</span> regulativo.</>
                : <>55% of our revenue comes from international projects. Our team delivers expert on-site supervision across four countries — from nuclear plants to refineries, always in strict compliance with{' '}<span className="text-white/85 font-medium tracking-tight">ASME Sec. XI</span> and <span className="text-white/85 font-medium tracking-tight">FANR</span> regulations.</>}
            </p>

            <div className="flex flex-wrap gap-3">
              {COUNTRIES.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => c.detail && setHoveredCountry(c.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 ${c.detail ? 'cursor-pointer' : 'cursor-default'
                    } ${hoveredCountry === c.code
                      ? 'bg-[#0071e3]/10 border-[#0071e3]/40 shadow-[0_0_20px_rgba(0,113,227,0.15)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-[#0071e3]/20 hover:bg-[#0071e3]/5'
                    }`}
                >
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <div>
                    <div className="font-mono text-[9px] text-white/35 tracking-widest uppercase">{c.code}</div>
                    <div className="text-sm font-medium text-white mt-0.5">{c.name[lang]}</div>
                    <AnimatePresence>
                      {hoveredCountry === c.code && c.detail && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[11px] text-white/65 font-light leading-snug mt-1 max-w-[200px]">
                            {c.detail[lang]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>

          {/* Right: big animated percentage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-14 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.07)]">
              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#0071e3]/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10">
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mb-8">
                  {lang === 'sl' ? 'Izvozni delež prihodkov' : 'Export revenue share'}
                </div>

                <div
                  className="text-[5.5rem] md:text-[9rem] font-bold tracking-[-0.06em] leading-none text-white tabular-nums"
                  style={{ textShadow: '0 0 60px rgba(0,113,227,0.25)' }}
                >
                  {pct}
                  <span className="text-[#0071e3]">%</span>
                </div>

                <div className="mt-8 h-px bg-gradient-to-r from-[#0071e3]/50 via-[#0071e3]/15 to-transparent" />

                <div className="mt-8 space-y-4">
                  {COUNTRIES.filter(c => c.code !== 'SVN').map((c) => (
                    <div key={c.code} className="flex items-center gap-3">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-white/55 text-sm font-light">{c.name[lang]}</span>
                      <div className="ml-auto w-2 h-2 rounded-full bg-[#0071e3]/50" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      {lang === 'sl' ? 'Aktivni projekti' : 'Active projects'}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-white font-bold text-sm tabular-nums">10<span className="text-white/30">/10</span></span>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      {lang === 'sl' ? 'Boniteta' : 'Credit'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CONTACT — merged with process timeline
   ────────────────────────────────────────────────────────────── */

const PROCESS_STEPS: Record<'sl' | 'en', { id: string; title: string; description: string }[]> = {
  sl: [
    {
      id: '01',
      title: 'Oddajte povpraševanje',
      description: 'Pošljite specifikacije projekta. Level III strokovnjaki vam v 24 urah vrnejo prvi odziv.',
    },
    {
      id: '02',
      title: 'Inženirska priprava',
      description: 'Izberemo optimalno NDT metodo (UT, RT, MT) in pripravimo načrt skladen z ASME ali ISO.',
    },
    {
      id: '03',
      title: 'Brezhibna izvedba',
      description: 'Mobilna ekipa izvede preiskave na terenu brez prekinitev vaših delovnih procesov.',
    },
    {
      id: '04',
      title: 'Certificirano poročilo',
      description: 'Prejmete dokumentacijo, pripravljeno za takojšnjo predajo nadzornim organom.',
    },
  ],
  en: [
    {
      id: '01',
      title: 'Submit your inquiry',
      description: 'Send your project specifications. Level III specialists respond within 24 hours.',
    },
    {
      id: '02',
      title: 'Engineering preparation',
      description: 'We select the optimal NDT method (UT, RT, MT) and prepare a plan aligned with ASME or ISO.',
    },
    {
      id: '03',
      title: 'Seamless execution',
      description: 'Our mobile team performs inspections on-site without interrupting your operations.',
    },
    {
      id: '04',
      title: 'Certified report',
      description: 'You receive documentation ready for immediate submission to regulatory authorities.',
    },
  ],
};

interface ContactProps {
  t: any;
}

function Contact({ t }: ContactProps) {
  const { language } = useLanguage();
  const lang = language as 'sl' | 'en';

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);

  const toggleService = (svc: string) => {
    setSelectedServices(prev =>
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    );
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const { categoryId, itemLabel } = (e as CustomEvent).detail;
      const svcMap: Record<string, string> = {
        ndt: t.contact.form_ndt,
        nadzori: t.contact.form_supervision,
        qa: lang === 'sl' ? 'QC / QA Storitve' : 'QC / QA Services',
        svetovanje: t.contact.form_consulting,
      };
      const svc = svcMap[categoryId];
      if (svc) setSelectedServices([svc]);
      if (itemLabel) setDescription(lang === 'sl' ? `Zanima me: ${itemLabel}` : `Interested in: ${itemLabel}`);
    };
    window.addEventListener('prefillContact', handler);
    return () => window.removeEventListener('prefillContact', handler);
  }, [lang, t]);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-150px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setValidationMsg(true);
      setTimeout(() => setValidationMsg(false), 3500);
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    formData.append('service', selectedServices.join(', ') || 'splošno');
    formData.append('description', description);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('_subject', `Novo povpraševanje: ${selectedServices.join(', ') || 'splošno'} — ${name}`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setSelectedServices([]); setDescription(''); setName(''); setEmail(''); setPhone('');
      } else {
        alert(lang === 'sl' ? 'Prišlo je do napake. Prosimo poskusite znova ali nas pokličite.' : 'An error occurred. Please try again or call us.');
      }
    } catch {
      alert(lang === 'sl' ? 'Prišlo je do napake. Preverite povezavo.' : 'An error occurred. Check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    t.contact.form_ndt,
    t.contact.form_supervision,
    lang === 'sl' ? 'QC / QA Storitve' : 'QC / QA Services',
    t.contact.form_consulting,
    t.contact.form_other,
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="relative bg-black py-16 md:py-44 overflow-hidden"
    >
      {/* Hidden anchor so any #process nav links still scroll here */}
      <span id="process" className="absolute -top-20 pointer-events-none" aria-hidden="true" />

      {/* Top fade from WhyMegama */}
      <div className="absolute inset-x-0 top-0 h-28 md:h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0071e3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        {/* Left: headline + process timeline + contact details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative z-10"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-6 flex items-center gap-3">
            <span className="w-4 h-px bg-[#0071e3]/40" />
            {lang === 'sl' ? 'Začnite projekt' : 'Start your project'}
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-4 leading-[1.08]">
            {lang === 'sl'
              ? <>Zagotovite si<br />varno izvedbo.</>
              : <>Get your project<br />done safely.</>}
          </h2>
          <p className="text-base text-white/65 leading-relaxed mb-10 max-w-[300px] font-light">
            {lang === 'sl'
              ? 'Strokovnjaki (Level III) pregledajo vaše specifikacije in v 24 urah predlagajo optimalen inženirski pristop.'
              : 'Level III specialists review your specs and propose the optimal approach within 24 hours.'}
          </p>

          {/* Process timeline */}
          <div className="relative mb-10">
            <style>{`
              @keyframes timeline-glow-down {
                0%   { top: 0%; opacity: 0; }
                5%   { opacity: 1; }
                85%  { opacity: 0.7; }
                100% { top: 100%; opacity: 0; }
              }
              @media (prefers-reduced-motion: reduce) {
                .timeline-glow-orb { animation: none !important; opacity: 0 !important; }
              }
            `}</style>
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-[#0071e3]/50 via-white/10 to-white/5" />
            {/* Animated glow orb traveling down the line */}
            <div
              className="timeline-glow-orb absolute left-[11px] -translate-x-1/2 w-[6px] h-[6px] rounded-full pointer-events-none z-[5]"
              style={{
                background: 'radial-gradient(circle, #0071e3 0%, rgba(0,113,227,0.4) 50%, transparent 100%)',
                boxShadow: '0 0 12px 4px rgba(0,113,227,0.5), 0 0 24px 8px rgba(0,113,227,0.2)',
                animation: 'timeline-glow-down 3.5s ease-in-out infinite',
                top: '0%',
              }}
            />
            <div className="space-y-0">
              {PROCESS_STEPS[lang].map((step, i) => (
                <div key={step.id} className={`relative flex gap-5 ${i < PROCESS_STEPS[lang].length - 1 ? 'pb-8' : ''}`}>
                  <div className={`relative z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    i === 0
                      ? 'border-[#0071e3]/60 bg-[#0071e3]/15 shadow-[0_0_10px_rgba(0,113,227,0.3)]'
                      : 'border-white/12 bg-black'
                  }`}>
                    <span className={`font-mono text-[8px] font-bold leading-none ${i === 0 ? 'text-[#0071e3]' : 'text-white/25'}`}>
                      {step.id}
                    </span>
                  </div>
                  <div className={i === 0 ? '' : 'opacity-50'}>
                    <div className={`text-base font-semibold mb-1.5 leading-tight ${i === 0 ? 'text-white' : 'text-white/80'}`}>
                      {step.title}
                    </div>
                    <p className="text-sm text-white/55 font-light leading-snug max-w-[230px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Form side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative z-10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full min-h-[480px] flex flex-col items-center justify-center text-center rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-12 shadow-[0_16px_64px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 border border-white/10 text-[#0071e3]">
                  <Check size={32} />
                </div>
                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">{t.contact.success_title}</h3>
                <p className="text-white/55 max-w-sm mb-10 leading-relaxed font-light">{t.contact.success_desc}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 bg-white/10 hover:bg-white/15 border border-white/10 group/btn"
                >
                  {t.contact.success_btn}
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.12] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.09)]"
              >
                {/* Section 01: Service area */}
                <div className="px-8 md:px-10 pt-9 md:pt-11 pb-8 border-b border-white/[0.07]">
                  <p className="font-mono uppercase tracking-[0.25em] mb-3 flex items-center gap-2 text-xs">
                    <span className="text-[#0071e3]">01</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white/60">{lang === 'sl' ? 'Področje povpraševanja' : 'Area of interest'}</span>
                  </p>
                  <p className="text-white/60 text-sm font-light mb-5 leading-snug">
                    {lang === 'sl'
                      ? 'S čim vam lahko pomagamo? Izberite eno ali več področij.'
                      : 'What can we help you with? Select one or more areas.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((svc: string) => {
                      const active = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                            active
                              ? 'bg-[#0071e3]/12 border-[#0071e3]/45 text-[#0071e3] shadow-[0_0_16px_rgba(0,113,227,0.15)]'
                              : 'bg-white/[0.04] border-white/[0.1] text-white/55 hover:bg-white/[0.08] hover:text-white/85 hover:border-white/[0.18]'
                          }`}
                        >
                          {active && <Check size={11} className="shrink-0" />}
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 02: Project specs */}
                <div className="px-8 md:px-10 py-8 border-b border-white/[0.07]">
                  <p className="font-mono uppercase tracking-[0.25em] mb-5 flex items-center gap-2 text-xs">
                    <span className="text-[#0071e3]">02</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white/60">{lang === 'sl' ? 'Specifikacije projekta' : 'Project specifications'}</span>
                  </p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder={lang === 'sl'
                      ? 'Vrsta materiala, standard (ASME/ISO), lokacija projekta...'
                      : 'Material type, standard (ASME/ISO), project location...'}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white/90 text-sm placeholder-white/40 focus:border-[#0071e3]/40 focus:bg-white/[0.05] focus:outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Section 03: Contact details */}
                <div className="px-8 md:px-10 py-8 border-b border-white/[0.07]">
                  <p className="font-mono uppercase tracking-[0.25em] mb-5 flex items-center gap-2 text-xs">
                    <span className="text-[#0071e3]">03</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white/60">{lang === 'sl' ? 'Vaši podatki' : 'Your details'}</span>
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={`${lang === 'sl' ? 'Ime ali podjetje' : 'Name or company'} *`}
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/40 focus:border-[#0071e3]/40 focus:bg-white/[0.06] focus:outline-none transition-colors"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={`${lang === 'sl' ? 'E-naslov' : 'E-mail'} *`}
                        className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/40 focus:border-[#0071e3]/40 focus:bg-white/[0.06] focus:outline-none transition-colors"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={lang === 'sl' ? 'Telefon' : 'Phone'}
                        className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/40 focus:border-[#0071e3]/40 focus:bg-white/[0.06] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit row */}
                <div className="px-8 md:px-10 py-7 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    {/* Call button — green */}
                    <a
                      href="tel:+38631694806"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-300 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.16] border border-emerald-500/[0.25] hover:border-emerald-500/[0.45] text-emerald-400 hover:text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.06)] hover:shadow-[0_0_28px_rgba(16,185,129,0.18)] group/call"
                    >
                      <Phone size={15} className="shrink-0 transition-transform group-hover/call:scale-110" />
                      {lang === 'sl' ? 'Pokliči nas' : 'Call us'}
                      <span className="text-emerald-500/60 font-mono text-xs">+386 31 694 806</span>
                    </a>

                    {/* Submit button — blue ghost, always active-looking */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300 group/btn bg-[#0071e3]/[0.08] hover:bg-[#0071e3]/[0.16] border border-[#0071e3]/[0.25] hover:border-[#0071e3]/[0.45] text-[#0071e3] hover:text-[#4da3ff] shadow-[0_0_20px_rgba(0,113,227,0.06)] hover:shadow-[0_0_28px_rgba(0,113,227,0.18)]"
                    >
                      {submitting
                        ? (lang === 'sl' ? 'Pošiljanje …' : 'Sending...')
                        : (lang === 'sl' ? 'Oddajte povpraševanje' : 'Submit inquiry')}
                      <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-white/35 font-light">
                      {lang === 'sl' ? '100 % zaupnost tehničnih podatkov.' : '100% confidentiality of your data.'}
                    </p>
                    <AnimatePresence>
                      {validationMsg && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-amber-400/80 font-light text-right"
                        >
                          {lang === 'sl' ? 'Izpolnite ime in e-naslov.' : 'Please fill in name and e-mail.'}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

