import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ScanEye, ShieldCheck, ClipboardCheck, Lightbulb,
  Eye, Droplet, Magnet, Activity, Ruler, Wind, Radiation, FileSearch, Hammer,
  Shield, CheckSquare, Users, PackageCheck, Network, FileText, Factory, FileSignature, BookOpen,
  Settings, Award, Book, GraduationCap, ArrowRight, Download, FileBadge, ChevronDown
} from 'lucide-react';
import { servicesData } from '../data/services';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  ScanEye: <ScanEye size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  ClipboardCheck: <ClipboardCheck size={24} />,
  Lightbulb: <Lightbulb size={24} />,
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
  GraduationCap: <GraduationCap size={20} />
};

type Stat = { value: string; label: { sl: string; en: string } };

const stats: Stat[] = [
  { value: '15+', label: { sl: 'Let izkušenj', en: 'Years of experience' } },
  { value: '500+', label: { sl: 'Izvedenih projektov', en: 'Completed projects' } },
  { value: '8', label: { sl: 'Industrijskih panog', en: 'Industrial sectors' } },
  { value: '100%', label: { sl: 'Sledljivost', en: 'Traceability' } },
];

const certifications = [
  { code: 'EN ISO 9712', scope: { sl: 'Osebje NDT', en: 'NDT personnel' } },
  { code: 'EN ISO/IEC 17020', scope: { sl: 'Inšpekcijski organ', en: 'Inspection body' } },
  { code: 'EN ISO 17637', scope: { sl: 'Vizualna preiskava', en: 'Visual testing' } },
  { code: 'EN ISO 3834', scope: { sl: 'Kakovost varjenja', en: 'Welding quality' } },
];

function AnimatedStat({ stat, lang, delay }: { stat: Stat; lang: 'sl' | 'en'; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2 px-4 py-7 md:py-8"
    >
      <div className="font-heading text-3xl md:text-5xl font-bold text-white tracking-tight tabular-nums whitespace-nowrap">
        {stat.value}
      </div>
      <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-medium text-center leading-tight">
        {stat.label[lang]}
      </div>
    </motion.div>
  );
}

