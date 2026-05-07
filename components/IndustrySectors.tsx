import React from 'react';
import { motion } from 'framer-motion';

const sectors = [
  {
    id: 'nuclear',
    label: { sl: 'Jedrska energetika', en: 'Nuclear Energy' },
    code: 'SEKTOR_01',
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
    id: 'petrochemical',
    label: { sl: 'Petrokemija', en: 'Petrochemical' },
    code: 'SEKTOR_02',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="6" y="18" width="20" height="8" rx="2" />
        <path d="M10 18V12C10 9 12 8 16 8s6 1 6 4v6" />
        <path d="M13 8V6M16 8V5M19 8V6" strokeLinecap="round" />
        <path d="M6 22h20" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'energy',
    label: { sl: 'Energetika', en: 'Power & Energy' },
    code: 'SEKTOR_03',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M18 4L8 18h8l-2 10 12-16h-8l2-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'heavy-industry',
    label: { sl: 'Težka industrija', en: 'Heavy Industry' },
    code: 'SEKTOR_04',
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
    code: 'SEKTOR_05',
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
    id: 'maritime',
    label: { sl: 'Ladjarstvo', en: 'Maritime' },
    code: 'SEKTOR_06',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M5 22l3-12h16l3 12" strokeLinejoin="round" />
        <path d="M16 10V4" strokeLinecap="round" />
        <path d="M16 4l-4 3h8l-4-3z" />
        <path d="M3 26c2-3 5-3 8 0s6 3 8 0 5-3 9 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'pressure-vessels',
    label: { sl: 'Tlačne posode', en: 'Pressure Vessels' },
    code: 'SEKTOR_07',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="8" y="6" width="16" height="20" rx="8" />
        <path d="M8 14h16M8 18h16" strokeOpacity="0.4" />
        <path d="M16 4v2M16 26v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'pipelines',
    label: { sl: 'Cevovodi', en: 'Pipelines' },
    code: 'SEKTOR_08',
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
      <div className="absolute inset-0 bg-[#1392ec]/0 group-hover:bg-[#1392ec]/10 blur-xl transition-all duration-700 rounded-full z-0 pointer-events-none" />
      
      <div className="text-[#1392ec]/60 group-hover:text-[#1392ec] group-hover:drop-shadow-[0_0_8px_rgba(19,146,236,0.8)] transition-all duration-500 z-10 group-hover:scale-110">
        {sector.icon}
      </div>
      
      <div className="flex flex-col z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#1392ec]/40 group-hover:text-[#1392ec]/90 transition-colors duration-500 uppercase">
          [{sector.code}]
        </span>
        <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white/80 group-hover:text-[#1d1d1f] dark:group-hover:text-white transition-colors duration-500 tracking-tight whitespace-nowrap">
          {sector.label[lang]}
        </span>
      </div>
      
      {/* Premium gradient divider */}
      <div className="ml-6 w-px h-8 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent group-hover:via-[#1392ec]/70 transition-all duration-700" />
    </div>
  );
};

interface IndustrySectorsProps {
  lang?: 'sl' | 'en';
}

const IndustrySectors: React.FC<IndustrySectorsProps> = ({ lang = 'sl' }) => {
  const tripled = [...sectors, ...sectors, ...sectors];

  return (
    <div className="w-full py-10 bg-white dark:bg-[#0a0a0a] overflow-hidden relative z-30">
      
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
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-400 uppercase shrink-0">
          {lang === 'sl' ? 'Sektorji delovanja' : 'Sectors of operation'}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      </div>

      {/* Marquee Wrapper with Pause on Hover */}
      <div className="relative overflow-hidden hover-pause">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

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
