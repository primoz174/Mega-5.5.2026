import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Certificates: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as 'sl' | 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certData = [
    {
      id: 'iso-9001',
      code: 'ISO 9001:2015',
      title: { sl: 'Sistem vodenja kakovosti', en: 'Quality Management' },
      org: 'Bureau Veritas',
      status: 'VALID',
      desc: { sl: 'Certificirano vodenje QC/QA procesov in NDT storitev po mednarodnih standardih.', en: 'Certified management of QC/QA processes and NDT services according to international standards.' },
      color: 'blue'
    },
    {
      id: 'iso-9712',
      code: 'EN ISO 9712',
      title: { sl: 'NDT Certifikacija', en: 'NDT Certification' },
      org: 'Sector Cert / ZKOT',
      status: 'VALID',
      desc: { sl: 'Osebje certificirano za nivoje II in III v vseh disciplinah neporušnih preiskav.', en: 'Personnel certified for levels II and III in all NDT disciplines.' },
      color: 'emerald'
    },
    {
      id: 'asnt',
      code: 'ASNT Level III',
      title: { sl: 'Ekspertiza nivoja III', en: 'Level III Expertise' },
      org: 'ASNT (USA)',
      status: 'VERIFIED',
      desc: { sl: 'Najvišji mednarodni nivo ekspertize v NDT, skladen z ameriškimi standardi SNT-TC-1A.', en: 'Highest international NDT level, compliant with US standards SNT-TC-1A.' },
      color: 'amber'
    },
    {
      id: 'asme',
      code: 'ASME Sec. XI',
      title: { sl: 'Jedrska koda', en: 'Nuclear Code' },
      org: 'ASME / PDI',
      status: 'QUALIFIED',
      desc: { sl: 'Specializacija za varno delo v jedrski industriji in kritičnih energetskih objektih.', en: 'Specialization for safe operation in the nuclear industry and critical energy facilities.' },
      color: 'cyan'
    }
  ];

  const stats = [
    { label: { sl: 'Certificirano osebje', en: 'Certified Personnel' }, val: '100%' },
    { label: { sl: 'Nivo III strokovnjaki', en: 'Level III Experts' }, val: '4+' },
    { label: { sl: 'Mednarodna prisotnost', en: 'International Presence' }, val: '8+' }
  ];

  return (
    <main className="w-full min-h-screen bg-[#050505] text-slate-300 font-sans relative overflow-hidden selection:bg-apple-blue selection:text-white border-t border-white/5 pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[150px]" />
      </div>

      {/* Technical Brackets */}
      <div className="fixed inset-6 pointer-events-none z-10 border border-white/5 rounded-[40px] hidden lg:block">
        <div className="absolute top-8 left-10 font-mono text-[9px] tracking-widest text-[#1392ec]/40">[ SYSTEM: ACCREDITATION_CENTRAL ]</div>
        <div className="absolute bottom-8 right-10 font-mono text-[9px] tracking-widest text-[#1392ec]/40">VERIFIED_STATUS: ACTIVE</div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 z-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 group hover:border-apple-blue/50 transition-colors">
              <Shield className="w-3.5 h-3.5 text-apple-blue" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-apple-blue">{t.certificatesPage.hero_badge}</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {t.certificatesPage.hero_title}
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.certificatesPage.hero_subtitle}
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-8 md:gap-16 mt-16 pt-16 border-t border-white/5 w-full">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">{s.val}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-slate-500">{s.label[lang]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Certificates Grid */}
      <section className="relative z-20 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {certData.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${i % 3 === 0 ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'} group relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden hover:border-apple-blue/40 transition-all duration-500`}
              >
                {/* Accent Glow */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-apple-blue/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-12">
                     <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-apple-blue group-hover:border-apple-blue/30 transition-all">
                       <FileText size={28} />
                     </div>
                     <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        <span className="font-mono text-[9px] text-green-400 tracking-widest uppercase font-bold">{cert.status}</span>
                     </div>
                  </div>

                  <h3 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">{cert.code}</h3>
                  <div className="text-[#1392ec] font-mono text-xs mb-6 tracking-wide uppercase font-bold">{cert.title[lang]}</div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md">{cert.desc[lang]}</p>

                  <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                     <div>
                        <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1">{lang === 'sl' ? 'Cert. organ' : 'Issuing Body'}</div>
                        <div className="text-white text-xs font-bold">{cert.org}</div>
                     </div>
                     <div className="text-right">
                        <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1">REGISTRY</div>
                        <div className="text-white text-xs font-bold">2024-SYS-0{i+1}</div>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* High-Contrast CTA */}
      <section className="relative z-20 py-24 text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="p-12 rounded-[2.5rem] bg-gradient-to-br from-apple-blue/10 to-transparent border border-white/10 backdrop-blur-md"
          >
             <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight">
               {lang === 'sl' ? 'Potrebujete strokovno poročilo?' : 'Need an Expert Report?'}
             </h2>
             <Link to="/#contact" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
               {t.personnel.cta_btn} <ChevronRight size={18} />
             </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default Certificates;
