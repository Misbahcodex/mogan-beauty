import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Star, MapPin, Mail, Clock, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import {
  TREATMENTS,
  REVIEWS,
  BOOKING_URL,
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  OPENING_HOURS,
  GIFT_CARD_DENOMINATIONS,
  GALLERY
} from '@/data/teo-data';

export function HomePage() {
  const [selectedGiftAmount, setSelectedGiftAmount] = useState<number>(100);

  // 6 Featured treatments required by prompt:
  // Teò Signature Facials, Korean Facials, Microneedling, BioRePeel, HydroFacial, Dermaplaning
  const featuredSlugs = [
    'teo-signature-facials',
    'korean-facials',
    'microneedling',
    'biorepeel-tca-peel',
    'hydrofacial',
    'dermaplaning',
  ];
  const featuredTreatments = featuredSlugs
    .map((slug) => TREATMENTS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TREATMENTS;

  // Filter 5 authentic reviews for the homepage
  const homeReviews = REVIEWS.slice(0, 5);

  return (
    <div className="bg-[#F8F5F0] text-[#302820]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-28 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 border border-[#B69A76]/40 bg-[#EFE9E0]/70 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.22em] text-[#302820] uppercase">
                <Sparkles size={13} className="text-[#B69A76]" />
                <span>PERSONALISED SKINCARE • ADVANCED AESTHETICS • LONDON</span>
              </div>

              <h1 className="serif text-[42px] leading-[1.08] tracking-[-0.01em] text-[#302820] sm:text-[56px] md:text-[68px] lg:text-[76px] font-light">
                Your Skin, <span className="italic font-normal text-[#B69A76]">Elevated.</span>
              </h1>

              <p className="text-[16px] md:text-[18px] leading-relaxed text-[#82786D] max-w-xl font-light">
                Discover a more personalised approach to skincare. From indulgent signature facials to advanced skin treatments, experience thoughtful care designed around your skin.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/treatments"
                  className="group inline-flex items-center justify-center gap-3 bg-[#302820] px-7 py-4 text-[12px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76] hover:shadow-lg"
                >
                  <span>EXPLORE TREATMENTS</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 border border-[#302820]/30 bg-transparent px-7 py-4 text-[12px] font-medium tracking-[0.16em] text-[#302820] uppercase transition-all duration-300 hover:border-[#302820] hover:bg-[#302820]/5"
                >
                  <span>BOOK YOUR EXPERIENCE</span>
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Location Badge */}
              <div className="pt-4 flex items-center gap-3 text-[12px] text-[#82786D]">
                <MapPin size={15} className="text-[#B69A76] shrink-0" />
                <span>Merton Abbey Mills • 14 Watermill Way, London SW19 2RD</span>
              </div>
            </motion.div>

            {/* Hero Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="image-wrap relative aspect-[4/5] w-full overflow-hidden shadow-2xl border border-[#302820]/10">
                <img
                  src="/images/teo/hero/hero-skincare-treatment.jpg"
                  alt="Relaxing professional facial treatment at Teò Luxury Skincare clinic London"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#302820]/40 via-transparent to-transparent" />
                
                {/* Floating Aesthetic Trust Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#F8F5F0]/95 backdrop-blur-md p-4 border border-[#302820]/10 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="serif text-[18px] text-[#302820]">Bespoke Facial Care</p>
                      <p className="text-[11px] text-[#82786D]">Personalized for your unique skin journey</p>
                    </div>
                    <div className="flex gap-1 text-[#B69A76]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="py-20 md:py-28 bg-[#EFE9E0]/50 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="image-wrap aspect-[4/3] overflow-hidden border border-[#302820]/10 shadow-md">
                <img
                  src="/images/teo/clinic/treatment-room.jpg"
                  alt="Teò Luxury Skincare tranquil private treatment room"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="eyebrow text-[#B69A76]">PHILOSOPHY</span>
              <h2 className="serif text-[34px] md:text-[46px] leading-[1.15] text-[#302820] font-light">
                A More Thoughtful Approach to Skincare.
              </h2>
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[#82786D] font-light">
                At Teò Luxury Skincare, every skin journey begins with understanding your individual needs. Discover personalised treatments, considered skincare experiences and a welcoming approach to achieving healthier-looking, radiant skin.
              </p>
              <p className="text-[14px] leading-relaxed text-[#82786D]">
                Whether you seek revitalizing hydration, gentle clinical peeling, or collagen-inducing microneedling, our protocols are selected with patience, precision, and genuine client care.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase text-[#302820] underline-link"
                >
                  <span>DISCOVER OUR APPROACH</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED TREATMENTS */}
      <section className="py-20 md:py-28 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow text-[#B69A76]">CURATED PROTOCOLS</span>
              <h2 className="serif text-[36px] md:text-[50px] leading-[1.12] text-[#302820] font-light mt-1">
                Discover Your Skin's Potential.
              </h2>
            </div>
            <Link
              href="/treatments"
              className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase text-[#302820] underline-link shrink-0"
            >
              <span>EXPLORE ALL TREATMENTS</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Treatment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group flex flex-col justify-between bg-white border border-[#302820]/10 shadow-[0_2px_12px_rgba(48,40,32,0.04)] transition-all duration-300 hover:shadow-xl hover:border-[#B69A76]/50"
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
                    <h3 className="serif text-[24px] text-[#302820] group-hover:text-[#B69A76] transition-colors font-light">
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
                    href={BOOKING_URL}
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

          <div className="mt-14 text-center">
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-3 bg-[#302820] px-8 py-4 text-[12px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76] hover:shadow-md"
            >
              <span>EXPLORE ALL TREATMENTS</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE TEÒ */}
      <section className="py-20 md:py-28 bg-[#EFE9E0]/40 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-[#B69A76]">THE TEÒ COMMITMENT</span>
            <h2 className="serif text-[36px] md:text-[48px] leading-[1.15] text-[#302820] font-light">
              Your Skin Deserves Considered Care.
            </h2>
            <p className="text-[15px] text-[#82786D] font-light">
              We reject one-size-fits-all treatments. Here is how we ensure each appointment is focused entirely on you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Block 1: PERSONALISED APPROACH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#F8F5F0] p-8 border border-[#302820]/10 space-y-4"
            >
              <span className="serif text-[28px] text-[#B69A76]">01</span>
              <h3 className="serif text-[21px] text-[#302820] font-light">
                PERSONALISED APPROACH
              </h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                Treatments selected around individual skin needs and goals. Every session begins with evaluating your barrier health and tolerance.
              </p>
            </motion.div>

            {/* Block 2: ADVANCED TREATMENTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F8F5F0] p-8 border border-[#302820]/10 space-y-4"
            >
              <span className="serif text-[28px] text-[#B69A76]">02</span>
              <h3 className="serif text-[21px] text-[#302820] font-light">
                ADVANCED TREATMENTS
              </h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                A comprehensive range of facial and advanced aesthetic therapies including BioRePeel, microneedling, and cellular regenerative protocols.
              </p>
            </motion.div>

            {/* Block 3: THOUGHTFUL EXPERIENCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F8F5F0] p-8 border border-[#302820]/10 space-y-4"
            >
              <span className="serif text-[28px] text-[#B69A76]">03</span>
              <h3 className="serif text-[21px] text-[#302820] font-light">
                THOUGHTFUL EXPERIENCE
              </h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                A welcoming sanctuary in Merton Abbey Mills focused on personal comfort, unhurried attention, and quiet relaxation.
              </p>
            </motion.div>

            {/* Block 4: CONTINUED SKINCARE JOURNEY */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#F8F5F0] p-8 border border-[#302820]/10 space-y-4"
            >
              <span className="serif text-[28px] text-[#B69A76]">04</span>
              <h3 className="serif text-[21px] text-[#302820] font-light">
                CONTINUED SKINCARE JOURNEY
              </h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                Encouraging consistent, considered skincare rituals and appropriate post-procedure follow-up to sustain lasting radiance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER INTRODUCTION */}
      <section className="py-20 md:py-28 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="image-wrap aspect-[4/5] overflow-hidden border border-[#302820]/10 shadow-xl bg-white">
                <img
                  src="/images/teo/team/sinead-founder.jpg"
                  alt="Sineád, Founder of Teò Luxury Skincare"
                  className="h-full w-full object-cover"
                />
                <div className="p-3 bg-[#F8F5F0] text-center text-[10px] text-[#82786D] tracking-wide border-t border-[#302820]/8">
                  Sineád • Founder & Lead Aesthetician (Representative portrait)
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 order-1 lg:order-2"
            >
              <span className="eyebrow text-[#B69A76]">THE FOUNDER</span>
              <h2 className="serif text-[38px] md:text-[52px] leading-[1.12] text-[#302820] font-light">
                Meet Sineád.
              </h2>
              <p className="text-[16px] md:text-[18px] leading-relaxed text-[#82786D] font-light">
                At the heart of Teò Luxury Skincare is a personal approach to skincare and client care. Discover the people behind the treatments and the philosophy that shapes every experience.
              </p>
              <p className="text-[14px] leading-relaxed text-[#82786D]">
                Sineád created Teò Luxury Skincare to offer clients in London an intimate, unhurried space where advanced aesthetic science meets soothing restorative care. Together with practitioner Tayla-Jade, the clinic is renowned for genuine care and radiant skin results.
              </p>
              <div className="pt-2">
                <Link
                  href="/team"
                  className="inline-flex items-center justify-center gap-3 bg-[#302820] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76]"
                >
                  <span>MEET OUR TEAM</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-[#EFE9E0]/50 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow text-[#B69A76]">CLIENT FEEDBACK</span>
              <h2 className="serif text-[36px] md:text-[48px] leading-[1.15] text-[#302820] font-light mt-1">
                Loved by Our Clients.
              </h2>
              <p className="text-[14px] text-[#82786D] mt-2">
                Authentic reviews from client experiences at Teò Luxury Skincare.
              </p>
            </div>
            <Link
              href="/reviews"
              className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase text-[#302820] underline-link shrink-0"
            >
              <span>READ ALL REVIEWS</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeReviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-7 border border-[#302820]/10 shadow-[0_2px_12px_rgba(48,40,32,0.03)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#B69A76]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="bg-[#EFE9E0] px-2 py-0.5 text-[10px] font-medium tracking-[0.1em] text-[#302820] uppercase">
                      {rev.treatment}
                    </span>
                  </div>

                  <p className="serif text-[16px] leading-relaxed text-[#302820] italic">
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
                  <div className="flex items-center gap-1 text-[11px] text-[#B69A76]">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GIFT CARD SECTION */}
      <section className="py-20 md:py-28 border-b border-[#302820]/8 bg-[#F8F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[#B69A76]">
                <Gift size={15} />
                <span>TEÒ GIFT EXPERIENCES</span>
              </div>
              <h2 className="serif text-[36px] md:text-[50px] leading-[1.12] text-[#302820] font-light">
                Give the Gift of Beautifully Considered Skincare.
              </h2>
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[#82786D] font-light">
                Share a little luxury with someone special. Discover Teò Luxury Skincare gift cards and give the gift of a personalised skincare experience.
              </p>

              {/* Denomination Selector */}
              <div className="pt-2">
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#82786D] mb-3">
                  Select Denomination:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {GIFT_CARD_DENOMINATIONS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedGiftAmount(amount)}
                      className={`px-4 py-2 text-[13px] font-medium transition-all duration-200 border ${
                        selectedGiftAmount === amount
                          ? 'border-[#302820] bg-[#302820] text-[#F8F5F0]'
                          : 'border-[#302820]/20 bg-white text-[#302820] hover:border-[#B69A76]'
                      }`}
                    >
                      £{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-[#302820] px-7 py-4 text-[12px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76] hover:shadow-md"
                >
                  <span>EXPLORE GIFT CARDS (£{selectedGiftAmount})</span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="image-wrap aspect-[4/3] overflow-hidden border border-[#302820]/10 shadow-xl bg-white">
                <img
                  src="/images/teo/gifting/luxury-gift-card.jpg"
                  alt="Teò Luxury Skincare gift voucher card presentation"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="py-20 md:py-28 bg-[#EFE9E0]/40 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow text-[#B69A76]">VISUAL JOURNEY</span>
              <h2 className="serif text-[36px] md:text-[48px] leading-[1.15] text-[#302820] font-light mt-1">
                Inside the Teò Experience.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase text-[#302820] underline-link shrink-0"
            >
              <span>VIEW OUR GALLERY</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group image-wrap aspect-square overflow-hidden bg-white border border-[#302820]/10 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#302820]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="serif text-[16px]">{item.title}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#B69A76]">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-3 border border-[#302820] px-8 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#302820] uppercase transition-all duration-300 hover:bg-[#302820] hover:text-[#F8F5F0]"
            >
              <span>VIEW OUR GALLERY</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LOCATION & HOURS SECTION */}
      <section className="py-20 md:py-28 border-b border-[#302820]/8 bg-[#F8F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="eyebrow text-[#B69A76]">VISIT US IN LONDON</span>
              <h2 className="serif text-[36px] md:text-[48px] leading-[1.12] text-[#302820] font-light">
                Find Your Way to Teò.
              </h2>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 text-[14px]">
                  <MapPin size={20} className="text-[#B69A76] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#302820]">{BUSINESS_ADDRESS.line1}</p>
                    <p className="text-[#82786D]">{BUSINESS_ADDRESS.line2}</p>
                    <p className="text-[#82786D]">{BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.postcode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-[14px]">
                  <Mail size={18} className="text-[#B69A76] shrink-0" />
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-[#302820] hover:text-[#B69A76] transition-colors underline-link">
                    {BUSINESS_EMAIL}
                  </a>
                </div>

                <div className="pt-4 border-t border-[#302820]/10">
                  <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-3">
                    <Clock size={15} className="text-[#B69A76]" />
                    <span>Clinic Hours</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-[13px] text-[#82786D]">
                    {OPENING_HOURS.map((slot) => (
                      <div key={slot.day} className="flex justify-between py-1 border-b border-[#302820]/5">
                        <span className="font-medium text-[#302820]">{slot.day}</span>
                        <span className={slot.status === 'closed' ? 'text-[#82786D]/60' : 'text-[#302820]'}>
                          {slot.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#302820] px-6 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76]"
                >
                  <span>RESERVE AN APPOINTMENT</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://maps.google.com/?q=Unit+7+The+Apprentice+Shop+Merton+Abbey+Mills+14+Watermill+Way+London+SW19+2RD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#302820]/30 px-6 py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#302820] uppercase transition-all duration-300 hover:border-[#302820]"
                >
                  <span>GET DIRECTIONS</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Map / Clinic Visual */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden border border-[#302820]/15 shadow-xl bg-[#EFE9E0]">
                {/* Embed OpenStreetMap / Directions iframe preview */}
                <iframe
                  title="Teò Luxury Skincare location at Merton Abbey Mills"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.659357416738!2d-0.1802934234032876!3d51.42767091653835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876063e5288a913%3A0xa6ebfeef2dfebf95!2sMerton%20Abbey%20Mills!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
