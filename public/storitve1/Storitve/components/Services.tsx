import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ScanEye, ShieldCheck, ClipboardCheck, Lightbulb, ChevronRight, X, Pointer,
  Eye, Droplet, Magnet, Activity, Ruler, Wind, Radiation, FileSearch, Hammer,
  Shield, CheckSquare, Users, PackageCheck, Network, FileText, Factory, FileSignature, BookOpen,
  Settings, Award, Book, GraduationCap
} from 'lucide-react';
import { servicesData } from '../data/services';
import { ServiceCategory } from '../types';
import FloatingParticles from './FloatingParticles';
import WireframeTorus from './WireframeTorus';
import MethodIllustrations from './MethodIllustrations';

const LOGO_URL = "https://megama.si/wp-content/uploads/2021/01/cropped-website_logo_transparent_background-1-1.png";

const iconMap: Record<string, React.ReactNode> = {
  ScanEye: <ScanEye size={28} />,
  ShieldCheck: <ShieldCheck size={28} />,
  ClipboardCheck: <ClipboardCheck size={28} />,
  Lightbulb: <Lightbulb size={28} />,
  Eye: <Eye size={20} />,
  Droplet: <Droplet size={20} />,
  Magnet: <Magnet size={20} />,
  Activity: <Activity size={20} />,
  Ruler: <Ruler size={20} />,
  Wind: <Wind size={20} />,
  Radiation: <Radiation size={20} />,
  FileSearch: <FileSearch size={20} />,
  Hammer: <Hammer size={20} />,
  Shield: <Shield size={20} />,
  CheckSquare: <CheckSquare size={20} />,
  Users: <Users size={20} />,
  PackageCheck: <PackageCheck size={20} />,
  Network: <Network size={20} />,
  FileText: <FileText size={20} />,
  Factory: <Factory size={20} />,
  FileSignature: <FileSignature size={20} />,
  BookOpen: <BookOpen size={20} />,
  Settings: <Settings size={20} />,
  Award: <Award size={20} />,
  Book: <Book size={20} />,
  GraduationCap: <GraduationCap size={20} />
};

