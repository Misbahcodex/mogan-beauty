import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles, MapPin, Heart, Shield } from 'lucide-react';
import { BOOKING_URL, TEAM } from '@/data/teo-data';

export function AboutPage() {
  return (
    <div className="bg-[#F8F5F0] text-[#302820]">
      {/* Editorial Hero: The Teò Philosophy */}
      <section className="py-16 md:py-24 lg:py-28 border-b border-[#302820]/8 bg-[#EFE9E0]/40">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-[#B69A76]/40 bg-white px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] text-[#302820] uppercase">
              <Sparkles size={13} className="text-[#B69A76]" />
              <span>THE TEÒ PHILOSOPHY</span>
            </div>

            <h1 className="serif text-[42px] sm:text-[56px] md:text-[70px] leading-[1.08] text-[#302820] font-light">
              Considered Care for <span className="italic font-normal text-[#B69A76]">Radiant Skin.</span>
            </h1>

            <p className="text-[17px] md:text-[20px] text-[#82786D] leading-relaxed font-light max-w-2xl">
              A boutique skincare sanctuary founded on the belief that healthy, glowing skin comes from personal attention, honest guidance, and thoughtful treatments tailored specifically to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Introduction & Story */}
      <section className="py-20 md:py-28 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow text-[#B69A76]">OUR SANCTUARY</span>
              <h2 className="serif text-[36px] md:text-[48px] leading-[1.12] text-[#302820] font-light">
                A More Thoughtful Way to Care for Your Skin.
              </h2>
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[#82786D] font-light">
                Located within the historic and tranquil setting of Merton Abbey Mills in London, Teò Luxury Skincare was created to provide a calm escape from fast-paced beauty salons.
              </p>
              <p className="text-[14px] leading-relaxed text-[#82786D]">
                Here, appointments are never rushed. Every facial and aesthetic treatment begins with a careful listening process, ensuring that your skin barrier is respected and your personal comfort is prioritized.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="image-wrap aspect-[4/3] overflow-hidden border border-[#302820]/10 shadow-xl bg-white">
                <img
                  src="/images/teo/clinic/clinic-interior.jpg"
                  alt="Teò Luxury Skincare boutique aesthetic clinic interior"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalised Skincare Approach */}
      <section className="py-20 md:py-28 bg-[#EFE9E0]/50 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-[#B69A76]">OUR PRINCIPLES</span>
            <h2 className="serif text-[36px] md:text-[48px] leading-[1.15] text-[#302820] font-light">
              Our Personalised Approach
            </h2>
            <p className="text-[15px] text-[#82786D] font-light">
              Guided by skin physiology and mindful attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-[#302820]/10 shadow-sm space-y-4">
              <span className="serif text-[26px] text-[#B69A76]">01</span>
              <h3 className="serif text-[22px] text-[#302820] font-light">Attentive Consultation</h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                We assess your barrier function, hydration levels, lifestyle factors, and skin sensitivities before selecting every active ingredient.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#302820]/10 shadow-sm space-y-4">
              <span className="serif text-[26px] text-[#B69A76]">02</span>
              <h3 className="serif text-[22px] text-[#302820] font-light">Refined Techniques</h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                From advanced BioRePeel formulations and microneedling to gentle Korean facial massages, each step is executed with precision and care.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#302820]/10 shadow-sm space-y-4">
              <span className="serif text-[26px] text-[#B69A76]">03</span>
              <h3 className="serif text-[22px] text-[#302820] font-light">Realistic Home Rituals</h3>
              <p className="text-[13px] leading-relaxed text-[#82786D]">
                We provide honest, sustainable aftercare recommendations so you can confidently maintain healthy, radiant skin between clinic visits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Team Introduction */}
      <section className="py-20 md:py-28 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-[#B69A76]">THE FACES OF TEÒ</span>
            <h2 className="serif text-[36px] md:text-[48px] leading-[1.15] text-[#302820] font-light">
              Meet Sineád & The Team
            </h2>
            <p className="text-[15px] text-[#82786D] font-light">
              Discover the dedicated practitioners shaping every bespoke treatment experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#302820]/10 shadow-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="image-wrap aspect-[4/5] overflow-hidden bg-[#EFE9E0]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-7 space-y-3">
                    <div>
                      <h3 className="serif text-[26px] text-[#302820] font-light">{member.name}</h3>
                      <p className="eyebrow text-[#B69A76] text-[10px] mt-0.5">{member.role}</p>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#82786D]">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-7 pt-0 border-t border-[#302820]/8 mt-2">
                  <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-2">
                    Treatment Focus:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.treatmentsFocus.map((foc) => (
                      <span key={foc} className="bg-[#EFE9E0] px-2.5 py-1 text-[10px] text-[#302820]">
                        {foc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-[#82786D] mt-8">
            *Representative practitioner photography shown for client demo presentation.
          </p>
        </div>
      </section>

      {/* The Merton Abbey Mills Clinic Experience */}
      <section className="py-20 md:py-28 bg-[#EFE9E0]/40 border-b border-[#302820]/8">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow text-[#B69A76]">THE SETTING</span>
              <h2 className="serif text-[36px] md:text-[48px] leading-[1.12] text-[#302820] font-light">
                The Merton Abbey Mills Experience
              </h2>
              <p className="text-[15px] leading-relaxed text-[#82786D] font-light">
                Nestled on Watermill Way along the River Wandle, Merton Abbey Mills provides a charming, heritage-rich backdrop for our clinic.
              </p>
              <p className="text-[14px] leading-relaxed text-[#82786D]">
                Step inside our private treatment suite, where soft ambient lighting, muted champagne neutrals, and comforting textures create an immediate sense of stillness. Here, your appointment is an opportunity to pause, exhale, and emerge revitalized.
              </p>
              <div className="pt-2 flex items-center gap-3 text-[13px] text-[#302820]">
                <MapPin size={16} className="text-[#B69A76]" />
                <span>Unit 7 The Apprentice Shop, 14 Watermill Way, London SW19 2RD</span>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="image-wrap aspect-square overflow-hidden border border-[#302820]/10 shadow-sm">
                <img
                  src="/images/teo/clinic/treatment-room.jpg"
                  alt="Teò Luxury Skincare treatment bed and soft towels"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="image-wrap aspect-square overflow-hidden border border-[#302820]/10 shadow-sm">
                <img
                  src="/images/teo/clinic/consultation-area.jpg"
                  alt="Teò Luxury Skincare consultation setting"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="py-16 md:py-24 bg-[#302820] text-[#F8F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 text-center space-y-6">
          <span className="eyebrow text-[#B69A76]">RESERVE YOUR APPOINTMENT</span>
          <h2 className="serif text-[38px] md:text-[54px] font-light max-w-2xl mx-auto leading-tight">
            Ready to Begin Your Skincare Journey?
          </h2>
          <p className="text-[15px] text-[#EFE9E0]/70 max-w-xl mx-auto">
            Explore live treatment dates and times directly through our official booking schedule.
          </p>
          <div className="pt-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B69A76] px-8 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-white hover:bg-[#A38763] transition-colors shadow-lg"
            >
              <span>BOOK YOUR EXPERIENCE</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
