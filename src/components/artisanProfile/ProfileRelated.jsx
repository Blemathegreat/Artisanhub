import { Link } from 'react-router-dom'
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProfileRelated({ related = [] }) {
  if (related.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-heading text-lg font-bold text-gray-900">You May Also Like</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map(rel => (
          <Link
            key={rel.id}
            to={`/artisan/${rel.id}`}
            className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="relative h-[140px] overflow-hidden">
              <img
                src={rel.image}
                alt={rel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={e => e.preventDefault()}
                className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
              >
                <Heart size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="p-3">
              <p className="card-title font-semibold text-gray-800 text-sm truncate">{rel.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-gray-700">{rel.rating}</span>
                <span className="text-xs text-gray-400">({rel.totalRating} reviews)</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{rel.distance}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
