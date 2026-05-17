import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Globe2, MapPin, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";
import IndustrySectors from "../components/IndustrySectors";
import Services from "../components/Services";
import TeamShowcase from "../components/ui/team-showcase";
import { GlowCard } from "../components/ui/spotlight-card";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { Download, CheckCircle2, Shield } from "lucide-react";

const HERO_BG = "/images/home/hero-bg.webp";
const RECIPIENT_EMAIL = "info@megama.si";

const certAccent = {
  blue: {
    inset: "inset 0 2.5px 0 rgba(59,130,246,0.75)",
    glow: "blue" as const,
    code: "text-blue-400",
    orb: "rgba(0,113,227,0.09)",
  },
  amber: {
    inset: "inset 0 2.5px 0 rgba(245,158,11,0.75)",
    glow: "amber" as const,
    code: "text-amber-400",
    orb: "rgba(245,158,11,0.09)",
  },
  emerald: {
    inset: "inset 0 2.5px 0 rgba(16,185,129,0.75)",
    glow: "green" as const,
    code: "text-emerald-400",
    orb: "rgba(16,185,129,0.09)",
  },
  cyan: {
    inset: "inset 0 2.5px 0 rgba(6,182,212,0.80)",
    glow: "cyan" as const,
    code: "text-cyan-400",
    orb: "rgba(6,182,212,0.11)",
  },
};

const certStatus = {
  VALID: {
    dot: "bg-green-400",
    glow: "shadow-[0_0_8px_rgba(74,222,128,0.7)]",
    pill: "bg-green-500/10 border-green-500/25 text-green-400",
    label: "VALID",
  },
  VERIFIED: {
    dot: "bg-green-400",
    glow: "shadow-[0_0_8px_rgba(74,222,128,0.7)]",
    pill: "bg-green-500/10 border-green-500/25 text-green-400",
    label: "VERIFIED",
  },
  QUALIFIED: {
    dot: "bg-cyan-400",
    glow: "shadow-[0_0_8px_rgba(34,211,238,0.7)]",
    pill: "bg-cyan-500/10 border-cyan-500/25 text-cyan-400",
    label: "QUALIFIED",
  },
};

const CERT_DATA = [
  {
    id: "iso-9001",
    code: "ISO 9001:2015",
    color: "blue" as const,
    status: "VALID" as const,
    registry: "Q-2318",
    validUntil: "2027-10-20",
    org: "SIQ Ljubljana",
    also: "IQNET · Slovenska Akreditacija CS-001",
    title: { sl: "Sistem vodenja kakovosti", en: "Quality Management System" },
    desc: {
      sl: "Neporušno preskušanje, nadzori in svetovanje pri izvedbi strojnih instalacij ter zagotavljanje kakovosti pri varjenju.",
      en: "Non-destructive testing, inspection and consulting on mechanical installations, welding quality assurance.",
    },
    images: ["/certs/iso-9001-siq.jpg", "/certs/iso-9001-iqnet.jpg"],
    pdfUrl: "#",
  },
  {
    id: "asnt",
    code: "ASNT Level III",
    color: "amber" as const,
    status: "VERIFIED" as const,
    registry: "ASNT-III",
    org: "ASNT (USA)",
    title: { sl: "Ekspertiza nivoja III", en: "Level III Expertise" },
    desc: {
      sl: "Najvišji mednarodni nivo NDT ekspertize, skladen z ameriškimi standardi SNT-TC-1A. Ključna prednost za UAE projekte.",
      en: "Highest international NDT expertise, compliant with US standard SNT-TC-1A. Key differentiator for UAE projects.",
    },
    pdfUrl: "#",
  },
  {
    id: "iso-9712",
    code: "EN ISO 9712",
    color: "emerald" as const,
    status: "VALID" as const,
    registry: "ISO-9712",
    org: "Sector Cert / ZKOT",
    title: {
      sl: "Certifikacija NDT osebja",
      en: "NDT Personnel Certification",
    },
    desc: {
      sl: "Osebje certificirano za nivoje II in III v vseh disciplinah neporušnih preiskav.",
      en: "Personnel certified for levels II and III in all non-destructive testing disciplines.",
    },
    pdfUrl: "#",
  },
  {
    id: "asme",
    code: "ASME Sec. XI",
    color: "cyan" as const,
    status: "QUALIFIED" as const,
    registry: "PDI-QP",
    org: "ASME / PDI",
    nuclear: true,
    title: { sl: "Jedrska kodifikacija", en: "Nuclear Code Qualification" },
    desc: {
      sl: "PDI kvaificiranost za varno delo v jedrski industriji. Nujna za projekte Barakah (UAE) in NEK. Naša najredkejša in najpomembnejša akreditacija.",
      en: "PDI Qualified for safe operation in nuclear industry. Essential for Barakah (UAE) and NEK projects. Our rarest and most critical accreditation.",
    },
    pdfUrl: "#",
  },
] as const;

