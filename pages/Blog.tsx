import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

type Tag = 'ndt' | 'welding' | 'standards' | 'safety';

interface Article {
  id: string;
  title: { sl: string; en: string };
  excerpt: { sl: string; en: string };
  readTime: number;
  date: string;
  tag: Tag;
  featured?: boolean;
  metaLabel: string;
}

const articles: Article[] = [
  {
    id: 'ut-phased-array',
    title: {
      sl: 'PAUT: Zakaj je fazno zaredno ultrazvočno testiranje standard za kritično infrastrukturo',
      en: 'PAUT: Why Phased Array Ultrasonic Testing is the Standard for Critical Infrastructure'
    },
    excerpt: {
      sl: 'Fazno zaredno ultrazvočno testiranje (PAUT) je revolucioniralo zaznavanje napak v debelih varih in kompleksnih geometrijah. Razlagamo, kako deluje, kdaj je nujno in zakaj tradicionalni UT pogosto ni dovolj.',
      en: 'Phased array ultrasonic testing (PAUT) has revolutionized defect detection in thick welds and complex geometries. We explain how it works, when it\'s mandatory, and why traditional UT often isn\'t sufficient.'
    },
    readTime: 8,
    date: '2024-03-15',
    tag: 'ndt',
    featured: true,
    metaLabel: '[ART: NDT_PAUT_001]'
  },
  {
    id: 'iso-9712-nivoji',
    title: {
      sl: 'EN ISO 9712: Kaj pomenijo Nivo I, II in III v NDT certifikaciji',
      en: 'EN ISO 9712: What Do Levels I, II, and III Mean in NDT Certification'
    },
    excerpt: {
      sl: 'Razlika med NDT tehniki ni zgolj v izkušnjah — je v formalnih, preverljivih certifikatih. Razlagamo hierarhijo nivojev po standardu EN ISO 9712 in zakaj je certifikacija naročniku bistvena.',
      en: 'The difference between NDT technicians isn\'t just experience — it\'s in formal, verifiable certifications. We explain the level hierarchy under EN ISO 9712 and why certification is critical to clients.'
    },
    readTime: 6,
    date: '2024-02-01',
    tag: 'standards',
    metaLabel: '[ART: STD_9712_002]'
  },
  {
    id: 'vizualni-pregled',
    title: {
      sl: 'Vizualno testiranje (VT): Zakaj je najpomembnejša NDT metoda, ki jo industrija premalo ceni',
      en: 'Visual Testing (VT): Why It\'s the Most Important NDT Method Industry Underestimates'
    },
    excerpt: {
      sl: 'VT je prva in najpogostejša NDT metoda. Kljub temu ga mnogi naročniki zanemarjajo ali zaupajo nekvalificiranim delavcem. Razlagamo, kaj kompetentni VT inšpektor dejansko vidi.',
      en: 'VT is the first and most frequent NDT method. Yet many clients neglect it or assign it to unqualified workers. We explain what a competent VT inspector actually sees.'
    },
    readTime: 5,
    date: '2024-01-10',
    tag: 'ndt',
    metaLabel: '[ART: NDT_VT_003]'
  },
  {
    id: 'wpqr-wps',
    title: {
      sl: 'WPS, PQR, WPQR: Kaj so varilni postopki in zakaj brez njih ne smeš variti',
      en: 'WPS, PQR, WPQR: What Are Welding Procedures and Why You Cannot Weld Without Them'
    },
    excerpt: {
      sl: 'Preden varilec dotakne elektrode jeklene konstrukcije, mora obstajati WPS. Razlagamo celoten dokumentacijski cikel — od preskusnega zvara do atestiranega potrdila — in zakaj so te dokumente zahtevane po zakonu.',
      en: 'Before a welder touches an arc to structural steel, a WPS must exist. We explain the full documentation cycle — from the test weld to the certified certificate — and why these documents are legally required.'
    },
    readTime: 7,
    date: '2023-12-05',
    tag: 'welding',
    metaLabel: '[ART: WELD_WPS_004]'
  },
  {
    id: 'korozija-rezervoarji',
    title: {
      sl: 'Merjenje debelin in korozijska analiza: Koliko sten je ostalo v vašem rezervoarju?',
      en: 'Wall Thickness Measurement and Corrosion Analysis: How Much Wall Is Left in Your Tank?'
    },
    excerpt: {
      sl: 'Jekleni rezervoarji in cevovodi z leti tanjšajo. Ultrazvočno merjenje debelin (UTT) je neinvaziven način, da ugotovite stanje brez zaustavitve celotnega sistema.',
      en: 'Steel tanks and pipelines thin over time. Ultrasonic thickness measurement (UTT) is a non-invasive way to assess condition without shutting down your entire system.'
    },
    readTime: 5,
    date: '2023-11-18',
    tag: 'safety',
    metaLabel: '[ART: SAF_UTT_005]'
  },
  {
    id: 'asme-asnt',
    title: {
      sl: 'ASME vs. EN standardi: Kateri velja za vaš projekt?',
      en: 'ASME vs. EN Standards: Which One Applies to Your Project?'
    },
    excerpt: {
      sl: 'Projekti za americke naročnike zahtevajo ASME, evropski projekti EN. A kaj ko so naročniki mešani? Razlagamo ključne razlike med standardnima sistemoma in kako jih uskladiti.',
      en: 'US clients require ASME; European projects require EN. But what when clients are mixed? We explain the key differences between the two standard systems and how to reconcile them.'
    },
    readTime: 9,
    date: '2023-10-22',
    tag: 'standards',
    metaLabel: '[ART: STD_ASME_006]'
  }
];

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTag, setActiveTag] = useState<Tag | 'all'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tagColors: Record<Tag, string> = {
    ndt: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    welding: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    standards: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    safety: 'bg-green-500/10 text-green-500 border-green-500/20',
  };

  const tagLabels: Record<Tag, string> = {
    ndt: t.blogPage.tag_ndt,
    welding: t.blogPage.tag_welding,
    standards: t.blogPage.tag_standards,
    safety: t.blogPage.tag_safety,
  };

  const tags: (Tag | 'all')[] = ['all', 'ndt', 'welding', 'standards', 'safety'];

  const filtered = activeTag === 'all' ? articles : articles.filter(a => a.tag === activeTag);
  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(language === 'sl' ? 'sl-SI' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

  return (
    <main className="w-full bg-white dark:bg-industrial-black text-[#1d1d1f] dark:text-industrial-text relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-[0.07] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* ======= HERO ======= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-apple-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-apple-blue/10 dark:bg-industrial-accent/10 border border-apple-blue/20 dark:border-industrial-accent/20 text-apple-blue dark:text-industrial-accent text-xs font-bold uppercase tracking-wider mb-6 font-mono">
              <BookOpen className="w-4 h-4" />
              {t.blogPage.hero_badge}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#1d1d1f] dark:text-white mb-6 tracking-tight leading-none">
              {t.blogPage.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-stone-400 max-w-2xl leading-relaxed">
              {t.blogPage.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======= FEATURED ARTICLE ======= */}
      {featured && activeTag === 'all' && (
        <section className="pb-12 relative z-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-[#0a0a0a] rounded-[32px] overflow-hidden p-10 md:p-14 border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-apple-blue/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <span className="font-mono text-[10px] text-white/30 tracking-widest">{featured.metaLabel}</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tagColors[featured.tag]}`}>
                      <Tag className="w-3 h-3" />
                      {tagLabels[featured.tag]}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono">FEATURED</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-apple-blue transition-colors duration-300">
                    {featured.title[language]}
                  </h2>
                  <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-6">
                    {featured.excerpt[language]}
                  </p>
                  <div className="flex items-center gap-5 text-xs font-mono text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} {t.blogPage.min_read}
                    </span>
                    <span>{formatDate(featured.date)}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm font-mono group-hover:bg-apple-blue group-hover:text-white transition-colors duration-300">
                    {t.blogPage.read_more}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ======= FILTER + GRID ======= */}
      <section className="py-12 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Tag filters */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 border ${
                  activeTag === tag
                    ? 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black border-transparent'
                    : 'text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:text-[#1d1d1f] dark:hover:text-white hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                {tag === 'all' ? t.referencePage.filter_all : tagLabels[tag as Tag]}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered
              .filter(a => activeTag !== 'all' || !a.featured)
              .map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group bg-white dark:bg-industrial-gray/20 border border-black/5 dark:border-white/5 rounded-[24px] p-7 hover:shadow-xl transition-all duration-400 hover:-translate-y-1 cursor-pointer flex flex-col"
                >
                  {/* Meta label */}
                  <div className="font-mono text-[9px] text-gray-300 dark:text-gray-600 tracking-widest mb-4">
                    {article.metaLabel}
                  </div>

                  {/* Tag + Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${tagColors[article.tag]}`}>
                      <Tag className="w-3 h-3" />
                      {tagLabels[article.tag]}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                      <Clock className="w-3 h-3" />
                      {article.readTime} {t.blogPage.min_read}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-3 leading-snug group-hover:text-apple-blue dark:group-hover:text-industrial-accent transition-colors duration-300 flex-1">
                    {article.title[language]}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 dark:text-stone-400 leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt[language]}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                    <span className="text-[11px] font-mono text-gray-400">
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-apple-blue dark:text-industrial-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t.blogPage.read_more} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      {/* ======= CTA ======= */}
      <section className="py-24 bg-[#f5f5f7] dark:bg-black border-t border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-apple-blue/3 dark:bg-industrial-accent/5 pointer-events-none" />
        <div className="max-w-[980px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] dark:text-white mb-8 tracking-tight">
              {t.blogPage.cta_title}
            </h2>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1d1d1f] dark:bg-industrial-accent text-white rounded-full font-bold text-base hover:scale-105 transition-transform active:scale-95 shadow-xl font-mono tracking-wider"
            >
              {t.blogPage.cta_btn}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
