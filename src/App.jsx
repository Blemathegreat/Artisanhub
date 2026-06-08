import React from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import ArtisanProfile from './pages/ArtisanProfile'
import Dashboard from './pages/Dashboard'
import {Routes, Route} from 'react-router-dom'
import PublicNav from './components/PublicNav'

export default function App() {
  return (
    <div>
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
