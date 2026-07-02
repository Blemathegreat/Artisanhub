import React from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, Clock, Briefcase, Eye, TrendingUp } from 'lucide-react'
import { stats } from './ArtisanDashboarddata'

const iconMap = {
  green:  { icon: ClipboardList, bg: 'bg-green-50',  text: 'text-green-600'  },
  amber:  { icon: Clock,         bg: 'bg-amber-50',   text: 'text-amber-500'  },
  blue:   { icon: Briefcase,     bg: 'bg-blue-50',    text: 'text-blue-600'   },
  purple: { icon: Eye,           bg: 'bg-purple-50',  text: 'text-purple-600' },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => {
        const { icon: Icon, bg, text } = iconMap[stat.color]
        return (
          <motion.div
            key={stat.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5
                       cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center
                             justify-center mb-3`}>
              <Icon size={20} className={text} />
            </div>

            {/* Value */}
            <p className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 leading-none mb-1">
              {stat.value.toLocaleString()}
            </p>

            {/* Label */}
            <p className="caption text-xs sm:text-sm text-gray-500 mb-2">{stat.label}</p>

            {/* Trend or CTA */}
            {stat.trend ? (
              <div className="flex items-center gap-1">
                <TrendingUp size={12} className={stat.trendUp ? 'text-green-500' : 'text-red-400'} />
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
            ) : (
              <button className="text-xs font-semibold text-green-600 hover:underline">
                {stat.cta}
              </button>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}