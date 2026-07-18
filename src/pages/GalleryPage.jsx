import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FilterBar from '../components/common/FilterBar.jsx';
import { galleryItems, galleryCategories } from '../data/gallery.js';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = activeFilter === 'All' ? galleryItems : galleryItems.filter(g => g.category === activeFilter);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIdx(i => (i + 1) % filtered.length);

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Facility</span>
            <h1 className="section-title mt-2 text-white">
              Premium <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Take a tour of our world-class facilities and see our members in action.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-center mb-8">
            <FilterBar filters={galleryCategories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-semibold">{item.title}</p>
                      <span className="badge bg-white/20 text-white/80 text-xs">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-white hover:text-red-400 transition-colors z-10">
              <FiX />
            </button>

            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-white hover:text-primary transition-colors z-10">
              <FiChevronLeft className="text-xl" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-white hover:text-primary transition-colors z-10">
              <FiChevronRight className="text-xl" />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
            >
              <img
                src={filtered[lightboxIdx]?.image}
                alt={filtered[lightboxIdx]?.title}
                className="max-w-full max-h-[75vh] object-contain"
              />
              <div className="p-4 bg-dark-card text-center">
                <p className="text-dark-text font-semibold">{filtered[lightboxIdx]?.title}</p>
                <p className="text-dark-muted text-sm">{filtered[lightboxIdx]?.category}</p>
              </div>
            </motion.div>

            <div className="absolute bottom-6 text-dark-muted text-sm">
              {lightboxIdx + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
