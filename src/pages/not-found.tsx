import { Link } from 'wouter';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-[#F8F5F0] px-5 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="eyebrow text-[#B69A76]">TEÒ LUXURY SKINCARE</span>
        <h1 className="serif text-[42px] leading-tight text-[#302820] font-light">
          Page Not Found
        </h1>
        <p className="text-[14px] text-[#82786D] leading-relaxed">
          The page you are looking for may have moved or is no longer available.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#302820] text-[#F8F5F0] px-7 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-[#B69A76] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
