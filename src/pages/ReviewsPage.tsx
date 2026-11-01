import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { REVIEWS, BOOKING_URL, Review } from '@/data/teo-data';

const REVIEW_FILTERS = [
  'All Reviews',
  'BioRePeel',
  'Face Microneedling',
  'Clinicare Chemical Peel',
  'Luxury Dermaplane',
  'HydroFacial',
  'Teò Signature Facial',
];

export function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Reviews');

  const filteredReviews = selectedFilter === 'All Reviews'
    ? REVIEWS
    : REVIEWS.filter((r) => r.treatment.toLowerCase() === selectedFilter.toLowerCase());

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
            <span className="eyebrow text-[#B69A76]">CLIENT FEEDBACK</span>
            <h1 className="serif text-[42px] md:text-[60px] leading-[1.08] text-[#302820] font-light">
              Loved by <span className="italic font-normal text-[#B69A76]">Our Clients.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#82786D] leading-relaxed font-light">
              Read authentic feedback from clients who have experienced our facial rituals, chemical peels, and advanced aesthetic protocols at Merton Abbey Mills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-[#302820]/8 bg-[#F8F5F0] sticky top-[65px] md:top-[77px] z-20 backdrop-blur-md bg-[#F8F5F0]/90">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {REVIEW_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase transition-all whitespace-nowrap border ${
                  selectedFilter === f
                    ? 'border-[#302820] bg-[#302820] text-[#F8F5F0]'
                    : 'border-[#302820]/15 bg-white text-[#302820]/80 hover:border-[#B69A76]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-white p-8 border border-[#302820]/10 shadow-[0_2px_12px_rgba(48,40,32,0.03)] flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#B69A76]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="bg-[#EFE9E0] px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] text-[#302820] uppercase">
                      {rev.treatment}
                    </span>
                  </div>

                  <p className="serif text-[17px] leading-relaxed text-[#302820] italic">
                    "{rev.content}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#302820]/8 flex items-center justify-between text-[12px]">
                  <div>
                    <span className="font-medium text-[#302820]">{rev.author}</span>
                    {rev.practitioner && (
                      <span className="text-[#82786D] block text-[11px]">Practitioner: {rev.practitioner}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#B69A76]">
                    <CheckCircle2 size={13} />
                    <span>Verified Booking</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Book or Leave Review Callout */}
          <div className="mt-20 p-8 md:p-12 bg-white border border-[#302820]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#B69A76]">
                <ShieldCheck size={18} />
                <span className="text-[11px] font-medium tracking-[0.16em] uppercase">Verified Client Reviews</span>
              </div>
              <h3 className="serif text-[26px] md:text-[32px] text-[#302820] font-light">
                Ready to Experience Teò for Yourself?
              </h3>
              <p className="text-[13px] text-[#82786D]">
                View live appointment availability or browse more reviews directly on our official booking calendar.
              </p>
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#302820] text-[#F8F5F0] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-[#B69A76] transition-colors shrink-0 shadow-md"
            >
              <span>BOOK AN APPOINTMENT</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
