import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles, HeartHandshake, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TEAM, BOOKING_URL } from '@/data/teo-data';

export function TeamPage() {
  return (
    <div className="bg-[#F8F5F0] text-[#302820]">
      {/* Header Banner */}
      <section className="py-16 md:py-24 border-b border-[#302820]/8 bg-[#EFE9E0]/40">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <span className="eyebrow text-[#B69A76]">OUR PRACTITIONERS</span>
            <h1 className="serif text-[42px] md:text-[60px] leading-[1.08] text-[#302820] font-light">
              The Hands Behind <span className="italic font-normal text-[#B69A76]">Your Care.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#82786D] leading-relaxed font-light">
              At the heart of Teò Luxury Skincare is a personal commitment to tailored client care, clinical hygiene, and a soothing sanctuary experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white border border-[#302820]/10 shadow-lg overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="image-wrap aspect-[4/5] overflow-hidden bg-[#EFE9E0]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#F8F5F0]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-medium tracking-[0.12em] uppercase text-[#302820]">
                      Representative Portrait Placeholder
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div>
                      <h2 className="serif text-[30px] text-[#302820] font-light">{member.name}</h2>
                      <p className="eyebrow text-[#B69A76] text-[11px] mt-1">{member.role}</p>
                    </div>

                    <div className="fine-rule my-3" />

                    <p className="text-[14px] leading-relaxed text-[#82786D] font-light">
                      {member.bio}
                    </p>

                    <div className="pt-3">
                      <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#302820] mb-2.5">
                        Key Areas of Focus:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.treatmentsFocus.map((item) => (
                          <span
                            key={item}
                            className="bg-[#EFE9E0] px-3 py-1 text-[11px] text-[#302820] font-medium tracking-wide"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#302820] py-3.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76]"
                  >
                    <span>BOOK WITH {member.name.toUpperCase()}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Client Presentation Note */}
          <div className="max-w-2xl mx-auto mt-16 p-6 bg-[#EFE9E0]/50 border border-[#302820]/10 flex items-start gap-4">
            <ShieldAlert size={20} className="text-[#B69A76] shrink-0 mt-0.5" />
            <div className="text-[12px] text-[#82786D] space-y-1">
              <p className="font-medium text-[#302820]">Authentic Team Representation Note</p>
              <p>
                In alignment with client demo best practices, photography shown above is representative neutral clinic imagery until authentic approved portraits and expanded biographies are provided by the business owner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="py-16 md:py-24 bg-[#302820] text-[#F8F5F0]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 text-center space-y-5">
          <span className="eyebrow text-[#B69A76]">BOOK YOUR EXPERIENCE</span>
          <h2 className="serif text-[36px] md:text-[50px] font-light max-w-2xl mx-auto leading-tight">
            Reserve Your Treatment in Merton Abbey Mills
          </h2>
          <div className="pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B69A76] px-8 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-white hover:bg-[#A38763] transition-colors shadow-lg"
            >
              <span>EXPLORE CLINIC AVAILABILITY</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
