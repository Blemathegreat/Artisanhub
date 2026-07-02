import React, { useState } from 'react'


import StatsCards            from './Statscards'
import RecentRequests        from './Recentrequests'
import VerificationStatusCard from './Verificationstatuscard'
import ProfileCompletionCard from './Profilecompletioncard'
import QuickActions          from './Quickactions'
import EarningsSummary       from './Earningssummary'
import RecentReviews         from './Recentreviews'


export default function ArtisanDashboard() {
  
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex">


      

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">

        

        {/* Scrollable content area */}
      
        <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 space-y-5 pb-24 lg:pb-6">

          {/* Stats row — 4 cards, 2 cols mobile / 4 cols desktop */}
          <StatsCards />

          {/* Main grid*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <RecentRequests />
            </div>
            <div className="space-y-5">
              <VerificationStatusCard />
              <ProfileCompletionCard />
            </div>
          </div>

          {/* Quick Actions + Earnings Summary  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <QuickActions />
            <EarningsSummary />
          </div>

          {/* Reviews — full width */}
          <RecentReviews />

        </main>
      </div>

      

    </div>
  )
}