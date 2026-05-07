import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-white/10 text-[#1d1d1f] dark:text-white hover:text-apple-blue hover:border-apple-blue/30 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:text-apple-blue transition-colors" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;