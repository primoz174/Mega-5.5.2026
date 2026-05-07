import React from 'react';
import { motion } from 'framer-motion';
import { ScanEye, Droplet } from 'lucide-react';

interface Props {
  methodId: string;
  color: string;
}

const MethodIllustrations: React.FC<Props> = ({ methodId, color }) => {
  // Extract the base color class (e.g., 'cyan' from 'text-cyan-400')
  const colorName = color.split('-')[1] || 'blue';
  
  const renderIllustration = () => {
    switch (methodId) {
      case 'vt':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Weld line */}
            <div className="absolute bottom-1/3 w-3/4 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="w-full h-full bg-slate-600 opacity-50" />
              {/* Defect */}
              <div className="absolute left-1/2 top-0 w-2 h-full bg-slate-800" />
            </div>
            
            {/* Scanning Eye/Lens */}
            <motion.div 
              className="absolute bottom-[40%] flex flex-col items-center"
              animate={{ x: [-60, 60, -60] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className={`text-${colorName}-400 drop-shadow-[0_0_8px_currentColor]`}>
                <ScanEye size={32} />
              </div>
              {/* Scan Beam */}
              <div className={`w-8 h-16 bg-gradient-to-b from-${colorName}-400/40 to-transparent mt-1`} style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }} />
            </motion.div>
          </div>
        );
      
      case 'pt':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Material block with crack */}
            <div className="absolute bottom-1/4 w-2/3 h-12 bg-slate-700 rounded-sm border-t-2 border-slate-600">
              {/* Crack */}
              <div className="absolute left-1/2 top-0 w-1 h-8 bg-slate-900 -translate-x-1/2" />
              
              {/* Penetrant seeping in */}
              <motion.div 
                className="absolute left-1/2 top-0 w-1 bg-red-500 -translate-x-1/2 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                animate={{ height: ['0%', '100%', '100%', '0%'], opacity: [0, 1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.2, 0.8, 1] }}
              />
            </div>
            
            {/* Spray/Droplets */}
            <motion.div 
              className="absolute top-1/4 text-red-500"
              animate={{ y: [0, 20], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Droplet size={24} className="fill-red-500/50" />
            </motion.div>
          </div>
        );

      case 'mt':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Material */}
            <div className="absolute bottom-1/3 w-3/4 h-8 bg-slate-700 rounded-sm">
               {/* Crack glowing green (fluorescent MT) */}
               <motion.div 
                className="absolute left-1/2 top-0 w-1 h-full bg-green-400 -translate-x-1/2 shadow-[0_0_12px_rgba(74,222,128,1)]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            
            {/* Yoke / Magnet */}
            <div className="absolute top-1/4 flex gap-16">
              <div className="w-6 h-12 bg-slate-400 rounded-b-md flex items-end justify-center pb-1 text-xs font-bold text-slate-800">N</div>
              <div className="w-6 h-12 bg-slate-400 rounded-b-md flex items-end justify-center pb-1 text-xs font-bold text-slate-800">S</div>
            </div>

            {/* Magnetic Flux Lines */}
            <svg className="absolute top-1/4 w-full h-32 pointer-events-none" viewBox="0 0 100 50">
              <motion.path 
                d="M 35 20 Q 50 40 65 20" 
                fill="transparent" 
                stroke="rgba(74,222,128,0.5)" 
                strokeWidth="1" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.path 
                d="M 30 15 Q 50 50 70 15" 
                fill="transparent" 
                stroke="rgba(74,222,128,0.3)" 
                strokeWidth="1" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </svg>
          </div>
        );

      case 'ut':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Material Block */}
            <div className="absolute bottom-1/4 w-2/3 h-24 bg-slate-700 rounded-sm border-t-2 border-slate-500 overflow-hidden">
              {/* Flaw */}
              <div className="absolute left-1/2 top-1/2 w-4 h-2 bg-slate-900 rounded-full -translate-x-1/2" />
              
              {/* Sound Waves Down */}
              <motion.div 
                className="absolute left-1/2 top-0 w-16 h-16 border-b-2 border-cyan-400 rounded-full -translate-x-1/2"
                animate={{ y: [-10, 40], scale: [0.5, 1.5], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Reflected Waves Up (from flaw) */}
              <motion.div 
                className="absolute left-1/2 top-1/2 w-8 h-8 border-t-2 border-red-400 rounded-full -translate-x-1/2"
                animate={{ y: [0, -30], scale: [0.5, 1.5], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.7, ease: "easeOut" }}
              />
            </div>
            
            {/* UT Probe */}
            <div className="absolute top-[calc(75%-6rem)] w-10 h-12 bg-slate-300 rounded-t-sm flex flex-col items-center">
              <div className="w-full h-2 bg-cyan-500 rounded-t-sm" />
              <div className="w-1 h-8 bg-slate-400 mt-[-8px] absolute bottom-full" /> {/* Cable */}
            </div>
          </div>
        );

      default:
        // Generic animation for other methods
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
              className={`w-24 h-24 rounded-full border-2 border-${colorName}-400/30 flex items-center justify-center`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-full border-2 border-${colorName}-400/60 flex items-center justify-center`}
                animate={{ scale: [1, 0.8, 1], rotate: [0, -90, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className={`w-8 h-8 rounded-full bg-${colorName}-400/80 shadow-[0_0_15px_currentColor]`} />
              </motion.div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-48 sm:h-64 bg-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden relative shadow-inner">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-${colorName}-500/50 m-2`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-${colorName}-500/50 m-2`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-${colorName}-500/50 m-2`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-${colorName}-500/50 m-2`} />

      {renderIllustration()}
    </div>
  );
};

export default MethodIllustrations;
