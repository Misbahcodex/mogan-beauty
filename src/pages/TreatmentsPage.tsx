import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Search, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { TREATMENTS, BOOKING_URL, Treatment } from '@/data/teo-data';

const CATEGORIES = [
  'All Treatments',
  'Signature Facials',
  'Advanced Skin Treatments',
  'Specialist Treatments',
  'Packages and Experiences',
] as const;

export function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreatments = TREATMENTS.filter((t) => {
    const matchesCategory = selectedCategory === 'All Treatments' || t.category === selectedCategory;
    const matchesQuery =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#F8F5F0] text-[#302820] min-h-screen">
      {/* Header Banner */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#302820]/10 bg-[#EFE9E0]/50">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <span className="eyebrow text-[#B69A76]">TREATMENT MENU</span>
            <h1 className="serif text-[42px] md:text-[60px] leading-[1.08] text-[#302820] font-light">
              Considered Skincare, <span className="italic font-normal text-[#B69A76]">Bespoke Results.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#82786D] leading-relaxed font-light">
              Explore our full directory of signature facial rituals, advanced aesthetic protocols, and regenerative skin therapies at our London sanctuary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Notice */}
      <section className="bg-white border-b border-[#302820]/8 py-5">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFE9E0] text-[#B69A76]">
                <Info size={16} />
              </div>
              <p className="text-[13px] text-[#82786D]">
                <strong className="text-[#302820] font-medium">Consultation First:</strong> Every treatment journey begins with an initial skin analysis to determine active ingredients, tolerance, and suitability.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] hover:text-[#B69A76] transition-colors shrink-0"
            >
              <span>BOOK A CONSULTATION</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 border-b border-[#302820]/8 bg-[#F8F5F0] sticky top-[65px] md:top-[77px] z-20 backdrop-blur-md bg-[#F8F5F0]/90">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-[11px] font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'border-[#302820] bg-[#302820] text-[#F8F5F0]'
                      : 'border-[#302820]/15 bg-white text-[#302820]/80 hover:border-[#B69A76]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82786D]" />
              <input
                type="text"
                placeholder="Search treatments or concerns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[13px] bg-white border border-[#302820]/15 focus:outline-none focus:border-[#302820] placeholder:text-[#82786D]/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Catalog Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          {filteredTreatments.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#302820]/10 p-12">
              <p className="serif text-[24px] text-[#302820]">No treatments matched your search.</p>
              <p className="text-[14px] text-[#82786D] mt-2">Try clearing your filters or search keywords.</p>
              <button
                onClick={() => { setSelectedCategory('All Treatments'); setSearchQuery(''); }}
                className="mt-6 px-6 py-2.5 bg-[#302820] text-[#F8F5F0] text-[11px] font-medium tracking-[0.14em] uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreatments.map((treatment, idx) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between bg-white border border-[#302820]/10 shadow-[0_2px_12px_rgba(48,40,32,0.03)] transition-all duration-300 hover:shadow-xl hover:border-[#B69A76]/50"
                >
                  <div>
                    <div className="image-wrap aspect-[16/11] overflow-hidden bg-[#EFE9E0]">
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#F8F5F0]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-[#302820]">
                        {treatment.category}
                      </div>
                    </div>

                    <div className="p-6 md:p-7 space-y-3">
                      <h3 className="serif text-[23px] text-[#302820] group-hover:text-[#B69A76] transition-colors font-light">
                        {treatment.name}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[#82786D]">
                        {treatment.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 md:px-7 md:pb-7 pt-2 flex items-center justify-between border-t border-[#302820]/8">
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] underline-link"
                    >
                      EXPLORE DETAILS
                    </Link>

                    <a
                      href={treatment.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] uppercase text-[#B69A76] hover:text-[#302820] transition-colors"
                    >
                      <span>BOOK</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bottom Consultation Banner */}
          <div className="mt-20 p-8 md:p-12 bg-[#302820] text-[#F8F5F0] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="serif text-[28px] md:text-[34px] font-light">Unsure which treatment fits your skin?</h3>
              <p className="text-[14px] text-[#EFE9E0]/70">
                Book an in-person diagnostic consultation with Sineád or Tayla-Jade at our Merton Abbey Mills clinic. We will create a tailored treatment roadmap suited to your exact skin goals.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B69A76] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase text-white hover:bg-[#A38763] transition-colors shrink-0"
            >
              <span>RESERVE A CONSULTATION</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
