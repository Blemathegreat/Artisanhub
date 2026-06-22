import AnimatedButton from "./AnimatedButton";

export default function ArtisanCTABanner() {
  return (
    <div className="w-full px-6 lg:px-10 py-5">
      <div className="bg-[#1B3A2D] rounded-2xl px-6 lg:px-10 py-6 md:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* ── Icon + Text row (always a row) ── */}
        <div className="flex items-start lg:items-center gap-4 w-full">
          {/* Icon — fixed small size, never grows */}
          <div className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] lg:w-[72px] lg:h-[72px] flex-shrink-0 bg-[#D4A017] rounded-xl flex items-center justify-center">
            <svg width="28" height="28" className="lg:w-[38px] lg:h-[38px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="3.5" stroke="#1B3A2D" strokeWidth="2" />
              <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#1B3A2D" strokeWidth="2" strokeLinecap="round" />
              <path d="M15.5 10.5l1.5 1.5" stroke="#1B3A2D" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M17 12l2-2" stroke="#1B3A2D" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="17.5" cy="9.5" r="1" fill="#1B3A2D" />
            </svg>
          </div>

          {/* Text — fills all remaining width */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-[15px] mb-1">
              Are you a skilled artisan?
            </p>
            <p className="text-[#8DB8A0] text-[14px] lg:text-[15.5px] leading-relaxed">
              Join thousands of artisans already growing their{" "}
              <br className="hidden sm:block lg:hidden" />
              business on ArtisanHub.
            </p>
          </div>
        </div>

        {/* CTA Button:
            - mobile/tablet: full-width, inside the card, below the text row
            - desktop (lg+): inline beside text, original behaviour */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <AnimatedButton className="w-full lg:w-auto">
            Join as Artisan
          </AnimatedButton>
        </div>

      </div>
    </div>
  );
}