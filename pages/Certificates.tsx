import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Download, CheckCircle2, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { GlowCard } from '../components/ui/spotlight-card';

const statusConfig = {
  VALID: {
    label: 'VALID',
    dot: 'bg-green-400',
    glow: 'shadow-[0_0_8px_rgba(74,222,128,0.7)]',
    pill: 'bg-green-500/10 border-green-500/25 text-green-400',
  },
  VERIFIED: {
    label: 'VERIFIED',
    dot: 'bg-green-400',
    glow: 'shadow-[0_0_8px_rgba(74,222,128,0.7)]',
    pill: 'bg-green-500/10 border-green-500/25 text-green-400',
  },
  QUALIFIED: {
    label: 'QUALIFIED',
    dot: 'bg-cyan-400',
    glow: 'shadow-[0_0_8px_rgba(34,211,238,0.7)]',
    pill: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
  },
};

const accentConfig = {
  blue: {
    insetAccent: 'inset 0 2.5px 0 rgba(59,130,246,0.75)',
    glowColor: 'blue' as const,
    codeColor: 'text-blue-400',
    hoverOrb: 'rgba(0,113,227,0.09)',
  },
  emerald: {
    insetAccent: 'inset 0 2.5px 0 rgba(16,185,129,0.75)',
    glowColor: 'green' as const,
    codeColor: 'text-emerald-400',
    hoverOrb: 'rgba(16,185,129,0.09)',
  },
  amber: {
    insetAccent: 'inset 0 2.5px 0 rgba(245,158,11,0.75)',
    glowColor: 'amber' as const,
    codeColor: 'text-amber-400',
    hoverOrb: 'rgba(245,158,11,0.09)',
  },
  cyan: {
    insetAccent: 'inset 0 2.5px 0 rgba(6,182,212,0.80)',
    glowColor: 'cyan' as const,
    codeColor: 'text-cyan-400',
    hoverOrb: 'rgba(6,182,212,0.11)',
  },
};

type AccentKey = keyof typeof accentConfig;
type StatusKey = keyof typeof statusConfig;

interface CertData {
  id: string;
  code: string;
  title: { sl: string; en: string };
  org: string;
  status: StatusKey;
  desc: { sl: string; en: string };
  color: AccentKey;
  nuclear?: boolean;
  pdfUrl?: string;
  registry: string;
  validUntil?: string;
  also?: string;
  images?: string[];
}

const certData: CertData[] = [
  {
    id: 'iso-9001',
    code: 'ISO 9001:2015',
    title: { sl: 'Sistem vodenja kakovosti', en: 'Quality Management System' },
    org: 'SIQ Ljubljana',
    status: 'VALID',
    desc: {
      sl: 'Neporušno preskušanje, nadzori in svetovanje pri izvedbi strojnih instalacij ter zagotavljanje kakovosti pri varjenju.',
      en: 'Non-destructive testing, inspection and consulting on mechanical installations, welding quality assurance.',
    },
    color: 'blue',
    registry: 'Q-2318',
    validUntil: '2027-10-20',
    also: 'IQNET · Slovenska Akreditacija CS-001',
    pdfUrl: '#',
    images: ['/certs/iso-9001-siq.jpg', '/certs/iso-9001-iqnet.jpg'],
  },
  {
    id: 'asnt',
    code: 'ASNT Level III',
    title: { sl: 'Ekspertiza nivoja III', en: 'Level III Expertise' },
    org: 'ASNT (USA)',
    status: 'VERIFIED',
    desc: {
      sl: 'Najvišji mednarodni nivo NDT ekspertize, skladen z ameriškimi standardi SNT-TC-1A. Ključna prednost za UAE projekte.',
      en: 'Highest international NDT expertise, compliant with US standard SNT-TC-1A. Key differentiator for UAE projects.',
    },
    color: 'amber',
    registry: 'ASNT-III',
    pdfUrl: '#',
  },
  {
    id: 'iso-9712',
    code: 'EN ISO 9712',
    title: { sl: 'Certifikacija NDT osebja', en: 'NDT Personnel Certification' },
    org: 'Sector Cert / ZKOT',
    status: 'VALID',
    desc: {
      sl: 'Osebje certificirano za nivoje II in III v vseh disciplinah neporušnih preiskav.',
      en: 'Personnel certified for levels II and III in all non-destructive testing disciplines.',
    },
    color: 'emerald',
    registry: 'ISO-9712',
    pdfUrl: '#',
  },
  {
    id: 'asme',
    code: 'ASME Sec. XI',
    title: { sl: 'Jedrska kodifikacija', en: 'Nuclear Code Qualification' },
    org: 'ASME / PDI',
    status: 'QUALIFIED',
    nuclear: true,
    desc: {
      sl: 'PDI kvaificiranost za varno delo v jedrski industriji. Nujna za projekte Barakah (UAE) in NEK. Naša najredkejša in najpomembnejša akreditacija.',
      en: 'PDI Qualified for safe operation in nuclear industry. Essential for Barakah (UAE) and NEK projects. Our rarest and most critical accreditation.',
    },
    color: 'cyan',
    registry: 'PDI-QP',
    pdfUrl: '#',
  },
];

