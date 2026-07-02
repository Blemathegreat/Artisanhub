import { Star } from 'lucide-react'
import { StarRow, RatingBar } from './ProfileUtils'

export default function ProfileReviews({ artisan }) {
  const reviews = artisan.reviews ?? []

  // Build rating breakdown from reviews array
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach(r => {
    if (breakdown[r.rating] !== undefined) breakdown[r.rating]++
  })
  const total = reviews.length || artisan.totalRating

  return (
    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-heading text-lg font-bold text-gray-900">Reviews ({artisan.totalRating})</h2>
        <button className="small-label text-green-600 text-sm font-medium hover:underline">See all reviews</button>
      </div>

      {/* Rating summary */}
      <div className="flex gap-6 mb-6">
        <div className="flex flex-col items-center justify-center shrink-0">
          <span className="display-heading text-5xl font-bold text-gray-900 leading-none">{artisan.rating}</span>
          <StarRow rating={artisan.rating} size={14} />
          <span className="caption text-xs text-gray-400 mt-1">Based on {artisan.totalRating} reviews</span>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-3">{star}</span>
              <Star size={11} className="text-yellow-400 fill-yellow-400 shrink-0" />
              <RatingBar count={breakdown[star]} total={total} />
              <span className="text-xs text-gray-400 w-5 text-right">{breakdown[star]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-4">
        {reviews.map((rev, i) => (
          <div key={rev.id ?? i} className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0">
              {rev.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{rev.name}</span>
                  <StarRow rating={rev.rating} size={11} />
                </div>
                {rev.time && <span className="text-xs text-gray-400 shrink-0">{rev.time}</span>}
              </div>
              <p className="text-sm text-gray-500 leading-5">{rev.comment ?? rev.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
