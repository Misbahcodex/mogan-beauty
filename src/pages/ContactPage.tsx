import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, ArrowUpRight, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { BOOKING_URL, BUSINESS_EMAIL, BUSINESS_ADDRESS, OPENING_HOURS } from '@/data/teo-data';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

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
            <span className="eyebrow text-[#B69A76]">CONNECT & VISIT</span>
            <h1 className="serif text-[42px] md:text-[60px] leading-[1.08] text-[#302820] font-light">
              Visit or <span className="italic font-normal text-[#B69A76]">Connect With Us.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#82786D] leading-relaxed font-light">
              We look forward to welcoming you to our clinic in Merton Abbey Mills, London. For direct appointment bookings, please use our online schedule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Contact Details & Hours */}
            <div className="lg:col-span-5 space-y-8">
              {/* Address Card */}
              <div className="bg-white p-8 border border-[#302820]/10 shadow-sm space-y-4">
                <span className="eyebrow text-[#B69A76]">CLINIC LOCATION</span>
                <div className="flex items-start gap-3.5">
                  <MapPin size={22} className="text-[#B69A76] shrink-0 mt-1" />
                  <div className="space-y-1 text-[14px]">
                    <h3 className="serif text-[22px] text-[#302820] font-light">Teò Luxury Skincare</h3>
                    <p className="text-[#302820]">{BUSINESS_ADDRESS.line1}</p>
                    <p className="text-[#82786D]">{BUSINESS_ADDRESS.line2}</p>
                    <p className="text-[#82786D]">{BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.postcode}</p>
                    <p className="text-[#82786D]">{BUSINESS_ADDRESS.country}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Unit+7+The+Apprentice+Shop+Merton+Abbey+Mills+14+Watermill+Way+London+SW19+2RD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] underline-link"
                  >
                    <span>OPEN IN GOOGLE MAPS</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Direct Inquiries */}
              <div className="bg-white p-8 border border-[#302820]/10 shadow-sm space-y-4">
                <span className="eyebrow text-[#B69A76]">DIRECT INQUIRIES</span>
                <div className="flex items-center gap-3.5">
                  <Mail size={20} className="text-[#B69A76] shrink-0" />
                  <div>
                    <p className="text-[11px] text-[#82786D] uppercase tracking-wider">Email Address</p>
                    <a
                      href={`mailto:${BUSINESS_EMAIL}`}
                      className="text-[15px] font-medium text-[#302820] hover:text-[#B69A76] transition-colors"
                    >
                      {BUSINESS_EMAIL}
                    </a>
                  </div>
                </div>
                <p className="text-[12px] text-[#82786D] leading-relaxed pt-1">
                  For corporate gifting, press inquiries, or detailed skin consultation questions, feel free to email our team directly.
                </p>
              </div>

              {/* Opening Hours Schedule */}
              <div className="bg-white p-8 border border-[#302820]/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#B69A76]">OPENING SCHEDULE</span>
                  <Clock size={16} className="text-[#B69A76]" />
                </div>
                <div className="divide-y divide-[#302820]/8 text-[13px]">
                  {OPENING_HOURS.map((slot) => (
                    <div key={slot.day} className="flex justify-between py-2.5">
                      <span className="font-medium text-[#302820]">{slot.day}</span>
                      <span className={slot.status === 'closed' ? 'text-[#82786D]/60 italic' : 'text-[#302820]'}>
                        {slot.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Booking Banner */}
              <div className="p-8 bg-[#302820] text-[#F8F5F0] space-y-3 shadow-md">
                <h4 className="serif text-[22px] font-light">Looking to book an appointment?</h4>
                <p className="text-[13px] text-[#EFE9E0]/70">
                  Our live appointment slots are managed directly via our official booking schedule.
                </p>
                <div className="pt-2">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#B69A76] px-6 py-3 text-[11px] font-medium tracking-[0.16em] uppercase text-white hover:bg-[#A38763] transition-colors"
                  >
                    <span>BOOK YOUR TREATMENT</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Inquiry Form & Map */}
            <div className="lg:col-span-7 space-y-8">
              {/* Form Container */}
              <div className="bg-white p-8 md:p-10 border border-[#302820]/10 shadow-md">
                <span className="eyebrow text-[#B69A76]">SEND AN INQUIRY</span>
                <h3 className="serif text-[28px] md:text-[36px] text-[#302820] font-light mt-1 mb-6">
                  How Can We Help Your Skin?
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-[#EFE9E0]/60 border border-[#B69A76]/40 text-center space-y-4"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#302820] text-[#B69A76] mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="serif text-[24px] text-[#302820]">Thank You for Reaching Out</h4>
                    <p className="text-[14px] text-[#82786D] max-w-md mx-auto leading-relaxed">
                      Your inquiry message has been received. Our team will review your notes and respond via email at {formData.email}.
                    </p>
                    <p className="text-[12px] text-[#82786D]">
                      To reserve an immediate appointment date, please use our{' '}
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-[#302820] font-medium underline">
                        official booking calendar
                      </a>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2 border border-[#302820] text-[11px] uppercase tracking-[0.14em] text-[#302820]"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#302820]/15 text-[14px] focus:outline-none focus:border-[#302820]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. eleanor@example.com"
                          className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#302820]/15 text-[14px] focus:outline-none focus:border-[#302820]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-2">
                          Telephone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +44 7123 456789"
                          className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#302820]/15 text-[14px] focus:outline-none focus:border-[#302820]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-2">
                          Treatment Interest
                        </label>
                        <select
                          value={formData.concern}
                          onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#302820]/15 text-[14px] focus:outline-none focus:border-[#302820]"
                        >
                          <option value="">Select a treatment...</option>
                          <option value="Signature Facials">Teò Signature Facials</option>
                          <option value="Korean Facials">Korean Facials</option>
                          <option value="Microneedling">Microneedling & Exosomes</option>
                          <option value="BioRePeel">BioRePeel (TCA Peel)</option>
                          <option value="HydroFacial">HydroFacial</option>
                          <option value="Dermaplaning">Dermaplaning</option>
                          <option value="Skin Boosters">Skin Boosters / Polynucleotides</option>
                          <option value="Bestie Bundle">The Bestie Bundle</option>
                          <option value="General Consultation">General Consultation Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] mb-2">
                        Your Message or Skin Concerns *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share any skin goals, current routine, or specific inquiries..."
                        className="w-full px-4 py-3 bg-[#F8F5F0] border border-[#302820]/15 text-[14px] focus:outline-none focus:border-[#302820]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#302820] px-8 py-4 text-[12px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76]"
                      >
                        <Send size={14} />
                        <span>SEND INQUIRY</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Embedded Map Section */}
              <div className="bg-white border border-[#302820]/10 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#302820]/8 flex items-center justify-between">
                  <span className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#302820]">
                    Interactive Map: Merton Abbey Mills
                  </span>
                  <a
                    href="https://maps.google.com/?q=Unit+7+The+Apprentice+Shop+Merton+Abbey+Mills+14+Watermill+Way+London+SW19+2RD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#B69A76] hover:text-[#302820] flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="aspect-[16/9] w-full bg-[#EFE9E0]">
                  <iframe
                    title="Teò Luxury Skincare clinic map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.659357416738!2d-0.1802934234032876!3d51.42767091653835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876063e5288a913%3A0xa6ebfeef2dfebf95!2sMerton%20Abbey%20Mills!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="contrast-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
