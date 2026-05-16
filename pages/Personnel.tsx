import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, FileCheck, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TeamShowcase from '../components/ui/team-showcase';

const Personnel: React.FC = () => {
    const { t, language } = useLanguage();
    const sl = language === 'sl';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const matrixData = [
        {
            standard: t.personnel.matrix_row1_standard,
            methods: t.personnel.matrix_row1_methods,
            specialized: t.personnel.matrix_row1_specialized
        },
        {
            standard: t.personnel.matrix_row2_standard,
            methods: t.personnel.matrix_row2_methods,
            specialized: t.personnel.matrix_row2_specialized
        },
        {
            standard: t.personnel.matrix_row3_standard,
            methods: t.personnel.matrix_row3_methods,
            specialized: t.personnel.matrix_row3_specialized
        },
        {
            standard: t.personnel.matrix_row4_standard,
            methods: t.personnel.matrix_row4_methods,
            specialized: t.personnel.matrix_row4_specialized
        }
    ];

    return (
        <main className="w-full bg-white dark:bg-industrial-black pt-20 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-20 fixed">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-apple-blue/10 dark:bg-industrial-accent/10 border border-apple-blue/20 dark:border-industrial-accent/20 text-apple-blue dark:text-industrial-accent text-xs font-bold uppercase tracking-wider mb-6 font-mono">
                            <Award className="w-4 h-4" />
                            {t.about.excellence_title}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] dark:text-white mb-6 tracking-tight">
                            {t.personnel.hero_title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-stone-400 leading-tight">
                            {t.personnel.hero_subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-apple-blue/5 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* ==================== TEAM SHOWCASE ==================== */}
            <section className="py-20 bg-[#050505] border-t border-white/[0.06] relative z-10">
                <div className="max-w-[1100px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16"
                    >
                        <span className="font-mono text-[10px] tracking-widest uppercase text-[#0071e3]">
                            {sl ? '01 / Ekipa' : '01 / Team'}
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight">
                            {sl ? 'Ljudje za standardi' : 'People Behind the Standards'}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <TeamShowcase />
                    </motion.div>
                </div>
            </section>

            {/* ==================== NARRATIVE SECTION ==================== */}
            <section className="py-24 bg-[#f5f5f7] dark:bg-industrial-black border-t border-black/5 dark:border-white/5 relative z-10">
                <div className="max-w-[980px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white mb-6">
                                {t.personnel.narrative_title}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-stone-400 leading-relaxed mb-8">
                                {t.personnel.narrative_text}
                            </p>

                            <div className="space-y-4">
                                {[
                                    t.personnel.narrative_item1,
                                    t.personnel.narrative_item2,
                                    t.personnel.narrative_item3,
                                    t.personnel.narrative_item4
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-apple-blue/10 dark:bg-industrial-accent/10 flex items-center justify-center border border-apple-blue/20 dark:border-industrial-accent/20">
                                            <ChevronRight className="w-3 h-3 text-apple-blue dark:text-industrial-accent" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-industrial-text font-mono">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/20 dark:from-industrial-accent/20 to-transparent rounded-[40px] blur-2xl opacity-20" />
                            <div className="relative h-full w-full bg-white dark:bg-industrial-gray/30 backdrop-blur-md rounded-[40px] p-12 shadow-xl border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
                                <Shield className="w-24 h-24 text-apple-blue dark:text-industrial-accent mb-6 opacity-80" />
                                <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-2">{t.personnel.badge_title}</h3>
                                <p className="text-gray-500 dark:text-stone-400">{t.personnel.badge_desc}</p>

                                <div className="absolute top-0 right-0 p-8">
                                    <FileCheck className="w-8 h-8 text-apple-blue/20 dark:text-industrial-accent/20" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== MATRIX SECTION ==================== */}
            <section className="py-24 bg-white dark:bg-industrial-black relative z-10">
                <div className="max-w-[1100px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-semibold text-[#1d1d1f] dark:text-white mb-4">
                            {t.personnel.matrix_title}
                        </h2>
                        <div className="w-20 h-1 bg-apple-blue dark:bg-industrial-accent mx-auto rounded-full" />
                    </div>

                    <div className="overflow-x-auto -mx-6 px-6 pb-8">
                        <div className="min-w-[800px] bg-gray-50 dark:bg-industrial-gray/20 backdrop-blur-sm rounded-3xl shadow-sm border border-black/5 dark:border-white/5 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-apple-blue dark:text-industrial-accent font-mono">
                                            {t.personnel.matrix_col_standard}
                                        </th>
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-apple-blue dark:text-industrial-accent font-mono">
                                            {t.personnel.matrix_col_methods}
                                        </th>
                                        <th className="px-8 py-6 text-xs font-bold uppercase tracking-wider text-apple-blue dark:text-industrial-accent font-mono">
                                            {t.personnel.matrix_col_specialized}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                                    {matrixData.map((row, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-8 py-8 font-bold text-[#1d1d1f] dark:text-white align-top font-mono text-sm">
                                                {row.standard}
                                            </td>
                                            <td className="px-8 py-8 text-gray-600 dark:text-stone-400 align-top text-sm">
                                                {row.methods}
                                            </td>
                                            <td className="px-8 py-8 text-gray-500 dark:text-industrial-text align-top italic text-sm">
                                                {row.specialized}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section className="py-24 bg-[#f5f5f7] dark:bg-industrial-black relative overflow-hidden border-t border-black/5 dark:border-white/5">
                <div className="absolute inset-0 bg-apple-blue/5 dark:bg-industrial-accent/5" />
                <div className="max-w-[980px] mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] dark:text-white mb-8 tracking-tight">
                        {t.personnel.cta_ready}
                    </h2>
                    <button
                        onClick={() => window.location.hash = '#contact'}
                        className="px-8 py-4 bg-industrial-accent text-white rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl font-mono tracking-wider"
                    >
                        {t.personnel.cta_btn}
                    </button>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-black/10 dark:border-white/20 rounded-full" />
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-black/5 dark:border-white/10 rounded-full" />
            </section>
        </main>
    );
};

export default Personnel;
