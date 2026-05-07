import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: 'Energy', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=200&auto=format&fit=crop' },
    { name: 'Petrochemical', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop' },
    { name: 'Nuclear', url: 'https://images.unsplash.com/photo-1517089596392-db9a5e94b150?q=80&w=200&auto=format&fit=crop' },
    { name: 'Construction', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=200&auto=format&fit=crop' },
    { name: 'Aerospace', url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=200&auto=format&fit=crop' },
    { name: 'Automotive', url: 'https://images.unsplash.com/photo-1485291571170-e3a073e75560?q=80&w=200&auto=format&fit=crop' },
];

const LogoMarquee: React.FC = () => {
    return (
        <div className="w-full py-12 bg-white dark:bg-[#0a0a0a] overflow-hidden border-b border-black/5 dark:border-white/5 relative z-30">
            <div className="max-w-[980px] mx-auto px-6 mb-8 text-center">
                <span className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase">Trusted by Industry Leaders</span>
            </div>

            <div className="flex relative items-center overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap min-w-full gap-16 items-center"
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <div key={i} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                            <img
                                src={logo.url}
                                alt={logo.name}
                                className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10"
                            />
                            <span className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white uppercase transition-colors">{logo.name}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradients to fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10" />
            </div>
        </div>
    );
};

export default LogoMarquee;
