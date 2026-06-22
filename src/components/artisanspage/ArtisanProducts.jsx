import React, { useContext, useState } from 'react'
import { ArtisansContext } from '../../content/ArtisansPage'
import ArtisansCard from './ArtisansCard'
import FilterContent from './FilterContent'
import {
  ChevronDown, Search, MapPin, LocateFixed,
  Map, LayoutGrid, List, SlidersHorizontal, Scissors, X
} from 'lucide-react'

export default function ArtisanProducts() {
  // Local UI state — controls whether the mobile drawer is open or closed
  // This is purely visual, so it lives here, NOT in context
  const [drawerOpen, setDrawerOpen] = useState(false)

  const {
    service, setService,
    location, setLocation,
    filteredArtisans,
    handleSearch,
  } = useContext(ArtisansContext)

  const handleService = (e) => setService(e.target.value)
  const handleLocation = (e) => setLocation(e.target.value)

  return (
    <main className="w-full flex flex-col flex-1 gap-4 px-4 lg:px-0 lg:pr-8 overflow-hidden">

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full border border-gray-200 rounded-2xl py-3 px-4">

        <div className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-2.5">
          <label className="text-xs text-gray-400">What service do you need?</label>
          <div className="flex items-center gap-2 mt-1">
            <Scissors size={16} className="text-gray-700 shrink-0" />
            <select
              value={service}
              onChange={handleService}
              className="flex-1 min-w-0 text-sm font-semibold text-gray-900 bg-transparent outline-none appearance-none"
            >
              <option value="">All Services</option>
              <option>Barber</option>
              <option>Fashion Designer</option>
              <option>Plumber</option>
              <option>Electrician</option>
            </select>
            <ChevronDown size={16} className="text-gray-400 shrink-0" />
          </div>
        </div>

        <div className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-2.5">
          <label className="text-xs text-gray-400">Where?</label>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={16} className="text-purple-600 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={handleLocation}
              placeholder="Enter your location"
              className="flex-1 min-w-0 text-sm font-semibold text-gray-900 bg-transparent outline-none"
            />
            <button type="button" className="text-gray-400 hover:text-purple-600 shrink-0">
              <LocateFixed size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-8 py-3 text-sm shrink-0 w-full sm:w-auto"
        >
          <Search size={16} />
          Search
        </button>
      </div>

      {/* Title and controls */}
      <div className="flex flex-col gap-3 w-full py-4 overflow-hidden">
        <div className="flex items-center justify-between gap-2">

          {/* Filters button — mobile only, opens the drawer */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <div className="flex items-center gap-2 lg:gap-4 lg:ml-auto">
            <button className="border border-purple-200 text-purple-600 px-3 lg:px-4 py-2 rounded-md flex items-center gap-2 text-sm">
              <Map size={18} />
              <span>View on Map</span>
            </button>
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              <button className="p-2 bg-purple-50 text-purple-600">
                <LayoutGrid size={18} />
              </button>
              <button className="p-2 text-gray-400">
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-full min-w-0">
          <h1 className="text-lg lg:text-2xl font-bold w-full break-words">
            {service && location
              ? `${service}s Near ${location}`
              : service
              ? `All ${service}s`
              : location
              ? `Artisans Near ${location}`
              : 'All Artisans'}
          </h1>
          <p className="text-sm text-gray-500">
            {filteredArtisans.length} Artisan{filteredArtisans.length !== 1 ? 's' : ''} Found
          </p>
        </div>
      </div>

      {/* Location banner */}
      <div className="bg-purple-50 text-sm text-gray-600 rounded-lg px-4 py-2.5 flex flex-wrap items-center gap-2">
        <MapPin size={14} className="text-purple-600 shrink-0" />
        <span>
          {location ? `Showing results near ${location}.` : 'Showing all results.'}
        </span>
        <button className="text-purple-600 font-medium shrink-0">Change location</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredArtisans.map((item) => (
          <ArtisansCard key={item.id} {...item} />
        ))}
      </div>

      {/* ── MOBILE FILTER DRAWER ── */}

      {/* Backdrop — clicking it closes the drawer */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* The sheet itself — slides up from the bottom */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl 
          max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle — visual affordance that this panel can be dismissed */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Close button */}
        <div className="flex items-center justify-between px-5 pt-2 pb-1">
          <span className="font-semibold text-gray-800">Filters</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Shared filter controls — identical to desktop sidebar */}
        <div className="px-5 pt-2 pb-4">
          <FilterContent />
        </div>

        {/* Show results button — closes drawer after applying */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-3 text-sm"
          >
            Show {filteredArtisans.length} Result{filteredArtisans.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>

    </main>
  )
}