function ServicesPage() {
  const location = useLocation();
  const initialCategoryId = location.state?.categoryId || servicesData[0].id;

  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId);
  const { language } = useLanguage();
  const lang = language as 'sl' | 'en';

  const activeCategory = servicesData.find(c => c.id === activeCategoryId) || servicesData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.categoryId) {
      setActiveCategoryId(location.state.categoryId);
    }
  }, [location.state]);

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]';

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans overflow-x-clip pt-20 flex flex-col items-center">

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Hero */}
      <section className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 z-0">
           <img src="/images/references/hero_bg.png" alt="" className="w-full h-full object-cover opacity-20 scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
         </div>

         <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0071e3] mb-4"
            >
              {lang === 'sl' ? 'STORITVE' : 'SERVICES'}
            </motion.div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
              {lang === 'sl' ? 'Storitve & Ekspertiza' : 'Services & Expertise'}
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              {lang === 'sl'
                ? 'Celovit pregled naših tehnoloških rešitev na področju neporušitvenih preiskav, nadzora in inženiringa.'
                : 'A comprehensive overview of our technological solutions in NDT, supervision, and engineering.'}
            </p>
         </div>
      </section>

      {/* Proof strip — stats (top) + certifications (bottom) */}
      <section className="w-full border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-12 md:py-16">

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map((stat, i) => (
              <div key={stat.value} className="bg-[#050505]">
                <AnimatedStat stat={stat} lang={lang} delay={0.1 + i * 0.08} />
              </div>
            ))}
          </div>

          {/* Certifications row */}
          <div className="mt-10 md:mt-12">
            <div className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-5 flex items-center gap-2">
              <FileBadge size={14} className="text-[#0071e3]" />
              {lang === 'sl' ? 'Akreditacije & standardi' : 'Accreditations & standards'}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.code}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0071e3]/30 transition-colors"
                >
                  <div className="text-white font-bold text-sm tracking-tight">{cert.code}</div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">{cert.scope[lang]}</div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Mobile category tab bar (sticky) */}
      <div className="lg:hidden sticky top-20 z-30 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/5">
        <div
          className="flex gap-2 overflow-x-auto px-6 py-3 snap-x snap-mandatory scrollbar-hide"
          role="tablist"
          aria-label={lang === 'sl' ? 'Področja storitev' : 'Service areas'}
        >
          {servicesData.map((category) => {
            const isActive = activeCategoryId === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryId(category.id)}
                className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${focusRing} ${
                  isActive
                    ? 'bg-[#0071e3]/15 border-[#0071e3]/40 text-white'
                    : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className={isActive ? 'text-[#0071e3]' : 'text-slate-500'}>
                  {iconMap[category.icon]}
                </span>
                <span className="text-sm font-semibold tracking-tight whitespace-nowrap">
                  {category.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main layout */}
      <section className="relative w-full max-w-[1440px] px-6 lg:px-12 py-12 md:py-20 z-10">

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Desktop sidebar */}
          <div
            className="hidden lg:flex w-80 shrink-0 flex-col gap-3 sticky top-28 z-20"
            role="tablist"
            aria-label={lang === 'sl' ? 'Področja storitev' : 'Service areas'}
          >
            <div className="text-[11px] text-slate-500 tracking-widest uppercase font-semibold mb-2 px-4">
              {lang === 'sl' ? 'Področja ekspertize' : 'Areas of expertise'}
            </div>
            {servicesData.map((category) => {
              const isActive = activeCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`
                    w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                    border group ${focusRing}
                    ${isActive
                      ? 'bg-[#0071e3]/10 border-[#0071e3]/25 shadow-[0_0_20px_rgba(0,113,227,0.08)]'
                      : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                    }
                  `}
                >
                  <div className={`p-2.5 rounded-xl transition-all duration-300 border ${isActive ? 'bg-[#0071e3]/10 border-[#0071e3]/20 text-[#0071e3]' : 'bg-white/[0.03] border-white/5 text-slate-400 group-hover:text-slate-200'}`}>
                    {iconMap[category.icon]}
                  </div>

                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                     <div className={`text-base font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                       {category.shortTitle}
                     </div>
                     <div className="text-xs text-slate-500 line-clamp-1">
                       {category.items.length} {lang === 'sl' ? 'metod' : 'methods'}
                     </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className={`shrink-0 transition-all duration-300 ${isActive ? 'text-[#0071e3] translate-x-0 opacity-100' : 'text-slate-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`}
                  />
                </button>
              );
            })}

            {/* Certificate reassurance card — links to /certifikati */}
            <Link
              to="/certifikati"
              className={`mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#0071e3]/10 to-transparent border border-[#0071e3]/20 block hover:border-[#0071e3]/40 hover:from-[#0071e3]/15 transition-all duration-200 group/cert ${focusRing}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[#0071e3]">
                  <ShieldCheck size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {lang === 'sl' ? 'Akreditirano' : 'Accredited'}
                  </span>
                </div>
                <ArrowRight size={12} className="text-[#0071e3]/50 group-hover/cert:text-[#0071e3] group-hover/cert:translate-x-0.5 transition-all duration-200" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'sl'
                  ? 'Vse preiskave izvajamo skladno z EN ISO 9712 s certificiranim osebjem. Oglejte si naše certifikate →'
                  : 'All inspections are performed per EN ISO 9712 by certified personnel. View our certificates →'}
              </p>
            </Link>
          </div>

          {/* Content */}
          <div className="w-full lg:flex-1 relative min-h-[600px]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeCategory.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="flex flex-col"
               >
                 {/* Category header */}
                 <div className="mb-10 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-[#0071e3]/5 blur-[100px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-4 mb-5">
                             <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black/40 border border-white/10 text-[#0071e3] shrink-0">
                                {iconMap[activeCategory.icon]}
                             </div>
                             <div className="min-w-0">
                                <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
                                  {lang === 'sl' ? 'Področje' : 'Area'}
                                </div>
                                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">{activeCategory.title}</h2>
                             </div>
                          </div>
                          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                             {activeCategory.description}
                          </p>
                       </div>

                       <div className="flex md:flex-col gap-2 shrink-0">
                          <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-center md:min-w-[120px]">
                            <div className="text-2xl font-bold text-white tabular-nums">{activeCategory.items.length}</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                              {lang === 'sl' ? 'Metod' : 'Methods'}
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Service cards */}
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                   {activeCategory.items.map((item, idx) => (
                     <ServiceCard
                       key={item.id}
                       item={item}
                       idx={idx}
                       total={activeCategory.items.length}
                       lang={lang}
                       focusRing={focusRing}
                     />
                   ))}
                 </div>

                 {/* Contextual in-category CTA */}
                 <div className="mt-12 p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                       <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                         {lang === 'sl'
                           ? 'Povpraševanje za to področje'
                           : `Request ${activeCategory.shortTitle}`}
                       </h3>
                       <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                         {lang === 'sl'
                           ? 'Pošljite povpraševanje — odgovorimo v 24 urah z oceno obsega in rokov.'
                           : 'Send an inquiry — we respond within 24 hours with a scope and timeline estimate.'}
                       </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                       <Link
                         to="/#contact"
                         state={{ service: activeCategory.id, serviceLabel: activeCategory.title }}
                         className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0071e3] hover:bg-[#0071e3]/90 text-white rounded-full font-semibold text-sm transition-all hover:scale-[1.02] ${focusRing}`}
                       >
                         {lang === 'sl' ? 'Pošlji povpraševanje' : 'Send inquiry'}
                         <ArrowRight size={16} />
                       </Link>
                       <Link
                         to="/certifikati"
                         className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold text-sm transition-colors ${focusRing}`}
                       >
                         <FileBadge size={14} />
                         {lang === 'sl' ? 'Certifikati' : 'Certificates'}
                       </Link>
                    </div>
                 </div>

               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Global CTA */}
      <section className="w-full max-w-[1240px] px-6 py-20 md:py-24">
         <div className="p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#0071e3]/10 via-[#0071e3]/5 to-transparent border border-[#0071e3]/20 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,113,227,0.1)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#0071e3] mb-4">
                <Award size={18} />
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {lang === 'sl' ? 'Akreditirani izvajalec' : 'Accredited provider'}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight max-w-2xl">
                 {lang === 'sl' ? 'Pripravljeni na sodelovanje?' : 'Ready to work with us?'}
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-xl mb-8 font-light leading-relaxed">
                {lang === 'sl'
                  ? 'Pošljite nam opis projekta — pripravimo vam ponudbo s certificiranimi metodami in jasnim rokom.'
                  : 'Send us your project brief — we prepare a proposal with certified methods and a clear timeline.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/#contact"
                  className={`inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm transition-transform hover:scale-[1.03] ${focusRing}`}
                >
                   {lang === 'sl' ? 'Pošljite povpraševanje' : 'Send inquiry'} <ArrowRight size={16} />
                </Link>
                <Link
                  to="/certifikati"
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border border-white/20 hover:bg-white/5 rounded-full font-semibold text-sm transition-colors ${focusRing}`}
                >
                  <Download size={16} />
                  {lang === 'sl' ? 'Certifikati' : 'Certificates'}
                </Link>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}

