import React from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Central Probe Pulse */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            className="absolute w-3 h-3 bg-apple-blue rounded-full z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Concentric Scanning Rings (Ultrasonic/Magnetic waves) */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-apple-blue/30 rounded-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Loading Text with Scanning Effect */}
        <div className="mt-8 overflow-hidden relative">
          <motion.p 
            className="text-xs font-bold tracking-[0.3em] text-[#1d1d1f] dark:text-white uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            System Initializing
          </motion.p>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 dark:via-black/80 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;