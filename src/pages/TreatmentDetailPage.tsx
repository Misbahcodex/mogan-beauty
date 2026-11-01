import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowRight, CheckCircle2, Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TREATMENTS, BOOKING_URL, Treatment } from '@/data/teo-data';

export function TreatmentDetailPage() {
  const params = useParams<{ slug: string }>();
  const treatment = TREATMENTS.find((t) => t.slug === params.slug);

  if (!treatment) {
    return (
      <div className="bg-[#F8F5F0] min-h-[60vh] flex flex-col items-center justify-center px-5 text-center py-20">
        <h1 className="serif text-[36px] text-[#302820]">Treatment Not Found</h1>
        <p className="text-[14px] text-[#82786D] mt-2 mb-6">
          The requested skincare protocol could not be found.
        </p>
        <Link
          href="/treatments"
          className="inline-flex items-center gap-2 bg-[#302820] text-[#F8F5F0] px-6 py-3 text-[11px] font-medium tracking-[0.14em] uppercase"
        >
          <ArrowLeft size={14} />
          <span>Back to All Treatments</span>
        </Link>
      </div>
    );
  }

  // Find related treatments
  const relatedTreatments = treatment.relatedSlugs
    .map((slug) => TREATMENTS.find((t) => t.slug === slug))
    .filter(Boolean) as Treatment[];

  return (
    <div className="bg-[#F8F5F0] text-[#302820]">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#302820]/8 bg-white py-3.5">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 flex items-center gap-2 text-[12px] text-[#82786D]">
          <Link href="/" className="hover:text-[#302820]">Home</Link>
          <span>/</span>
          <Link href="/treatments" className="hover:text-[#302820]">Treatments</Link>
          <span>/</span>
          <span className="text-[#302820] font-medium truncate">{treatment.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 border-b border-[#302820]/8 bg-[#EFE9E0]/40">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-block bg-[#F8F5F0] px-3 py-1 border border-[#302820]/10 text-[11px] font-medium tracking-[0.16em] uppercase text-[#B69A76]">
                {treatment.category}
              </div>

              <h1 className="serif text-[40px] sm:text-[52px] md:text-[62px] leading-[1.08] text-[#302820] font-light">
                {treatment.name}
              </h1>

              <p className="text-[16px] md:text-[18px] text-[#82786D] leading-relaxed font-light">
                {treatment.shortDescription}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={treatment.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-[#302820] px-8 py-4 text-[12px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76] hover:shadow-lg"
                >
                  <span>BOOK THIS TREATMENT</span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <Link
                  href="/treatments"
                  className="inline-flex items-center justify-center gap-2 border border-[#302820]/30 px-6 py-4 text-[12px] font-medium tracking-[0.14em] text-[#302820] uppercase transition-all duration-300 hover:border-[#302820]"
                >
                  <ArrowLeft size={14} />
                  <span>VIEW ALL TREATMENTS</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Treatment Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="image-wrap aspect-[4/3] sm:aspect-[4/5] overflow-hidden border border-[#302820]/15 shadow-2xl bg-white">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview & What to Expect */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content Column */}
            <div className="lg:col-span-7 space-y-14">
              {/* Treatment Overview */}
              <div className="space-y-4">
                <span className="eyebrow text-[#B69A76]">CLINICAL FOCUS</span>
                <h2 className="serif text-[32px] md:text-[42px] leading-[1.15] text-[#302820] font-light">
                  Treatment Overview
                </h2>
                <div className="fine-rule my-4" />
                <p className="text-[16px] leading-relaxed text-[#82786D] font-light">
                  {treatment.overview}
                </p>
              </div>

              {/* What to Expect */}
              <div className="space-y-6">
                <span className="eyebrow text-[#B69A76]">THE PROTOCOL</span>
                <h2 className="serif text-[32px] md:text-[42px] leading-[1.15] text-[#302820] font-light">
                  What to Expect
                </h2>
                <div className="fine-rule my-4" />
                <div className="space-y-4">
                  {treatment.whatToExpect.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white border border-[#302820]/10 flex items-start gap-4 shadow-sm"
                    >
                      <span className="serif text-[22px] text-[#B69A76] font-medium shrink-0 w-6">
                        0{idx + 1}
                      </span>
                      <p className="text-[14px] text-[#302820] leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Policy */}
              <div className="p-8 bg-[#EFE9E0]/60 border border-[#302820]/10 space-y-3">
                <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase text-[#302820]">
                  <HeartHandshake size={18} className="text-[#B69A76]" />
                  <span>Personalised Care & Consultation</span>
                </div>
                <p className="text-[14px] text-[#82786D] leading-relaxed">
                  {treatment.consultationInfo}
                </p>
              </div>
            </div>

            {/* Sidebar Sticky Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-white p-8 border border-[#302820]/10 shadow-lg space-y-6">
                <div className="border-b border-[#302820]/10 pb-4">
                  <span className="eyebrow text-[#B69A76]">EXPERIENCE</span>
                  <h3 className="serif text-[26px] text-[#302820] font-light mt-1">
                    Book {treatment.name}
                  </h3>
                  <p className="text-[13px] text-[#82786D] mt-1">
                    At Merton Abbey Mills, London
                  </p>
                </div>

                <div className="space-y-3 text-[13px] text-[#82786D]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B69A76] shrink-0 mt-0.5" />
                    <span>Personalized skin evaluation at every appointment</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B69A76] shrink-0 mt-0.5" />
                    <span>Tailored active ingredients suited to skin barrier tolerance</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#B69A76] shrink-0 mt-0.5" />
                    <span>Post-treatment recovery and home care recommendations</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={treatment.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#302820] py-4 text-[12px] font-medium tracking-[0.16em] text-[#F8F5F0] uppercase transition-all duration-300 hover:bg-[#B69A76]"
                  >
                    <span>RESERVE APPOINTMENT</span>
                    <ArrowUpRight size={15} />
                  </a>
                  <p className="text-center text-[11px] text-[#82786D] mt-3">
                    Instant live booking powered by book.app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments Section */}
      {relatedTreatments.length > 0 && (
        <section className="py-20 border-t border-[#302820]/10 bg-[#EFE9E0]/40">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="eyebrow text-[#B69A76]">COMPLEMENTARY PROTOCOLS</span>
                <h2 className="serif text-[32px] md:text-[42px] leading-[1.15] text-[#302820] font-light mt-1">
                  You May Also Consider
                </h2>
              </div>
              <Link
                href="/treatments"
                className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#302820] underline-link hidden md:inline-block"
              >
                VIEW FULL MENU
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTreatments.map((related) => (
                <div
                  key={related.id}
                  className="bg-white border border-[#302820]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="image-wrap aspect-[16/11] overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <h4 className="serif text-[22px] text-[#302820] font-light">{related.name}</h4>
                      <p className="text-[13px] text-[#82786D] leading-relaxed line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex justify-between items-center text-[11px] font-medium tracking-[0.12em] uppercase">
                    <Link href={`/treatments/${related.slug}`} className="text-[#302820] underline-link">
                      EXPLORE
                    </Link>
                    <a
                      href={related.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B69A76] hover:text-[#302820] flex items-center gap-1"
                    >
                      <span>BOOK</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
