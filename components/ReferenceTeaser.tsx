import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const references = [
  {
    id: 'nek',
    sector: { sl: 'JEDRSKA ENERGETIKA', en: 'NUCLEAR ENERGY' },
    title: { sl: 'Nuklearna elektrarna Krško', en: 'Krško Nuclear Power Plant' },
    desc: {
      sl: 'Ultrazvočne, penetrantske in vizualne preiskave na komponentah primarnega kroga.',
      en: 'Ultrasonic, penetrant, and visual inspections on primary circuit components.',
    },
    methods: ['UT', 'PT', 'VT'],
    standard: 'ASME Sec. XI',
  },
  {
    id: 'petrol',
    sector: { sl: 'PETROKEMIJA', en: 'PETROCHEMICAL' },
    title: { sl: 'Vzdrževanje rafinerijskih sistemov', en: 'Refinery System Maintenance' },
    desc: {
      sl: 'Preiskave tlačnih posod in cevovodov med rednimi remonti. Kontrola varjenih spojev.',
      en: 'Inspection of pressure vessels and pipelines during regular maintenance. Weld joint control.',
    },
    methods: ['MT', 'UT', 'RT'],
    standard: 'EN ISO 17640',
  },
  {
    id: 'hydro',
    sector: { sl: 'ENERGETIKA', en: 'POWER & ENERGY' },
    title: { sl: 'Hidroelektrarne na Spodnji Savi', en: 'Lower Sava Hydroelectric Power Plants' },
    desc: {
      sl: 'Nadzor kakovosti in NDT preiskave pri montaži hidromehanske opreme in turbin.',
      en: 'Quality control and NDT inspections during the assembly of hydromechanical equipment and turbines.',
    },
    methods: ['VT', 'MT', 'UT'],
    standard: 'EN ISO 5817 B',
  },
];

const ReferenceTeaser: React.FC = () => {
  const { language, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const lang = language as 'sl' | 'en';

  return (
    <section className="bg-[#0a0a0a] py-24 relative overflow-hidden border-t border-white/5" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {lang === 'sl' ? 'Dosežki in Odtis' : 'Achievements & Footprint'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/references"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <span className="text-sm font-medium text-white">{lang === 'sl' ? 'Vse reference' : 'All References'}</span>
              <div className="w-6 h-6 rounded-full bg-[#1392ec]/20 group-hover:bg-[#1392ec] flex items-center justify-center transition-all">
                <ChevronRight size={14} className="text-[#1392ec] group-hover:text-white" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {references.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#1392ec]/50 overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1392ec]/0 via-[#1392ec]/0 to-[#1392ec]/0 group-hover:via-[#1392ec] transition-all duration-700 opacity-50" />

              <div className="p-8">
                <div className="text-[10px] font-mono tracking-widest text-gray-500 mb-6 uppercase">
                  {item.sector[lang]}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight h-14">
                  {item.title[lang]}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-10 h-20">
                  {item.desc[lang]}
                </p>

                {/* Footer Metadata */}
                <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500">METHODS:</span>
                    <div className="flex gap-2">
                      {item.methods.map(method => (
                        <span key={method} className="px-2 py-0.5 rounded bg-[#1392ec]/10 text-[#1392ec] text-[10px] font-mono font-bold">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500">STANDARD:</span>
                    <span className="text-[10px] font-mono font-bold text-white/70">{item.standard}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferenceTeaser;
