import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Zap, Factory, ChevronRight, CheckCircle, Shield, Award, Globe, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

type Category = 'all' | 'energy' | 'industrial' | 'construction';

interface Project {
  id: string;
  client: string;
  title: { sl: string; en: string };
  description: { sl: string; en: string };
  category: Exclude<Category, 'all'>;
  year: string;
  methods: string[];
  scope: { sl: string; en: string };
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  tag: string;
  image: string;
  location: { sl: string; en: string };
}

const projects: Project[] = [
  {
    id: 'nek',
    client: 'NEK – Nuklearna elektrarna Krško',
    title: { sl: 'NDT preiskave jedrske infrastrukture', en: 'NDT Inspection of Nuclear Infrastructure' },
    description: {
      sl: 'Celovite neporušne preiskave primarnega in sekundarnega krogotoka. Ultrazvočno testiranje cevovodov, varov in komponent po standardu ASME Sec. XI.',
      en: 'Comprehensive non-destructive inspections of primary and secondary circuits. Ultrasonic testing of pipelines, welds, and components per ASME Sec. XI.'
    },
    category: 'energy',
    year: '2019–2024',
    methods: ['UT', 'PT', 'MT', 'VT', 'TOFD', 'PAUT'],
    scope: { sl: 'Periodični pregledi in popravilne kampanje', en: 'Periodic inspections and repair campaigns' },
    icon: <Zap className="w-5 h-5" />,
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-400',
    tag: 'ENERGY_01',
    image: '/images/references/nuclear.png',
    location: { sl: 'Krško, Slovenija', en: 'Krško, Slovenia' }
  },
  {
    id: 'sibur',
    client: 'SIBUR / Tobolsk Polymer (RU)',
    title: { sl: 'Varilni nadzor petrochemičnega obrata', en: 'Welding Supervision in Petrochemical Plant' },
    description: {
      sl: 'Nadzor varjenja in kakovosti med gradnjo petrokemičnega obrata. Pregled in potrjevanje varilnih postopkov (WPS/WPQR) ter sprotna kontrola varov.',
      en: 'Welding quality supervision during construction of a major petrochemical plant. Review and validation of welding procedures (WPS/WPQR) and real-time weld inspection.'
    },
    category: 'industrial',
    year: '2017–2019',
    methods: ['VT', 'RT', 'UT', 'MT', 'WPQR'],
    scope: { sl: 'Dnevni nadzori na gradbišču', en: 'On-site daily supervision' },
    icon: <Factory className="w-5 h-5" />,
    accent: 'text-blue-400',
    accentBg: 'bg-blue-400',
    tag: 'INDUSTRIAL_01',
    image: '/images/references/petrochemical.png',
    location: { sl: 'Tobolsk, Rusija', en: 'Tobolsk, Russia' }
  },
  {
    id: 'revoz',
    client: 'Revoz / Renault d.o.o.',
    title: { sl: 'Pregled varjenih sklopov avtomobilske industrije', en: 'Welded Assembly Inspection – Automotive' },
    description: {
      sl: 'Vizualno in penetrantsko testiranje sklopov karoserij in pritrdilnih elementov. Uvajanje NDT protokolov v celoten produkcijski tok.',
      en: 'Visual and penetrant testing of body assemblies and structural fasteners. Implementation of NDT protocols across the full production flow.'
    },
    category: 'industrial',
    year: '2020–2022',
    methods: ['VT', 'PT', 'UTT'],
    scope: { sl: 'Redno vzdrževanje in spot nadzori', en: 'Regular maintenance & spot inspections' },
    icon: <Factory className="w-5 h-5" />,
    accent: 'text-orange-400',
    accentBg: 'bg-orange-400',
    tag: 'INDUSTRIAL_02',
    image: '/images/references/automotive.png',
    location: { sl: 'Novo mesto, Slovenija', en: 'Novo mesto, Slovenia' }
  },
  {
    id: 'petrol',
    client: 'Petrol d.d.',
    title: { sl: 'Inšpekcija jeklenih rezervoarjev in cevovodov', en: 'Steel Tank & Pipeline Inspection' },
    description: {
      sl: 'Merjenje debelin sten jeklenih rezervoarjev in distribucijskih cevovodov. Ocena korozije in preostale življenjske dobe.',
      en: 'Wall thickness measurement of steel tanks and distribution pipelines. Corrosion assessment and remaining life estimation.'
    },
    category: 'energy',
    year: '2021–2023',
    methods: ['UTT', 'VT', 'LT'],
    scope: { sl: 'Sistematični pregledi 40+ lokacij', en: 'Systematic inspections across 40+ sites' },
    icon: <Zap className="w-5 h-5" />,
    accent: 'text-green-400',
    accentBg: 'bg-green-400',
    tag: 'ENERGY_02',
    image: '/images/references/pipeline.png',
    location: { sl: 'Slovenija — 40+ lokacij', en: 'Slovenia — 40+ sites' }
  },
  {
    id: 'gradnja',
    client: 'SCT / Strabag d.o.o.',
    title: { sl: 'Nadzor varjenja kovinskih konstrukcij', en: 'Structural Welding Supervision' },
    description: {
      sl: 'Nadzor varjenja jeklenih konstrukcij za mostove in industrijske objekte. Spremljevalni NDT pregledi med vsakim varilnim procesom.',
      en: 'Welding supervision for steel structures of bridges and industrial buildings. Accompanying NDT inspections during each welding process.'
    },
    category: 'construction',
    year: '2018–2022',
    methods: ['VT', 'MT', 'UT', 'RT'],
    scope: { sl: 'Nadzor 12 projektov', en: 'Supervision across 12 projects' },
    icon: <Building2 className="w-5 h-5" />,
    accent: 'text-purple-400',
    accentBg: 'bg-purple-400',
    tag: 'CONSTRUCT_01',
    image: '/images/references/construction.png',
    location: { sl: 'Slovenija & Hrvaška', en: 'Slovenia & Croatia' }
  },
  {
    id: 'talum',
    client: 'Talum d.d. Kidričevo',
    title: { sl: 'Pregledi aluminijastih litih odlitkov', en: 'Cast Aluminium Component Inspections' },
    description: {
      sl: 'Penetrantsko testiranje aluminijastih odlitkov za letalsko in avtomobilsko industrijo. Certifikacija po EN ISO 9712.',
      en: 'Penetrant testing of aluminium castings for aerospace and automotive applications. Certification per EN ISO 9712.'
    },
    category: 'industrial',
    year: '2016–2024',
    methods: ['PT', 'VT', 'UTT'],
    scope: { sl: 'Dolgoročno partnerstvo od 2016', en: 'Long-term partnership since 2016' },
    icon: <Factory className="w-5 h-5" />,
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400',
    tag: 'INDUSTRIAL_03',
    image: '/images/references/petrochemical.png',
    location: { sl: 'Kidričevo, Slovenija', en: 'Kidričevo, Slovenia' }
  }
];

