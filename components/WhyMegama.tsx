import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Users, Clock, Award, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const usps = [
  {
    code: 'KOMPETENCE',
    icon: <Users size={18} />,
    title: { sl: 'Certificirano osebje', en: 'Certified Personnel' },
    desc: {
      sl: 'Celotna ekipa certificirana po EN ISO 9712 in ASNT Level III — najvišji mednarodni standardi.',
      en: 'Full team certified to EN ISO 9712 and ASNT Level III — the highest international standards.',
    },
  },
  {
    code: 'NEODVISNOST',
    icon: <ShieldCheck size={18} />,
    title: { sl: 'Popolna neodvisnost', en: 'Full Independence' },
    desc: {
      sl: 'Nismo vezani na nobena podjetje ali dobavitelja. Naš edini interes je vaša tehnična varnost.',
      en: 'We are not affiliated with any manufacturer or supplier. Our only interest is your technical safety.',
    },
  },
  {
    code: 'IZKUŠNJE',
    icon: <Clock size={18} />,
    title: { sl: '15+ let v kritični infrastrukturi', en: '15+ Years in Critical Infrastructure' },
    desc: {
      sl: 'Jedrska energetika, petrokemija, težka industrija. Izkušnje, ki se ne da kupiti.',
      en: 'Nuclear energy, petrochemicals, heavy industry. Experience that cannot be bought.',
    },
  },
];

const certs = [
  { code: 'ISO 9001:2015', label: { sl: 'Sistem vodenja kakovosti', en: 'Quality Management System' }, active: true, validUntil: '12/2026', certNo: 'Q-847291' },
  { code: 'EN ISO 9712', label: { sl: 'Certifikacija NDT osebja', en: 'NDT Personnel Certification' }, active: true, validUntil: '08/2027', certNo: 'NDT-EU-391' },
  { code: 'ASNT Level III', label: { sl: 'Ameriški NDT standard', en: 'American NDT Standard' }, active: true, validUntil: '11/2026', certNo: 'ASNT-18492' },
  { code: 'ASME Sec. XI', label: { sl: 'Jedrska industrija', en: 'Nuclear Industry' }, active: true, validUntil: '05/2028', certNo: 'SEC-XI-992' },
  { code: 'PDI Qualified', label: { sl: 'PDI-UT-1, 2 w IGSCC, 3, 5', en: 'PDI-UT-1, 2 w IGSCC, 3, 5' }, active: true, special: true, validUntil: '09/2027', certNo: 'EPRI-PDI-44' },
];

