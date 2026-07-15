import React from 'react'
import { Search, User, Shield, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const floatingCards = [
  {
    id: 'search',
    icon: Search,
    label: 'Search',
    sub: 'Find services near you',
    color: 'bg-green-50 text-green-600',
    position: 'top-6 left-4',
  },
  {
    id: 'verified',
    icon: Shield,
    label: 'Verified',
    sub: '100% trusted artisans',
    color: 'bg-blue-50 text-blue-600',
    position: 'top-6 right-2',
  },
  {
    id: 'reviews',
    icon: Star,
    label: '4.9 Rating',
    sub: '2,500+ reviews',
    color: 'bg-amber-50 text-amber-500',
    position: 'bottom-24 left-2',
  },
  {
    id: 'booking',
    icon: User,
    label: 'Easy Booking',
    sub: 'Chat or call directly',
    color: 'bg-purple-50 text-purple-600',
    position: 'bottom-10 right-4',
  },
]

const stepBubbles = [
  { number: '1', label: 'Search',      top: '12%',  left: '52%' },
  { number: '2', label: 'View Profile',top: '32%',  left: '64%' },
  { number: '3', label: 'Connect',     top: '52%',  left: '52%' },
  { number: '4', label: 'Get It Done', top: '72%',  left: '64%' },
]

export default function HeroSection() {
  return (
    <section className="bg-white pt-16 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200
                             text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              HOW ARTISANHUB WORKS
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900
                           leading-[1.1] tracking-tight mb-6">
              Find trusted artisans{' '}
              <span className="text-green-600 italic">in minutes</span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg leading-7 mb-8 max-w-lg
                          mx-auto lg:mx-0">
              Whether you need a barber, plumber, electrician, fashion designer or any
              skilled professional, ArtisanHub makes it easy to discover, compare and connect.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/search"
                className="inline-flex items-center justify-center gap-2 bg-green-700
                           hover:bg-green-800 text-white font-semibold px-7 py-3.5
                           rounded-xl transition-colors text-sm">
                <Search size={16} />
                Find Artisan
              </Link>
              <Link to="/onboarding"
                className="inline-flex items-center justify-center gap-2 border-2
                           border-gray-200 text-gray-700 hover:border-green-600
                           hover:text-green-700 font-semibold px-7 py-3.5 rounded-xl
                           transition-colors text-sm">
                <User size={16} />
                Join as Artisan
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — illustration area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            {/* Background blob */}
            <div className="relative mx-auto w-full max-w-[480px] h-[440px] sm:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100/40
                              to-blue-50 rounded-[40px]" />

              {/* Step flow cards — right side */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] flex flex-col
                              justify-center gap-3 pr-4">
                {stepBubbles.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white rounded-2xl shadow-md px-4 py-3 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center
                                    justify-center font-bold text-sm flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 leading-tight">
                        {step.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Left half — artisan avatar placeholders */}
              <div className="absolute left-4 top-0 bottom-0 w-[48%] flex flex-col
                              justify-center items-center gap-4">
                {/* Customer avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-28 h-36 bg-gradient-to-b from-amber-100 to-amber-200
                             rounded-[28px] flex items-end justify-center overflow-hidden
                             shadow-lg"
                >
                  <div className="w-20 h-28 bg-gradient-to-b from-amber-300 to-amber-400
                                  rounded-full mb-0 flex items-center justify-center">
                    <User size={40} className="text-amber-700" />
                  </div>
                </motion.div>

                {/* Artisan avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-28 h-36 bg-gradient-to-b from-green-100 to-green-200
                             rounded-[28px] flex items-end justify-center overflow-hidden
                             shadow-lg"
                >
                  <div className="w-20 h-28 bg-gradient-to-b from-green-300 to-green-500
                                  rounded-full flex items-center justify-center">
                    <Shield size={40} className="text-green-800" />
                  </div>
                </motion.div>
              </div>

              {/* Floating mini cards */}
              {floatingCards.map((card, i) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    transition={{
                      opacity: { delay: 0.5 + i * 0.1, duration: 0.4 },
                      y: { delay: 0.5 + i * 0.1, duration: 3, repeat: Infinity,
                           ease: 'easeInOut', repeatType: 'loop' },
                    }}
                    className={`absolute ${card.position} bg-white rounded-xl shadow-lg
                                px-3 py-2 flex items-center gap-2 z-10`}
                  >
                    <div className={`w-7 h-7 ${card.color} rounded-lg flex items-center
                                    justify-center flex-shrink-0`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-800">{card.label}</p>
                      <p className="text-[9px] text-gray-400 leading-tight">{card.sub}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}