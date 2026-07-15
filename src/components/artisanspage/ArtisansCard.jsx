import React, { useState } from 'react'
import { Heart, Star, MapPin, MessageCircle, Phone } from 'lucide-react'

export default function ArtisansCard({
  image,
  title,
  totalRating,      // ← fixed: was totalReview, your data has totalRating
  description,
  location,
  whatsapp,
  call,
  distance,
  verified,
  rating,
  isSelected,       // ← new: true when this artisan is selected on the map
  onClick,          // ← new: called when card is clicked, sets selectedArtisan in context
}) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      onClick={onClick}
      className={`
        w-full h-full flex flex-row items-start lg:flex-col gap-3 lg:gap-0
        border rounded-xl overflow-hidden p-3 lg:p-0
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${isSelected
          ? 'border-purple-500 ring-2 ring-purple-400 shadow-lg scale-[1.02]'
          : 'border-gray-100 hover:shadow-md hover:border-gray-200'
        }
      `}
    >

      {/* Image + overlays */}
      <div className="relative w-20 h-20 lg:w-full lg:h-[300px] shrink-0 rounded-lg lg:rounded-none overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {verified && (
          <span className="absolute top-1 left-1 lg:top-2 lg:left-2 bg-green-500 text-white
                           text-[6px] lg:text-[10px] font-medium px-1.5 lg:px-2 py-0.5 rounded-full">
            Verified
          </span>
        )}

        <button
          onClick={(e) => {
            
            e.stopPropagation()
            setIsLiked((p) => !p)
          }}
          className="hidden lg:flex absolute top-2 right-2 bg-white/90 rounded-full p-1.5"
        >
          <Heart
            size={14}
            className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}
          />
        </button>

        <span className="absolute bottom-1 left-1 lg:bottom-2 lg:left-2 bg-white/90
                         text-[8px] lg:text-xs text-gray-700 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-md">
          {distance}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 lg:gap-1.5 p-0 lg:p-3 flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-[16px] lg:text-lg truncate">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-400">({totalRating} reviews)</span>
        </div>

        <p className="text-xs text-gray-500 w-[200px] md:w-full line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-400 truncate">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Action buttons — desktop only */}
        <div className="hidden lg:flex gap-2 mt-auto">
          <a
            href={`https://wa.me/${whatsapp}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 border
                       border-green-500 text-green-600 text-xs font-medium
                       rounded-md py-1.5 hover:bg-green-50 transition-colors"
          >
            <MessageCircle size={14} />
            Chat
          </a>
          <a
            href={`tel:${call}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 border
                       border-purple-500 text-purple-600 text-xs font-medium
                       rounded-md py-1.5 hover:bg-purple-50 transition-colors"
          >
            <Phone size={14} />
            Call
          </a>
        </div>
      </div>
    </div>
  )
}