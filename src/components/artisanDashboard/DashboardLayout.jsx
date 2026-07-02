import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './Dashboardsidebar'
import DashboardHeader from './Dashboardheader'
import MobileBottomNav from './Mobilebottonnav'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar — always visible on desktop, drawer on mobile */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">

        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

        {/* Main content area */}
        <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 space-y-5 pb-24 lg:pb-6">
          <Outlet />
        </main>

      </div>

      <MobileBottomNav />
    </div>
  )
}