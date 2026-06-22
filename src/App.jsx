import React from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import ArtisanProfile from './pages/ArtisanProfile'
import Dashboard from './pages/Dashboard'
import {Routes, Route} from 'react-router-dom'
import PublicNav from './components/PublicNav'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div>
      <Toaster/> 
      <PublicNav />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/artisan-profile' element={<ArtisanProfile/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      
    </div>
  )
}
