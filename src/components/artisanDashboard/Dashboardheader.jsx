import React, { useState } from 'react'
import { Bell, ChevronDown, Menu, Scissors, CheckCircle } from 'lucide-react'
import { artisan } from './ArtisanDashboarddata'

function Avatar({ name, src, size = 'sm' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const sizes = { sm: 'w-9 h-9 text-xs', md: 'w-10 h-10 text-sm' }
  if (src) return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
  return (
    <div className={`${sizes[size]} rounded-full bg-green-100 text-green-700 font-bold
                     flex items-center justify-center`}>
      {initials}
    </div>
  )
}

export default function DashboardHeader({ onMenuToggle }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const notificationCount = 5

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4
                       flex items-center justify-between sticky top-0 z-30">

      {/* Left — mobile menu + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors p-1"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="display-heading text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            Dashboard
          </h1>
          <p className="body-text text-sm text-gray-500 hidden sm:block">
            Welcome back, {artisan.name.split(' ')[0]}! 👋 &nbsp;
            <span className="text-gray-400">Here's what's happening with your business.</span>
          </p>
        </div>
      </div>

      {/* Right — notifications + profile */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <Bell size={20} className="text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white
                             text-[9px] font-bold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(p => !p)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50
                       transition-colors"
          >
            <Avatar name={artisan.name} src={artisan.avatar} />
            <ChevronDown size={16} className={`text-gray-400 transition-transform hidden sm:block ${
              showDropdown ? 'rotate-180' : ''
            }`} />
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100
                              rounded-2xl shadow-xl z-20 py-2 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="card-title text-sm font-semibold text-gray-900">{artisan.name}</p>
                  <p className="caption text-xs text-gray-500">{artisan.profession}</p>
                  {artisan.verified && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold
                                     text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                      <CheckCircle size={9} className="fill-green-600 text-white" /> Verified
                    </span>
                  )}
                </div>
                {[
                  { label: 'View Profile', path: '/dashboard/profile' },
                  { label: 'Settings',     path: '/dashboard/settings' },
                  { label: 'Help',         path: '/dashboard/help' },
                ].map(item => (
                  <button key={item.label}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700
                               hover:bg-gray-50 transition-colors">
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-gray-50 mt-1 pt-1">
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-500
                                     hover:bg-red-50 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}