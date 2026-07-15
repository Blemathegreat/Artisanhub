import React from 'react'
import { Shield, Star, MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const cards = [
  {
    icon: Shield,
    title: 'Verified Artisans',
    desc: 'Every artisan goes through a strict profile review process before appearing on the platform.',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    hoverBorder: 'hover:border-green-200',
  },
  {
    icon: Star,
    title: 'Real Reviews',
    desc: 'Authentic customer ratings help you make informed decisions before hiring anyone.',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    hoverBorder: 'hover:border-amber-200',
  },
  {
    icon: MapPin,
    title: 'Nearby Professionals',
    desc: 'Find skilled artisans closest to your location using our smart location-based search.',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-200',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    desc: 'Chat, call or WhatsApp artisans directly and safely — no intermediaries, no delays.',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hoverBorder: 'hover:border-purple-200',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
}

export default function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Why Thousands Trust{' '}
            <span className="text-green-600">ArtisanHub</span>
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            We built ArtisanHub with trust, safety and convenience at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -4 }}
                className={`bg-white border border-gray-100 ${card.hoverBorder}
                             rounded-2xl shadow-sm hover:shadow-lg transition-all p-6
                             flex flex-col items-start gap-4 cursor-pointer`}
              >
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center
                                 justify-center`}>
                  <Icon size={22} className={card.iconColor} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1.5">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-6">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}