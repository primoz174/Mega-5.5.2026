import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Activity, ChevronRight, Target, Maximize, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Equipment: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white font-sans relative overflow-hidden border-t border-white/5">
      
      {/* Deep Cyber Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,146,236,0.05)_0%,transparent_100%)]" />
        <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 border-dashed" />
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] pointer-events-none opacity-50 z-0" />

      {/* Hero Content */}
      <section className="relative pt-40 pb-20 z-20">
        <div className="max-w-[1200px] mx-auto px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#1392ec]/30 rounded-full bg-[#1392ec]/5 backdrop-blur-md mb-8">
               <Cpu className="w-4 h-4 text-[#1392ec]" />
               <span className="text-[10px] font-mono tracking-widest text-[#1392ec] font-bold uppercase">{t.equipmentPage.hero_badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight relative">
              {t.equipmentPage.hero_title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t.equipmentPage.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* TECHNICAL EQUIPMENT PANELS */}
      <section className="relative z-20 pb-32">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-8">
          
          {/* Box 1: UT */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="group bg-[#0a0a0a] border border-white/10 hover:border-[#1392ec]/50 rounded-[40px] overflow-hidden transition-all duration-500 relative flex flex-col"
          >
            {/* Visual Header */}
            <div className="h-[250px] md:h-[300px] bg-black border-b border-white/10 relative overflow-hidden flex items-center justify-center p-10">
               {/* Sine Wave scanning animation */}
               <motion.div 
                 className="absolute inset-0 opacity-20 border-t border-[#1392ec]"
                 animate={{ y: ['0%', '100%', '0%'] }}
                 transition={{ duration: 4, ease: "linear", repeat: Infinity }}
               />
               <Activity className="w-32 h-32 text-white/5" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border border-[#1392ec]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <div className="w-48 h-48 border border-[#1392ec]/40 rounded-full flex items-center justify-center border-dashed animate-spin-slow">
                       <Target className="w-16 h-16 text-[#1392ec]" />
                    </div>
                 </div>
               </div>
               
               <div className="absolute top-4 left-4 font-mono text-[9px] text-[#1392ec] tracking-widest">
                 SEQ_SCAN: ACTIVE
               </div>
            </div>

            {/* Info Section */}
            <div className="p-10 md:p-12 flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">{t.equipmentPage.title_ut}</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">{t.equipmentPage.desc_ut}</p>
            </div>
          </motion.div>

          {/* Box 2: MPI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-[#0a0a0a] border border-white/10 hover:border-[#1392ec]/50 rounded-[40px] overflow-hidden transition-all duration-500 relative flex flex-col"
          >
            {/* Visual Header */}
            <div className="h-[250px] md:h-[300px] bg-black border-b border-white/10 relative overflow-hidden flex items-center justify-center p-10">
               <motion.div 
                 className="absolute w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,rgba(19,146,236,1)_0%,transparent_60%)]"
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 3, repeat: Infinity }}
               />
               <div className="absolute inset-0 flex items-center justify-center gap-10">
                 <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }} className="h-40 w-1 bg-[#1392ec]/50" />
                 <Maximize className="w-20 h-20 text-[#1392ec]" />
                 <motion.div animate={{ x: [10, -10, 10] }} transition={{ duration: 2, repeat: Infinity }} className="h-40 w-1 bg-[#1392ec]/50" />
               </div>

               <div className="absolute top-4 right-4 font-mono text-[9px] text-[#1392ec] tracking-widest text-right">
                 MAGNETIC_FLUX <br/> STATUS: NORMAL
               </div>
            </div>

            {/* Info Section */}
            <div className="p-10 md:p-12 flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">{t.equipmentPage.title_mpi}</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">{t.equipmentPage.desc_mpi}</p>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
};
export default Equipment;
