import React from 'react'
import { Star, MapPin, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'

function ReviewRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-b-0">
      <span className="caption text-xs text-gray-400 font-medium shrink-0 w-28">{label}</span>
      <span className="body-text text-xs text-gray-800 font-semibold text-right">{value}</span>
    </div>
  )
}

const TIME_LABELS = {
  morning:   'Morning (8am – 12pm)',
  afternoon: 'Afternoon (12pm – 4pm)',
  evening:   'Evening (4pm – 8pm)',
  '':        'Any time',
}

export default function RequestReviewStep({
  artisan,
  form,
  photoPreviews,
  isSubmitting,
  onBack,
  onSubmit,
}) {
  const values = form.getValues()

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Flexible'
    return new Date(dateStr).toLocaleDateString('en-NG', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  return (
    <div className="flex flex-col gap-5">

      {/* ── Artisan summary ── */}
      <div className="flex items-center gap-3 border border-gray-100 rounded-2xl p-3 bg-gray-50">
        <img
          src={artisan.image}
          alt={artisan.title}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="card-title text-sm font-bold text-gray-900 truncate">{artisan.title}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Star size={12} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <span className="caption text-xs text-gray-700 font-medium">{artisan.rating}</span>
            <span className="caption text-xs text-gray-400">({artisan.totalRating} reviews)</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={11} className="text-gray-400 flex-shrink-0" />
            <span className="caption text-xs text-gray-500 truncate">{artisan.location}</span>
          </div>
        </div>
        {artisan.verified && (
          <div className="flex items-center gap-1 bg-green-50 border border-green-200
                           text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">
            <ShieldCheck size={11} />
            Verified
          </div>
        )}
      </div>

      {/* ── Summary ── */}
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm">
        <ReviewRow label="Service"     value={values.serviceType} />
        <ReviewRow label="Date"        value={formatDate(values.preferredDate)} />
        <ReviewRow label="Time"        value={TIME_LABELS[values.preferredTime] ?? 'Any time'} />
        <ReviewRow label="Location"    value={values.location} />
        <ReviewRow label="Phone"       value={values.phoneNumber} />
        <ReviewRow label="Description" value={values.description} />
      </div>

      {/* ── Photos ── */}
      {photoPreviews.length > 0 && (
        <div>
          <p className="small-label text-xs font-semibold text-gray-400 mb-2">
            PHOTOS ({photoPreviews.length})
          </p>
          <div className="grid grid-cols-4 gap-2">
            {photoPreviews.map((p, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={p.url} alt={`photo-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-yellow-400
                     hover:bg-yellow-500 active:bg-yellow-600 disabled:opacity-70
                     text-gray-900 font-bold py-4 rounded-2xl transition-colors text-sm shadow-sm"
        >
          {isSubmitting ? (
            <><Loader2 size={16} className="animate-spin" /> Sending...</>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Send Request
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 border border-gray-200
                     text-gray-600 font-semibold py-3.5 rounded-2xl hover:bg-gray-50
                     transition-colors text-sm disabled:opacity-50"
        >
          <ArrowLeft size={15} /> Back to Edit
        </button>

        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your details are safe and secure
        </p>
      </div>
    </div>
  )
}