import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function ProfileAbout({ artisan }) {
  const [showFull, setShowFull] = useState(false)

  const details = [
    { label: 'Experience',   value: artisan.experience },
    { label: 'Location',     value: artisan.location },
    { label: 'Languages',    value: artisan.languages ?? 'English, Yoruba' },
    { label: 'Service Type', value: artisan.homeService ? 'At Shop & Home Service' : 'At Shop Only' },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h2 className="section-heading text-lg font-bold text-gray-900 mb-3">About {artisan.title}</h2>

      <p className={`body-text text-sm text-gray-500 leading-6 mb-4 ${!showFull ? 'line-clamp-3' : ''}`}>
        {artisan.about}
      </p>

      <button
        onClick={() => setShowFull(p => !p)}
        className="small-label text-green-600 text-sm font-medium flex items-center gap-1 mb-5"
      >
        {showFull ? 'Show Less' : 'View Full Details'}
        <ChevronRight size={14} className={`transition-transform ${showFull ? 'rotate-90' : ''}`} />
      </button>

      <div className="space-y-2.5 text-sm">
        {details.map(({ label, value }) => value && (
          <div key={label} className="flex items-start gap-3">
            <span className="caption text-gray-400 w-24 shrink-0">{label}</span>
            <span className="body-text text-gray-800 font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
