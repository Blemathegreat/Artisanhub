import React from 'react'
import { Search, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-green-700 rounded-3xl px-8 sm:px-16 py-16 sm:py-20
                     flex flex-col sm:flex-row items-center justify-between gap-8
                     relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-green-600
                          rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-800
                          rounded-full translate-y-1/2 -translate-x-1/4 opacity-40" />

          {/* Text */}
          <div className="relative z-10 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-green-100 text-base max-w-md">
              Find trusted artisans near you or grow your business with ArtisanHub.
            </p>
          </div>

          {/* Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 bg-white
                         hover:bg-gray-50 text-green-700 font-semibold px-7 py-3.5
                         rounded-xl transition-colors text-sm shadow-md"
            >
              <Search size={16} />
              Find Artisan
            </Link>
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 bg-transparent
                         border-2 border-white/60 hover:border-white text-white
                         font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              <User size={16} />
              Join as Artisan
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}