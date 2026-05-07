import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Hexagon } from 'lucide-react';

interface InteractiveHeroProps {
  title: string;
  subtitle: string;
  moduleLabel?: string;
  heightClass?: string;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({ 
  title, 
  subtitle, 
  moduleLabel = "MODULE: CORE_SYSTEM",
  heightClass = "h-[45vh] min-h-[400px]"
}) => {
  const textControls = useAnimation();
  
  useEffect(() => {
    // Staggered text reveal
    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
  }, [textControls]);

  return (
    <div className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-slate-950 ${heightClass} border-b border-white/10 shrink-0`}>
      {/* Generated Nano Banana AI Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/images/services_bg.png" 
          alt="Industrial Background" 
          className="w-full h-full object-cover opacity-60 scale-105 saturate-150" 
        />
      </div>

      {/* Overlay Ambient Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40 mix-blend-overlay z-0 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center pt-8">
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] tracking-tight">
          {title.split(" ").map((word, i) => (
            <span key={i} className="inline-block relative">
              {word.split("").map((char, j) => (
                <motion.span 
                  key={j} 
                  custom={i * 5 + j} 
                  initial={{ opacity: 0, y: 40 }} 
                  animate={textControls} 
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {i < title.split(" ").length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        <motion.p
          custom={title.length}
          initial={{ opacity: 0, y: 20 }}
          animate={textControls}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg lg:text-xl text-slate-400 font-medium leading-relaxed pointer-events-none"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};


