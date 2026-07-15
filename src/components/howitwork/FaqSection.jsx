import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    id: 1,
    question: 'How much does ArtisanHub cost?',
    answer: 'ArtisanHub is completely free for customers. You can search, view profiles, and contact artisans at no cost. Artisans join for free and only pay a small commission on completed jobs in the future.',
  },
  {
    id: 2,
    question: 'Can I contact artisans directly?',
    answer: 'Yes. Once you find an artisan you like, you can chat, call, or WhatsApp them directly from their profile. There is no middleman — communication is instant and private.',
  },
  {
    id: 3,
    question: 'How are artisans verified?',
    answer: 'Every artisan who signs up goes through a manual review by our admin team. We check their profile information, portfolio, and business details before approving them. Verified artisans display a green Verified badge on their profile.',
  },
  {
    id: 4,
    question: 'Can I hire artisans for home service?',
    answer: 'Yes. Many artisans on ArtisanHub offer home service — meaning they come to your location. Look for the "Home Service Available" badge on artisan profiles when browsing search results.',
  },
  {
    id: 5,
    question: 'How long does approval take?',
    answer: 'After submitting your application, our team reviews it within 24 to 48 hours. You will receive an email and SMS notification once your profile is approved and live on the platform.',
  },
  {
    id: 6,
    question: 'Is my information safe on ArtisanHub?',
    answer: 'Absolutely. We take privacy seriously. Your personal information is never sold to third parties. All communication between customers and artisans happens directly — ArtisanHub does not store your conversation history.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-colors ${
        isOpen ? 'border-green-200 bg-green-50/40' : 'border-gray-100 bg-white'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-sm sm:text-base font-semibold leading-snug ${
          isOpen ? 'text-green-700' : 'text-gray-800'
        }`}>
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center
                         flex-shrink-0 transition-colors ${
          isOpen ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
        }`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-gray-500 leading-7">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId(prev => prev === id ? null : id)

  // Split into two columns for desktop
  const leftColumn  = faqs.filter((_, i) => i % 2 === 0)
  const rightColumn = faqs.filter((_, i) => i % 2 !== 0)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Everything you need to know about ArtisanHub.
          </p>
        </div>

        {/* Two column layout on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            {leftColumn.map(faq => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
          <div className="space-y-4">
            {rightColumn.map(faq => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}