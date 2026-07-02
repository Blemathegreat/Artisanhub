import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import { requests } from './ArtisanDashboarddata'

function Avatar({ name, src }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (src) return <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
  return (
    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold text-sm
                    flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  )
}

const statusConfig = {
  New:       { bg: 'bg-green-100',  text: 'text-green-700'  },
  Pending:   { bg: 'bg-amber-100',  text: 'text-amber-700'  },
  Accepted:  { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  Completed: { bg: 'bg-gray-100',   text: 'text-gray-600'   },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden:   { opacity: 0, x: -10 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export default function RecentRequests() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-heading font-bold text-gray-900 text-base">Recent Requests</h2>
        <button className="small-label text-sm font-semibold text-green-600 hover:underline flex items-center gap-1">
          View all <ChevronRight size={14} />
        </button>
      </div>

      {/* List */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {requests.map((req) => {
          const { bg, text } = statusConfig[req.status] || statusConfig.Pending
          return (
            <motion.button
              key={req.id}
              variants={itemVariants}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors
                         text-left group"
            >
              <Avatar name={req.customer} src={req.avatar} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="card-title text-sm font-semibold text-gray-800 truncate">
                    {req.customer}
                  </p>
                  <span className={`${bg} ${text} text-[10px] font-bold px-2 py-0.5
                                   rounded-full flex-shrink-0`}>
                    {req.status}
                  </span>
                </div>
                <p className="body-text text-xs text-gray-600 truncate">{req.service}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-gray-400 flex-shrink-0" />
                  <p className="caption text-xs text-gray-400 truncate">{req.location}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="caption text-xs text-gray-400 whitespace-nowrap">{req.time}</span>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500
                                                   transition-colors" />
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Footer */}
      <button className="w-full mt-3 pt-3 border-t border-gray-50 text-sm font-semibold
                         text-green-600 hover:text-green-700 transition-colors flex items-center
                         justify-center gap-1">
        View all requests <ChevronRight size={14} />
      </button>
    </div>
  )
}