const stats = [
  { label: { sl: 'Certificirano osebje', en: 'Certified Personnel' }, val: '100%' },
  { label: { sl: 'Nivo III strokovnjaki', en: 'Level III Experts' }, val: '4+' },
  { label: { sl: 'Mednarodna prisotnost', en: 'International Presence' }, val: '8+' },
];

const Certificates: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as 'sl' | 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {lang === 'sl'
            ? 'Certifikati & Akreditacije – Megama NDT | ISO 9001, ASNT, ASME'
            : 'Certifications & Accreditations – Megama NDT | ISO 9001, ASNT, ASME'}
        </title>
        <meta
          name="description"
          content={
            lang === 'sl'
              ? 'ISO 9001:2015, EN ISO 9712, ASNT Level III, ASME Section XI. Mednarodno certificirano NDT osebje za najzahtevnejše industrijske projekte.'
              : 'ISO 9001:2015, EN ISO 9712, ASNT Level III, ASME Section XI. Internationally certified NDT personnel for the most demanding industrial projects.'
          }
        />
      </Helmet>
      <main className="w-full min-h-screen bg-[#050505] text-slate-300 font-sans relative overflow-hidden selection:bg-apple-blue selection:text-white pb-24">

      {/* Background grid + ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px]" />
      </div>


      {/* Hero */}
      <section className="relative pt-32 pb-12 z-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 hover:border-blue-500/30 transition-colors">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-blue-400">
                {t.certificatesPage.hero_badge}
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
              {t.certificatesPage.hero_title}
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              {t.certificatesPage.hero_subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-20 mt-16 pt-14 border-t border-white/[0.06] w-full max-w-2xl">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1.5">{s.val}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-slate-500">{s.label[lang]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate bento grid */}
      <section className="relative z-20 py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {certData.map((cert, i) => {
              const accent = accentConfig[cert.color];
              const status = statusConfig[cert.status];
              const isWide = i === 0 || i === 3;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
                  className={[
                    isWide ? 'lg:col-span-7' : 'lg:col-span-5',
                    cert.nuclear ? 'lg:order-4' : '',
                    i === 1 ? 'lg:order-2' : '',
                    i === 2 ? 'lg:order-3' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <GlowCard
                    customSize
                    glowColor={accent.glowColor}
                    className="!flex !flex-col !p-0 !gap-0 w-full h-full"
                    style={{
                      '--backdrop': 'rgba(255,255,255,0.025)',
                      '--backup-border': 'rgba(255,255,255,0.08)',
                      '--size': '380',
                      '--border': '1.5',
                      '--radius': '16',
                      boxShadow: accent.insetAccent,
                    } as React.CSSProperties}
                  >
                    {/* Nuclear background tint */}
                    {cert.nuclear && (
                      <div className="absolute inset-0 bg-cyan-500/[0.03] pointer-events-none rounded-2xl" />
                    )}

                    {/* Hover glow orb */}
                    <div
                      className="absolute -right-16 -top-16 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: accent.hoverOrb }}
                    />

                    {/* Card content */}
                    <div className={`relative z-10 p-8 md:p-10 flex flex-col h-full ${cert.images?.length ? '' : ''}`}>

                      {/* Split layout: info left, cert images right */}
                      <div className={cert.images?.length ? 'flex gap-6 h-full' : 'flex flex-col h-full'}>

                        {/* Info column */}
                        <div className="flex flex-col flex-1 min-w-0">

                          {/* Registry + status */}
                          <div className="flex items-start justify-between mb-8">
                            <div>
                              <span className="font-mono text-[9px] tracking-widest text-slate-600 uppercase">REG</span>
                              <div className="font-mono text-[10px] text-slate-500 mt-0.5">{cert.registry}</div>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.pill}`}>
                              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.dot} ${status.glow}`} />
                              <span className="font-mono text-[9px] tracking-widest uppercase font-bold">{status.label}</span>
                              {cert.nuclear && (
                                <>
                                  <span className="w-px h-3 bg-cyan-500/30" />
                                  <span className="font-mono text-[9px] tracking-widest uppercase font-bold">NUCLEAR</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Cert code */}
                          <div className={`font-mono text-3xl md:text-4xl font-bold tracking-tight mb-2 ${accent.codeColor}`}>
                            {cert.code}
                          </div>
                          <div className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-5">
                            {cert.title[lang]}
                          </div>

                          <p className="text-sm text-slate-400 leading-relaxed mb-auto max-w-[42ch]">
                            {cert.desc[lang]}
                          </p>

                          {/* Bottom: org + validity + PDF */}
                          <div className="mt-8 pt-6 border-t border-white/[0.07] space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex gap-6">
                                <div>
                                  <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1">
                                    {lang === 'sl' ? 'Cert. organ' : 'Issuing Body'}
                                  </div>
                                  <div className="text-white text-sm font-semibold">{cert.org}</div>
                                </div>
                                {cert.validUntil && (
                                  <div>
                                    <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1">
                                      {lang === 'sl' ? 'Velja do' : 'Expires'}
                                    </div>
                                    <div className="font-mono text-sm text-green-400 font-semibold">{cert.validUntil}</div>
                                  </div>
                                )}
                              </div>

                              <HoverBorderGradient
                                as="a"
                                href={cert.pdfUrl}
                                containerClassName="rounded-xl shrink-0"
                                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-widest uppercase"
                              >
                                <Download size={13} />
                                {lang === 'sl' ? 'Prenesi PDF' : 'Download PDF'}
                              </HoverBorderGradient>
                            </div>

                            {cert.also && (
                              <div className="font-mono text-[9px] tracking-widest text-slate-600 uppercase">
                                {lang === 'sl' ? 'Priznano' : 'Recognized'}: {cert.also}
                              </div>
                            )}
                          </div>
                        </div>{/* end info column */}

                        {/* Certificate image previews */}
                        {cert.images?.length && (
                          <div className="hidden md:flex flex-col gap-3 shrink-0 w-[130px] xl:w-[150px] justify-center py-2">
                            {cert.images.map((src, idx) => (
                              <div
                                key={idx}
                                className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                                style={{ transform: idx === 0 ? 'rotate(-1.5deg)' : 'rotate(1.2deg)' }}
                              >
                                <img
                                  src={src}
                                  alt={idx === 0 ? 'SIQ certifikat ISO 9001:2015' : 'IQNET certifikat ISO 9001:2015'}
                                  className="w-full object-cover object-top"
                                  style={{ aspectRatio: '0.71 / 1' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
                                  <span className="font-mono text-[8px] tracking-widest text-white/60 uppercase">
                                    {idx === 0 ? 'SIQ Ljubljana' : 'IQNET'}
                                  </span>
                                </div>
                              </div>
                            ))}
                            <div className="font-mono text-[8px] text-slate-600 text-center tracking-widest uppercase">
                              {lang === 'sl' ? '2 certifikata' : '2 certificates'}
                            </div>
                          </div>
                        )}

                      </div>{/* end split layout */}
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

          {/* On-request footnote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 text-center font-mono text-[10px] tracking-widest text-slate-600 uppercase flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={11} className="text-slate-600" />
            {lang === 'sl'
              ? 'Originalni certifikati so na voljo za preverjanje na zahtevo'
              : 'Original certificates are available for verification on request'}
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 pt-20 pb-8 text-center">
        <div className="max-w-[720px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-12 md:p-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <ExternalLink size={11} className="text-blue-400" />
              <span className="font-mono text-[9px] tracking-widest uppercase text-blue-400">
                {lang === 'sl' ? 'Začnimo projekt' : 'Start a project'}
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">
              {lang === 'sl' ? 'Potrebujete strokovno poročilo?' : 'Need an expert inspection report?'}
            </h2>

            <HoverBorderGradient
              as={Link}
              to="/#contact"
              containerClassName="rounded-2xl mx-auto"
              className="flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase"
            >
              {lang === 'sl' ? 'Pošljite povpraševanje' : 'Send an inquiry'}
              <ExternalLink size={14} />
            </HoverBorderGradient>
          </motion.div>
        </div>
      </section>

    </main>
    </>
  );
};

export default Certificates;