function CertsSection({ lang }: { lang: "sl" | "en" }) {
  return (
    <section
      id="certifikati"
      className="relative bg-black py-12 md:py-20 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-10 flex-wrap gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-blue-400">
                {lang === "sl" ? "Preverljiva kakovost" : "Verified quality"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {lang === "sl"
                ? "Certifikati & Akreditacije"
                : "Certifications & Accreditations"}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {CERT_DATA.map((cert, i) => {
            const accent = certAccent[cert.color];
            const status = certStatus[cert.status];
            const isWide = i === 0 || i === 3;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className={isWide ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <GlowCard
                  customSize
                  glowColor={accent.glow}
                  className="!flex !flex-col !p-0 !gap-0 w-full h-full"
                  style={
                    {
                      "--backdrop": "rgba(255,255,255,0.025)",
                      "--backup-border": "rgba(255,255,255,0.08)",
                      "--size": "380",
                      "--border": "1.5",
                      "--radius": "16",
                      boxShadow: accent.inset,
                    } as React.CSSProperties
                  }
                >
                  {"nuclear" in cert && cert.nuclear && (
                    <div className="absolute inset-0 bg-cyan-500/[0.03] pointer-events-none rounded-2xl" />
                  )}
                  <div
                    className="absolute -right-16 -top-16 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: accent.orb }}
                  />

                  <div className="relative z-10 p-7 md:p-9 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-7">
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-white/45 uppercase">
                          REG
                        </span>
                        <div className="font-mono text-[10px] text-white/55 mt-0.5">
                          {cert.registry}
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.pill}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.dot} ${status.glow}`}
                        />
                        <span className="font-mono text-[9px] tracking-widest uppercase font-bold">
                          {status.label}
                        </span>
                        {"nuclear" in cert && cert.nuclear && (
                          <>
                            <span className="w-px h-3 bg-cyan-500/30" />
                            <span className="font-mono text-[9px] tracking-widest uppercase font-bold">
                              NUCLEAR
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      className={`font-mono text-3xl md:text-4xl font-bold tracking-tight mb-1 ${accent.code}`}
                    >
                      {cert.code}
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-white/55 mb-4">
                      {cert.title[lang]}
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed mb-auto">
                      {cert.desc[lang]}
                    </p>

                    <div className="mt-7 pt-5 border-t border-white/[0.07] flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex gap-5">
                        <div>
                          <div className="font-mono text-[9px] text-white/45 uppercase tracking-widest mb-1">
                            {lang === "sl" ? "Cert. organ" : "Issuing Body"}
                          </div>
                          <div className="text-white text-sm font-semibold">
                            {cert.org}
                          </div>
                        </div>
                        {"validUntil" in cert && cert.validUntil && (
                          <div>
                            <div className="font-mono text-[9px] text-white/45 uppercase tracking-widest mb-1">
                              {lang === "sl" ? "Velja do" : "Expires"}
                            </div>
                            <div className="font-mono text-sm text-green-400 font-semibold">
                              {cert.validUntil}
                            </div>
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
                        {lang === "sl" ? "Prenesi PDF" : "Download PDF"}
                      </HoverBorderGradient>
                    </div>
                    {"also" in cert && cert.also && (
                      <div className="mt-3 font-mono text-[9px] tracking-widest text-white/45 uppercase">
                        {lang === "sl" ? "Priznano" : "Recognized"}: {cert.also}
                      </div>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center font-mono text-[10px] tracking-widest text-white/45 uppercase flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={11} className="text-white/45" />
          {lang === "sl"
            ? "Originalni certifikati so na voljo za preverjanje na zahtevo"
            : "Original certificates are available for verification on request"}
        </motion.p>
      </div>
    </section>
  );
}

const ORG_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Megama NDT Preiskave d.o.o.",
  url: "https://megama.si",
  logo: "https://megama.si/wp-content/uploads/2021/01/cropped-cropped-website_logo_transparent_background-1-1.png",
  description:
    "Visoko specializiran partner za neporušne preiskave (NDT), nadzor kakovosti in varilni inženiring.",
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cesta krških žrtev 44",
    addressLocality: "Krško",
    postalCode: "8270",
    addressCountry: "SI",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+386-31-694-806",
    contactType: "customer service",
    email: "info@megama.si",
    availableLanguage: ["Slovenian", "English"],
  },
  employee: [
    { "@type": "Person", name: "Rok Topolnik", jobTitle: "Direktor" },
    { "@type": "Person", name: "Boris Plešac", jobTitle: "Vodja kakovosti" },
  ],
  areaServed: [
    { "@type": "Country", name: "Slovenia" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Croatia" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "ISO 9001:2015" },
    { "@type": "EducationalOccupationalCredential", name: "EN ISO 9712" },
    { "@type": "EducationalOccupationalCredential", name: "ASNT Level III" },
    { "@type": "EducationalOccupationalCredential", name: "ASME Section XI" },
  ],
});

const VALUES = {
  sl: [
    {
      num: "01",
      title: "Zadovoljstvo strank",
      text: "Vsak korak naredimo z mislijo na naročnika. Prejme storitev, ki rešuje dejanski problem, ne generičnega odgovora.",
    },
    {
      num: "02",
      title: "Odzivnost in prilagodljivost",
      text: "Zavedamo se dinamike industrije. Hitro se odzovemo in poiščemo rešitve, prilagojene specifičnim zahtevam projekta.",
    },
    {
      num: "03",
      title: "Poštenost in partnerstvo",
      text: "Z naročniki gradimo dolgoročne odnose, ki temeljijo na zaupanju in strokovnem poslovnem odnosu.",
    },
  ],
  en: [
    {
      num: "01",
      title: "Client satisfaction",
      text: "Every step is taken with the client in mind. They receive a service that solves the real problem, not a generic response.",
    },
    {
      num: "02",
      title: "Responsiveness",
      text: "We understand the pace of industry. We respond fast and adapt solutions to the specific demands of each project.",
    },
    {
      num: "03",
      title: "Honesty and partnership",
      text: "We build long-term client relationships grounded in trust and professional integrity.",
    },
  ],
};

const expo = [0.16, 1, 0.3, 1] as [number, number, number, number];

function MegamaSection({ lang }: { lang: "sl" | "en" }) {
  const values = VALUES[lang];

  return (
    <section
      id="why-megama"
      className="relative bg-black py-16 md:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0071e3]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Company intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: expo }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-5">
            {lang === "sl" ? (
              <>
                <span className="text-white font-medium">Megama d.o.o.</span> je
                bilo ustanovljeno leta 2021 v Krškem z jasnim ciljem: postaviti
                nov standard za NDT storitve in nadzore varjenja v industriji in
                energetiki –{" "}
                <span className="text-white/90">
                  brez kompromisov in brez skrbi.
                </span>
              </>
            ) : (
              <>
                <span className="text-white font-medium">Megama d.o.o.</span>{" "}
                was founded in 2021 in Krško with a clear goal: to offer
                Slovenian industry and energy sector NDT services and welding
                supervision at the highest possible level –{" "}
                <span className="text-white/90">
                  without compromise, without worry.
                </span>
              </>
            )}
          </p>
          <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
            {lang === "sl" ? (
              <>
                Danes nas vodi ista filozofija: vsak pregled, vsak certifikat in
                vsak nasvet je narejen tako, da vi lahko mirno spite. Ker vemo,
                da je za vami vedno ekipa, ki stoji za standardi.
              </>
            ) : (
              <>
                Today the same philosophy guides us: every inspection, every
                certificate and every piece of advice is done so that you can
                sleep soundly. Because we know there is always a team behind you
                that stands for standards.
              </>
            )}
          </p>
        </motion.div>

        {/* Team + Values */}
        <div
          id="ekipa"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left: Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: expo }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-[#0071e3]/60" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-[#0071e3]">
                {lang === "sl"
                  ? "Ekipa: za standardi stojijo ljudje"
                  : "Team: standards stand on people"}
              </span>
            </div>
            <TeamShowcase />
          </motion.div>

          {/* Right: Values */}
          <motion.div
            id="vrednote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: expo }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-8">
              {lang === "sl" ? "Naše vrednote" : "Our values"}
            </h2>
            <div className="divide-y divide-white/[0.06]">
              {values.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: expo }}
                  className="py-7 group flex items-start gap-5"
                >
                  <span className="font-mono text-xs text-[#0071e3]/40 tracking-widest shrink-0 pt-1 group-hover:text-[#0071e3]/80 transition-colors duration-300">
                    {v.num}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight mb-2">
                      {v.title}
                    </h3>
                    <p className="text-base text-white/55 leading-relaxed">
                      {v.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const lang = language as "sl" | "en";

  return (
    <>
      <Helmet>
        <title>
          {lang === "sl"
            ? "Megama NDT – Neporušne preiskave in nadzor kakovosti | Slovenija"
            : "Megama NDT – Non-Destructive Testing & Quality Control | Slovenia"}
        </title>
        <meta
          name="description"
          content={
            lang === "sl"
              ? "Visoko specializiran partner za NDT preiskave, nadzor kakovosti in varilni inženiring. ISO 9001:2015, ASNT Level III, ASME Sec. XI. Krško, Slovenija."
              : "Highly specialized partner for NDT inspections, quality control and welding engineering. ISO 9001:2015, ASNT Level III, ASME Sec. XI certified. Krško, Slovenia."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://megama.si" />
        <meta
          property="og:title"
          content={
            lang === "sl"
              ? "Megama NDT – Neporušne preiskave | Slovenija"
              : "Megama NDT – Non-Destructive Testing | Slovenia"
          }
        />
        <meta
          property="og:description"
          content={
            lang === "sl"
              ? "Specialistične NDT preiskave, nadzor in zagotavljanje kakovosti po najvišjih mednarodnih standardih."
              : "Specialist NDT inspections, supervision and quality assurance to the highest international standards."
          }
        />
        <script type="application/ld+json">{ORG_JSON_LD}</script>
      </Helmet>
      <main className="w-full bg-black text-white antialiased">
        <Hero lang={lang} />
        <Stats lang={lang} />
        <IndustrySectors lang={lang} />
        <Services />
        <GlobalPresence lang={lang} />
        <MegamaSection lang={lang} />
        <CertsSection lang={lang} />
        <Contact t={t} />
      </main>
    </>
  );
};

export default Home;

/* ──────────────────────────────────────────────────────────────
   HERO — word-by-word blur reveal + subtle scan line
   ────────────────────────────────────────────────────────────── */

const HERO_COPY = {
  headline: {
    sl: "Zagotavljamo varnost in integriteto vaše industrijske infrastrukture.",
    en: "We ensure the safety and integrity of your industrial infrastructure.",
  },
  sub: {
    sl: "Specialistične NDT preiskave, nadzor in zagotavljanje kakovosti po najvišjih mednarodnih standardih.",
    en: "Specialist NDT inspections, supervision and quality assurance to the highest international standards.",
  },
  cta1: { sl: "Pridobite strokovno mnenje", en: "Get expert opinion" },
  cta2: { sl: "Naše storitve", en: "Our services" },
  cert: {
    sl: {
      c1: "Certificirano",
      c2: "Standard",
      c3: "Strokovnost",
      c4: "Skladnost",
    },
    en: { c1: "Certified", c2: "Standard", c3: "Expertise", c4: "Compliance" },
  },
  location: { sl: "Krško, Slovenija", en: "Krško, Slovenia" },
};

function AnimatedHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.75,
            delay: 0.15 + i * 0.065,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.26em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

function Hero({ lang }: { lang: "sl" | "en" }) {
  return (
    <section
      id="home"
      className="relative w-full min-h-[120svh] md:min-h-[100svh] flex items-end overflow-hidden bg-black"
    >
      <style>{`
        @keyframes megama-kenburns {
          0%   { transform: scale(1.0)  translate3d(0,0,0); }
          100% { transform: scale(1.07) translate3d(-1.5%, -1.2%, 0); }
        }
        .megama-kenburns {
          animation: megama-kenburns 24s ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .megama-kenburns { animation: none; }
        }
        @keyframes hero-scan {
          0%   { top: -2px; opacity: 0; }
          4%   { opacity: 1; }
          94%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .hero-scan-line {
          animation: hero-scan 10s ease-in-out infinite;
          animation-delay: 2s;
          animation-fill-mode: backwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-scan-line { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Background photo */}
      <img
        src={HERO_BG}
        alt=""
        className="megama-kenburns absolute inset-0 w-full h-full object-cover opacity-90"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-black -z-10" />

      {/* Scan line */}
      <div className="hero-scan-line absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0071e3]/50 to-transparent z-[5] pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent md:via-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent md:from-black/50 md:via-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-0" />

      {/* Location pill — desktop: absolute; mobile: flows before headline */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden md:flex absolute top-28 md:top-32 left-6 md:left-[max(1.5rem,calc(50%-600px+1.5rem))] z-10 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
          {HERO_COPY.location[lang]}
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-14 md:pb-20">
        {/* Location pill — mobile only, inline before headline */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:hidden mb-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
            {HERO_COPY.location[lang]}
          </span>
        </motion.div>

        <AnimatedHeadline
          text={HERO_COPY.headline[lang]}
          className="text-[clamp(2.25rem,4.8vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.06] text-white max-w-4xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-7 text-lg md:text-2xl text-white/70 max-w-2xl leading-snug font-light"
        >
          {HERO_COPY.sub[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-7 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <HoverBorderGradient
            as="a"
            href="#contact"
            containerClassName="w-full sm:w-auto p-0"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-medium bg-black/80 hover:bg-[#0071e3]/10 hover:shadow-[0_8px_32px_rgba(0,113,227,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300 group/link"
          >
            {HERO_COPY.cta1[lang]}
          </HoverBorderGradient>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md border border-white/10 hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,113,227,0.2)] group/link2"
          >
            {HERO_COPY.cta2[lang]}{" "}
            <ArrowRight
              size={18}
              className="transition-transform group-hover/link2:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 md:mt-12 pt-5 md:pt-8 border-t border-white/10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 md:gap-12"
        >
          {[
            {
              icon: <Check className="w-5 h-5 text-white/80" />,
              shape: "rounded-full",
              label: HERO_COPY.cert[lang].c1,
              value: "ISO 9001",
            },
            {
              icon: (
                <span className="text-[11px] font-bold text-white/80 tracking-wider">
                  NDT
                </span>
              ),
              shape: "rounded",
              label: HERO_COPY.cert[lang].c2,
              value: "EN ISO 9712",
            },
            {
              icon: (
                <span className="font-serif font-bold italic text-base text-white/80">
                  A
                </span>
              ),
              shape: "rounded-sm",
              label: HERO_COPY.cert[lang].c3,
              value: "ASNT Level III",
            },
            {
              icon: (
                <span className="font-serif font-bold text-base text-white/80">
                  S
                </span>
              ),
              shape: "rounded-[40%]",
              label: HERO_COPY.cert[lang].c4,
              value: "ASME Sec. XI",
            },
          ].map((b, i) => (
            <a
              key={i}
              href="#certifikati"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("why-megama")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-3 opacity-55 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              <div
                className={`w-10 h-10 ${b.shape} border-[1.5px] border-white/60 flex items-center justify-center group-hover:border-[#0071e3]/80 transition-colors`}
              >
                {b.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] leading-[1.2] text-white/50 uppercase tracking-[0.15em] font-medium">
                  {b.label}
                </span>
                <span className="text-sm font-semibold tracking-wide text-white/90">
                  {b.value}
                </span>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Decorative blue separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 h-px bg-gradient-to-r from-transparent via-[#0071e3]/40 to-transparent origin-center"
        />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   STATS — 4 verified stats: expertise, credit, export %, countries
   Source: ebonitete.si (credit), SloExport / GZS (export share & countries)
   ────────────────────────────────────────────────────────────── */

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS_DATA: Record<"sl" | "en", StatItem[]> = {
  sl: [
    {
      value: 15,
      suffix: "+",
      label: "let NDT izkušenj",
      sub: "Jedrska energetika, petrokemija in energetika.",
    },
    {
      value: 10,
      suffix: "/10",
      label: "bonitetna ocena",
      sub: "Odlično: potrjena bonitetna ocena",
    },
    {
      value: 55,
      suffix: "%",
      label: "prihodkov iz tujine",
      sub: "Avstrija · Hrvaška · ZAE",
    },
    {
      value: 3,
      suffix: "",
      label: "izvozne destinacije",
      sub: "AUT · HRV · UAE",
    },
  ],
  en: [
    {
      value: 15,
      suffix: "+",
      label: "years NDT expertise",
      sub: "Nuclear energy, petrochemical and power.",
    },
    {
      value: 10,
      suffix: "/10",
      label: "credit rating",
      sub: "Excellent: verified credit rating",
    },
    {
      value: 55,
      suffix: "%",
      label: "international revenue",
      sub: "Austria · Croatia · UAE",
    },
    { value: 3, suffix: "", label: "export countries", sub: "AUT · HRV · UAE" },
  ],
};

function Stats({ lang }: { lang: "sl" | "en" }) {
  const stats = STATS_DATA[lang];
  return (
    <section className="relative w-full bg-[#030303] py-16 md:py-36 overflow-hidden">
      {/* Top fade from hero */}
      <div className="absolute inset-x-0 top-0 h-28 md:h-36 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((s, i) => (
            <StatCell key={i} item={s} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ item, delay }: { item: StatItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(item.value);
      return;
    }
    const controls = animate(0, item.value, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, item.value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-left group"
    >
      <div className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tracking-[-0.04em] leading-none text-white tabular-nums group-hover:drop-shadow-[0_0_30px_rgba(0,113,227,0.4)] transition-all duration-500">
        {count}
        <span className="text-white/35">{item.suffix}</span>
      </div>
      <div className="mt-4 text-base text-white font-medium leading-snug">
        {item.label}
      </div>
      <div className="mt-1.5 text-sm text-white/45 font-light leading-relaxed">
        {item.sub}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   GLOBAL PRESENCE — verified: 55 % export, AUT / HRV / UAE
   Source: SloExport (Zbornica GZS), financial year 2024
   ────────────────────────────────────────────────────────────── */

const COUNTRIES = [
  {
    code: "SVN",
    flag: "🇸🇮",
    name: { sl: "Slovenija", en: "Slovenia" },
    detail: null,
  },
  {
    code: "AUT",
    flag: "🇦🇹",
    name: { sl: "Avstrija", en: "Austria" },
    detail: null,
  },
  {
    code: "HRV",
    flag: "🇭🇷",
    name: { sl: "Hrvaška", en: "Croatia" },
    detail: null,
  },
  {
    code: "UAE",
    flag: "🇦🇪",
    name: { sl: "Arabski emirati", en: "United Arab Emirates" },
    detail: {
      sl: "Strokovni nadzor in svetovanje pri vzdrževanju jedrske infrastrukture.",
      en: "Expert supervision and consulting for nuclear infrastructure maintenance.",
    },
  },
  {
    code: "INT",
    flag: "🌍",
    name: { sl: "In drugje", en: "And elsewhere" },
    detail: null,
  },
];

function GlobalPresence({ lang }: { lang: "sl" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pct, setPct] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPct(55);
      return;
    }
    const ctrl = animate(0, 55, {
      duration: 1.8,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setPct(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView]);

  return (
    <section className="relative bg-[#030303] py-20 md:py-44 overflow-hidden">
      {/* Top fade from Process section */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]" />
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_35%,transparent_100%)] pointer-events-none" />
      {/* Ambient blue glow right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/6 rounded-full blur-[130px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: copy + country tags */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-7 flex items-center gap-3">
              <Globe2 size={12} className="text-[#0071e3]" />
              {lang === "sl" ? "Globalna prisotnost" : "Global presence"}
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.05] text-white mb-5 md:mb-6">
              {lang === "sl" ? (
                <>
                  Delujemo po
                  <br />
                  Evropi in Bližnjem vzhodu.
                </>
              ) : (
                <>
                  Operating across
                  <br />
                  Europe and the Middle East.
                </>
              )}
            </h2>

            <p className="text-base md:text-lg text-white/55 font-light leading-relaxed max-w-md mb-8 md:mb-12">
              {lang === "sl" ? (
                <>
                  55 % prihodkov ustvarimo z mednarodnimi projekti. Naša ekipa
                  zagotavlja vrhunski nadzor na terenu v štirih državah, od
                  nuklearnih elektrarn do rafinerij, vedno v strogi skladnosti z{" "}
                  <span className="text-white/85 font-medium tracking-tight">
                    ASME Sec. XI
                  </span>{" "}
                  in{" "}
                  <span className="text-white/85 font-medium tracking-tight">
                    FANR
                  </span>{" "}
                  regulativo.
                </>
              ) : (
                <>
                  55% of our revenue comes from international projects. Our team
                  delivers expert on-site supervision across four countries,
                  from nuclear plants to refineries, always in strict compliance
                  with{" "}
                  <span className="text-white/85 font-medium tracking-tight">
                    ASME Sec. XI
                  </span>{" "}
                  and{" "}
                  <span className="text-white/85 font-medium tracking-tight">
                    FANR
                  </span>{" "}
                  regulations.
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-3">
              {COUNTRIES.map((c, i) => (
                <div
                  key={c.code}
                  onMouseEnter={() => c.detail && setHoveredCountry(c.code)}
                  onMouseLeave={() => c.detail && setHoveredCountry(null)}
                  onClick={() =>
                    c.detail &&
                    setHoveredCountry(hoveredCountry === c.code ? null : c.code)
                  }
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 ${
                    c.detail ? "cursor-pointer" : "cursor-default"
                  } ${
                    hoveredCountry === c.code
                      ? "bg-[#0071e3]/10 border-[#0071e3]/40 shadow-[0_0_20px_rgba(0,113,227,0.15)]"
                      : "bg-white/[0.03] border-white/10 hover:border-[#0071e3]/20 hover:bg-[#0071e3]/5"
                  }`}
                >
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <div>
                    <div className="font-mono text-[9px] text-white/35 tracking-widest uppercase">
                      {c.code}
                    </div>
                    <div className="text-sm font-medium text-white mt-0.5">
                      {c.name[lang]}
                    </div>
                    <AnimatePresence>
                      {hoveredCountry === c.code && c.detail && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[11px] text-white/65 font-light leading-snug mt-1 max-w-[200px]">
                            {c.detail[lang]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: big animated percentage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-14 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.07)]">
              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#0071e3]/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10">
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mb-8">
                  {lang === "sl"
                    ? "Izvozni delež prihodkov"
                    : "Export revenue share"}
                </div>

                <div
                  className="text-[5.5rem] md:text-[9rem] font-bold tracking-[-0.06em] leading-none text-white tabular-nums"
                  style={{ textShadow: "0 0 60px rgba(0,113,227,0.25)" }}
                >
                  {pct}
                  <span className="text-[#0071e3]">%</span>
                </div>

                <div className="mt-8 h-px bg-gradient-to-r from-[#0071e3]/50 via-[#0071e3]/15 to-transparent" />

                <div className="mt-8 space-y-4">
                  {COUNTRIES.filter((c) => c.code !== "SVN").map((c) => (
                    <div key={c.code} className="flex items-center gap-3">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-white/55 text-sm font-light">
                        {c.name[lang]}
                      </span>
                      <div className="ml-auto w-2 h-2 rounded-full bg-[#0071e3]/50" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      {lang === "sl" ? "Aktivni projekti" : "Active projects"}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-white font-bold text-sm tabular-nums">
                      10<span className="text-white/30">/10</span>
                    </span>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      {lang === "sl" ? "Boniteta" : "Credit"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CONTACT — merged with process timeline
   ────────────────────────────────────────────────────────────── */

const PROCESS_STEPS: Record<
  "sl" | "en",
  { id: string; title: string; description: string }[]
> = {
  sl: [
    {
      id: "01",
      title: "Oddajte povpraševanje",
      description:
        "Pošljite specifikacije projekta. Level III strokovnjaki vam v 24 urah vrnejo prvi odziv.",
    },
    {
      id: "02",
      title: "Inženirska priprava",
      description:
        "Izberemo optimalno NDT metodo (UT, RT, MT) in pripravimo načrt skladen z ASME ali ISO.",
    },
    {
      id: "03",
      title: "Brezhibna izvedba",
      description:
        "Mobilna ekipa izvede preiskave na terenu brez prekinitev vaših delovnih procesov.",
    },
    {
      id: "04",
      title: "Certificirano poročilo",
      description:
        "Prejmete dokumentacijo, pripravljeno za takojšnjo predajo nadzornim organom.",
    },
  ],
  en: [
    {
      id: "01",
      title: "Submit your inquiry",
      description:
        "Send your project specifications. Level III specialists respond within 24 hours.",
    },
    {
      id: "02",
      title: "Engineering preparation",
      description:
        "We select the optimal NDT method (UT, RT, MT) and prepare a plan aligned with ASME or ISO.",
    },
    {
      id: "03",
      title: "Seamless execution",
      description:
        "Our mobile team performs inspections on-site without interrupting your operations.",
    },
    {
      id: "04",
      title: "Certified report",
      description:
        "You receive documentation ready for immediate submission to regulatory authorities.",
    },
  ],
};

interface ContactProps {
  t: any;
}

function Contact({ t }: ContactProps) {
  const { language } = useLanguage();
  const lang = language as "sl" | "en";

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    );
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const { categoryId, itemLabel } = (e as CustomEvent).detail;
      const svcMap: Record<string, string> = {
        ndt: t.contact.form_ndt,
        nadzori: t.contact.form_supervision,
        qa: lang === "sl" ? "QC / QA Storitve" : "QC / QA Services",
        svetovanje: t.contact.form_consulting,
      };
      const svc = svcMap[categoryId];
      if (svc) setSelectedServices([svc]);
      if (itemLabel)
        setDescription(
          lang === "sl"
            ? `Zanima me: ${itemLabel}`
            : `Interested in: ${itemLabel}`,
        );
    };
    window.addEventListener("prefillContact", handler);
    return () => window.removeEventListener("prefillContact", handler);
  }, [lang, t]);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });
  const formWrapperRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setValidationMsg(true);
      setTimeout(() => setValidationMsg(false), 3500);
      if (formWrapperRef.current) {
        animate(
          formWrapperRef.current,
          { x: [0, -10, 10, -6, 6, 0] },
          { duration: 0.4 },
        );
      }
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    formData.append("service", selectedServices.join(", ") || "splošno");
    formData.append("description", description);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append(
      "_subject",
      `Novo povpraševanje: ${selectedServices.join(", ") || "splošno"} — ${name}`,
    );
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        setSelectedServices([]);
        setDescription("");
        setName("");
        setEmail("");
        setPhone("");
      } else {
        alert(
          lang === "sl"
            ? "Prišlo je do napake. Prosimo poskusite znova ali nas pokličite."
            : "An error occurred. Please try again or call us.",
        );
      }
    } catch {
      alert(
        lang === "sl"
          ? "Prišlo je do napake. Preverite povezavo."
          : "An error occurred. Check your connection.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    t.contact.form_ndt,
    t.contact.form_supervision,
    lang === "sl" ? "QC / QA Storitve" : "QC / QA Services",
    t.contact.form_consulting,
    t.contact.form_other,
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="relative bg-black py-16 md:py-44 overflow-hidden"
    >
      {/* Hidden anchor so any #process nav links still scroll here */}
      <span
        id="process"
        className="absolute -top-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top fade from WhyMegama */}
      <div className="absolute inset-x-0 top-0 h-28 md:h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-[1]" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0071e3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div
        ref={ref}
        className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
      >
        {/* Left: headline + process timeline + contact details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative z-10"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#0071e3]/70 uppercase mb-6 flex items-center gap-3">
            <span className="w-4 h-px bg-[#0071e3]/40" />
            {lang === "sl" ? "Začnite projekt" : "Start your project"}
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-4 leading-[1.08]">
            {lang === "sl" ? (
              <>
                Zagotovite si
                <br />
                varno izvedbo.
              </>
            ) : (
              <>
                Get your project
                <br />
                done safely.
              </>
            )}
          </h2>
          <p className="text-base text-white/65 leading-relaxed mb-10 max-w-[300px] font-light">
            {lang === "sl"
              ? "Strokovnjaki (Level III) pregledajo vaše specifikacije in v 24 urah predlagajo optimalen inženirski pristop."
              : "Level III specialists review your specs and propose the optimal approach within 24 hours."}
          </p>

          {/* Process timeline */}
          <div className="relative mb-10">
            <style>{`
              @keyframes timeline-glow-down {
                0%   { top: 0%; opacity: 0; }
                5%   { opacity: 1; }
                85%  { opacity: 0.7; }
                100% { top: 100%; opacity: 0; }
              }
              @media (prefers-reduced-motion: reduce) {
                .timeline-glow-orb { animation: none !important; opacity: 0 !important; }
              }
            `}</style>
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-[#0071e3]/50 via-white/10 to-white/5" />
            {/* Animated glow orb traveling down the line */}
            <div
              className="timeline-glow-orb absolute left-[11px] -translate-x-1/2 w-[6px] h-[6px] rounded-full pointer-events-none z-[5]"
              style={{
                background:
                  "radial-gradient(circle, #0071e3 0%, rgba(0,113,227,0.4) 50%, transparent 100%)",
                boxShadow:
                  "0 0 12px 4px rgba(0,113,227,0.5), 0 0 24px 8px rgba(0,113,227,0.2)",
                animation: "timeline-glow-down 3.5s ease-in-out infinite",
                top: "0%",
              }}
            />
            <div className="space-y-0">
              {PROCESS_STEPS[lang].map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex gap-5 ${i < PROCESS_STEPS[lang].length - 1 ? "pb-8" : ""}`}
                >
                  <div
                    className={`relative z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      i === 0
                        ? "border-[#0071e3]/60 bg-[#0071e3]/15 shadow-[0_0_10px_rgba(0,113,227,0.3)]"
                        : "border-white/12 bg-black"
                    }`}
                  >
                    <span
                      className={`font-mono text-[8px] font-bold leading-none ${i === 0 ? "text-[#0071e3]" : "text-white/25"}`}
                    >
                      {step.id}
                    </span>
                  </div>
                  <div className={i === 0 ? "" : "opacity-50"}>
                    <div
                      className={`text-base font-semibold mb-1.5 leading-tight ${i === 0 ? "text-white" : "text-white/80"}`}
                    >
                      {step.title}
                    </div>
                    <p className="text-sm text-white/55 font-light leading-snug max-w-[230px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative z-10"
        >
          <div ref={formWrapperRef}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full min-h-[480px] flex flex-col items-center justify-center text-center rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-12 shadow-[0_16px_64px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 border border-white/10 text-[#0071e3]">
                    <Check size={32} />
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">
                    {t.contact.success_title}
                  </h3>
                  <p className="text-white/55 max-w-sm mb-10 leading-relaxed font-light">
                    {t.contact.success_desc}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 bg-white/10 hover:bg-white/15 border border-white/10 group/btn"
                  >
                    {t.contact.success_btn}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.12] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.09)]"
                >
                  {/* Section 01: Service area */}
                  <div className="px-8 md:px-10 pt-9 md:pt-11 pb-8 border-b border-white/[0.07]">
                    <p className="font-mono uppercase tracking-[0.25em] mb-3 flex items-center gap-2 text-xs">
                      <span className="text-[#0071e3]">01</span>
                      <span className="text-white/25" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-white/60">
                        {lang === "sl"
                          ? "Področje povpraševanja"
                          : "Area of interest"}
                      </span>
                    </p>
                    <p className="text-white/60 text-sm font-light mb-5 leading-snug">
                      {lang === "sl"
                        ? "S čim vam lahko pomagamo? Izberite eno ali več področij."
                        : "What can we help you with? Select one or more areas."}
                    </p>
                    <div
                      role="group"
                      aria-label={
                        lang === "sl"
                          ? "Področja povpraševanja"
                          : "Areas of interest"
                      }
                      className="flex flex-wrap gap-2"
                    >
                      {services.map((svc: string) => {
                        const active = selectedServices.includes(svc);
                        return (
                          <motion.button
                            key={svc}
                            type="button"
                            aria-pressed={active}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => toggleService(svc)}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                              active
                                ? "bg-[#0071e3]/12 border-[#0071e3]/45 text-[#0071e3] shadow-[0_0_16px_rgba(0,113,227,0.15)]"
                                : "bg-white/[0.04] border-white/[0.1] text-white/55 hover:bg-white/[0.08] hover:text-white/85 hover:border-white/[0.18]"
                            }`}
                          >
                            {active && (
                              <Check
                                size={11}
                                className="shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            {svc}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 02: Project specs */}
                  <div className="px-8 md:px-10 py-8 border-b border-white/[0.07]">
                    <p className="font-mono uppercase tracking-[0.25em] mb-5 flex items-center gap-2 text-xs">
                      <span className="text-[#0071e3]">02</span>
                      <span className="text-white/25" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-white/60">
                        {lang === "sl"
                          ? "Specifikacije projekta"
                          : "Project specifications"}
                      </span>
                    </p>
                    <label htmlFor="contact-description" className="sr-only">
                      {lang === "sl"
                        ? "Specifikacije projekta"
                        : "Project specifications"}
                    </label>
                    <textarea
                      id="contact-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder={
                        lang === "sl"
                          ? "Vrsta materiala, standard (ASME/ISO), lokacija projekta..."
                          : "Material type, standard (ASME/ISO), project location..."
                      }
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white/90 text-sm placeholder-white/40 focus:border-[#0071e3]/60 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Section 03: Contact details */}
                  <div className="px-8 md:px-10 py-8 border-b border-white/[0.07]">
                    <p className="font-mono uppercase tracking-[0.25em] mb-5 flex items-center gap-2 text-xs">
                      <span className="text-[#0071e3]">03</span>
                      <span className="text-white/25" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-white/60">
                        {lang === "sl" ? "Vaši podatki" : "Your details"}
                      </span>
                    </p>
                    <div className="space-y-3">
                      <label htmlFor="contact-name" className="sr-only">
                        {lang === "sl" ? "Ime ali podjetje" : "Name or company"}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={`${lang === "sl" ? "Ime ali podjetje" : "Name or company"} *`}
                        className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/40 focus:border-[#0071e3]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-colors"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="contact-email" className="sr-only">
                            {lang === "sl" ? "E-naslov" : "E-mail"}
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={`${lang === "sl" ? "E-naslov" : "E-mail"} *`}
                            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/40 focus:border-[#0071e3]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-phone" className="sr-only">
                            {lang === "sl" ? "Telefon" : "Phone"}
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={lang === "sl" ? "Telefon" : "Phone"}
                            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/40 focus:border-[#0071e3]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit row */}
                  <div className="px-8 md:px-10 py-7 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                      {/* Call button — green */}
                      <a
                        href="tel:+38631694806"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-300 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.16] border border-emerald-500/[0.25] hover:border-emerald-500/[0.45] text-emerald-400 hover:text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.06)] hover:shadow-[0_0_28px_rgba(16,185,129,0.18)] group/call"
                      >
                        <Phone
                          size={15}
                          className="shrink-0 transition-transform group-hover/call:scale-110"
                        />
                        {lang === "sl" ? "Pokliči nas" : "Call us"}
                        <span className="text-emerald-500/60 font-mono text-xs">
                          +386 31 694 806
                        </span>
                      </a>

                      {/* Submit button — blue ghost, always active-looking */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300 group/btn bg-[#0071e3]/[0.08] hover:bg-[#0071e3]/[0.16] border border-[#0071e3]/[0.25] hover:border-[#0071e3]/[0.45] text-[#0071e3] hover:text-[#4da3ff] shadow-[0_0_20px_rgba(0,113,227,0.06)] hover:shadow-[0_0_28px_rgba(0,113,227,0.18)]"
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="animate-spin w-4 h-4 shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                opacity={0.3}
                              />
                              <path
                                d="M4 12a8 8 0 018-8"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                            {lang === "sl" ? "Pošiljanje …" : "Sending..."}
                          </>
                        ) : (
                          <>
                            {lang === "sl"
                              ? "Oddajte povpraševanje"
                              : "Submit inquiry"}
                            <ArrowUpRight
                              size={18}
                              className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={13} className="text-white/45 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[11px] text-white/70 font-medium tracking-wide">
                            Megama d.o.o.
                          </p>
                          <p className="text-[11px] text-white/50 font-light leading-relaxed">
                            Cesta krških žrtev 53, 8270 Krško · {lang === 'sl' ? 'Slovenija' : 'Slovenia'}
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/50 font-light sm:text-right">
                        {lang === "sl"
                          ? "100 % zaupnost tehničnih podatkov."
                          : "100% confidentiality of your data."}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                      <AnimatePresence>
                        {validationMsg && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-amber-400/80 font-light text-right"
                          >
                            {lang === "sl"
                              ? "Izpolnite ime in e-naslov."
                              : "Please fill in name and e-mail."}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
