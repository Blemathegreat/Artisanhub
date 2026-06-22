import React, { useState } from "react";
import { photos } from "../assets/Photos.js";
import { Search, MapPin, ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("Current Location");

  const locations = [
    "Current Location",
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const childrenVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── MOBILE IMAGE — flows in the document, above the content ── */}
      <div className="lg:hidden relative w-full h-[52vw] min-h-[260px] max-h-[420px]">
        <img
          src={photos.hero}
          alt="Artisan"
          className="w-full h-full object-cover object-top"
        />
        {/* Fades the bottom of the image into the white content below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

        {/* Compact trust badge — mobile only, overlaid on image bottom */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3
                        bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md">
          <div className="flex -space-x-2 shrink-0">
            <img src={photos.barber}  alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
            <img src={photos.barber1} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
            <img src={photos.barber}  alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
          </div>
          <div className="flex items-center gap-1.5 bg-yellow-400 text-white text-xs
                          font-semibold px-2.5 py-1 rounded-full shrink-0">
            <Star size={11} fill="white" />
            <span>4.8</span>
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 font-semibold text-xs truncate">Trusted by 2,500+ customers</p>
            <p className="text-gray-400 text-[10px]">across Ibadan and beyond</p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP IMAGE — absolutely positioned, hidden on mobile ── */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-[60%]">
        <img
          src={photos.hero}
          alt="Artisan"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-y-0 left-0 w-[420px] bg-gradient-to-r from-white via-white/95 to-transparent" />

        {/* Floating trust card — desktop only */}
        <div className="absolute bottom-20 left-[40%] bg-white rounded-2xl shadow-xl px-5 py-4 w-[360px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-1">
              <img src={photos.barber}  alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
              <img src={photos.barber1} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
              <img src={photos.barber}  alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
            </div>
            <div className="flex items-center gap-1 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full">
              <Star size={14} fill="white" />
              <span>4.8</span>
            </div>
          </div>
          <p className="text-gray-900 font-bold text-sm">Trusted by 2,500+ customers</p>
          <p className="text-gray-400 text-xs mt-1">across Ibadan and beyond</p>
        </div>
      </div>

      {/* ── CONTENT — this div defines the section height on desktop ── */}
      <div className="relative z-10 w-full lg:w-[45%] lg:min-h-screen
                      flex flex-col justify-center
                      px-5 sm:px-8 lg:px-20
                      pt-2 pb-12 lg:py-24">

        {/* Badge */}
        <span className="inline-flex self-start items-center border border-green-200 bg-green-50
                         text-green-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2
                         rounded-full mb-5 sm:mb-8">
          Find trusted artisans near you
        </span>

        {/* Heading — scales across all breakpoints */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[56px]
                     leading-[1.1] font-bold text-gray-900 tracking-tight"
        >
          <motion.span variants={childrenVariant} className="block">Skilled hands.</motion.span>
          <motion.span variants={childrenVariant} className="block">Trusted service.</motion.span>
          <motion.span variants={childrenVariant} className="block text-green-700">Right around you.</motion.span>
        </motion.h1>

        {/* Description */}
        <p className="mt-4 sm:mt-6 max-w-md text-gray-500 text-sm sm:text-base leading-6 sm:leading-7">
          Find reliable and verified local artisans for your home and personal needs.
          Fast, easy and secure.
        </p>

        {/* ── SEARCH CARD ── */}
        <div className="mt-7 sm:mt-10 max-w-[620px] bg-white border border-gray-100
                        shadow-lg rounded-xl p-4 sm:px-5 sm:py-3
                        flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">

          {/* Search input */}
          <div className="flex items-center gap-3 flex-1
                          border-b sm:border-b-0 pb-3 sm:pb-0">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service do you need?"
              className="w-full outline-none text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Divider — desktop only */}
          <div className="hidden sm:block w-px h-8 bg-gray-200 mx-4 shrink-0" />

          {/* Location selector */}
          <div
            className="relative flex items-center gap-2 cursor-pointer
                       border-b sm:border-b-0 pb-3 sm:pb-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <p className="text-sm text-gray-600 whitespace-nowrap flex-1">{location}</p>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
            />

            {isOpen && (
              <div className="absolute top-10 left-0 w-48 bg-white border border-gray-100
                              rounded-lg shadow-lg z-20">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={(e) => {
                      e.stopPropagation()
                      setLocation(loc)
                      setIsOpen(false)
                    }}
                    className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA inside search card */}
          <button className="sm:ml-4 w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500
                             text-white font-semibold px-6 py-3 sm:py-4 rounded-xl transition
                             text-sm sm:text-base">
            Find Artisan
          </button>
        </div>

        {/* ── BOTTOM CTAs ── */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
          <button className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white
                             font-semibold px-8 py-4 rounded-xl transition text-sm sm:text-base">
            Browse All Artisans
          </button>

          <div className="flex items-center gap-3 cursor-pointer justify-center sm:justify-start">
            <img
              src={photos.video}
              alt="How it works"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-200 object-cover"
            />
            <p className="text-sm text-gray-600 font-medium">How it works</p>
          </div>
        </div>

      </div>
    </section>
  );
}