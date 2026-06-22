import React, { useContext } from 'react'
import { ArtisansContext } from '../../content/ArtisansPage'

const ratingsData = [
  { value: 4.5, stars: 4.5, label: '4.5 & above' },
  { value: 4.0, stars: 4,   label: '4.0 & above' },
  { value: 3.5, stars: 3.5, label: '3.5 & above' },
  { value: 3.0, stars: 3,   label: '3.0 & above' },
  { value: 'any', stars: 1, label: 'Any rating'   },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm ${i <= Math.floor(count) ? 'text-amber-400' : 'text-gray-200'}`}
        >★</span>
      ))}
    </div>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
        on ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
        on ? 'translate-x-4' : 'translate-x-0'
      }`} />
    </button>
  )
}

export default function FilterContent() {
  const {
    distance, setDistance,
    sortBy, setSortBy,
    ratings, toggleRating,
    openNow, setOpenNow,
    verifiedOnly, setVerifiedOnly,
    clearAll,
    filteredArtisans,
  } = useContext(ArtisansContext)

  return (
    <div className="text-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-gray-800 text-base">Filters</h2>
        <button onClick={clearAll} className="text-xs text-purple-600 font-medium">
          Clear all
        </button>
      </div>

      {/* Distance */}
      <p className="font-medium text-gray-700 mb-2">Distance</p>
      <div className="flex flex-col gap-2 mb-4">
        {[
          { value: '1', label: 'Near me (0 – 5 km)' },
          { value: '2', label: '5 – 10 km' },
          { value: '3', label: '10 – 20 km' },
          { value: '4', label: '20+ km' },
        ].map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer text-gray-500">
            <input
              type="radio"
              name="distance"
              value={value}
              checked={distance === value}
              onChange={() => setDistance(value)}
              className="accent-purple-600"
            />
            <span className={distance === value ? 'text-gray-800' : ''}>{label}</span>
          </label>
        ))}
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Sort by */}
      <p className="font-medium text-gray-700 mb-2">Sort by</p>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-700 bg-white mb-4"
      >
        <option value="nearest">Nearest</option>
        <option value="rating">Highest Rated</option>
        <option value="reviews">Most Reviewed</option>
        <option value="recent">Recently Active</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      <hr className="border-gray-100 mb-4" />

      {/* Rating */}
      <p className="font-medium text-gray-700 mb-2">Rating</p>
      <div className="flex flex-col gap-2 mb-4">
        {ratingsData.map(({ value, stars, label }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ratings.includes(value)}
              onChange={() => toggleRating(value)}
              className="accent-purple-600"
            />
            <div className="flex items-center justify-between flex-1">
              <StarRating count={stars} />
              <span className="text-xs text-gray-400 whitespace-nowrap">{label}</span>
            </div>
          </label>
        ))}
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Open now */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500">Open now</span>
        <Toggle on={openNow} onToggle={() => setOpenNow((p) => !p)} />
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Verified only */}
      <p className="font-medium text-gray-700 mb-2">Other filters</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-gray-500">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" className="text-purple-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <span>Verified only</span>
        </div>
        <Toggle on={verifiedOnly} onToggle={() => setVerifiedOnly((p) => !p)} />
      </div>

    </div>
  )
}