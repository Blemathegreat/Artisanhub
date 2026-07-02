import React from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronRight } from 'lucide-react'
import { artisan, reviews } from './ArtisanDashboarddata'

function Avatar({ name, src }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (src) return <img src={src} alt={name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
  return (
    <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-bold text-xs
                    flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  )
}

function StarRow({ rating, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function RecentReviews() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-heading font-bold text-gray-900 text-base">Recent Reviews</h2>
        <button className="small-label text-sm font-semibold text-green-600 hover:underline flex items-center gap-1">
          View all <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

        {/* Average rating block */}
        <div className="flex flex-col items-center sm:items-start sm:w-28 shrink-0
                        sm:border-r sm:border-gray-100 sm:pr-4">
          <p className="display-heading text-4xl font-bold text-gray-900 leading-none">{artisan.rating}</p>
          <StarRow rating={Math.round(artisan.rating)} size={14} />
          <p className="text-xs text-gray-400 mt-1">({artisan.reviewCount} reviews)</p>
        </div>

        {/* Review cards */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="border border-gray-100 rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={review.reviewer} src={review.avatar} />
                <div className="flex-1 min-w-0">
                  <p className="card-title text-sm font-semibold text-gray-800 truncate">
                    {review.reviewer}
                  </p>
                  <span className="caption text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
              <StarRow rating={review.rating} />
              <p className="body-text text-xs text-gray-500 mt-1.5 leading-5 line-clamp-2">
                {review.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}