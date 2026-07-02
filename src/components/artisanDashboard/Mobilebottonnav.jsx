import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, ClipboardList, Plus, MessageSquare, User } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard',          badge: null },
  { id: 'requests',  label: 'Requests',  icon: ClipboardList,   path: '/dashboard/requests', badge: 8    },
  { id: 'create',    label: 'Create',    icon: Plus,            path: '/dashboard/create',   isCenter: true },
  { id: 'messages',  label: 'Messages',  icon: MessageSquare,   path: '/dashboard/messages', badge: 3    },
  { id: 'profile',   label: 'Profile',   icon: User,            path: '/dashboard/profile',  badge: null },
]

export default function MobileBottomNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t
                    border-gray-100 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

        
          if (item.isCenter) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex-1 flex flex-col items-center justify-center py-2 relative"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center
                             justify-center shadow-lg shadow-green-200 -mt-5"
                >
                  <Icon size={22} className="text-white" />
                </motion.div>
              </Link>
            )
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 relative"
            >
              <div className="relative">
                <Icon
                  size={21}
                  className={isActive ? 'text-green-600' : 'text-gray-400'}
                  fill={isActive ? '#16a34a' : 'none'}
                  strokeWidth={isActive ? 0 : 2}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white
                                   text-[8px] font-bold w-4 h-4 rounded-full
                                   flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}>
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 w-1 h-1 bg-green-600 rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}