const WhyMegama: React.FC = () => {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const lang = language as 'sl' | 'en';

  return (
    <section
      id="why-megama"
      ref={ref}
      className="relative bg-black py-32 md:py-44 overflow-hidden"
    >
      {/* Top fade from GlobalPresence */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      <style>{`
        @keyframes tech-scanner {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        @keyframes tech-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scanner {
          animation: tech-scanner 5s ease-in-out infinite;
        }
      `}</style>
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />

      {/* Blue glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#00a8ff]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {lang === 'sl' ? 'Zakaj MEGAMA?' : 'Why MEGAMA?'}
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl leading-relaxed font-light">
            {lang === 'sl'
              ? 'V NDT ni prostora za kompromise. Izbira partnerja definira razliko med varnostjo in katastrofo.'
              : 'In NDT there is no room for compromise. Choosing the right partner defines the difference between safety and catastrophe.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — USP list */}
          <div className="space-y-6">
            {usps.map((usp, i) => (
              <motion.div
                key={usp.code}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="group relative flex gap-5 p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-2xl hover:shadow-[0_8px_32px_rgba(0,168,255,0.1),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden"
              >
                {/* Tech Shimmer inside card */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#00a8ff]/5 to-transparent -translate-x-full group-hover:animate-[tech-shimmer_2s_infinite]" />
                </div>
                
                {/* Technical label */}
                <div className="absolute top-5 right-6 font-mono text-[9px] text-[#00a8ff]/30 tracking-widest group-hover:text-[#00a8ff]/80 transition-colors">
                  [{usp.code}]
                </div>

                {/* Icon */}
                <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#00a8ff] group-hover:border-[#00a8ff]/40 transition-all duration-500 z-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-[#00a8ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative z-10">{usp.icon}</div>
                </div>

                {/* Content */}
                <div className="relative z-10 pt-1">
                  <h3 className="text-white font-semibold text-xl mb-2">{usp.title[lang]}</h3>
                  <p className="text-white/55 text-base leading-relaxed font-light">{usp.desc[lang]}</p>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00a8ff]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            ))}
          </div>

          {/* Right — Certification Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Glass certification card */}
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]">
              
              {/* Automated Scanner Line */}
              <div className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] overflow-hidden">
                 <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00a8ff] to-transparent animate-scanner shadow-[0_0_15px_#00a8ff]" />
              </div>

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/20 rounded-tl-[2.5rem] z-10" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-white/20 rounded-tr-[2.5rem] z-10" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/20 rounded-bl-[2.5rem] z-10" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/20 rounded-br-[2.5rem] z-10" />

              <div className="p-8 md:p-10 relative z-0">
                {/* Card header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.25em] text-[#00a8ff]/80 uppercase mb-2 flex items-center gap-2">
                       <ShieldCheck size={14} /> [STATUS: VERIFIED]
                    </div>
                    <h3 className="text-white font-semibold text-2xl">
                      {lang === 'sl' ? 'Certifikati & Akreditacije' : 'Certifications & Accreditations'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 backdrop-blur-md rounded-full px-4 py-2 shrink-0">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    <span className="font-mono text-[10px] text-green-400 tracking-widest font-bold">{lang === 'sl' ? 'AKTIVEN' : 'ACTIVE'}</span>
                  </div>
                </div>

                {/* Cert list */}
                <div className="space-y-3">
                  {certs.map((cert, i) => (
                    <motion.div
                      key={cert.code}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      onMouseEnter={() => setHoveredCert(cert.code)}
                      onMouseLeave={() => setHoveredCert(null)}
                      className={`relative flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer group ${
                        cert.special 
                          ? 'bg-amber-500/[0.05] border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_15px_rgba(0,168,255,0.1)]'
                      }`}
                    >
                      {/* Inner glow specific to special item */}
                      {cert.special && (
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      )}

                      <div className="flex items-center gap-4 relative z-10 w-full">
                        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          cert.special ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 border border-white/10 text-white/60 group-hover:text-[#00a8ff] group-hover:border-[#00a8ff]/30'
                        }`}>
                          {cert.special ? <Award size={18} /> : <CheckCircle2 size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className={`font-mono text-sm md:text-base font-bold tracking-wide flex items-center justify-between ${cert.special ? 'text-amber-400' : 'text-white'}`}>
                            {cert.code}
                            
                            {/* Desktop info icon */}
                            <span className="hidden md:flex text-white/30 group-hover:text-white/60">
                               <Info size={14} />
                            </span>
                          </div>
                          
                          <div className="relative h-5 overflow-hidden mt-0.5">
                            <AnimatePresence mode="wait">
                              {hoveredCert === cert.code ? (
                                <motion.div
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -20, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute inset-0 text-xs font-mono text-white/80 flex items-center gap-3"
                                >
                                  <span>ID: <span className="text-white">{cert.certNo}</span></span>
                                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                                  <span>EXP: <span className="text-[#00a8ff]">{cert.validUntil}</span></span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ y: -20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 20, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className={`absolute inset-0 text-xs font-light truncate ${cert.special ? 'text-amber-200/70' : 'text-white/50'}`}
                                >
                                  {cert.label[lang]}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 flex items-center gap-2 relative z-10 shrink-0">
                         <div className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border transition-all ${
                           cert.special 
                             ? 'text-amber-400 border-amber-400/30 bg-amber-400/10 group-hover:bg-amber-400/20' 
                             : 'text-[#00a8ff]/70 border-[#00a8ff]/20 bg-[#00a8ff]/5 group-hover:text-[#00a8ff] group-hover:border-[#00a8ff]/50 group-hover:bg-[#00a8ff]/10'
                         }`}>
                           VALID
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom stat */}
                <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">
                      {lang === 'sl' ? 'Vso terensko osebje' : 'All field personnel'}
                    </div>
                    <div className="text-white font-bold text-4xl tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">100%</div>
                    <div className="text-[#00a8ff] text-xs font-medium uppercase tracking-wider mt-1">
                      {lang === 'sl' ? 'certificirano' : 'certified'}
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                    <Award size={32} className="text-[#00a8ff]/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA under card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-8 flex justify-end"
            >
              <HoverBorderGradient
                as="a"
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                containerClassName="p-0"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-medium bg-black/80 hover:bg-[#0071e3]/10 hover:shadow-[0_8px_32px_rgba(0,113,227,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300 group/link"
              >
                {lang === 'sl' ? 'Pridobite ponudbo' : 'Get a quote'}
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover/link:translate-x-1 transition-transform">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </HoverBorderGradient>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyMegama;

