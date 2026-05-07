import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, History, Award, CheckCircle2, ChevronRight, FileCheck, Activity, Cpu, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-20 relative overflow-hidden selection:bg-industrial-accent selection:text-white">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] tech-grid fixed" />
            
            {/* Scanning Line Atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden fixed">
                <div className="absolute w-full h-[1px] bg-industrial-accent/20 animate-scan top-0" />
                <div className="absolute w-full h-[1px] bg-industrial-accent/10 animate-scan top-0" style={{ animationDelay: '2s' }} />
            </div>

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative py-24 md:py-40 overflow-hidden border-b border-black/5 dark:border-white/5">
                <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-gray-400 dark:text-gray-600 hidden lg:block tracking-widest leading-relaxed">
                    [ ACCESS_NODE: ABOUT_MEGAMA ]<br />
                    [ PROTOCOL: SECURE_V3 ]<br />
                    [ LATENCY: 14ms ]
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-4 px-5 py-2 glass-panel rounded-none border border-black/10 dark:border-white/10 text-industrial-accent text-xs font-bold uppercase tracking-[0.3em] mb-12 font-mono group relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 w-[2px] bg-industrial-accent" />
                            <span className="flex items-center gap-3">
                                <Activity className="w-4 h-4 animate-pulse" />
                                {t.aboutPage.trust_title}
                            </span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#1d1d1f] dark:text-white mb-12 tracking-tighter leading-[0.9] uppercase">
                            {t.aboutPage.hero_title.split(' ').map((word, i) => (
                                <span key={i} className="block relative">
                                    {word}
                                    {i === 1 && (
                                        <motion.span 
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                            className="absolute -bottom-2 left-0 h-1 bg-industrial-accent hidden md:block" 
                                        />
                                    )}
                                </span>
                            ))}
                        </h1>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-16 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                            <span className="flex items-center gap-2">[ ORIGIN: 2008 ]</span>
                            <span className="hidden md:block w-1 h-1 bg-industrial-accent rounded-full" />
                            <span className="flex items-center gap-2">[ TYPE: NDT_EXPERTISE ]</span>
                            <span className="hidden md:block w-1 h-1 bg-industrial-accent rounded-full" />
                            <span className="flex items-center gap-2">[ STATUS: OPERATIONAL ]</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== MISSION SECTION ==================== */}
            <section className="py-24 bg-[#f8f9fa] dark:bg-[#0d0d0d] relative border-b border-black/5 dark:border-white/5">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-4">
                                <div className="tech-label text-industrial-accent transition-all duration-300">01 // CORE MISSION</div>
                                <h2 className="text-4xl md:text-6xl font-black text-[#1d1d1f] dark:text-white leading-[1.1] tracking-tight">
                                    {t.aboutPage.mission_title}
                                </h2>
                            </div>
                            
                            <div className="space-y-8">
                                <p className="text-xl md:text-2xl text-gray-600 dark:text-stone-400 leading-relaxed font-light">
                                    {t.aboutPage.mission_text.split('. ').map((s, i) => (
                                        <span key={i} className={`inline ${s.includes("cost of failure") || s.includes("posledice napak") ? "text-industrial-accent font-bold" : ""}`}>
                                            {s}{i < t.aboutPage.mission_text.split('. ').length - 1 ? '. ' : ''}
                                        </span>
                                    ))}
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                    <div className="p-6 border-l-2 border-industrial-accent/30 bg-black/5 dark:bg-white/5">
                                        <div className="font-mono text-[10px] text-industrial-accent mb-2">[ STRATEGY ]</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
                                            "Engineering the gap between safety and operational excellence through precision diagnostics."
                                        </div>
                                    </div>
                                    <div className="p-6 border-l-2 border-industrial-accent/30 bg-black/5 dark:bg-white/5">
                                        <div className="font-mono text-[10px] text-industrial-accent mb-2">[ EXECUTION ]</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
                                            "Zero-tolerance for error logic applied to every millisecond of scanning data."
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="glass-panel p-8 md:p-12 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-accent/10 blur-3xl rounded-full translate-x-16 -translate-y-16" />
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                        <div className="tech-label">[ SYSTEM_METRICS ]</div>
                                        <Cpu className="w-4 h-4 text-industrial-accent animate-pulse" />
                                    </div>

                                    {[
                                        { label: 'ISO 9001:2015', val: 'QMS_CERTIFIED', icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
                                        { label: 'EN ISO 9712', val: 'STAFF_LEVEL_3', icon: <CheckCircle2 className="w-4 h-4 text-industrial-accent" /> },
                                        { label: 'ASNT SNT-TC-1A', val: 'US_STANDARDS', icon: <CheckCircle2 className="w-4 h-4 text-industrial-accent" /> },
                                        { label: 'ASME SEC. XI', icon: <CheckCircle2 className="w-4 h-4 text-orange-500" />, val: 'NUCLEAR_READY' }
                                    ].map((cert, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-industrial-accent/30 transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                {cert.icon}
                                                <span className="text-sm font-bold tracking-tight text-[#1d1d1f] dark:text-white uppercase">{cert.label}</span>
                                            </div>
                                            <span className="font-mono text-[10px] text-gray-400">{cert.val}</span>
                                        </div>
                                    ))}

                                    <div className="grid grid-cols-3 gap-1 pt-8">
                                        {[
                                            { n: '15+', l: 'YEARS' },
                                            { n: '500+', l: 'PROJECTS' },
                                            { n: '100%', l: 'PRECISION' }
                                        ].map((s, i) => (
                                            <div key={i} className="text-center p-3 border border-white/5">
                                                <div className="text-xl font-black text-industrial-accent font-mono">{s.n}</div>
                                                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{s.l}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== VISION & HISTORY ==================== */}
            <section className="py-32 relative">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        {[
                            { 
                                id: "VISION", 
                                title: t.aboutPage.vision_title, 
                                text: t.aboutPage.vision_text, 
                                icon: <Target />, 
                                count: "02",
                                tag: "FUTURE_NAV"
                            },
                            { 
                                id: "HISTORY", 
                                title: t.aboutPage.history_title, 
                                text: t.aboutPage.history_text, 
                                icon: <History />, 
                                count: "03",
                                tag: "LEGACY_DATA"
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative p-12 bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:border-industrial-accent/40"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-accent/5 transition-all duration-700 group-hover:bg-industrial-accent/10" />
                                <div className="absolute top-6 right-8 tech-label opacity-30 group-hover:opacity-100 transition-opacity">[{card.tag}]</div>
                                
                                <div className="flex flex-col h-full space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-black/5 dark:bg-white/5 flex items-center justify-center text-industrial-accent border border-black/10 dark:border-white/10 group-hover:scale-110 group-hover:bg-industrial-accent transition-all duration-500 group-hover:text-white">
                                            {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                                        </div>
                                        <div>
                                            <div className="tech-label mb-1">{card.count} // {card.id}</div>
                                            <h3 className="text-3xl font-black text-[#1d1d1f] dark:text-white tracking-tighter uppercase">{card.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-stone-400 leading-relaxed text-lg font-light">
                                        {card.text}
                                    </p>
                                    <div className="pt-8 mt-auto border-t border-black/5 dark:border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-[10px] font-mono text-industrial-accent">AUTHENTICATED_ACCESS_GRANTED</div>
                                        <div className="w-8 h-[2px] bg-industrial-accent animate-pulse" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== TRUST INDICATORS ==================== */}
            <section className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden border-y border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(19,146,236,0.15),transparent_70%)]" />
                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="space-y-4">
                            <div className="tech-label text-industrial-accent">04 // VALIDATION PROTOCOLS</div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{t.aboutPage.trust_title}</h2>
                        </div>
                        <div className="flex gap-4 font-mono text-[9px] text-gray-500">
                            <span>SCAN_ACTIVE</span>
                            <span className="text-green-500">READY</span>
                            <span>VERIFIED_2026</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                        {[
                            { id: "VALIDATION_01", title: t.aboutPage.indicator1_title, desc: t.aboutPage.indicator1_desc, icon: <FileCheck /> },
                            { id: "CERT_02", title: t.aboutPage.indicator2_title, desc: t.aboutPage.indicator2_desc, icon: <Award /> },
                            { id: "SECURITY_03", title: t.aboutPage.indicator3_title, desc: t.aboutPage.indicator3_desc, icon: <Shield /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 bg-white/2 hover:bg-white/5 border border-white/5 transition-all duration-500 relative"
                            >
                                <div className="absolute top-0 left-0 w-[1px] h-0 group-hover:h-full bg-industrial-accent transition-all duration-500" />
                                
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center text-industrial-accent/40 group-hover:text-industrial-accent">
                                        {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 transition-transform group-hover:scale-110" })}
                                        <span className="font-mono text-[10px] tracking-[0.3em]">[{item.id}]</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-black tracking-tight uppercase group-hover:text-industrial-accent transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-2 pt-4 group-hover:translate-x-2 transition-transform">
                                        <div className="w-4 h-[1px] bg-industrial-accent" />
                                        <span className="font-mono text-[8px] uppercase text-industrial-accent/60">Inspect node details</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section className="py-24 md:py-40 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
                <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="tech-label mb-8">05 // SECURE_ESTABLISHMENT</div>
                        <h2 className="text-5xl md:text-7xl font-black text-[#1d1d1f] dark:text-white mb-16 tracking-tighter leading-tight uppercase">
                            {t.aboutPage.cta_ready}
                        </h2>
                        
                        <button
                            onClick={() => window.location.hash = '#contact'}
                            className="group relative px-12 py-6 bg-industrial-accent text-white font-black text-xl hover:bg-industrial-accent/90 transition-all active:scale-95 shadow-[0_20px_40px_rgba(19,146,236,0.3)] font-mono tracking-widest overflow-hidden border border-industrial-accent"
                        >
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                <span className="text-white/40 font-light">[</span>
                                {t.aboutPage.cta_btn}
                                <span className="text-white/40 font-light">]</span>
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>

                        <div className="mt-16 flex items-center justify-center gap-8 opacity-20 grayscale">
                            <Globe className="w-8 h-8" />
                            <div className="w-12 h-[1px] bg-gray-400" />
                            <Shield className="w-8 h-8" />
                            <div className="w-12 h-[1px] bg-gray-400" />
                            <Activity className="w-8 h-8" />
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 p-12 pointer-events-none opacity-10 hidden lg:block">
                    <div className="w-64 h-64 border border-industrial-accent rotate-45" />
                </div>
                <div className="absolute top-0 left-0 p-12 pointer-events-none opacity-10 hidden lg:block">
                    <div className="w-32 h-32 border border-industrial-accent -rotate-12" />
                </div>
            </section>
        </div>
    );
};

export default About;
