import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin, Mail, Phone, Check, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import IndustrySectors from '../components/IndustrySectors';
import Services from '../components/Services';
import WhyMegama from '../components/WhyMegama';
import VerticalTabs from '../components/ui/vertical-tabs';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import povprasevanjeImage from '../src/assets/images/regenerated_image_1778013338863.jpg';

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
      <Process />
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-0" />

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
          className="mt-7 text-xl md:text-2xl text-white/65 max-w-2xl leading-snug font-light"
        >
          {HERO_COPY.sub[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
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
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 md:gap-12"
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
    <section className="relative w-full bg-[#030303] py-28 md:py-36 overflow-hidden">
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
   PROCESS — "Kako delamo" four-step VerticalTabs
   ────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    id: '01',
    title: 'Povpraševanje',
    description: 'Oddate povpraševanje za vaš projekt. V 24 urah vam vrnemo prvi odziv in vprašanja.',
    image: povprasevanjeImage,
  },
  {
    id: '02',
    title: 'Tehnični načrt',
    description: 'Izberemo optimalno metodo (UT, RT, MT, PT, VT) in osebje z ustreznim nivojem certifikacije (Level II/III) glede na zahteve standardov ASME ali ISO.',
    image: '/images/home/cap-01-ndt.webp',
  },
  {
    id: '03',
    title: 'Izvedba na terenu',
    description: 'Mobilna ekipa izvede preiskave z vrhunsko opremo (npr. Olympus/Evident). Zagotavljamo izvedbo brez motenj vaših delovnih procesov.',
    image: '/images/home/cap-02-nadzori.webp',
  },
  {
    id: '04',
    title: 'Dokumentacija',
    description: 'Prejmete digitalno poročilo, pripravljeno za takojšnjo predajo nadzornim organom (URSJV) ali končnemu kupcu.',
    image: '/images/home/cap-03-qaqc.webp',
  },
];

function Process() {
  return <VerticalTabs items={STEPS} />;
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
    <section className="relative bg-[#030303] py-32 md:py-44 overflow-hidden">
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

            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.05] text-white mb-6">
              {lang === 'sl'
                ? <>Delujemo po<br />Evropi in Bližnjem vzhodu.</>
                : <>Operating across<br />Europe and the Middle East.</>}
            </h2>

            <p className="text-lg text-white/55 font-light leading-relaxed max-w-md mb-12">
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
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-10 md:p-14 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.07)]">
              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#0071e3]/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10">
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mb-8">
                  {lang === 'sl' ? 'Izvozni delež prihodkov' : 'Export revenue share'}
                </div>

                <div
                  className="text-[7rem] md:text-[9rem] font-bold tracking-[-0.06em] leading-none text-white tabular-nums"
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
   CONTACT — clean, Apple-style minimal form
   ────────────────────────────────────────────────────────────── */

interface ContactProps {
  t: any;
}

