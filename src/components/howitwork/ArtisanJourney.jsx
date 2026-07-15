import React from 'react'
import { UserPlus, Image, Shield, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Account',
    desc: 'Sign up and create your professional artisan profile in minutes. Add your name, category, and contact details.',
    color: 'bg-green-600',
    lightBg: 'bg-green-50',
    lightText: 'text-green-700',
    side: 'left',
  },
  {
    icon: Image,
    step: '02',
    title: 'Upload Portfolio',
    desc: 'Showcase your previous work and highlight your skills with photos and videos that impress potential customers.',
    color: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-700',
    side: 'right',
  },
  {
    icon: Shield,
    step: '03',
    title: 'Get Verified',
    desc: 'Our admin team reviews your profile within 24–48 hours. Verified artisans build more trust and attract more jobs.',
    color: 'bg-purple-600',
    lightBg: 'bg-purple-50',
    lightText: 'text-purple-700',
    side: 'left',
  },
  {
    icon: Users,
    step: '04',
    title: 'Start Receiving Customers',
    desc: 'Appear in search results and receive direct inquiries from nearby customers looking for your expertise.',
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-700',
    side: 'right',
  },
]

export default function ArtisanJourney() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Grow Your Business with{' '}
            <span className="text-green-600">ArtisanHub</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Join thousands of artisans already growing their business on our platform.
          </p>
        </div>

        {/* ── DESKTOP TIMELINE ── */}
        <div className="hidden lg:block relative">

          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5
                          bg-gradient-to-b from-green-300 via-blue-300
                          via-purple-300 to-amber-300 -translate-x-1/2" />

          <div className="space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = step.side === 'left'

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative grid grid-cols-[1fr_80px_1fr] items-center gap-0"
                >
                  {/* LEFT SIDE */}
                  {isLeft ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100
                                    hover:shadow-lg transition-all p-6 mr-8">
                      <span className={`inline-flex items-center ${step.lightBg}
                                        ${step.lightText} text-xs font-bold px-3 py-1
                                        rounded-full mb-4`}>
                        Step {step.step}
                      </span>
                      <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center
                                       justify-center mb-4`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-6">{step.desc}</p>
                    </div>
                  ) : (
                    <div /> // empty right placeholder
                  )}

                  {/* CENTER DOT */}
                  <div className="flex items-center justify-center relative z-10">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center
                                     justify-center text-white font-bold text-sm shadow-lg`}>
                      {step.step}
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  {!isLeft ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100
                                    hover:shadow-lg transition-all p-6 ml-8">
                      <span className={`inline-flex items-center ${step.lightBg}
                                        ${step.lightText} text-xs font-bold px-3 py-1
                                        rounded-full mb-4`}>
                        Step {step.step}
                      </span>
                      <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center
                                       justify-center mb-4`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-6">{step.desc}</p>
                    </div>
                  ) : (
                    <div /> // empty left placeholder
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── MOBILE TIMELINE — single column with left line ── */}
        <div className="lg:hidden relative pl-12">

          {/* Left vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b
                          from-green-300 via-blue-300 via-purple-300 to-amber-300" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Circle on the line */}
                  <div className={`absolute -left-[42px] top-6 w-9 h-9 ${step.color}
                                   rounded-full flex items-center justify-center
                                   text-white font-bold text-xs shadow-md z-10`}>
                    {step.step}
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100
                                  hover:shadow-lg transition-all p-5">
                    <span className={`inline-flex items-center ${step.lightBg}
                                      ${step.lightText} text-xs font-bold px-3 py-1
                                      rounded-full mb-3`}>
                      Step {step.step}
                    </span>
                    <div className={`w-11 h-11 ${step.color} rounded-xl flex items-center
                                     justify-center mb-3`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1.5">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-6">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}