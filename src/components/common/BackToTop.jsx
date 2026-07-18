import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary-gradient rounded-2xl flex items-center justify-center text-white shadow-glow-primary hover:scale-110 active:scale-95 transition-transform"
          aria-label="Back to top"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