const stats = [
  { num: '500+', label: { sl: 'Izvedenih projektov', en: 'Completed Projects' }, icon: <CheckCircle className="w-5 h-5" /> },
  { num: '15+', label: { sl: 'Let izkušenj', en: 'Years Experience' }, icon: <Calendar className="w-5 h-5" /> },
  { num: '8', label: { sl: 'Držav delovanja', en: 'Countries Active' }, icon: <Globe className="w-5 h-5" /> },
  { num: '100%', label: { sl: 'Zadovoljnih naročnikov', en: 'Client Satisfaction' }, icon: <Award className="w-5 h-5" /> },
];

const References: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filters: { id: Category; label: string }[] = [
    { id: 'all', label: t.referencePage.filter_all },
    { id: 'energy', label: t.referencePage.filter_energy },
    { id: 'industrial', label: t.referencePage.filter_industrial },
    { id: 'construction', label: t.referencePage.filter_construction },
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <main className="w-full bg-[#0a0a0a] text-gray-300 relative overflow-hidden">

      {/* ======= HERO WITH BACKGROUND IMAGE ======= */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/references/hero_bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/60 to-[#0a0a0a]" />
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-[#0071e3]/[0.06] mix-blend-overlay" />
        </div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[1]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Scan line animation */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-[#0071e3]/40 to-transparent"
            animate={{ y: [0, 600, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 font-mono backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5" />
              {t.referencePage.hero_badge}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-8 tracking-tight leading-[0.9] uppercase">
              {t.referencePage.hero_title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              {t.referencePage.hero_subtitle}
            </p>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-2 text-gray-500"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======= STATS STRIP ======= */}
      <section className="py-16 border-b border-white/5 bg-white/[0.015] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0071e3]/[0.02] via-transparent to-[#0071e3]/[0.02]" />
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] mb-4 group-hover:bg-[#0071e3]/20 transition-colors">
                {s.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                {s.num}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">
                {s.label[language]}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======= PROJECT GRID ======= */}
      <section className="py-24 relative z-10">
        {/* Background atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0071e3]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
          </motion.div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-14 flex-wrap">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === f.id
                    ? 'bg-[#0071e3]/10 text-[#0071e3] border-[#0071e3]/30 shadow-[0_0_20px_rgba(0,113,227,0.15)]'
                    : 'bg-transparent text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300'
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto font-mono text-[10px] text-gray-600 tracking-wider">
              {filtered.length} {language === 'sl' ? 'PROJEKTOV' : 'PROJECTS'}
            </span>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  {/* Project image */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                    {/* Hovering color accent overlay */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${project.accentBg}`} />

                    {/* Tech tag floating on image */}
                    <div className="absolute top-4 right-4 font-mono text-[9px] text-white/60 tracking-widest uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                      [{project.tag}]
                    </div>

                    {/* Year badge on image */}
                    <div className={`absolute top-4 left-4 font-mono text-[11px] font-bold ${project.accent} bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10`}>
                      {project.year}
                    </div>

                    {/* Location on image bottom */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/60 z-10">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-mono tracking-wider">{project.location[language]}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Client */}
                    <div className={`text-[10px] font-bold font-mono uppercase tracking-widest mb-3 flex items-center gap-2 ${project.accent}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${project.accentBg}`} />
                      {project.client}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug tracking-tight">
                      {project.title[language]}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1 font-light">
                      {project.description[language]}
                    </p>

                    {/* Methods */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.methods.map(m => (
                        <span
                          key={m}
                          className="px-2.5 py-1 text-[10px] font-bold font-mono bg-white/5 text-gray-300 rounded-md border border-white/5 hover:border-white/20 hover:text-white transition-all"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-5 border-t border-white/5 uppercase">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500/70" />
                        <span>{project.scope[language]}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#0071e3] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ======= TRUST / CERTIFICATIONS ======= */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3] uppercase">[CERTIFICATIONS]</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">
              {language === 'sl' ? 'Standardi in certifikacije' : 'Standards & Certifications'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { code: 'EN ISO 9712', desc: language === 'sl' ? 'Certifikacija NDT osebja' : 'NDT Personnel Certification' },
              { code: 'EN ISO 3834', desc: language === 'sl' ? 'Zahteve kakovosti varjenja' : 'Welding Quality Requirements' },
              { code: 'ASME Sec. V/XI', desc: language === 'sl' ? 'Jedrski in tlačni standardi' : 'Nuclear & Pressure Standards' },
              { code: 'EN 1090', desc: language === 'sl' ? 'Jeklene konstrukcije' : 'Steel Structures' },
            ].map((cert, i) => (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/[0.02] border border-white/10 rounded-xl p-6 text-center hover:border-[#0071e3]/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center group-hover:bg-[#0071e3]/20 transition-colors">
                  <Award className="w-5 h-5 text-[#0071e3]" />
                </div>
                <div className="font-mono text-sm font-bold text-white mb-1">{cert.code}</div>
                <div className="text-[11px] text-gray-500 leading-snug">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA WITH ATMOSPHERE ======= */}
      <section className="relative py-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/references/hero_bg.png"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[#0071e3]/[0.04]" />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] text-[9px] font-bold uppercase tracking-[0.3em] mb-8 font-mono backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5" />
              {language === 'sl' ? 'Začnimo sodelovanje' : 'Start Collaboration'}
            </div>

            <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight uppercase leading-[0.95]">
              {t.referencePage.cta_title}
            </h2>

            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-10 font-light">
              {language === 'sl'
                ? 'Pridružite se seznamu industrijskih voditeljev, ki zaupajo Megami za kritične inšpekcije in zagotavljanje kakovosti.'
                : 'Join the list of industry leaders who trust Megama for critical inspections and quality assurance.'
              }
            </p>

            <Link
              to="/#contact"
              className="group inline-flex items-center justify-center gap-3 min-w-[240px] h-14 bg-[#0071e3] hover:bg-[#0071e3]/90 text-white text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 rounded-lg hover:shadow-[0_0_30px_rgba(0,113,227,0.3)]"
            >
              {t.referencePage.cta_btn}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default References;
