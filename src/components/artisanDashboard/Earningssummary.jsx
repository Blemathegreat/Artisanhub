import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { earnings } from './ArtisanDashboarddata'


function MiniLineChart({ data }) {
  const width = 280
  const height = 70
  const padding = 4

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  // Convert each value into an [x, y] coordinate
  const points = data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return [x, y]
  })

  // Build the SVG path string: "M x0,y0 L x1,y1 L x2,y2 ..."
  const linePath = points
    .map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `L ${x},${y}`))
    .join(' ')

  // Build a filled area path underneath the line (closes down to baseline)
  const areaPath = `${linePath} L ${points[points.length - 1][0]},${height} L ${points[0][0]},${height} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Filled area under the line */}
      <motion.path
        d={areaPath}
        fill="url(#chartGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />

      {/* The line itself, animated drawing in */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* Dot on the last point */}
      <motion.circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r="4"
        fill="#16a34a"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
    </svg>
  )
}

export default function EarningsSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-gray-900 text-base">Earnings Summary</h2>
        <button className="text-sm font-semibold text-green-600 hover:underline flex items-center gap-1">
          View all <ChevronRight size={14} />
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-1">This Month</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        ₦{earnings.thisMonth.toLocaleString()}
      </p>
      <div className="flex items-center gap-1 mb-4">
        <TrendingUp size={12} className="text-green-500" />
        <span className="text-xs font-medium text-green-600">{earnings.trend}</span>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <MiniLineChart data={earnings.chartData} />
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Jobs Completed</p>
          <p className="text-base font-bold text-gray-900">{earnings.jobsCompleted}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Total Earnings</p>
          <p className="text-base font-bold text-gray-900">
            ₦{earnings.totalEarnings.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Avg. Per Job</p>
          <p className="text-base font-bold text-gray-900">
            ₦{earnings.avgPerJob.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}