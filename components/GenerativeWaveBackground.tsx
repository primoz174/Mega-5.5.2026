import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const GenerativeWaveBackground: React.FC = () => {
    const waves = useMemo(() => Array.from({ length: 5 }), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-50">
            <svg className="w-full h-full" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(19, 146, 236, 0)" />
                        <stop offset="50%" stopColor="rgba(19, 146, 236, 0.2)" />
                        <stop offset="100%" stopColor="rgba(19, 146, 236, 0)" />
                    </linearGradient>
                </defs>
                {waves.map((_, i) => (
                    <motion.path
                        key={i}
                        d={`M -200 ${300 + i * 50} Q 400 ${200 + i * 20} 800 ${400 + i * 10} T 1600 ${300 + i * 40}`}
                        stroke="url(#wave-gradient)"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                            d: [
                                `M -200 ${300 + i * 50} Q 400 ${200 + i * 20} 800 ${400 + i * 10} T 1600 ${300 + i * 40}`,
                                `M -200 ${350 + i * 40} Q 500 ${150 + i * 30} 700 ${450 + i * 20} T 1600 ${350 + i * 50}`,
                                `M -200 ${300 + i * 50} Q 400 ${200 + i * 20} 800 ${400 + i * 10} T 1600 ${300 + i * 40}`,
                            ]
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 1.5
                        }}
                    />
                ))}
                {/* Subtle Scan Lines */}
                <motion.line
                    x1="0" y1="0" x2="1440" y2="0"
                    stroke="rgba(19, 146, 236, 0.1)"
                    strokeWidth="1"
                    animate={{ y: [0, 800, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </svg>
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(19,146,236,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(19,146,236,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        </div>
    );
};

export default GenerativeWaveBackground;