function Contact({ t }: ContactProps) {
  const { language } = useLanguage();
  const lang = language as 'sl' | 'en';

  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-150px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('service', service);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('_subject', `Novo povpraševanje: ${service || 'splošno'} — ${name}`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setService(''); setDescription(''); setName(''); setEmail(''); setPhone('');
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
      className="relative bg-black py-32 md:py-44 overflow-hidden"
    >
      {/* Top fade from WhyMegama */}
      <div className="absolute inset-x-0 top-0 h-28 md:h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0071e3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        {/* Info side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white mb-6 leading-tight">
            {lang === 'sl' ? 'Kontaktirajte nas.' : 'Contact us.'}
          </h2>
          <p className="text-lg text-white/55 leading-relaxed mb-14 max-w-md font-light">
            {lang === 'sl'
              ? 'Naši strokovnjaki nivoja III bodo pregledali vaše specifikacije in pripravili odziv v 24 urah.'
              : 'Our Level III experts will review your specifications and provide a response within 24 hours.'}
          </p>

          <div className="space-y-7">
            <ContactRow icon={<MapPin size={18} />} label={lang === 'sl' ? 'Lokacija' : 'Location'} value="Cesta krških žrtev 44, 8270 Krško" />
            <ContactRow icon={<Mail size={18} />} label={lang === 'sl' ? 'E-naslov' : 'E-mail'} value="info@megama.si" href="mailto:info@megama.si" />
            <ContactRow icon={<Phone size={18} />} label={lang === 'sl' ? 'Telefon' : 'Phone'} value="+386 31 694 806" href="tel:+38631694806" />
          </div>

          <div className="mt-16 flex items-center gap-4 opacity-40 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-white/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest text-white/40 uppercase font-mono">ISO 9001:2015</span>
              <span className="text-xs text-white/60">{lang === 'sl' ? 'Proces obravnave po standardu' : 'Standardized process'}</span>
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
                className="rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 md:p-12 space-y-10 shadow-[0_16px_64px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]"
              >
                {/* Service picker */}
                <div>
                  <label className="block text-[11px] text-white/50 mb-4 font-medium uppercase tracking-wider font-mono">
                    {t.contact.label_interest || (lang === 'sl' ? 'Področje povpraševanja' : 'Area of interest')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((svc: string) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setService(svc)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${service === svc
                            ? 'bg-[#0071e3]/10 border-[#0071e3]/30 text-[#0071e3]'
                            : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white'
                          }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] text-white/50 mb-3 font-medium uppercase tracking-wider font-mono">
                    {t.contact.label_describe || (lang === 'sl' ? 'Specifikacije' : 'Specifications')}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder={lang === 'sl' ? 'Navedite vrsto materiala, standard (npr. ASME, ISO) in lokacijo projekta...' : 'Specify material type, standard (e.g. ASME, ISO) and project location...'}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder-white/30 focus:border-[#0071e3]/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={`${t.contact.placeholder_name || (lang === 'sl' ? 'Vaše ime ali podjetje' : 'Your name or company')} *`}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder-white/30 focus:border-[#0071e3]/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={`${t.contact.placeholder_email || (lang === 'sl' ? 'E-naslov' : 'E-mail')} *`}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder-white/30 focus:border-[#0071e3]/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.contact.placeholder_phone || (lang === 'sl' ? 'Telefon' : 'Phone')}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder-white/30 focus:border-[#0071e3]/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Submit row */}
                <div className="pt-4 flex items-center justify-between flex-wrap gap-6 border-t border-white/5 pt-8">
                  <div className="text-xs text-white/35 max-w-[240px] font-light space-y-1">
                    <p>{lang === 'sl' ? 'Vaš e-naslov uporabimo izključno za odgovor na to povpraševanje.' : 'We use your email exclusively to reply to this query.'}</p>
                    <p className="text-white/55 font-medium">{lang === 'sl' ? '100 % zaupnost tehničnih podatkov.' : '100% confidentiality of your technical data.'}</p>
                  </div>
                  <HoverBorderGradient
                    as="button"
                    type="submit"
                    disabled={submitting || !name || !email}
                    containerClassName="w-full sm:w-auto p-0"
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 ${submitting || !name || !email
                        ? 'opacity-30 cursor-not-allowed bg-black/40'
                        : 'bg-black/80 hover:bg-[#0071e3]/10 hover:shadow-[0_8px_32px_rgba(0,113,227,0.3)] group/btn'
                      }`}
                  >
                    {submitting
                      ? (lang === 'sl' ? 'Pošiljanje …' : 'Sending...')
                      : (lang === 'sl' ? 'Pridobite strokovno mnenje' : 'Get an expert opinion')}
                    {!submitting && <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#0071e3]" />}
                  </HoverBorderGradient>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#0071e3]/10 group-hover:border-[#0071e3]/30 group-hover:text-[#0071e3] transition-all duration-300 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-white/40 mb-1 font-mono uppercase tracking-widest">{label}</div>
        <div className="text-white text-base font-medium">{value}</div>
      </div>
    </>
  );
  return href
    ? <a href={href} className="group flex items-center gap-5">{inner}</a>
    : <div className="group flex items-center gap-5">{inner}</div>;
}
