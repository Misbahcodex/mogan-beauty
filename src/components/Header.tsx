import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { BOOKING_URL } from '@/data/teo-data';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Treatments', href: '/treatments' },
    { label: 'Our Team', href: '/team' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(48,40,32,0.06)] border-b border-[#302820]/10 py-3'
            : 'bg-[#F8F5F0]/80 backdrop-blur-sm border-b border-[#302820]/8 py-4 md:py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#302820] transition-colors hover:text-[#B69A76] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>

          {/* Desktop Left Nav Links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.slice(0, 4).map((link) => {
              const active = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                    active ? 'text-[#B69A76] font-semibold' : 'text-[#302820]/80 hover:text-[#B69A76]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Brand Logo (Center) */}
          <Link href="/" className="group flex flex-col items-center text-center">
            <span className="serif text-[26px] md:text-[30px] font-light tracking-[0.12em] text-[#302820] transition-opacity group-hover:opacity-85">
              TEÒ
            </span>
            <span className="eyebrow -mt-1 text-[9px] tracking-[0.28em] text-[#82786D] group-hover:text-[#B69A76] transition-colors">
              LUXURY SKINCARE
            </span>
          </Link>

          {/* Desktop Right Nav Links & Booking CTA */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.slice(4).map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[12px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                      active ? 'text-[#B69A76] font-semibold' : 'text-[#302820]/80 hover:text-[#B69A76]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Primary Booking Button */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-[#302820] px-4 py-2.5 text-[11px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76] hover:shadow-md md:px-5 md:py-2.5"
            >
              <span>BOOK YOUR TREATMENT</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-[#302820]/15 bg-[#F8F5F0] px-6 py-8 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-5 text-center">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-[15px] font-medium tracking-[0.18em] uppercase transition-colors ${
                      active ? 'text-[#B69A76]' : 'text-[#302820] hover:text-[#B69A76]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="fine-rule my-2" />
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#302820] py-3 text-[12px] font-medium tracking-[0.18em] text-[#F8F5F0] uppercase transition-colors hover:bg-[#B69A76]"
              >
                <span>BOOK YOUR TREATMENT</span>
                <ArrowUpRight size={15} />
              </a>
              <div className="mt-2 text-[11px] text-[#82786D]">
                Merton Abbey Mills, London • SW19 2RD
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
