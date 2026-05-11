import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleHeroLoaded = () => setIsHeroLoaded(true);
    window.addEventListener('heroLoaded', handleHeroLoaded);
    return () => window.removeEventListener('heroLoaded', handleHeroLoaded);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const sections = ['home', 'services', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // @ts-ignore
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      // @ts-ignore
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      // @ts-ignore
      window.__lenis?.start();
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/' && id !== 'home') {
      navigate('/#' + id);
      return;
    }
    if (location.pathname !== '/' && id === 'home') {
      navigate('/');
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.services, id: 'services', isPage: true, path: '/storitve' },
    {
      name: language === 'sl' ? 'Ekspertiza' : 'Expertise',
      id: 'expertise',
      isDropdown: true,
      subLinks: [
        { name: t.nav.certificates, path: '/certifikati' },
        { name: t.nav.industries, path: '/panoge' },
        { name: t.nav.equipment, path: '/oprema' },
      ],
    },
    { name: t.personnel.hero_title, id: 'personnel', isPage: true, path: '/personnel' },
    { name: t.nav.blog, id: 'blog', isPage: true, path: '/blog' },
    { name: t.nav.about, id: 'about', isPage: true, path: '/about' },
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
          style={{
            pointerEvents: 'auto',
            border: '1px solid',
            position: 'relative',
            willChange: 'border-color, background-color, border-radius, box-shadow',
          }}
          className="w-full max-w-[1200px] flex items-center justify-between"
          animate={
            isScrolled
              ? {
                  paddingLeft: 18,
                  paddingRight: 18,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 20,
                  backgroundColor: 'rgba(4, 4, 4, 0.82)',
                  borderColor: 'rgba(255, 255, 255, 0.09)',
                  boxShadow:
                    '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
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
          {/* Backdrop blur layer — separate div so opacity animates smoothly */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: 'inherit' }}
          />
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start min-w-[70px] relative h-10 md:h-12">
            <button
              onClick={() => scrollToSection('home')}
              className="absolute left-0 origin-left focus:outline-none"
            >
              <motion.img
                layoutId="hero-logo-img"
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src="https://megama.si/wp-content/uploads/2021/01/cropped-cropped-website_logo_transparent_background-1-1.png"
                alt="MEGAMA"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-[2] items-center justify-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.isPage
                ? location.pathname === link.path
                : activeSection === link.id && location.pathname === '/';

              if (link.isCta) {
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="ml-1.5 px-4 py-2 rounded-[10px] text-[11px] font-semibold tracking-[0.08em] uppercase text-[#0071e3] bg-[#0071e3]/[0.08] border border-[#0071e3]/[0.22] hover:bg-[#0071e3]/[0.14] hover:border-[#0071e3]/[0.4] hover:shadow-[0_0_18px_rgba(0,113,227,0.18)] transition-all duration-250"
                  >
                    {link.name}
                  </button>
                );
              }

              if (link.isDropdown) {
                return (
                  <div key={link.id} className="relative group">
                    <button className="flex items-center gap-1 px-3 py-2 rounded-[10px] text-[11px] font-medium tracking-[0.06em] uppercase text-white/45 hover:text-white/90 hover:bg-white/[0.07] transition-all duration-200">
                      {link.name}
                      <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-52 bg-[#080808] rounded-2xl border border-white/[0.09] shadow-[0_20px_60px_rgba(0,0,0,0.7)] opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto translate-y-1 group-hover:translate-y-0 transition-all duration-250 flex flex-col p-1.5 z-50">
                      {link.subLinks?.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="px-4 py-2.5 rounded-xl text-[11px] font-medium tracking-[0.06em] uppercase text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-150 whitespace-nowrap block"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return link.isPage ? (
                <Link
                  key={link.name}
                  to={link.path || '/'}
                  className={`relative px-3 py-2 rounded-[10px] text-[11px] font-medium tracking-[0.06em] uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/45 hover:text-white/90 hover:bg-white/[0.07]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3]" />
                  )}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-3 py-2 rounded-[10px] text-[11px] font-medium tracking-[0.06em] uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/45 hover:text-white/90 hover:bg-white/[0.07]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Language + Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end gap-2.5">
            <button
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-white/[0.05] border border-white/[0.1] text-white/50 text-[11px] font-semibold tracking-wider uppercase hover:bg-white/[0.09] hover:border-white/[0.2] hover:text-white/85 transition-all duration-200"
              title={language === 'sl' ? 'Switch to English' : 'Preklopi na slovenščino'}
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'sl' ? 'EN' : 'SL'}
            </button>

            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-white/[0.06] border border-white/[0.1] text-white/55 text-[11px] font-semibold tracking-wider uppercase transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5" />
                {language === 'sl' ? 'EN' : 'SL'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 text-white/55 bg-white/[0.06] border border-white/[0.1] rounded-[10px] hover:text-white hover:bg-white/[0.1] transition-all duration-200"
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
                Navigacija
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/35 hover:text-white/80 bg-white/[0.05] rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col px-4 py-5 gap-1 overflow-y-auto flex-1">
              {navLinks.map((link) => {
                const isActive = link.isPage
                  ? location.pathname === link.path
                  : activeSection === link.id && location.pathname === '/';

                if (link.isCta) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.id)}
                      className="mt-3 w-full text-left px-5 py-4 rounded-2xl text-[15px] font-semibold tracking-tight text-[#0071e3] bg-[#0071e3]/[0.08] border border-[#0071e3]/[0.2] hover:bg-[#0071e3]/[0.14] hover:border-[#0071e3]/[0.35] transition-all duration-200"
                    >
                      {link.name}
                    </button>
                  );
                }

                if (link.isDropdown) {
                  return (
                    <div key={link.id} className="flex flex-col">
                      <div className="px-5 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/25">
                        {link.name}
                      </div>
                      <div className="flex flex-col gap-0.5 pl-4 border-l border-white/[0.07] ml-5 mb-1">
                        {link.subLinks?.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-[13px] font-medium text-white/50 hover:text-white/90 hover:bg-white/[0.05] transition-all duration-150"
                          >
                            {sub.name}
                          </Link>
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
                    className={`px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-150 ${
                      isActive
                        ? 'text-white bg-white/[0.07] border border-white/[0.09]'
                        : 'text-white/50 hover:text-white/90 hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-150 ${
                      isActive
                        ? 'text-white bg-white/[0.07] border border-white/[0.09]'
                        : 'text-white/50 hover:text-white/90 hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            <div className="px-4 py-5 border-t border-white/[0.07]">
              <button
                onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-white/35" />
                  <span className="text-[13px] font-medium text-white/50">
                    {language === 'sl' ? 'Slovenščina' : 'English'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-lg ${language === 'sl' ? 'text-white bg-white/[0.1]' : 'text-white/25'}`}>
                    SL
                  </span>
                  <span className="text-white/15">/</span>
                  <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-lg ${language === 'en' ? 'text-white bg-white/[0.1]' : 'text-white/25'}`}>
                    EN
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
