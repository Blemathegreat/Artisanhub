import React from 'react'
import { Search, User, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: Search,
    step: '1',
    title: 'Search',
    desc: 'Enter the service you need and browse verified artisans near your location.',
    color: 'bg-green-50 text-green-600',
    border: 'border-green-100',
    ring: 'ring-green-100',
  },
  {
    icon: User,
    step: '2',
    title: 'Compare Profiles',
    desc: 'Review ratings, portfolios, experience and customer reviews side by side.',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    ring: 'ring-blue-100',
  },
  {
    icon: MessageCircle,
    step: '3',
    title: 'Contact Directly',
    desc: 'Chat, call or WhatsApp the artisan instantly — no middleman involved.',
    color: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
    ring: 'ring-purple-100',
  },
  {
    icon: CheckCircle,
    step: '4',
    title: 'Get It Done',
    desc: 'Hire confidently and complete your project with a trusted professional.',
    color: 'bg-amber-50 text-amber-500',
    border: 'border-amber-100',
    ring: 'ring-amber-100',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function CustomerJourney() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Find an Artisan in{' '}
            <span className="text-green-600">4 Simple Steps</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            From searching to getting the job done, everything happens in just a few taps.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            return (
              <React.Fragment key={step.step}>
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`flex-1 bg-white border ${step.border} rounded-2xl shadow-sm
                               hover:shadow-lg transition-all p-6 flex flex-col items-center
                               text-center relative`}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6
                                  bg-green-600 text-white text-xs font-bold rounded-full
                                  flex items-center justify-center shadow-md">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center
                                   justify-center mb-4 mt-2 ring-4 ${step.ring}`}>
                    <Icon size={28} />
                  </div>

                  <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-6">{step.desc}</p>
                </motion.div>

                {/* Arrow connector — desktop only */}
                {!isLast && (
                  <div className="hidden lg:flex items-center justify-center px-2 flex-shrink-0">
                    <div className="w-8 h-8 bg-green-50 border border-green-100 rounded-full
                                    flex items-center justify-center">
                      <ArrowRight size={16} className="text-green-600" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}