function ServiceCard({
  item, idx, total, lang, focusRing,
}: {
  item: ServiceItem;
  idx: number;
  total: number;
  lang: 'sl' | 'en';
  focusRing: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const icon = item.icon ? iconMap[item.icon] : <Settings size={20} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.35 }}
      className="group bg-[#050505] border border-white/5 hover:border-[#0071e3]/25 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
    >
      {/* Header row */}
      <div className="flex items-start gap-4 p-5 pb-3">
        <div className="w-11 h-11 rounded-xl bg-[#0071e3]/8 border border-[#0071e3]/15 flex items-center justify-center text-[#0071e3] shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {item.quickFacts?.standard && (
              <span className="font-mono text-[9px] text-[#0071e3]/70 bg-[#0071e3]/8 border border-[#0071e3]/15 px-2 py-0.5 rounded-full tracking-wide">
                {item.quickFacts.standard.split('/')[0].trim()}
              </span>
            )}
            {item.level3 && (
              <span className="flex items-center gap-1 font-mono text-[9px] text-white/35 border border-white/8 px-2 py-0.5 rounded-full">
                <ShieldCheck size={8} className="text-[#0071e3]/60" />
                Level III
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-[#0071e3] transition-colors duration-200">
            {item.label}
          </h3>
        </div>
        <span className="text-[10px] text-white/15 font-mono tabular-nums shrink-0 pt-1">
          {String(idx + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Description */}
      <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed font-light">
        {item.description}
      </p>

      {/* Quick facts */}
      {item.quickFacts && (
        <div className="mx-5 mb-4 grid grid-cols-3 rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
          {[
            { label: lang === 'sl' ? 'Standard' : 'Standard', value: item.quickFacts.standard },
            { label: lang === 'sl' ? 'Uporaba' : 'Application', value: item.quickFacts.application },
            { label: lang === 'sl' ? 'Rezultat' : 'Result', value: item.quickFacts.result },
          ].map(({ label, value }, fi) => (
            <div key={label} className={`flex flex-col gap-1 px-3 py-2.5 ${fi < 2 ? 'border-r border-white/[0.05]' : ''}`}>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
              <span className="text-[11px] text-slate-300 leading-snug font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Expandable details */}
      {item.details && item.details.length > 0 && (
        <div className="mt-auto border-t border-white/[0.05]">
          <button
            type="button"
            onClick={() => setExpanded(v => !v)}
            className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-white/[0.02] ${focusRing}`}
          >
            <div className="flex items-center gap-2">
              <CheckSquare size={11} className="text-[#0071e3]/60" />
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                {lang === 'sl' ? 'Metode & obseg' : 'Methods & scope'}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 py-1">
                      <div className="mt-2 w-1 h-1 rounded-full bg-[#0071e3]/60 shrink-0" />
                      <span className="text-[13px] text-slate-300 leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default ServicesPage;
