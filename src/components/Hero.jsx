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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── MOBILE / TABLET layout (< lg) ─────────────────────────────────── */}
      <div className="lg:hidden flex flex-col">

        {/* Hero image — full width, fixed height, image on top */}
        <div className="relative w-full h-[350px] sm:h-[360px]">
          <img
            src={photos.hero}
            alt="Artisan"
            className="w-full h-full object-cover object-center"
          />
          {/* bottom fade into white content area */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />

          {/* Floating trust card — repositioned to bottom-left of image */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[300px] bg-white rounded-2xl shadow-xl px-4 py-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-1">
                <img src={photos.barber} alt="barber" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                <img src={photos.barber1} alt="barber 1" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                <img src={photos.barber} alt="barber 2" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
              </div>
              <div className="flex items-center gap-1 bg-yellow-400 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                <Star size={12} fill="white" className="text-white" />
                <span>4.8</span>
              </div>
            </div>
            <p className="text-gray-900 font-bold text-xs">Trusted by 2,500+ customers</p>
            <p className="text-gray-400 text-[11px] mt-0.5">across Ibadan and beyond</p>
          </div>
        </div>

        {/* Text + search content */}
        <div className="px-5 sm:px-8 pt-6 pb-10">

          {/* Badge */}
          <span className="inline-flex items-center border border-green-200 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            Find trusted artisans near you
          </span>

          {/* Heading */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="text-[36px] sm:text-[44px] leading-[1.15] font-bold text-gray-900 tracking-tight"
          >
            <motion.span variants={childrenVariant} className="block">Skilled hands.</motion.span>
            <motion.span variants={childrenVariant} className="block">Trusted service.</motion.span>
            <motion.span variants={childrenVariant} className="block text-green-700">Right around you.</motion.span>
          </motion.h1>

          {/* Description */}
          <p className="mt-4 text-gray-500 text-sm leading-6">
            Find reliable and verified local artisans for your home and personal needs.
            Fast, easy and secure.
          </p>

          {/* Search Card — stacked on mobile */}
          <div className="mt-8 bg-white border border-gray-100 shadow-lg rounded-xl p-4 flex flex-col gap-3">

            {/* Search input row */}
            <div className="flex items-center gap-3">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need?"
                className="w-full outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-100" />

            {/* Location row */}
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MapPin size={16} className="text-gray-400 flex-shrink-0" />
              <p className="text-sm text-gray-600 flex-1 whitespace-nowrap">{location}</p>
              <ChevronDown size={16} className={`transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />

              {isOpen && (
                <div className="absolute top-8 left-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-20">
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => { setLocation(loc); setIsOpen(false); }}
                      className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Find button — full width on mobile */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3.5 rounded-xl transition text-sm">
              Find Artisan
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 flex items-center gap-4">
            <button className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition text-sm">
              Find Artisan
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={photos.video}
                alt="Video"
                className="w-10 h-10 rounded-full border border-gray-200 flex-shrink-0"
              />
              <p className="text-sm text-gray-600 whitespace-nowrap">How it works</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── DESKTOP layout (lg+) — original, completely untouched ─────────── */}
      <div className="hidden lg:flex min-h-screen items-center">

        {/* Hero Image */}
        <div className="absolute right-0 top-0 h-full w-[60%]">
          <img
            src={photos.hero}
            alt="Artisan"
            className="w-full h-full object-center"
          />
          <div className="absolute inset-y-0 left-0 w-[420px] bg-gradient-to-r from-white via-white/95 to-transparent" />

          {/* Floating Card */}
          <div className="absolute bottom-20 left-[40%] bg-white rounded-2xl shadow-xl px-5 py-4 w-[360px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-1">
                <img src={photos.barber} alt="barber" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                <img src={photos.barber1} alt="barber 1" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                <img src={photos.barber} alt="barber 2" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
              </div>
              <div className="flex items-center gap-1 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full">
                <Star size={14} fill="white" className="text-white" />
                <span>4.8</span>
              </div>
            </div>
            <p className="text-gray-900 font-bold text-sm">Trusted by 2,500+ customers</p>
            <p className="text-gray-400 text-xs mt-1">across Ibadan and beyond</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full md:w-[45%] px-6 lg:px-20">

          {/* Badge */}
          <span className="inline-flex items-center border border-green-200 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            Find trusted artisans near you
          </span>

          {/* Heading */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="text-[56px] leading-[1.1] font-bold text-gray-900 tracking-tight"
          >
            <motion.span variants={childrenVariant} className="block">Skilled hands.</motion.span>
            <motion.span variants={childrenVariant} className="block">Trusted service.</motion.span>
            <motion.span variants={childrenVariant} className="block text-green-700">Right around you.</motion.span>
          </motion.h1>

          {/* Description */}
          <p className="mt-6 max-w-md text-gray-500 text-base leading-7">
            Find reliable and verified local artisans for your home and personal needs. Fast, easy and secure.
          </p>

          {/* Search Card */}
          <div className="mt-10 max-w-[620px] bg-white border border-gray-100 shadow-lg rounded-xl px-5 py-3 flex items-center">
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
            <div className="w-px h-8 bg-gray-200 mx-4" />
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MapPin size={18} className="text-gray-400" />
              <p className="text-sm text-gray-600 whitespace-nowrap">{location}</p>
              <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              {isOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-20">
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => { setLocation(loc); setIsOpen(false); }}
                      className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-4 rounded-xl transition">
              Find Artisan
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 flex items-center gap-6">
            <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-xl transition">
              Find Artisan
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={photos.video}
                alt="Video"
                className="w-12 h-12 rounded-full border border-gray-200"
              />
              <p className="text-sm text-gray-600">How it works</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}