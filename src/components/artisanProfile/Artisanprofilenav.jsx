import React from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { photos, Artisans } from '../../assets/Photos.js'
import { useParams } from 'react-router-dom'

export default function ArtisanProfileNav() {
  const { id } = useParams()
  const artisan = Artisans.find(a => a.id === Number(id))

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={photos.logo}
            alt="ArtisanHub Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <h1 className="display-heading text-xl font-bold text-gray-900">
              Artisan<span className="text-green-500">Hub</span>
            </h1>
            <p className="caption text-xs text-gray-500">Find. Trust. Get it done.</p>
          </div>
        </Link>

        {/* Right side: bell → avatar → welcome message */}
        <div className="flex items-center gap-4">

          {/* Bell */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            <Bell size={16} className="text-gray-600" />
            {/* notification dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 shrink-0">
            <img
              src={artisan?.image ?? photos.logo}
              alt={artisan?.title ?? 'Artisan'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Welcome message */}
          <div className="hidden sm:flex flex-col leading-tight">
            <p className="caption text-xs text-gray-400">You are viewing</p>
            <p className="card-title text-sm font-semibold text-gray-900 truncate max-w-[200px]">
              Welcome to {artisan?.title} 👋
            </p>
          </div>

        </div>
      </div>
    </header>
  )
}
