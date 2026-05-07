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
  const isHome = location.pathname === '/';

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

  // Lock body scroll AND stop Lenis when mobile menu is open
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
      const navbarHeight = 50;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
        { name: t.nav.equipment, path: '/oprema' }
      ]
    },
    { name: t.personnel.hero_title, id: 'personnel', isPage: true, path: '/personnel' },
    { name: t.nav.blog, id: 'blog', isPage: true, path: '/blog' },
    { name: t.nav.about, id: 'about', isPage: true, path: '/about' },
    { name: t.nav.contact, id: 'contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'sl' ? 'en' : 'sl');
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-200 flex justify-center ${isScrolled
          ? 'top-4 px-4'
          : 'top-0 px-6'
          }`}
        style={{ pointerEvents: 'none' }}
      >
        <div 
          style={{ pointerEvents: 'auto' }}
          className={`w-[100%] transition-all duration-200 flex items-center justify-between ${isScrolled
            ? 'max-w-[1200px] bg-white/[0.05] backdrop-blur-2xl rounded-full px-4 md:px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] border border-white/10'
            : 'max-w-[1200px] bg-transparent py-4'
          }`}
        >
          {/* Left: Logo */}
            <div className="flex-1 flex items-center justify-start min-w-[70px] relative h-10 md:h-12">
              <button 
                onClick={() => scrollToSection('home')} 
                className="flex items-center group focus:outline-none absolute left-0 origin-left"
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

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex flex-[2] items-center justify-center space-x-1 lg:space-x-4">
            <nav className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = link.isPage 
                  ? location.pathname === link.path
                  : activeSection === link.id && location.pathname === '/';

                if (link.isDropdown) {
                  return (
                    <div key={link.id} className="relative group">
                      <button className="relative text-[11px] lg:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#1d1d1f] dark:text-gray-200 opacity-70 hover:opacity-100 flex items-center gap-1">
                        {link.name}
                        <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col p-2 z-50">
                          {link.subLinks?.map(sub => (
                            <Link key={sub.name} to={sub.path} className="text-[10px] font-bold tracking-wider uppercase px-4 py-3 hover:bg-apple-blue/10 dark:hover:bg-white/5 rounded-xl text-[#1d1d1f] dark:text-white transition-colors whitespace-nowrap block border border-transparent hover:border-apple-blue/20">
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
                    className={`relative text-[11px] lg:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${
                      isActive
                        ? 'text-apple-blue'
                        : 'text-[#1d1d1f] dark:text-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-apple-blue rounded-full" />
                    )}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative text-[11px] lg:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${
                      isActive
                        ? 'text-[#1d1d1f] dark:text-white opacity-100'
                        : 'text-[#1d1d1f] dark:text-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#1d1d1f] dark:bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-end gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2c94c] hover:bg-[#e6be48] text-black shadow-sm transition-all hover:shadow-md"
              title={language === 'sl' ? 'Switch to English' : 'Preklopi na slovenščino'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[11px] font-extrabold tracking-wider">{language === 'sl' ? 'EN' : 'SL'}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center lg:hidden gap-3 justify-end flex-1">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2c94c] hover:bg-[#e6be48] text-black shadow-sm transition-all hover:shadow-md"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[11px] font-extrabold tracking-wider">{language === 'sl' ? 'EN' : 'SL'}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#1d1d1f] dark:text-industrial-text bg-black/5 dark:bg-white/10 rounded-full"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white dark:bg-industrial-black z-[60] flex flex-col px-6 py-4 lg:hidden"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#1d1d1f] dark:text-industrial-text"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 overflow-y-auto pb-20">
              {navLinks.map((link) => {
                if (link.isDropdown) {
                  return (
                    <div key={link.id} className="flex flex-col border-b border-black/10 dark:border-white/10 py-3">
                      <span className="text-left text-sm font-bold font-mono text-gray-500 mb-4">{link.name} //</span>
                      <div className="flex flex-col space-y-4 pl-4 border-l border-apple-blue/20 ml-2">
                        {link.subLinks?.map(sub => (
                          <Link key={sub.name} to={sub.path} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold font-mono text-[#1d1d1f] dark:text-industrial-text hover:text-apple-blue transition-colors">
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
                    className={`text-left text-2xl font-bold font-mono py-3 border-b border-black/10 dark:border-white/10 ${location.pathname === link.path ? 'text-apple-blue' : 'text-[#1d1d1f] dark:text-industrial-text'}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-2xl font-bold font-mono text-[#1d1d1f] dark:text-industrial-text py-3 border-b border-black/10 dark:border-white/10"
                  >
                    {link.name}
                  </button>
                );
              })}

              <button
                onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
                className="text-left text-xl font-medium text-[#1d1d1f] dark:text-industrial-text py-3 mt-4 flex items-center gap-3 border-b border-black/10 dark:border-white/10"
              >
                <Globe className="w-6 h-6" />
                <span className="flex items-center gap-2">
                  <span className={language === 'sl' ? 'text-apple-blue font-bold' : 'text-gray-400'}>SL</span>
                  <span className="text-gray-300">/</span>
                  <span className={language === 'en' ? 'text-apple-blue font-bold' : 'text-gray-400'}>EN</span>
                </span>
              </button>
            </nav>

            <div className="absolute inset-0 z-[-1] pointer-events-none opacity-20 dark:opacity-20 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;