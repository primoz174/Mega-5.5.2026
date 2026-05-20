import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeServiceSection, setActiveServiceSection] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset active sections when navigating away from Home
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      setActiveServiceSection(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isScrolled) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!navbarRef.current) return;
      const rect = navbarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      navbarRef.current.style.setProperty('--mouse-x', `${x}px`);
      navbarRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    const el = navbarRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isScrolled]);

  useEffect(() => {
    // IntersectionObserver for active section highlighting
    const options = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    };

    const visibleServiceSections = new Set<string>();

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          if (['home', 'services', 'certifikati', 'ekipa', 'vrednote', 'contact'].includes(id)) {
            setActiveSection(id);
          }
          if (id.startsWith('services-')) {
            visibleServiceSections.add(id);
          }
        } else {
          if (id.startsWith('services-')) {
            visibleServiceSections.delete(id);
          }
        }
      });
      // Update active service section — clear when none visible
      if (visibleServiceSections.size > 0) {
        setActiveServiceSection([...visibleServiceSections].at(-1) ?? null);
      } else {
        setActiveServiceSection(null);
      }
    };

    observerRef.current = new IntersectionObserver(callback, options);

    const sections = ['home', 'services', 'certifikati', 'ekipa', 'vrednote', 'contact', 'services-ndt', 'services-nadzori', 'services-qa', 'services-svetovanje'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    // Handle cross-page hash scrolling
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // @ts-ignore
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // @ts-ignore
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // @ts-ignore
      window.__lenis?.start();
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/' && !['home', 'services', 'contact'].includes(id)) {
      // If it's a known anchor but we're on a subpage, go home + hash
      if (id.startsWith('services-') || id === 'services' || id === 'contact' || id === 'ekipa' || id === 'vrednote' || id === 'certifikati') {
        navigate('/#' + id);
      } else {
        navigate(id.startsWith('/') ? id : '/' + id);
      }
      setIsMobileMenuOpen(false);
      return;
    }

    if (location.pathname !== '/' && id === 'home') {
      navigate('/');
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      // Fallback: if element doesn't exist on this page, try navigating
      navigate('/#' + id);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: t.nav.home, id: 'home' },
    {
      name: t.nav.services,
      id: 'services',
      isDropdown: true,
      subLinks: [
        {
          name: language === 'sl' ? 'NDT Preiskave' : 'NDT Inspections',
          scrollId: 'services-ndt',
          color: '#3b82f6',
          desc: language === 'sl' ? 'Zvari, materiali, tlačna oprema' : 'Welds, materials, pressure vessels',
        },
        {
          name: language === 'sl' ? 'Inženirski nadzori' : 'Engineering Supervision',
          scrollId: 'services-nadzori',
          color: '#f97316',
          desc: language === 'sl' ? 'Varilni nadzor, prevzemi' : 'Welding supervision, acceptance',
        },
        {
          name: language === 'sl' ? 'Kakovost QC/QA' : 'Quality QC/QA',
          scrollId: 'services-qa',
          color: '#10b981',
          desc: language === 'sl' ? 'Dokumentacija, ITP, NCR' : 'Documentation, ITP, NCR',
        },
        {
          name: language === 'sl' ? 'Svetovanje' : 'Consulting',
          scrollId: 'services-svetovanje',
          color: '#a855f7',
          desc: language === 'sl' ? 'WPS/WPQR, NDT plani' : 'WPS/WPQR, NDT plans',
        },
      ],
    },
    { name: t.nav.about, id: 'ekipa' },
    { name: t.nav.certificates, id: 'certifikati' },
    { name: language === 'sl' ? 'Industrije' : 'Industries', id: 'panoge', isPage: true, path: '/panoge' },
    { name: t.nav.blog, id: 'blog', isPage: true, path: '/blog' },
    { name: t.nav.contact, id: 'contact', isCta: true },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'sl' ? 'en' : 'sl');
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 z-50 flex justify-center px-4 md:px-5"
        animate={{ top: isScrolled ? 10 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          ref={navbarRef}
          style={{
            pointerEvents: 'auto',
            border: '1px solid',
            position: 'relative',
          }}
          className="w-full max-w-[1200px] flex items-center justify-between group/nav"
          animate={
            isScrolled
              ? {
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 24,
                  backgroundColor: 'rgba(5, 5, 5, 0.85)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow:
                    '0 12px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                }
              : {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderRadius: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(255, 255, 255, 0)',
                  boxShadow: '0 0px 0px rgba(0,0,0,0)',
                }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Backdrop blur — z-index: 0 so content (z-index: 1) always paints above it */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: 'inherit', zIndex: 0 }}
          />
          {/* Moving spotlight background glow */}
          {isScrolled && (
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500 opacity-0 group-hover/nav:opacity-100"
              style={{
                zIndex: 0,
                background: `radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 113, 227, 0.03), transparent 80%)`,
              }}
            />
          )}
          {/* Moving border glowing spotlight */}
          {isScrolled && (
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-opacity duration-500 opacity-0 group-hover/nav:opacity-100"
              style={{
                zIndex: 0,
                border: '1px solid transparent',
                backgroundImage: `linear-gradient(transparent, transparent), radial-gradient(130px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 113, 227, 0.18), transparent 80%)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            />
          )}
          {/* Logo */}
          <div className="relative z-10 flex-1 flex items-center justify-start min-w-[70px] h-10 md:h-12">
            <button
              onClick={() => scrollToSection('home')}
              className="absolute left-0 origin-left focus:outline-none"
            >
              <motion.img
                {...(location.pathname === '/' ? {
                  layoutId: 'hero-logo-img',
                  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                } : {})}
                src="https://megama.si/wp-content/uploads/2021/01/cropped-cropped-website_logo_transparent_background-1-1.png"
                alt="MEGAMA"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </button>
          </div>

          {/* Desktop Nav — flex-1 takes remaining space, z-10 above backdrop */}
          <nav className="relative z-10 hidden lg:flex flex-[2] items-center justify-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.isPage
                ? location.pathname === link.path
                : activeSection === link.id && location.pathname === '/';

              if (link.isCta) {
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="ml-2 whitespace-nowrap px-4 py-2 rounded-[10px] text-[11px] font-semibold tracking-[0.08em] uppercase text-[#4da3ff] bg-[#0071e3]/[0.1] border border-[#0071e3]/[0.28] hover:bg-[#0071e3]/[0.18] hover:border-[#0071e3]/[0.5] hover:text-white hover:shadow-[0_0_20px_rgba(0,113,227,0.25)] transition-all duration-300"
                  >
                    {link.name}
                  </button>
                );
              }

              if (link.isDropdown) {
                const isSectionActive = activeSection === link.id && location.pathname === '/';
                // Robust path matching: remove trailing slashes and compare
                const currentPath = location.pathname.replace(/\/$/, '');
                const isPathActive = link.subLinks?.some((s: any) => 
                  s.path && (s.path.replace(/\/$/, '') === currentPath || currentPath.startsWith(s.path + '/'))
                );
                const isDropActive = isSectionActive || isPathActive;
                
                const hasScrollLinks = link.subLinks?.some((s: any) => s.scrollId);
                const activeSub = hasScrollLinks
                  ? link.subLinks?.find((s: any) => s.scrollId === activeServiceSection)
                  : link.subLinks?.find((s: any) => s.path && s.path.replace(/\/$/, '') === currentPath);
                return (
                  <div key={link.id} className="relative group">
                    <button className={`relative group/btn flex items-center gap-1 px-3 py-2 rounded-[10px] text-[11px] font-medium tracking-[0.06em] uppercase transition-colors duration-200 whitespace-nowrap ${isDropActive ? 'text-white bg-white/[0.08]' : 'text-white/65 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07]'}`}>
                      {link.name}
                      <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                      {isDropActive ? (
                        <span
                          className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full transition-all duration-300"
                          style={{
                            background: (activeSub as any)?.color ?? '#0071e3',
                            boxShadow: (activeSub as any)?.color
                              ? `0 0 4px 1px ${(activeSub as any).color}30`
                              : '0 0 4px 1px rgba(0,113,227,0.18)',
                          }}
                        />
                      ) : (
                        <span className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[#0071e3]/40 origin-center scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
                      )}
                    </button>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-250 z-50 ${hasScrollLinks ? 'w-72' : 'w-56'}`}>
                    <div className="bg-[#080808] rounded-2xl border border-white/[0.09] shadow-[0_20px_60px_rgba(0,0,0,0.7)] translate-y-1 group-hover:translate-y-0 transition-transform duration-250 flex flex-col p-1.5">
                      {link.subLinks?.map((sub: any) => {
                        const isSubActive = sub.scrollId && activeServiceSection === sub.scrollId;
                        return sub.scrollId ? (
                          <button
                            key={sub.name}
                            onClick={() => scrollToSection(sub.scrollId)}
                            className="w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 group/sub hover:bg-white/[0.04]"
                            style={isSubActive ? { background: `${sub.color}18` } : undefined}
                          >
                            <div
                              className="mt-1 w-2 h-2 rounded-full shrink-0 transition-all duration-200"
                              style={{
                                background: sub.color,
                                opacity: isSubActive ? 1 : 0.6,
                                boxShadow: isSubActive ? `0 0 4px 1px ${sub.color}35` : 'none',
                              }}
                            />
                            <div className="flex-1">
                              <div
                                className="text-[11px] font-semibold tracking-[0.04em] uppercase transition-colors group-hover/sub:text-white/90"
                                style={{ color: isSubActive ? sub.color : 'rgba(255,255,255,0.75)' }}
                              >
                                {sub.name}
                              </div>
                              {sub.desc && (
                                <div className="text-[10px] text-white/40 mt-0.5 leading-snug">
                                  {sub.desc}
                                </div>
                              )}
                            </div>
                            {isSubActive && (
                              <div className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 self-start" style={{ background: sub.color, boxShadow: `0 0 3px 1px ${sub.color}40` }} />
                            )}
                          </button>
                        ) : (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={`px-4 py-2.5 rounded-xl text-[11px] font-medium tracking-[0.06em] uppercase transition-colors duration-150 whitespace-nowrap block ${
                              sub.path.replace(/\/$/, '') === currentPath
                                ? 'text-[#4da3ff] bg-[#0071e3]/[0.12] font-semibold'
                                : 'text-white/65 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07]'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                    </div>
                  </div>
                );
              }

              return link.isPage ? (
                <Link
                  key={link.name}
                  to={link.path || '/'}
                  className={`relative group/link px-3 py-2 rounded-[10px] text-[11px] font-medium tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/65 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07]'
                  }`}
                >
                  {link.name}
                  {!isActive && (
                    <span className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[#0071e3]/40 origin-center scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[#0071e3]/80 shadow-[0_0_4px_1px_rgba(0,113,227,0.18)]" />
                  )}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative group/link px-3 py-2 rounded-[10px] text-[11px] font-medium tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/65 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07]'
                  }`}
                >
                  {link.name}
                  {!isActive && (
                    <span className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[#0071e3]/40 origin-center scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[#0071e3]/80 shadow-[0_0_4px_1px_rgba(0,113,227,0.18)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Language + Mobile Toggle — flex-shrink-0 so it never gets squeezed */}
          <div className="relative z-10 flex-1 flex items-center justify-end gap-2.5">
            {/* Desktop language: segmented SL | EN */}
            <button
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
              title={language === 'sl' ? 'Switch to English' : 'Preklopi na slovenščino'}
              aria-label="Change language"
            >
              <span
                className={`px-2.5 py-1.5 rounded-[9px] text-[10px] font-bold tracking-[0.1em] transition-all duration-200 ${
                  language === 'sl'
                    ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                SL
              </span>
              <span
                className={`px-2.5 py-1.5 rounded-[9px] text-[10px] font-bold tracking-[0.1em] transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                EN
              </span>
            </button>

            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] transition-colors duration-200"
                aria-label="Change language"
              >
                <span className={`px-2.5 py-1.5 rounded-[9px] text-[10px] font-bold tracking-[0.1em] ${language === 'sl' ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]' : 'text-white/30'}`}>
                  SL
                </span>
                <span className={`px-2.5 py-1.5 rounded-[9px] text-[10px] font-bold tracking-[0.1em] ${language === 'en' ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]' : 'text-white/30'}`}>
                  EN
                </span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 text-white/65 bg-white/[0.05] border border-white/[0.1] rounded-[10px] hover:text-white hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-[82vw] max-w-[340px] bg-[#050505] border-l border-white/[0.07] z-[60] flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">
                {language === 'sl' ? 'Navigacija' : 'Navigation'}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/35 hover:text-white/80 bg-white/[0.05] rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col px-4 py-2 gap-0 overflow-y-auto flex-1">
              {navLinks.map((link) => {
                const isActive = link.isPage
                  ? location.pathname === link.path
                  : activeSection === link.id && location.pathname === '/';



                if (link.isDropdown) {
                  return (
                    <div key={link.id} className="flex flex-col">
                      <div className="px-5 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35">
                        {link.name}
                      </div>
                      <div className="flex flex-col gap-0.5 pl-4 border-l border-white/[0.07] ml-5 mb-1">
                        {link.subLinks?.map((sub: any) => (
                          sub.scrollId ? (
                            <button
                              key={sub.name}
                              onClick={() => { scrollToSection(sub.scrollId); setIsMobileMenuOpen(false); }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[13px] font-medium text-white/65 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07] transition-colors duration-150"
                            >
                              {sub.color && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: sub.color }} />}
                              {sub.name}
                            </button>
                          ) : (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/65 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07] transition-colors duration-150"
                            >
                              {sub.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  );
                }

                return link.isPage ? (
                  <Link
                    key={link.name}
                    to={link.path || '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-5 py-3 rounded-2xl text-[15px] font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-white bg-white/[0.07] border border-white/[0.09]'
                        : 'text-white/75 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-5 py-3 rounded-2xl text-[15px] font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-white bg-white/[0.07] border border-white/[0.09]'
                        : 'text-white/75 hover:text-[#4da3ff] hover:bg-[#0071e3]/[0.07]'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
