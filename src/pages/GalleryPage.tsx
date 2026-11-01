import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Sparkles, ArrowUpRight } from 'lucide-react';
import { GALLERY, GalleryItem, BOOKING_URL } from '@/data/teo-data';

const CATEGORIES = ['All', 'Clinic Sanctuary', 'Treatments', 'Skincare', 'Advanced Care', 'Client Care'];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredGallery = activeCategory === 'All'
    ? GALLERY
    : GALLERY.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#F8F5F0] text-[#302820] min-h-screen">
      {/* Header Banner */}
      <section className="py-16 md:py-24 border-b border-[#302820]/8 bg-[#EFE9E0]/40 text-center">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <span className="eyebrow text-[#B69A76]">VISUAL ARCHIVE</span>
            <h1 className="serif text-[42px] md:text-[60px] leading-[1.08] text-[#302820] font-light">
              The Teò <span className="italic font-normal text-[#B69A76]">Sanctuary.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#82786D] leading-relaxed font-light">
              A visual journey through our private London clinic suites, bespoke facial rituals, and curated skincare aesthetics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-[#302820]/8 bg-[#F8F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase transition-all border ${
                  activeCategory === cat
                    ? 'border-[#302820] bg-[#302820] text-[#F8F5F0]'
                    : 'border-[#302820]/15 bg-white text-[#302820]/80 hover:border-[#B69A76]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setActiveModalItem(item)}
                className="group relative cursor-pointer overflow-hidden bg-white border border-[#302820]/10 shadow-sm aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#302820]/75 via-[#302820]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="self-end bg-white/20 backdrop-blur-sm p-2 rounded-full text-white">
                    <ZoomIn size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#B69A76] font-medium">
                      {item.category}
                    </span>
                    <h3 className="serif text-[22px] text-white font-light">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-[#302820] text-white border border-[#B69A76]/30 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 text-white hover:text-[#B69A76] transition-colors"
                aria-label="Close image modal"
              >
                <X size={20} />
              </button>

              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.alt}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#302820] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A76]">
                    {activeModalItem.category}
                  </span>
                  <h3 className="serif text-[24px] text-[#F8F5F0] font-light">
                    {activeModalItem.title}
                  </h3>
                </div>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#B69A76] px-5 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase text-white hover:bg-[#A38763] transition-colors"
                >
                  <span>BOOK TREATMENT</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
