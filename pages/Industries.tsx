import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Zap, Factory, ChevronRight, ActivitySquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Industries: React.FC = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const yProgress1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yProgress2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yProgress3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#000000] text-gray-300 font-sans relative overflow-hidden selection:bg-industrial-accent selection:text-white border-t border-white/5">
      
      {/* Background Matrix */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="fixed inset-6 md:inset-10 pointer-events-none z-10 border border-white/5 rounded-[40px] hidden lg:block">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-[100px] bg-[#000] border-y border-r border-[#1392ec]/20" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-[100px] bg-[#000] border-y border-l border-[#1392ec]/20" />
      </div>

      <section className="relative pt-40 pb-20 z-20">
        <div className="max-w-[1000px] mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#1392ec]/30 rounded-full bg-[#1392ec]/5 backdrop-blur-md mb-8">
               <ActivitySquare className="w-4 h-4 text-[#1392ec]" />
               <span className="text-[10px] font-mono tracking-widest text-[#1392ec] font-bold uppercase">{t.industriesPage.hero_badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">{t.industriesPage.hero_title}</h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">{t.industriesPage.hero_subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* STACKED DASHBOARD PANELS */}
      <section className="relative z-20 pb-32 pt-10">
        <div className="max-w-[1100px] mx-auto px-6 space-y-6">
          
          {/* Panel 1: Energy */}
          <motion.div style={{ y: yProgress1 }} className="group relative bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 overflow-hidden hover:border-[#1392ec]/40 transition-colors duration-500 flex flex-col md:flex-row items-center gap-10">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#1392ec]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-32 h-32 shrink-0 rounded-full border border-white/10 bg-black flex items-center justify-center relative overflow-hidden group-hover:border-[#1392ec]/40 transition-colors">
               <motion.div className="absolute inset-0 bg-[#1392ec]/10" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
               <Zap className="w-12 h-12 text-white group-hover:text-[#1392ec] relative z-10 transition-colors" />
            </div>

            <div className="flex-1 relative z-10">
              <div className="font-mono text-[10px] text-[#1392ec] mb-3 tracking-widest">MODULE.ENG.01</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t.industriesPage.title_energy}</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">{t.industriesPage.desc_energy}</p>
            </div>
            
            <div className="hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-gray-500 opacity-50">
               <span>SYS_ACTIVE</span>
               <span>RT/UT/PT</span>
            </div>
          </motion.div>

          {/* Panel 2: Pharma */}
          <motion.div style={{ y: yProgress2 }} className="group relative bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 overflow-hidden hover:border-[#1392ec]/40 transition-colors duration-500 flex flex-col md:flex-row items-center gap-10">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#1392ec]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-32 h-32 shrink-0 rounded-full border border-white/10 bg-black flex items-center justify-center relative overflow-hidden group-hover:border-[#1392ec]/40 transition-colors">
               <div className="absolute inset-0 bg-[#1392ec]/10 border-t-2 border-[#1392ec] animate-spin rounded-full" style={{ animationDuration: '3s' }} />
               <Building2 className="w-12 h-12 text-white group-hover:text-[#1392ec] relative z-10 transition-colors" />
            </div>

            <div className="flex-1 relative z-10">
              <div className="font-mono text-[10px] text-[#1392ec] mb-3 tracking-widest">MODULE.PHA.02</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t.industriesPage.title_pharma}</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">{t.industriesPage.desc_pharma}</p>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-gray-500 opacity-50">
               <span>CLEAN_ROOM</span>
               <span>VT/PT</span>
            </div>
          </motion.div>

          {/* Panel 3: Steel */}
          <motion.div style={{ y: yProgress3 }} className="group relative bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 overflow-hidden hover:border-[#1392ec]/40 transition-colors duration-500 flex flex-col md:flex-row items-center gap-10">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#1392ec]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-32 h-32 shrink-0 rounded-full border border-white/10 bg-black flex items-center justify-center relative overflow-hidden group-hover:border-[#1392ec]/40 transition-colors">
               {/* Pulse effect */}
               <div className="absolute inset-0 bg-[#1392ec]/20 animate-pulse" />
               <Factory className="w-12 h-12 text-white group-hover:text-[#1392ec] relative z-10 transition-colors" />
            </div>

            <div className="flex-1 relative z-10">
              <div className="font-mono text-[10px] text-[#1392ec] mb-3 tracking-widest">MODULE.STL.03</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t.industriesPage.title_steel}</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">{t.industriesPage.desc_steel}</p>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-gray-500 opacity-50">
               <span>STRUCTURAL</span>
               <span>UT/MT/VT</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Cyber CTA */}
      <section className="relative z-20 py-24 mb-10 text-center flex flex-col items-center border-t border-white/5 bg-[#050505]">
        <div className="max-w-[800px] mx-auto px-6">
          <Link to="/#contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10">{t.aboutPage.cta_btn}</span>
            <ChevronRight className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </section>

    </main>
  );
};
export default Industries;
