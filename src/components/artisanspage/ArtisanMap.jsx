import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import { ArtisansContext } from '../../content/ArtisansPage'
import { useGeocode } from '../../hooks/useGeocode'
import { useNavigate } from 'react-router-dom'
import { X, Loader, Search, Star, MapPin, Plus, Minus } from 'lucide-react'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})




const createCustomIcon = (name, isSelected) => {
  const labelBg = isSelected ? '#7C3AED' : '#ffffff'
  const labelText = isSelected ? '#ffffff' : '#1f2937'
  const shadow = isSelected
    ? '0 4px 12px rgba(124,58,237,0.45)'
    : '0 2px 6px rgba(0,0,0,0.18)'

  return L.divIcon({
    className: '',
    iconAnchor: [12, 30],
    html: `
      <div style="display:flex;align-items:center;gap:5px;cursor:pointer;">
        <div style="width:24px;height:30px;flex-shrink:0;filter:drop-shadow(${shadow});">
          <svg viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg"
               width="100%" height="100%">
            <path d="M12 0C7.589 0 4 3.589 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.411-3.589-8-8-8z"
                  fill="#7C3AED"/>
            <circle cx="12" cy="8" r="3.5" fill="white"/>
          </svg>
        </div>
        <div style="
          background:${labelBg};
          color:${labelText};
          font-size:11px;
          font-weight:600;
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
          padding:3px 8px;
          border-radius:20px;
          white-space:nowrap;
          box-shadow:${shadow};
          border:${isSelected ? 'none' : '1px solid #e5e7eb'};
        ">${name}</div>
      </div>
    `,
  })
}

// ── All map controls in ONE component so useMap() is called correctly ──
function MapControls({ selectedCenter, filteredArtisans, coords }) {
  const map = useMap()

  // Fix gray tiles — invalidate after container fully expands
  useEffect(() => {
    const t1 = setTimeout(() => map.invalidateSize(), 100)
    const t2 = setTimeout(() => map.invalidateSize(), 400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [map])

  // Fly to selected artisan
  useEffect(() => {
    if (selectedCenter) {
      map.flyTo(selectedCenter, 15, { duration: 1.2 })
    }
  }, [selectedCenter, map])

  // Fit bounds to all filtered artisans after geocoding
  useEffect(() => {
    const positions = filteredArtisans
      .map((a) => coords[a.id])
      .filter(Boolean)
      .map((c) => [c.lat, c.lon])

    if (positions.length === 0) return
    if (positions.length === 1) {
      map.flyTo(positions[0], 14, { duration: 1 })
      return
    }
    const bounds = L.latLngBounds(positions)
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 })
  }, [filteredArtisans, coords, map])

 
  return (
    // Zoom buttons rendered inside MapContainer so map instance is available
    <div
      style={{ zIndex: 1001 }}
      className="absolute top-4 right-4 flex flex-col bg-white
                 rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <button
        onClick={() => map.zoomIn()}
        className="w-9 h-9 flex items-center justify-center text-gray-600
                   hover:bg-gray-50 border-b border-gray-100 transition-colors"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-9 h-9 flex items-center justify-center text-gray-600
                   hover:bg-gray-50 transition-colors"
      >
        <Minus size={16} />
      </button>
    </div>
  )
}

export default function ArtisanMap() {
     const navigate = useNavigate()
  const {
    filteredArtisans,
    selectedArtisan,
    setSelectedArtisan,
  } = useContext(ArtisansContext)

  const { coords, loading, geocodeArtisans } = useGeocode()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (filteredArtisans.length > 0) {
      geocodeArtisans(filteredArtisans)
    }
  }, [filteredArtisans])

  const defaultCenter = [7.3775, 3.9470]
  const selectedCoords = selectedArtisan ? coords[selectedArtisan.id] : null
  const selectedCenter = selectedCoords
    ? [selectedCoords.lat, selectedCoords.lon]
    : null

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden
                    border border-gray-200 shadow-sm">

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-[1002] bg-white/90 backdrop-blur-sm
                        flex flex-col items-center justify-center gap-3">
          <Loader size={26} className="text-purple-600 animate-spin" />
          <p className="text-sm font-medium text-gray-700">Finding artisans on map...</p>
          <p className="text-xs text-gray-400">This takes a few seconds the first time</p>
        </div>
      )}

      {/* Search pill — outside MapContainer so it stays above everything */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1001]
                      flex items-center gap-2 bg-white rounded-full
                      shadow-md px-4 py-2.5 w-[200px] sm:w-[240px]">
        <Search size={14} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search this area"
          className="text-sm text-gray-600 outline-none bg-transparent
                     placeholder:text-gray-400 w-full"
        />
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* All useMap() calls happen inside MapContainer */}
        <MapControls
          selectedCenter={selectedCenter}
          filteredArtisans={filteredArtisans}
          coords={coords}
        />

        {filteredArtisans.map((artisan) => {
          const position = coords[artisan.id]
          if (!position) return null
          const isSelected = selectedArtisan?.id === artisan.id

          return (
            <Marker
              key={artisan.id}
              position={[position.lat, position.lon]}
              icon={createCustomIcon(artisan.title, isSelected)}
              eventHandlers={{
                click: () => setSelectedArtisan(artisan),
              }}
            />
          )
        })}
      </MapContainer>

      {/* Selected artisan card */}
      {selectedArtisan && (
        <div className="absolute bottom-4 left-4 right-4 z-[1001]
                        bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex gap-3 p-3">
            <img
              src={selectedArtisan.image}
              alt={selectedArtisan.title}
              className="w-[68px] h-[68px] rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                  {selectedArtisan.title}
                </h3>
                <button
                  onClick={() => setSelectedArtisan(null)}
                  className="shrink-0 w-6 h-6 flex items-center justify-center
                             rounded-full hover:bg-gray-100 text-gray-400
                             hover:text-gray-600 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <Star size={11} className="text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-800">
                  {selectedArtisan.rating}
                </span>
                <span className="text-xs text-gray-400">
                  ({selectedArtisan.totalRating} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={10} className="shrink-0" />
                <span className="truncate">
                  {selectedArtisan.distance} · {selectedArtisan.location}
                </span>
              </div>
            </div>
          </div>

          <div className="px-3 pb-3">
           <button
  onClick={() => navigate(`/artisan/${selectedArtisan.id}`)}
  className="w-full py-2.5 rounded-xl border border-purple-500
             text-purple-600 text-sm font-semibold
             hover:bg-purple-50 transition-colors"
>
  View Profile
</button>
          </div>
        </div>
      )}
    </div>
  )
}