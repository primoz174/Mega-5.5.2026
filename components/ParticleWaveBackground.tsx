import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleWaveBackground: React.FC = () => {
    const particles = useMemo(() => Array.from({ length: 120 }), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
            {/* Intense Glowing Clouds */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [-20, 20, -20]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-1/4 w-[80%] h-[80%] bg-[#1392ec]/20 blur-[160px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.15, 0.05],
                    x: [20, -20, 20]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-[#00ffc2]/10 blur-[160px] rounded-full"
            />

            <svg className="w-full h-full" viewBox="0 0 1440 800">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Dense Particle Flux */}
                {particles.map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={Math.random() * 1440}
                        cy={Math.random() * 800}
                        r={Math.random() * 2 + 0.5}
                        fill={i % 3 === 0 ? "#1392ec" : i % 3 === 1 ? "#00ffc2" : "#ffffff"}
                        filter="url(#glow)"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            y: [0, (Math.random() - 0.5) * 100, 0],
                            x: [0, (Math.random() - 0.5) * 60, 0],
                            scale: [1, 2, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * i * 0.01
                        }}
                    />
                ))}

                {/* Glowing Sine Waves */}
                {[0, 1, 2, 3, 4].map((wave) => (
                    <motion.path
                        key={`wave-${wave}`}
                        d={`M -100 ${400 + wave * 60} Q 400 ${200 + wave * 40} 800 ${500 + wave * 20} T 1600 ${400 + wave * 50}`}
                        fill="none"
                        stroke={wave % 2 === 0 ? "#1392ec" : "#00ffc2"}
                        strokeWidth={wave === 0 ? "2" : "0.5"}
                        strokeDasharray={wave % 2 === 0 ? "none" : "4 8"}
                        strokeOpacity={wave === 0 ? "0.4" : "0.2"}
                        filter="url(#glow)"
                        animate={{
                            d: [
                                `M -100 ${400 + wave * 60} Q 400 ${200 + wave * 40} 800 ${500 + wave * 20} T 1600 ${400 + wave * 50}`,
                                `M -100 ${450 + wave * 50} Q 500 ${150 + wave * 60} 700 ${550 + wave * 30} T 1600 ${450 + wave * 40}`,
                                `M -100 ${400 + wave * 60} Q 400 ${200 + wave * 40} 800 ${500 + wave * 20} T 1600 ${400 + wave * 50}`,
                            ]
                        }}
                        transition={{ duration: 12 + wave * 4, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </svg>

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(19,146,236,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(19,146,236,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]" />
        </div>
    );
};

export default ParticleWaveBackground;
