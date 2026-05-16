import React from 'react';
import { motion } from 'framer-motion';

const sectors = [
  {
    id: 'nuclear',
    label: { sl: 'Jedrska energetika', en: 'Nuclear Energy' },
    code: 'NUC.01',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.4" />
        <ellipse cx="16" cy="16" rx="13" ry="5" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
      </svg>
    ),
  },
  {
    id: 'pharma',
    label: { sl: 'Farmacija', en: 'Pharmaceuticals' },
    code: 'PHA.02',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M8 10h16v12H8z" />
        <path d="M12 10V7h8v3" />
        <circle cx="16" cy="16" r="2" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'power',
    label: { sl: 'Konvencionalna energetika', en: 'Power & Energy' },
    code: 'PWR.03',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M18 4L8 18h8l-2 10 12-16h-8l2-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'steel',
    label: { sl: 'Jeklene konstrukcije', en: 'Steel Structures' },
    code: 'STL.04',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M4 24h24M8 24V10l8-4 8 4v14" />
        <path d="M8 14h16M16 6v18" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'foundry',
    label: { sl: 'Livarstvo in jeklo', en: 'Foundry & Steel' },
    code: 'FND.05',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M6 26h20l-2-12H8L6 26z" />
        <path d="M16 14V6M12 6h8" strokeLinecap="round" />
        <path d="M10 20h12" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'engineering',
    label: { sl: 'Splošna strojegradnja', en: 'General Engineering' },
    code: 'ENG.06',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="4" y="20" width="24" height="6" rx="1" />
        <rect x="8" y="14" width="6" height="6" />
        <rect x="18" y="14" width="6" height="6" />
        <path d="M2 20h28" strokeOpacity="0.4" />
        <path d="M11 14V10c0-2 10-2 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'construction',
    label: { sl: 'Gradbeništvo', en: 'Construction' },
    code: 'CON.07',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M4 28h24" strokeLinecap="round" />
        <path d="M8 28V16l8-8 8 8v12" />
        <rect x="13" y="20" width="6" height="8" />
        <path d="M8 16h16" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'oil',
    label: { sl: 'Naftna industrija', en: 'Oil & Gas' },
    code: 'OIL.08',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M2 12h10c2 0 4 2 4 4s2 4 4 4h10" strokeLinecap="round" />
        <path d="M2 20h10c2 0 4-2 4-4s2-4 4-4h10" strokeLinecap="round" strokeOpacity="0.4" />
        <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
  },
];

const SectorItem: React.FC<{ sector: typeof sectors[0]; lang: 'sl' | 'en' }> = ({ sector, lang }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('services-ndt');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center gap-4 px-8 shrink-0 group relative cursor-pointer"
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-[#0071e3]/0 group-hover:bg-[#0071e3]/10 blur-xl transition-all duration-700 rounded-full z-0 pointer-events-none" />
      
      <div className="text-[#0071e3]/60 group-hover:text-[#0071e3] group-hover:drop-shadow-[0_0_8px_rgba(0,113,227,0.8)] transition-all duration-500 z-10 group-hover:scale-110">
        {sector.icon}
      </div>
      
      <div className="flex flex-col z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#0071e3]/40 group-hover:text-[#0071e3]/90 transition-colors duration-500 uppercase">
          [{sector.code}]
        </span>
        <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white/80 group-hover:text-[#1d1d1f] dark:group-hover:text-white transition-colors duration-500 tracking-tight whitespace-nowrap">
          {sector.label[lang]}
        </span>
      </div>
      

    </div>
  );
};

interface IndustrySectorsProps {
  lang?: 'sl' | 'en';
}

const IndustrySectors: React.FC<IndustrySectorsProps> = ({ lang = 'sl' }) => {
  const tripled = [...sectors, ...sectors, ...sectors];

  return (
    <div className="w-full py-10 bg-black overflow-hidden relative z-30">
      
      <style>{`
        @keyframes pro-max-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-pro-marquee {
          animation: pro-max-marquee 45s linear infinite;
        }
        .hover-pause:hover .animate-pro-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Label */}
      <div className="max-w-[980px] mx-auto px-6 mb-6 flex items-center gap-4 relative z-20">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-400 uppercase shrink-0">
          {lang === 'sl' ? 'Sektorji delovanja' : 'Sectors of operation'}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20" />
      </div>

      {/* Marquee Wrapper with Pause on Hover */}
      <div className="relative overflow-hidden hover-pause">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div className="flex items-center animate-pro-marquee w-max">
          {tripled.map((sector, i) => (
            <SectorItem key={`${sector.id}-${i}`} sector={sector} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustrySectors;