const Services: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, methodId } = useParams();

  const activeCategory = servicesData.find(c => c.id === categoryId) || null;
  const activeMethod = activeCategory?.items.find(i => i.id === methodId) || null;

  const [isHoveringCenter, setIsHoveringCenter] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 768;
  const isDesktop = screenSize.width >= 1024;
  // Adjust orbit radius to match the new 3D wireframe size exactly
  const minDim = Math.min(screenSize.width, screenSize.height);
  const orbitRadius = minDim * 0.35;

  const handleCategoryClick = (category: ServiceCategory) => {
    if (activeCategory?.id === category.id) {
      navigate('/');
    } else {
      navigate(`/${category.id}`);
    }
  };

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] z-0 pointer-events-none"></div>

      <FloatingParticles />
      
      {/* Synchronized Background Wireframe */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-center p-4 gap-8 lg:gap-16">
        <motion.div 
          animate={{ 
            scale: activeCategory ? (isDesktop ? 0.6 : 0.75) : 1,
            x: activeCategory && isDesktop ? "-35%" : "0%",
            opacity: activeCategory && !isDesktop ? 0.15 : 1
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-full"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100svh]">
            <WireframeTorus />
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-center p-4 gap-8 lg:gap-16">
        
        {/* The Solar System Container */}
        <motion.div 
          animate={{ 
            scale: activeCategory ? (isDesktop ? 0.6 : 0.75) : 1,
            x: activeCategory && isDesktop ? "-35%" : "0%",
            opacity: activeCategory && !isDesktop ? 0.15 : 1
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-full"
        >
          
          {/* Center Logo */}
          <motion.div
            className="relative z-40 cursor-pointer group flex flex-col items-center"
            onMouseEnter={() => setIsHoveringCenter(true)}
            onMouseLeave={() => setIsHoveringCenter(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate('/')}
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-400/30 transition-all duration-500" />
            
            <div className="relative bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-full p-5 sm:p-8 shadow-2xl flex flex-col items-center justify-center">
              <img 
                src={LOGO_URL} 
                alt="Megama Logo" 
                className="w-16 h-16 sm:w-28 sm:h-28 object-contain drop-shadow-lg mb-1 sm:mb-2"
              />
              <div className="text-slate-300 text-[9px] sm:text-xs font-medium tracking-widest uppercase text-center opacity-80">
                Celovite rešitve
              </div>
            </div>
          </motion.div>

          {/* Orbiting Satellites (Categories) */}
          {servicesData.map((category, index) => {
            const totalItems = servicesData.length;
            const angle = (index / totalItems) * 2 * Math.PI;
            
            return (
              <OrbitItem 
                key={category.id}
                category={category}
                angle={angle}
                radius={orbitRadius}
                isActive={activeCategory?.id === category.id}
                onClick={() => handleCategoryClick(category)}
                index={index}
              />
            );
          })}
        </motion.div>

        {/* Backdrop for closing modal */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => navigate('/')}
              className="absolute inset-0 z-40 lg:hidden bg-slate-950/60 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Inline Info Panel Wrapper */}
        <div className={`absolute inset-4 lg:inset-auto lg:left-[35%] lg:right-8 lg:top-1/2 lg:-translate-y-1/2 z-50 flex items-center justify-center ${activeCategory ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: isDesktop ? 50 : 0, y: isDesktop ? 0 : 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: isDesktop ? 50 : 0, y: isDesktop ? 0 : 20, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="w-full bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-white/5">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className={`p-3 sm:p-4 rounded-2xl bg-white/10 shadow-sm ${activeCategory.color}`}>
                    <div className="scale-75 sm:scale-100">{iconMap[activeCategory.icon]}</div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-3xl font-semibold text-white tracking-tight">
                      {activeCategory.title}
                    </h3>
                    <p className="text-gray-400 mt-1.5 text-xs sm:text-sm leading-relaxed max-w-md line-clamp-2 sm:line-clamp-none font-medium">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-all shrink-0 backdrop-blur-md"
                >
                  <X size={20} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto overscroll-contain custom-scrollbar flex-1 relative">
                <AnimatePresence mode="wait">
                  {!activeMethod ? (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Kaj vključuje?
                      </h4>
                      <motion.ul 
                        className="grid grid-cols-2 gap-2 sm:gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { 
                            opacity: 1, 
                            transition: { staggerChildren: 0.05 }
                          }
                        }}
                      >
                        {activeCategory.items.map((item) => (
                          <motion.li
                            key={item.id}
                            onClick={() => navigate(`/${activeCategory.id}/${item.id}`)}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            className="cursor-pointer flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 group"
                          >
                            {item.icon ? (
                              <div className={`p-2 rounded-xl bg-black/20 ${activeCategory.color} group-hover:scale-110 transition-all shrink-0 shadow-sm`}>
                                {iconMap[item.icon]}
                              </div>
                            ) : (
                              <span className={`w-1.5 h-1.5 rounded-full ${activeCategory.color.replace('text-', 'bg-')} group-hover:scale-125 transition-all shrink-0`} />
                            )}
                            <span className="text-gray-300 group-hover:text-white text-xs sm:text-sm leading-snug font-medium">
                              {item.label}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      <motion.button 
                        onClick={() => navigate(`/${activeCategory.id}`)}
                        className="self-start mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all backdrop-blur-md group relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Glass reflection / pulse effect */}
                        <motion.div 
                          className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ x: ['-200%', '400%'] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                        />
                        
                        <motion.div
                          animate={{ x: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          className={`${activeCategory.color} relative z-10`}
                        >
                          <ChevronRight className="w-5 h-5 rotate-180" />
                        </motion.div>
                        <span className="relative z-10 transition-colors">Nazaj na vse metode</span>
                      </motion.button>
                      <h4 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
                        {activeMethod.label}
                      </h4>
                      
                      {/* 3D / Animated Illustration */}
                      <div className="mb-8 shrink-0">
                        <MethodIllustrations methodId={activeMethod.id} color={activeCategory.color} />
                      </div>

                      {activeMethod.description ? (
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                          {activeMethod.description}
                        </p>
                      ) : (
                        <p className="text-gray-500 italic text-sm mb-8">Podrobnejši opis še ni na voljo.</p>
                      )}
                      
                      {activeMethod.details && activeMethod.details.length > 0 && (
                        <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/5">
                          <h5 className="text-sm font-semibold text-gray-200 mb-4 tracking-wide">Značilnosti:</h5>
                          <ul className="space-y-3">
                            {activeMethod.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${activeCategory.color.replace('text-', 'bg-')} shrink-0`} />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 sm:p-8 pt-2 flex justify-end">
                <button className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-100 text-black rounded-full font-semibold transition-all duration-300 shadow-[0_4px_14px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm">
                  Pošljite povpraševanje <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      {/* Clearer Mobile/Desktop Hint */}
      {!activeCategory && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-400 z-30"
        >
          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700/50 shadow-lg cursor-default">
            <Pointer size={20} className="animate-bounce text-blue-400" />
            <span className="text-sm sm:text-base font-medium text-white">Kliknite na storitev za podrobnosti</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface OrbitItemProps {
  category: ServiceCategory;
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const OrbitItem: React.FC<OrbitItemProps> = ({ category, angle, radius, isActive, onClick, index }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-30"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
    >
        {/* Electric Pulse Line */}
        <div 
            className={`absolute top-0 left-0 origin-left ${category.color} pointer-events-none`}
            style={{ 
                width: radius,
                height: '1px',
                transform: `rotate(${angle}rad) translateY(-1px)`,
                zIndex: -1,
                opacity: 0.6
            }}
        >
            <div
               className="absolute h-full bg-current rounded-full"
               style={{ 
                   width: '40px',
                   boxShadow: '0 0 5px currentColor, 0 0 10px currentColor',
                   animation: 'pulse-move 6s ease-in-out infinite'
               }}
            />
        </div>

        <div 
            className="absolute"
            style={{ 
                transform: `rotate(${angle}rad) translate(${radius}px) rotate(-${angle}rad)` 
            }}
        >
           <div className="absolute -translate-x-1/2 -translate-y-1/2">
               <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
               >
                  <button
                onClick={onClick}
                className={`
                  relative group flex flex-col items-center justify-center
                  w-20 h-20 sm:w-28 sm:h-28 rounded-full 
                  backdrop-blur-xl border-2 transition-all duration-300
                  ${isActive 
                    ? `bg-slate-800 border-${category.color.split('-')[1]}-400 shadow-[0_0_40px_rgba(0,0,0,0.6)] scale-110 z-50` 
                    : 'bg-slate-900/80 border-slate-600 hover:border-slate-400 hover:bg-slate-800 hover:scale-105 hover:shadow-xl'
                  }
                `}
              >
                {isActive && (
                    <span className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-${category.color.split('-')[1]}-500`}></span>
                )}

                <div className={`mb-1 sm:mb-2 ${isActive ? 'text-white' : category.color} transition-colors group-hover:scale-110 duration-300 scale-75 sm:scale-100`}>
                  {iconMap[category.icon]}
                </div>
                
                <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight px-1 sm:px-2 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {category.shortTitle}
                </span>

                <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-${category.color.split('-')[1]}-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
              </button>
           </motion.div>
           </div>
        </div>
    </motion.div>
  );
};

export default Services;
