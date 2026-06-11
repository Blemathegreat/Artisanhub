export default function ArtisanCTABanner() {
  return (
    <div className="bg-[#1B3A2D] w-[90%] mx-auto  rounded-2xl px-7  py-5 flex items-center justify-between gap-5 ">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-[52px] h-[52px] flex-shrink-0 bg-[#D4A017] rounded-xl flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="3.5" stroke="#1B3A2D" strokeWidth="2" />
            <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#1B3A2D" strokeWidth="2" strokeLinecap="round" />
            <path d="M15.5 10.5l1.5 1.5" stroke="#1B3A2D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 12l2-2" stroke="#1B3A2D" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="17.5" cy="9.5" r="1" fill="#1B3A2D" />
          </svg>
        </div>

        {/* Text */}
        <div>
          <p className="text-white font-semibold text-[15px] mb-1">
            Are you a skilled artisan?
          </p>
          <p className="text-[#8DB8A0] text-[12.5px] leading-relaxed">
            Join thousands of artisans already growing their <br className="hidden sm:block" />
            business on ArtisanHub.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button className="flex-shrink-0 bg-[#D4A017] text-[#1B3A2D] font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center gap-1.5 hover:bg-[#BF8F12] transition-colors">
        Join as Artisan <span>→</span>
      </button>
    </div>
  );
}