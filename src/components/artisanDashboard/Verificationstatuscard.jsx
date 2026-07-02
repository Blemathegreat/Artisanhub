import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { artisan } from './ArtisanDashboarddata'

export default function VerificationStatusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <h2 className="section-heading font-bold text-gray-900 text-base mb-4">Verification Status</h2>

      <div className="flex items-start gap-4 mb-4">
        {/* Shield icon */}
        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center
                        justify-center flex-shrink-0">
          <CheckCircle size={24} className="text-green-600 fill-green-600 text-white" />
        </div>

        <div>
          <p className="card-title font-bold text-gray-900 text-base">
            {artisan.verified ? 'Verified' : 'Not Verified'}
          </p>
          <p className="body-text text-sm text-gray-500 mt-0.5">
            {artisan.verified
              ? 'Your profile is fully verified.'
              : 'Complete verification to build trust.'}
          </p>
        </div>
      </div>

      <button className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50
                         font-semibold text-sm py-2.5 rounded-xl transition-colors
                         flex items-center justify-center gap-2">
        View Badge <ChevronRight size={14} />
      </button>
    </motion.div>
  )
}