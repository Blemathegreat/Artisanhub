import { Star } from 'lucide-react'

export function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-200 fill-gray-200'
          }
        />
      ))}
    </div>
  )
}

export function RatingBar({ count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
