import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, Scissors, Image, Clock } from 'lucide-react'

const actions = [
  {
    id: 'edit_profile',
    icon: Edit3,
    title: 'Edit Profile',
    desc: 'Update your info',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    path: '/dashboard/profile',
  },
  {
    id: 'manage_services',
    icon: Scissors,
    title: 'Manage Services',
    desc: 'Add or edit services',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    path: '/dashboard/services',
  },
  {
    id: 'add_portfolio',
    icon: Image,
    title: 'Add Portfolio',
    desc: 'Show your work',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    path: '/dashboard/portfolio',
  },
  {
    id: 'set_availability',
    icon: Clock,
    title: 'Set Availability',
    desc: 'Manage your time',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    path: '/dashboard/availability',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden:   { opacity: 0, scale: 0.95 },
  visible:  { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="section-heading font-bold text-gray-900 text-base mb-4">Quick Actions</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3"
      >
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3.5 border border-gray-100 rounded-xl
                         hover:border-gray-200 hover:shadow-sm transition-all text-left"
            >
              <div className={`w-9 h-9 ${action.iconBg} rounded-xl flex items-center
                               justify-center flex-shrink-0`}>
                <Icon size={18} className={action.iconColor} />
              </div>
              <div className="min-w-0">
                <p className="card-title text-sm font-semibold text-gray-800 truncate">{action.title}</p>
                <p className="caption text-xs text-gray-400 truncate">{action.desc}</p>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}