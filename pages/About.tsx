import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import TeamShowcase from '../components/ui/team-showcase';

const expo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const About: React.FC = () => {
  const { language } = useLanguage();
  const sl = language === 'sl';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const qualifications = [
    {
      code: 'IWE · EWT · IWI-C',
      label: sl
        ? 'Mednarodni inženirji varjenja po shemi IIW/EWF'
        : 'International Welding Engineers under IIW/EWF scheme',
    },
    {
      code: 'Level III · EN ISO 9712',
      label: sl
        ? 'NDT osebje za metode VT, PT, MT, UT in RT'
        : 'NDT personnel for methods VT, PT, MT, UT and RT',
    },
    {
      code: 'Level III · ASNT/CP-189',
      label: sl
        ? 'Ameriška certifikacijska shema, metode VT, PT, MT, UT, RT'
        : 'US certification scheme, methods VT, PT, MT, UT, RT',
    },
    {
      code: 'PDI-UT · ASME Sec. XI',
      label: sl
        ? 'Jedrska kvalificiranost, App. VIII (PDI Program)'
        : 'Nuclear qualification, App. VIII (PDI Program)',
    },
    {
      code: 'TOFD · PAUT',
      label: sl
        ? 'Napredne ultrazvočne tehnike za kompleksne geometrije'
        : 'Advanced ultrasonic techniques for complex geometries',
    },
  ];

  const values = [
    {
      num: '01',
      title: sl ? 'Zadovoljstvo strank' : 'Client satisfaction',
      text: sl
        ? 'Vsak korak naredimo z mislijo na naročnika. Prejme storitev, ki rešuje dejanski problem — ne generičen odgovor.'
        : 'Every step is taken with the client in mind. They receive a service that solves the real problem, not a generic response.',
    },
    {
      num: '02',
      title: sl ? 'Odzivnost in prilagodljivost' : 'Responsiveness',
      text: sl
        ? 'Zavedamo se dinamike industrije. Hitro se odzovemo in poiščemo rešitve, prilagojene specifičnim zahtevam projekta.'
        : 'We understand the pace of industry. We respond fast and adapt solutions to the specific demands of each project.',
    },
    {
      num: '03',
      title: sl ? 'Poštenost in partnerstvo' : 'Honesty and partnership',
      text: sl
        ? 'Z naročniki gradimo dolgoročne odnose, ki temeljijo na zaupanju in strokovnem poslovnem odnosu.'
        : 'We build long-term client relationships grounded in trust and professional integrity.',
    },
  ];

  const facts = [
    { label: sl ? 'Leto ustanovitve' : 'Founded', val: '2021' },
    { label: sl ? 'Sedež' : 'Headquarters', val: 'Krško, Slovenija' },
    { label: sl ? 'Trgi' : 'Markets', val: 'SI · AT · HR · UAE' },
    { label: sl ? 'Jeziki' : 'Languages', val: 'SL · EN' },
    { label: sl ? 'Standard kakovosti' : 'Quality standard', val: 'ISO 9001:2015' },
    { label: sl ? 'Bonitetna ocena' : 'Credit rating', val: '10 / 10', highlight: true },
  ];

  const certs = ['ISO 9001:2015', 'EN ISO 9712', 'ASNT CP-189', 'IWE · IIW/EWF', 'ASME Sec. XI'];
  const markets = [sl ? 'Slovenija' : 'Slovenia', sl ? 'Avstrija' : 'Austria', sl ? 'Hrvaška' : 'Croatia', 'UAE'];

  return (
    <main className="w-full min-h-screen bg-[#050505] text-slate-300 font-sans relative overflow-hidden pb-24">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div
          className="absolute top-[-5%] left-[10%] w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,113,227,0.055) 0%, transparent 68%)', animation: 'orb-float 18s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[5%] right-[0%] w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,113,227,0.035) 0%, transparent 70%)', animation: 'orb-float 24s ease-in-out 6s infinite reverse' }}
        />
        <div
          className="absolute top-[45%] right-[20%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.012) 0%, transparent 70%)', animation: 'orb-float 14s ease-in-out 3s infinite' }}
        />


        <div className="absolute bottom-0 left-0 right-0 h-[220px] opacity-[0.045]">
          <div style={{ width: '200%', animation: 'wave-drift 14s linear infinite' }}>
            <svg viewBox="0 0 2400 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '220px', display: 'block' }} preserveAspectRatio="none">
              <path d="M0,110 C60,55 120,165 180,110 C240,55 300,165 360,110 C420,55 480,165 540,110 C600,55 660,165 720,110 C780,55 840,165 900,110 C960,55 1020,165 1080,110 C1140,55 1200,165 1260,110 C1320,55 1380,165 1440,110 C1500,55 1560,165 1620,110 C1680,55 1740,165 1800,110 C1860,55 1920,165 1980,110 C2040,55 2100,165 2160,110 C2220,55 2280,165 2340,110 C2400,55 2400,110 2400,110" stroke="#0071e3" strokeWidth="1.5" fill="none" />
              <path d="M0,110 C60,75 120,145 180,110 C240,75 300,145 360,110 C420,75 480,145 540,110 C600,75 660,145 720,110 C780,75 840,145 900,110 C960,75 1020,145 1080,110 C1140,75 1200,145 1260,110 C1320,75 1380,145 1440,110 C1500,75 1560,145 1620,110 C1680,75 1740,145 1800,110 C1860,75 1920,145 1980,110 C2040,75 2100,145 2160,110 C2220,75 2280,145 2340,110 C2400,75 2400,110 2400,110" stroke="#4da3ff" strokeWidth="0.8" fill="none" strokeDasharray="6 10" />
            </svg>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#0071e3]/10 to-transparent" />
      </div>

      {/* ──── HERO ──── */}
      <section className="relative z-10 pt-40 pb-28">
        <div className="max-w-[1200px] mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: expo }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-12">
              <MapPin className="w-3 h-3 text-[#0071e3]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#0071e3]">
                Krško, Slovenija · {sl ? 'Ustanovljeni' : 'Founded'} 2021
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="font-heading font-bold text-white tracking-tight leading-[0.92] mb-10"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: expo }}
          >
            <span className="block text-6xl md:text-8xl lg:text-[104px]">
              {sl ? 'O podjetju' : 'About us'}
            </span>
            <motion.span
              className="block text-6xl md:text-8xl lg:text-[104px] text-white/15 select-none"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: expo }}
            >
              MEGAMA
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light max-w-[52ch]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: expo }}
          >
            {sl
              ? 'Visoko specializiran partner za neporušne preiskave, nadzor kakovosti in varilni inženiring. Kjer napake niso dopustne.'
              : 'A highly specialized partner for non-destructive testing, quality oversight, and welding engineering. Where failure is not an option.'}
          </motion.p>
        </div>
      </section>

      {/* ──── KDO SMO ──── */}
      <section className="relative z-10 py-28 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: expo }}
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#0071e3]">
                  01 / {sl ? 'Identiteta' : 'Identity'}
                </span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight leading-tight">
                  {sl ? 'Vaš partner za tehnično celovitost' : 'Your partner for technical integrity'}
                </h2>
              </motion.div>

              <motion.p
                className="text-[17px] text-slate-300 leading-relaxed max-w-[62ch]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: expo }}
              >
                {sl
                  ? 'V podjetju MEGAMA d.o.o. smo se od ustanovitve leta 2021 uveljavili kot visoko specializiran in zanesljiv partner za najzahtevnejše industrijske izzive. Naše poslanstvo je zagotavljanje varnosti, integritete in brezhibnosti materialov tam, kjer napake niso dopustne.'
                  : 'Since our founding in 2021, MEGAMA d.o.o. has established itself as a highly specialized and reliable partner for the most demanding industrial challenges. Our mission is ensuring the safety, integrity, and flawlessness of materials where failure carries no tolerance.'}
              </motion.p>

              <motion.p
                className="text-[17px] text-slate-300 leading-relaxed max-w-[62ch]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14, ease: expo }}
              >
                {sl
                  ? 'Smo strokovnjaki za NDT preiskave, zagotavljanje kakovosti QA/QC pri izdelavi strojnih komponent ter tehnično svetovanje pri varjenju. Prisotni smo v vseh fazah projekta: od inženiringa in dokumentacije do nadzora med proizvodnjo in končne verifikacije.'
                  : 'We specialize in NDT inspections, QA/QC quality assurance for mechanical components, and technical welding consultation. We are present at every project phase: from engineering and documentation through production supervision to final verification.'}
              </motion.p>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: expo }}
                className="rounded-2xl border border-white/[0.09] bg-white/[0.02] overflow-hidden"
              >
                <div className="px-7 py-4 border-b border-white/[0.06]">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-white/25">
                    {sl ? 'Podatki o podjetju' : 'Company facts'}
                  </span>
                </div>
                <div className="px-7">
                  {facts.map(({ label, val, highlight }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center justify-between py-4 border-b border-white/[0.05] last:border-0 transition-colors duration-150 hover:bg-white/[0.015] -mx-7 px-7"
                    >
                      <span className="font-mono text-[10px] text-white/35 uppercase tracking-wider">{label}</span>
                      <span className={`text-[13px] font-semibold ${highlight ? 'text-[#0071e3]' : 'text-white'}`}>
                        {val}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── EKIPA ──── */}
      <section className="relative z-10 py-28 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expo }}
            className="mb-16"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#0071e3]">
              02 / {sl ? 'Ekipa' : 'Team'}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight">
              {sl ? 'Ljudje za standardi' : 'People Behind the Standards'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: expo }}
          >
            <TeamShowcase />
          </motion.div>
        </div>
      </section>

      {/* ──── ZAKAJ MEGAMA — Strokovnost ──── */}
      <section className="relative z-10 py-32 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expo }}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#0071e3]">
              03 / {sl ? 'Zakaj Megama' : 'Why Megama'}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight">
              {sl ? 'Elitna strokovnost in certifikati' : 'Elite expertise and certifications'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <motion.p
                className="text-[17px] text-slate-300 leading-relaxed max-w-[52ch]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: expo }}
              >
                {sl
                  ? 'Rezultati so le toliko dobri, kot je strokovno osebje, ki jih izvaja. Naša ekipa razpolaga z najvišjimi mednarodnimi kvalifikacijami za delo na najzahtevnejših objektih po svetu.'
                  : "Results are only as good as the people behind them. Our team holds the highest international qualifications for the world's most demanding installations."}
              </motion.p>
              <motion.p
                className="text-[17px] text-slate-300 leading-relaxed max-w-[52ch]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: expo }}
              >
                {sl
                  ? 'Specializirani smo za jedrsko tehniko, visokotlačno opremo, farmacijo in jeklene konstrukcije — sektorje, kjer je vsaka napaka nespremenljiva.'
                  : 'We specialize in nuclear engineering, pressure equipment, pharma, and steel structures — sectors where every defect is irreversible.'}
              </motion.p>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-white/[0.06]">
                {qualifications.map((q, i) => (
                  <motion.div
                    key={q.code}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: expo }}
                    className="group flex items-start gap-8 py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-[#0071e3]/[0.04] cursor-default"
                  >
                    <span className="font-mono text-[10px] text-[#0071e3] shrink-0 w-40 leading-snug pt-0.5">
                      {q.code}
                    </span>
                    <span className="text-[13px] text-slate-400 leading-snug transition-colors duration-150 group-hover:text-slate-300">
                      {q.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mednarodni doseg + 10/10 seal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-white/[0.06]">
            <div className="space-y-6">
              <motion.h3
                className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: expo }}
              >
                {sl ? 'Mednarodni doseg in stabilnost' : 'International reach and stability'}
              </motion.h3>
              <motion.p
                className="text-[17px] text-slate-300 leading-relaxed max-w-[52ch]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: expo }}
              >
                {sl
                  ? 'Zaupajo nam naročniki v Sloveniji in na tujih trgih, vključno z Avstrijo, Hrvaško in Združenimi arabskimi emirati. Naša poslovna odličnost je potrjena z najvišjo bonitetno oceno 10/10 (AJPES), ki nas uvršča med najstabilnejše partnerje v regiji.'
                  : 'Clients trust us across Slovenia and international markets including Austria, Croatia, and the UAE. Our business excellence is confirmed by the highest possible credit rating of 10/10 (AJPES), placing us among the most stable partners in the region.'}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
              >
                {markets.map((m, i) => (
                  <span
                    key={m}
                    className="px-4 py-2 rounded-full border border-white/[0.1] text-[12px] text-white/55 font-medium tracking-wide transition-all duration-200 hover:border-[#0071e3]/35 hover:text-white/75 cursor-default"
                    style={{ transitionDelay: `${i * 25}ms` }}
                  >
                    {m}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* 10/10 seal */}
            <div className="flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: expo }}
                className="relative flex items-center justify-center w-56 h-56"
              >
                <div className="absolute inset-0 rounded-full border border-[#0071e3]/30" />
                <div className="absolute inset-5 rounded-full border border-white/[0.07]" />

                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ animation: 'spin 40s linear infinite' }}
                  viewBox="0 0 220 220"
                >
                  <path
                    id="seal-ring-path"
                    d="M 110,110 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                    fill="none"
                  />
                  <text fill="rgba(255,255,255,0.15)" fontSize="8" letterSpacing="4">
                    <textPath href="#seal-ring-path" startOffset="0%">
                      BONITETNA ODLIČNOST · AJPES · MEGAMA d.o.o. · 10/10 ·
                    </textPath>
                  </text>
                </svg>

                <div className="text-center z-10">
                  <div className="font-heading text-6xl font-bold text-white leading-none tracking-tight">10</div>
                  <div className="w-10 h-px bg-[#0071e3]/50 mx-auto my-2" />
                  <div className="font-heading text-6xl font-bold text-white leading-none tracking-tight">10</div>
                  <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#0071e3]/60 mt-3">
                    {sl ? 'Bonitetna ocena' : 'Credit rating'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── VREDNOTE ──── */}
      <section className="relative z-10 py-28 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expo }}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#0071e3]">
              04 / {sl ? 'Vrednote' : 'Values'}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 mb-20 tracking-tight">
              {sl ? 'Naše vrednote' : 'Our values'}
            </h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-white/[0.06]">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: expo }}
                className="grid grid-cols-12 gap-6 py-10 items-start"
              >
                <div className="col-span-1">
                  <span className="font-mono text-[11px] text-white/25 tracking-wider">{v.num}</span>
                </div>
                <div className="col-span-11 md:col-span-4">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight">{v.title}</h3>
                </div>
                <div className="col-span-11 md:col-span-7 md:col-start-6">
                  <p className="text-[15px] text-slate-400 leading-relaxed max-w-[56ch]">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CERT BAR ──── */}
      <section className="relative z-10 py-12 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/20 mr-4">
              {sl ? 'Akreditacije' : 'Accreditations'}
            </span>
            {certs.map((c) => (
              <span
                key={c}
                className="font-mono text-[11px] text-white/40 tracking-wider border border-white/[0.08] px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:border-[#0071e3]/25 hover:text-white/65 cursor-default"
              >
                {c}
              </span>
            ))}
            <Link
              to="/certifikati"
              className="ml-auto group flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[#0071e3] hover:text-white transition-colors duration-200"
            >
              {sl ? 'Vsi certifikati' : 'All certificates'}
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──── CTA ──── */}
      <section className="relative z-10 pt-16 pb-8">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expo }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-12 md:p-16 relative overflow-hidden"
          >
            {/* Top edge glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#0071e3]/30 to-transparent" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 mb-8">
              <CheckCircle2 size={11} className="text-[#0071e3]" />
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#0071e3]">
                ISO 9001:2015
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {sl
                ? 'Potrebujete strokovni nadzor ali NDT preiskavo?'
                : 'Need expert supervision or NDT inspection?'}
            </h2>
            <p className="text-slate-400 text-[15px] mb-10 max-w-[44ch] mx-auto leading-relaxed">
              {sl
                ? 'Stopite v stik z nami. Skupaj bomo poskrbeli za brezhibnost vaše opreme.'
                : "Get in touch. Together we'll ensure the integrity of your equipment."}
            </p>

            <Link
              to="/#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#0071e3] text-white text-sm font-semibold tracking-wide hover:bg-[#0077ED] transition-colors duration-200"
            >
              {sl ? 'Pošljite povpraševanje' : 'Send an inquiry'}
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default About;
