import { useState } from 'react'
import {
  Star, MapPin, MessageCircle, Phone, Calendar,
  Shield, Home, Clock, Heart, CheckCircle, Grid
} from 'lucide-react'
import RequestServiceDrawer from '../requestArtisan/RequestServiceDrawer'

export default function ProfileHeader({ artisan }) {
  const [liked, setLiked] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

      {/* Image */}
      <div className="relative w-full lg:w-[280px] h-[260px] lg:h-[300px] shrink-0 rounded-2xl overflow-hidden shadow-md">
        <img src={artisan.image} alt={artisan.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <Grid size={12} />
          <span>{artisan.portfolio?.length ?? 0}+ Photos & Videos</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">

        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {artisan.verified && (
              <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                <CheckCircle size={12} className="fill-green-600 text-white" />
                Verified Artisan
              </span>
            )}
          </div>
          <button
            onClick={() => setLiked(p => !p)}
            className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 hover:border-red-300 hover:text-red-500 transition-colors shrink-0"
          >
            <Heart size={15} className={liked ? 'fill-red-500 text-red-500' : ''} />
            Save
          </button>
        </div>

        {/* Name */}
        <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
          {artisan.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-gray-900">{artisan.rating}</span>
            <span className="caption text-gray-400 text-sm">({artisan.totalRating} reviews)</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="body-text text-sm text-gray-500 flex items-center gap-1">
            <CheckCircle size={13} className="text-green-600" />
            {artisan.jobsCompleted ?? '200'}+ jobs completed
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <MapPin size={14} className="text-green-600 shrink-0" />
          <span>{artisan.location}</span>
          <button className="caption text-green-600 font-medium text-xs ml-1 hover:underline">
            View on map
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {artisan.verified && (
            <span className="flex items-center gap-1.5 border border-gray-200 rounded-full text-xs text-gray-600 px-3 py-1.5">
              <Shield size={12} className="text-green-600" /> Verified
            </span>
          )}
          {artisan.homeService && (
            <span className="flex items-center gap-1.5 border border-gray-200 rounded-full text-xs text-gray-600 px-3 py-1.5">
              <Home size={12} className="text-green-600" /> Home Service Available
            </span>
          )}
          {artisan.responseTime && (
            <span className="flex items-center gap-1.5 border border-gray-200 rounded-full text-xs text-gray-600 px-3 py-1.5">
              <Clock size={12} className="text-green-600" /> Responds in {artisan.responseTime}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${artisan.whatsapp}`}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} /> Chat Artisan
          </a>
          <a
            href={`tel:${artisan.call}`}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            <Phone size={16} /> Call Artisan
          </a>

          {/* ── Request Service button — now opens drawer ── */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
          >
            <Calendar size={16} /> Request Service
          </button>
        </div>
      </div>

      {/* ── Drawer — mounted here, uses artisan data directly ── */}
      <RequestServiceDrawer
        isOpen={isDrawerOpen}
        artisan={artisan}
        onClose={() => setIsDrawerOpen(false)}
      />

    </div>
  )
}