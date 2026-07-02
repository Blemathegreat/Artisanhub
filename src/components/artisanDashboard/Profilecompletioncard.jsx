import React from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { artisan, profileChecklist } from './ArtisanDashboarddata'

// SVG circular progress ring
function CircularProgress({ percentage }) {
  const radius = 45
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius  // ~263
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        {/* Background track */}
        <circle
          stroke="#f3f4f6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress arc */}
        <motion.circle
          stroke="#16a34a"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      {/* Percentage label in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="display-heading text-2xl font-bold text-gray-900">{percentage}%</span>
      </div>
    </div>
  )
}

export default function ProfileCompletionCard() {
  const { profileCompletion } = artisan
  const completedCount = profileChecklist.filter(i => i.done).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <h2 className="section-heading font-bold text-gray-900 text-base mb-4">Profile Completion</h2>

      {/* Circular progress */}
      <div className="flex flex-col items-center mb-4">
        <CircularProgress percentage={profileCompletion} />
        <p className="body-text text-sm text-gray-500 mt-2">
          {profileCompletion >= 80 ? 'Great job! Almost there.' : 'Keep going, you\'re doing well!'}
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-2 mb-4">
        {profileChecklist.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              item.done ? 'bg-green-100' : 'border-2 border-gray-200'
            }`}>
              {item.done && <Check size={11} className="text-green-600" strokeWidth={3} />}
            </div>
            <span className={`body-text text-sm ${item.done ? 'text-gray-700' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                         text-sm py-2.5 rounded-xl transition-colors flex items-center
                         justify-center gap-2">
        Complete Profile <ChevronRight size={14} />
      </button>
    </motion.div>
  )
}