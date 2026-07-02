import React, { useRef } from 'react'
import {
  Star, MapPin, ShieldCheck, ChevronDown,
  Calendar, Clock, Phone, ImagePlus, X, Crosshair,
} from 'lucide-react'

function Field({ label, required, optional, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="body-text text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && (
          <span className="text-gray-400 font-normal ml-1">(Optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-500
                           flex items-center justify-center text-[9px] font-bold shrink-0">!</span>
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'w-full border border-gray-200 rounded-xl text-sm px-4 py-3 outline-none ' +
  'transition-all placeholder:text-gray-300 bg-white ' +
  'focus:border-green-500 focus:ring-2 focus:ring-green-100'

const inputError =
  'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'

export default function RequestServiceForm({
  artisan,
  form,
  photoPreviews,
  addPhotos,
  removePhoto,
  onContinue,
}) {
  const { register, watch, formState: { errors } } = form
  const description = watch('description') ?? ''
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files) addPhotos(e.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-5">

      {/* ── Artisan summary card ── */}
      <div className="flex items-center gap-3 border border-gray-100 rounded-2xl p-3 bg-gray-50">
        <img
          src={artisan.image}
          alt={artisan.title}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="card-title text-sm font-bold text-gray-900 truncate">{artisan.title}</h3>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <Star size={12} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <span className="caption text-xs text-gray-700 font-medium">{artisan.rating}</span>
            <span className="caption text-xs text-gray-400">({artisan.totalRating} reviews)</span>
            {artisan.distance && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-green-600 font-medium">{artisan.distance}</span>
              </>
            )}
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

      {/* ── Service Type ── */}
      <Field label="Service Needed" required error={errors.serviceType?.message}>
        <div className="relative">
          <select
            {...register('serviceType')}
            className={`${inputBase} appearance-none pr-10 ${errors.serviceType ? inputError : ''}`}
          >
            <option value="">Select a service</option>
            {artisan.services?.map((s) => (
              <option key={s.id ?? s.name} value={s.name}>
                {s.name}{s.price ? ` — ₦${s.price.toLocaleString()}` : ''}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </Field>

      {/* ── Date + Time ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Preferred Date" optional error={errors.preferredDate?.message}>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              {...register('preferredDate')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={`${inputBase} pl-10 ${errors.preferredDate ? inputError : ''}`}
            />
          </div>
        </Field>

        <Field label="Preferred Time" optional error={errors.preferredTime?.message}>
          <div className="relative">
            <Clock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              {...register('preferredTime')}
              className={`${inputBase} pl-10 appearance-none pr-10 ${errors.preferredTime ? inputError : ''}`}
            >
              <option value="">Any time</option>
              <option value="morning">Morning (8am – 12pm)</option>
              <option value="afternoon">Afternoon (12pm – 4pm)</option>
              <option value="evening">Evening (4pm – 8pm)</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </Field>
      </div>

      {/* ── Description ── */}
      <Field label="Describe Your Need" required error={errors.description?.message}>
        <div className="relative">
          <textarea
            {...register('description')}
            rows={4}
            maxLength={500}
            placeholder="e.g. I need a home service haircut this weekend for a wedding event."
            className={`${inputBase} resize-none ${errors.description ? inputError : ''}`}
          />
          <span className="absolute bottom-3 right-3 text-xs text-gray-400">
            {description.length}/500
          </span>
        </div>
      </Field>

      {/* ── Location + Phone ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location / Address" required error={errors.location?.message}>
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              {...register('location')}
              type="text"
              placeholder="e.g. Bodija, Ibadan, Oyo State"
              className={`${inputBase} pl-10 pr-10 ${errors.location ? inputError : ''}`}
            />
            <button
              type="button"
              title="Use my current location"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300
                         hover:text-green-500 transition-colors"
            >
              <Crosshair size={15} />
            </button>
          </div>
        </Field>

        <Field label="Phone Number" required error={errors.phoneNumber?.message}>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              {...register('phoneNumber')}
              type="tel"
              placeholder="0803 123 4567"
              className={`${inputBase} pl-10 ${errors.phoneNumber ? inputError : ''}`}
            />
          </div>
        </Field>
      </div>

      {/* ── Upload Photos ── */}
      <Field label="Upload Photos" optional>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="grid grid-cols-4 gap-2"
        >
          {photoPreviews.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-200
                         flex flex-col items-center justify-center gap-1
                         hover:border-green-400 hover:bg-green-50 transition-colors group"
            >
              <ImagePlus size={20} className="text-gray-300 group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] text-gray-400 group-hover:text-green-500">Add</span>
            </button>
          )}
          {photoPreviews.map((p, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
              <img src={p.url} alt={`upload-${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full
                           flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
        <p className="caption text-xs text-gray-400 mt-1">You can add up to 4 photos</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => addPhotos(e.target.files)}
        />
      </Field>

      {/* ── CTA ── */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full flex items-center justify-center gap-2 bg-yellow-400
                     hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-bold
                     py-4 rounded-2xl transition-colors text-sm shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          Send Request
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