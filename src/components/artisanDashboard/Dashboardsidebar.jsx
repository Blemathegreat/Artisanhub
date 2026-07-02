import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, ClipboardList, MessageSquare, Briefcase,
  DollarSign, User, Scissors, Image, Star, Clock, Settings,
  HelpCircle, LogOut, CheckCircle, Rocket, X,
} from 'lucide-react'
import { artisan, navItems } from './ArtisanDashboarddata'

const iconMap = {
  dashboard:    LayoutDashboard,
  requests:     ClipboardList,
  messages:     MessageSquare,
  jobs:         Briefcase,
  earnings:     DollarSign,
  profile:      User,
  services:     Scissors,
  portfolio:    Image,
  reviews:      Star,
  availability: Clock,
  settings:     Settings,
}

// Avatar placeholder — shows initials when no image
function Avatar({ name, size = 'md', src }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-14 h-14 text-base' }
  if (src) return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
  return (
    <div className={`${sizes[size]} rounded-full bg-green-100 text-green-700 font-bold
                     flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  )
}

export default function DashboardSidebar({ isOpen, onClose }) {
  const location = useLocation()

  const sidebarVariants = {
    open:   { x: 0,    opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: -280, opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Scissors size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">ArtisanHub</span>
        </div>
        {/* Close button — mobile only */}
        <button onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <Avatar name={artisan.name} size="lg" src={artisan.avatar} />
            {artisan.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-0.5">
                <CheckCircle size={12} className="text-white fill-white" />
              </div>
            )}
          </div>
          <p className="font-bold text-gray-900 text-sm">{artisan.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{artisan.profession}</p>
          {artisan.verified && (
            <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold
                             text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
              <CheckCircle size={9} className="fill-green-600 text-white" /> Verified
            </span>
          )}
          <div className="flex items-center gap-1 mt-2">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">{artisan.rating}</span>
            <span className="text-xs text-gray-400">({artisan.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = iconMap[item.id] || LayoutDashboard
          const isActive = location.pathname === item.path ||
                           (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                          transition-all duration-150 group ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-green-600 text-white text-[10px] font-bold
                                 px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-2 border-t border-gray-100 mt-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                             font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <HelpCircle size={18} className="text-gray-400" />
            Help & Support
          </button>
        </div>
      </nav>

      {/* Upgrade card */}
      <div className="px-4 pb-4">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-2 right-3 text-3xl opacity-20">🚀</div>
          <p className="text-sm font-bold text-gray-800 mb-1">Upgrade Your Profile</p>
          <p className="text-xs text-gray-500 mb-3 leading-4">
            Increase trust and get more requests
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs
                             font-semibold py-2 rounded-xl transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                           font-medium text-gray-500 hover:bg-red-50 hover:text-red-500
                           transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-white border-r
                        border-gray-100 h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar — slide in drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
            />
            {/* Drawer */}
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50
                         shadow-2xl overflow-hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}