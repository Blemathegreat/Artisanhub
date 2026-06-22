import React from 'react'
import FilterContent from './FilterContent'

export default function ArtisanSearch() {
  return (
    <aside className="hidden lg:block w-[300px] shrink-0 px-6 py-2 lg:py-[80px] bg-white">
      <div className="border border-gray-100 rounded-xl p-4">
        <FilterContent />
      </div>
    </aside>
  )
}