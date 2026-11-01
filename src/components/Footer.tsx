import { Link } from 'wouter';
import { ArrowUpRight, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';
import { BOOKING_URL, BUSINESS_EMAIL, BUSINESS_ADDRESS, OPENING_HOURS } from '@/data/teo-data';

export function Footer() {
  return (
    <footer className="bg-[#302820] text-[#EFE9E0] pt-16 pb-12 border-t border-[#B69A76]/20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 pb-16 border-b border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="serif text-[28px] tracking-[0.14em] text-[#F8F5F0]">TEÒ</span>
              <span className="block eyebrow text-[10px] tracking-[0.3em] text-[#B69A76] -mt-1">
                LUXURY SKINCARE
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-[#EFE9E0]/70 max-w-sm">
              A boutique skincare and aesthetics sanctuary in London. Personalized facials, restorative protocols, and clinical aesthetic treatments tailored around your skin.
            </p>
            <div className="pt-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[#B69A76] hover:text-white transition-colors"
              >
                <span>RESERVE AN APPOINTMENT</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B69A76]">
              Explore
            </h4>
            <ul className="space-y-2 text-[13px] text-[#EFE9E0]/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Our Clinic</Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-white transition-colors">All Treatments</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">Meet Sineád & Team</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">Client Reviews</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Treatment Categories */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B69A76]">
              Signature Services
            </h4>
            <ul className="space-y-2 text-[13px] text-[#EFE9E0]/80">
              <li>
                <Link href="/treatments/teo-signature-facials" className="hover:text-white transition-colors">Teò Signature Facials</Link>
              </li>
              <li>
                <Link href="/treatments/korean-facials" className="hover:text-white transition-colors">Korean Facials</Link>
              </li>
              <li>
                <Link href="/treatments/microneedling" className="hover:text-white transition-colors">Microneedling & Exosomes</Link>
              </li>
              <li>
                <Link href="/treatments/biorepeel-tca-peel" className="hover:text-white transition-colors">BioRePeel (TCA Peel)</Link>
              </li>
              <li>
                <Link href="/treatments/hydrofacial" className="hover:text-white transition-colors">HydroFacial Vortex Therapy</Link>
              </li>
              <li>
                <Link href="/treatments/dermaplaning" className="hover:text-white transition-colors">Dermaplaning</Link>
              </li>
              <li>
                <Link href="/treatments/bestie-bundle" className="hover:text-white transition-colors">The Bestie Bundle</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B69A76]">
              Visit Our Clinic
            </h4>
            <div className="flex items-start gap-2.5 text-[13px] text-[#EFE9E0]/80 leading-snug">
              <MapPin size={16} className="text-[#B69A76] shrink-0 mt-0.5" />
              <div>
                <p>{BUSINESS_ADDRESS.line1}</p>
                <p>{BUSINESS_ADDRESS.line2}</p>
                <p>{BUSINESS_ADDRESS.city}, {BUSINESS_ADDRESS.postcode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[13px] text-[#EFE9E0]/80 pt-1">
              <Mail size={16} className="text-[#B69A76] shrink-0" />
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition-colors">
                {BUSINESS_EMAIL}
              </a>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#B69A76] mb-1">
                <Clock size={13} />
                <span>Opening Hours</span>
              </div>
              <div className="text-[12px] text-[#EFE9E0]/60 space-y-0.5">
                <p>Mon & Fri: 9:30 AM – 5:00 PM</p>
                <p>Tue: 7:00 PM – 9:00 PM</p>
                <p>Thu: 12:00 PM – 9:00 PM</p>
                <p>Sat: 10:00 AM – 6:00 PM</p>
                <p className="text-[#EFE9E0]/40">Wed & Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#EFE9E0]/50">
          <p>© {new Date().getFullYear()} TEÒ LUXURY SKINCARE. All rights reserved.</p>
          <div className="flex items-center gap-2 text-center md:text-right">
            <ShieldCheck size={14} className="text-[#B69A76]" />
            <span>Speculative Client Acquisition Demo • Booking platform verified at teoluxuryskincare.book.app</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
