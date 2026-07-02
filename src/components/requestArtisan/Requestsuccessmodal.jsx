import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

export default function RequestSuccessModal({ isOpen, artisan, onContinue, onViewProfile }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onContinue}
          />
          <motion.div
            key="success-modal"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center relative">

              <button
                onClick={onContinue}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                           rounded-full hover:bg-gray-100 transition-colors text-gray-400"
              >
                <X size={16} />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5"
              >
                <CheckCircle2 size={44} className="text-green-500" strokeWidth={1.5} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="display-heading text-xl font-bold text-gray-900 mb-2">Request Sent! 🎉</h2>
                <p className="body-text text-sm text-gray-500 leading-relaxed mb-6">
                  Your request has been sent to{' '}
                  <span className="font-semibold text-gray-700">{artisan?.title}</span>.
                  They will contact you shortly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 w-full mb-6"
              >
                <img
                  src={artisan?.image}
                  alt={artisan?.title}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="text-left min-w-0">
                  <p className="card-title text-sm font-bold text-gray-900 truncate">{artisan?.title}</p>
                  <p className="caption text-xs text-gray-400 truncate">{artisan?.location}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3 w-full"
              >
                <button
                  onClick={onViewProfile}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                             py-3.5 rounded-2xl transition-colors text-sm"
                >
                  View Profile
                </button>
                <button
                  onClick={onContinue}
                  className="w-full border border-gray-200 text-gray-600 font-semibold
                             py-3.5 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Continue Browsing
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}