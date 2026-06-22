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
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const childrenVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Shared location dropdown logic used in both layouts
  const LocationDropdown = ({ className = "" }) => (
    <div
      className={`relative flex items-center gap-2 cursor-pointer ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <MapPin size={16} className="text-gray-400 shrink-0" />
      <p className="flex-1 text-sm text-gray-600 truncate">{location}</p>
      <ChevronDown
        size={16}
        className={`text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border
                        border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden">
          {locations.map((loc) => (
            <div
              key={loc}
              onClick={(e) => {
                e.stopPropagation();
                setLocation(loc);
                setIsOpen(false);
              }}
              className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white w-full overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          MOBILE LAYOUT  —  visible only below lg (< 1024px)
      ════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col min-h-screen">

        {/* Image block — top 45% of viewport */}
        <div className="relative w-full shrink-0" style={{ height: "45vh" }}>
          <img
            src={photos.hero}
            alt="Artisan at work"
            className="w-full h-full object-cover object-top"
          />
          {/* Fade image into white background below */}
          <div className="absolute inset-0 bg-gradient-to-b
                          from-transparent via-transparent to-white" />

          {/* Compact trust pill — sits at bottom of image */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2.5
                            shadow-lg flex items-center gap-3">
              {/* Stacked avatars */}
              <div className="flex -space-x-2 shrink-0">
                {[photos.barber, photos.barber1, photos.barber].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              {/* Rating badge */}
              <div className="flex items-center gap-1 bg-yellow-400 text-white
                              text-[11px] font-semibold px-2 py-1 rounded-full shrink-0">
                <Star size={10} fill="white" />
                <span>4.8</span>
              </div>
              {/* Text */}
              <div className="min-w-0">
                <p className="text-gray-900 font-semibold text-[11px] truncate">
                  Trusted by 2,500+ customers
                </p>
                <p className="text-gray-400 text-[10px]">across Ibadan and beyond</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content block — scrollable, below image */}
        <div className="flex-1 flex flex-col px-5 pt-5 pb-10">

          {/* Green badge */}
          <span className="self-start inline-flex items-center border border-green-200
                           bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5
                           rounded-full mb-4">
            Find trusted artisans near you
          </span>

          {/* Heading — 28px safe for all phones including 320px wide */}
          <h1 className="text-[28px] sm:text-[34px] leading-[1.2] font-bold
                         text-gray-900 tracking-tight mb-3">
            Skilled hands.<br />
            Trusted service.<br />
            <span className="text-green-700">Right around you.</span>
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-6 mb-6">
            Find reliable and verified local artisans for your home and personal
            needs. Fast, easy and secure.
          </p>

          {/* Search card — each field its own row with border */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl
                          p-3 flex flex-col gap-2.5 mb-5">

            {/* Service input */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need?"
                className="flex-1 min-w-0 bg-transparent outline-none text-sm
                           placeholder:text-gray-400"
              />
            </div>

            {/* Location input */}
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <LocationDropdown />
            </div>

            {/* CTA button */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600
                               text-white font-semibold py-3.5 rounded-xl text-sm transition">
              Find Artisan
            </button>
          </div>

          {/* Bottom row — Browse + How it works */}
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-green-700 hover:bg-green-800 text-white
                               font-semibold py-3.5 rounded-xl text-sm transition">
              Browse All Artisans
            </button>
            <div className="flex items-center gap-2 cursor-pointer shrink-0">
              <img
                src={photos.video}
                alt="How it works"
                className="w-10 h-10 rounded-full border border-gray-200 object-cover"
              />
              <p className="text-xs text-gray-600 font-medium leading-tight">
                How it<br />works
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          DESKTOP LAYOUT  —  visible only at lg+ (≥ 1024px)
          Exactly your original design, untouched
      ════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative min-h-screen">

        {/* Desktop hero image */}
        <div className="absolute right-0 top-0 h-full w-[60%]">
          <img
            src={photos.hero}
            alt="Artisan"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[420px]
                          bg-gradient-to-r from-white via-white/95 to-transparent" />

          {/* Floating trust card */}
          <div className="absolute bottom-20 left-[40%] bg-white rounded-2xl
                          shadow-xl px-5 py-4 w-[360px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-1">
                {[photos.barber, photos.barber1, photos.barber].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 bg-yellow-400 text-white
                              text-sm font-semibold px-3 py-1 rounded-full">
                <Star size={14} fill="white" />
                <span>4.8</span>
              </div>
            </div>
            <p className="text-gray-900 font-bold text-sm">Trusted by 2,500+ customers</p>
            <p className="text-gray-400 text-xs mt-1">across Ibadan and beyond</p>
          </div>
        </div>

        {/* Desktop content */}
        <div className="relative z-10 w-[45%] min-h-screen flex flex-col
                        justify-center px-20">

          <span className="inline-flex self-start items-center border border-green-200
                           bg-green-50 text-green-700 text-sm font-medium px-4 py-2
                           rounded-full mb-8">
            Find trusted artisans near you
          </span>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="text-[56px] leading-[1.1] font-bold text-gray-900 tracking-tight"
          >
            <motion.span variants={childrenVariant} className="block">Skilled hands.</motion.span>
            <motion.span variants={childrenVariant} className="block">Trusted service.</motion.span>
            <motion.span variants={childrenVariant} className="block text-green-700">
              Right around you.
            </motion.span>
          </motion.h1>

          <p className="mt-6 max-w-md text-gray-500 text-base leading-7">
            Find reliable and verified local artisans for your home and personal
            needs. Fast, easy and secure.
          </p>

          {/* Desktop search card — original single-row layout */}
          <div className="mt-10 max-w-[620px] bg-white border border-gray-100
                          shadow-lg rounded-xl px-5 py-3 flex items-center">
            <div className="flex items-center gap-3 flex-1">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need?"
                className="w-full outline-none text-sm placeholder:text-gray-400"
              />
            </div>
            <div className="w-px h-8 bg-gray-200 mx-4 shrink-0" />
            <LocationDropdown className="min-w-[160px]" />
            <button className="ml-4 shrink-0 bg-yellow-400 hover:bg-yellow-500
                               text-white font-semibold px-8 py-4 rounded-xl transition">
              Find Artisan
            </button>
          </div>

          {/* Desktop bottom CTAs */}
          <div className="mt-8 flex items-center gap-6">
            <button className="bg-green-700 hover:bg-green-800 text-white
                               font-semibold px-8 py-4 rounded-xl transition">
              Find Artisan
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={photos.video}
                alt="Video"
                className="w-12 h-12 rounded-full border border-gray-200 object-cover"
              />
              <p className="text-sm text-gray-600">How it works</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}