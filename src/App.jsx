import React from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import HowItWork from './pages/HowItWork'
import ArtisanProfile from './pages/ArtisanProfile'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import { Routes, Route, Outlet } from 'react-router-dom'
import PublicNav from './components/PublicNav'
import DashboardLayout from './components/artisanDashboard/DashboardLayout'
import ArtisanDashboard from './pages/dashboard/ArtisanDashboard'
import DashboardEarnings from './pages/dashboard/DashboardEarnings'
import DashboardProfile from './pages/dashboard/DashboardProfile'
import DashboardServices from './pages/dashboard/DashboardServices'
import DashboardPortfolio from './pages/dashboard/DashboardPortfolio'
import DashboardReviews from './pages/dashboard/DashboardReviews'
import DashboardAvailability from './pages/dashboard/DashboardAvailability'
import DashboardSetting from './pages/dashboard/DashboardSetting'
import DashboardJobs from './pages/dashboard/DashboardJobs'
import { Toaster } from 'react-hot-toast'

// Pages that use the public navbar
function PublicLayout() {
  return (
    <>
      <PublicNav />
      <Outlet />
    </>
  )
}


function OnboardingLayout() {
  return (
    <>
      <Outlet />
      {/* <OnboardingFooter />*/}
    </>
  )
}

export default function App() {
  return (
    <div>
      <Toaster />
      <Routes>

        {/* Public pages  */}
        <Route element={<PublicLayout />}>
          <Route path='/'          element={<Home />} />
          <Route path='/search'    element={<Search />} />
          <Route path='/how-it-works' element={<HowItWork />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Artisan profile  */}
        <Route path='/artisan/:id' element={<ArtisanProfile />} />

        {/* Onboarding — no navbar */}
        <Route element={<OnboardingLayout />}>
          <Route path='/onboarding' element={<Onboarding />} />
        </Route>
        
    <Route path='/artisan-dashboard' element={<DashboardLayout />}>
  <Route index                   element={<ArtisanDashboard />} />
     
     {/* ← add */}
  <Route path='jobs'             element={<DashboardJobs />} />
  <Route path='earnings'         element={<DashboardEarnings />} />
  <Route path='profile'          element={<DashboardProfile />} />
  <Route path='services'         element={<DashboardServices />} />
  <Route path='portfolio'        element={<DashboardPortfolio />} />
  <Route path='reviews'          element={<DashboardReviews />} />
  <Route path='availability'     element={<DashboardAvailability />} />
  <Route path='settings'         element={<DashboardSetting />} />
</Route>
      </Routes>
    </div>
  )
}