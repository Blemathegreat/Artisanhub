/**
 * ReviewSubmitStep.jsx — Step 5
 *
 * Shows all collected data for review before final submission.
 * The only new RHF field here is the confirmation checkbox.
 *
 * Key concept: the user can click "Edit" on any section to jump
 * back to that step. The parent wizard handles this via the
 * goToStep(n) function passed as a prop.
 */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  User, Briefcase, MapPin, Image, Film, Award,
  Edit2, ArrowLeft, CheckCircle, Loader,
} from 'lucide-react'
import { reviewSchema } from './schema'

function ReviewCard({ title, icon: Icon, onEdit, children }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <Icon size={16} className="text-green-600" />
          </div>
          <h3 className="card-title font-semibold text-gray-800 text-sm">{title}</h3>
        </div>
        <button type="button" onClick={onEdit}
          className="flex items-center gap-1.5 text-xs text-green-600 font-medium
                     hover:underline">
          <Edit2 size={12} /> Edit
        </button>
      </div>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span className="caption text-xs text-gray-400 w-28 shrink-0">{label}</span>
      <span className="body-text text-xs font-medium text-gray-700 flex-1">{value || '—'}</span>
    </div>
  )
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle size={14} className="text-green-500 shrink-0" />
      <span className="caption text-xs text-gray-600">{text}</span>
    </div>
  )
}

export default function ReviewSubmitStep({ onNext, onBack, goToStep, formData }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { confirmed: false },
  })

  const onSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API submission
    await new Promise(r => setTimeout(r, 2000))
    onNext({})
  }

  const acct = formData?.account    || {}
  const biz  = formData?.business   || {}
  const port = formData?.portfolio  || {}

  const imageCount = port.images?.length || 0
  const videoCount = port.videos?.length || 0

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
          Step 5 of 5
        </p>
        <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Review your application
        </h1>
        <p className="body-text text-sm text-gray-500">
          Check everything looks correct before submitting.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Profile Information */}
        <ReviewCard title="Profile Information" icon={User} onEdit={() => goToStep(1)}>
          <ReviewRow label="Full Name"  value={acct.fullName} />
          <ReviewRow label="Email"      value={acct.email} />
          <ReviewRow label="Phone"      value={acct.phone} />
        </ReviewCard>

        {/* Business Information */}
        <ReviewCard title="Business Information" icon={Briefcase} onEdit={() => goToStep(3)}>
          <ReviewRow label="Business"  value={biz.businessName} />
          <ReviewRow label="Category"  value={biz.category} />
          <ReviewRow label="Location"  value={`${biz.area || ''}, ${biz.city || ''}, ${biz.state || ''}`} />
          <ReviewRow label="Home Service" value={biz.homeService === 'yes' ? 'Yes' : 'No'} />
          <ReviewRow label="Experience"   value={biz.experience ? `${biz.experience} years` : '—'} />
          {biz.description && (
            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <p className="text-xs text-gray-600 leading-5">{biz.description}</p>
            </div>
          )}
        </ReviewCard>

        {/* Portfolio */}
        <ReviewCard title="Portfolio" icon={Image} onEdit={() => goToStep(4)}>
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <CheckItem text={`${imageCount} photo${imageCount !== 1 ? 's' : ''} uploaded`} />
              {videoCount > 0
                ? <CheckItem text={`${videoCount} video${videoCount !== 1 ? 's' : ''} uploaded`} />
                : <div className="flex items-center gap-2">
                    <Film size={14} className="text-gray-300 shrink-0" />
                    <span className="text-xs text-gray-400">No videos — you can add later</span>
                  </div>
              }
            </div>
            {/* Thumbnail strip */}
            {port.images?.length > 0 && (
              <div className="flex gap-1">
                {port.images.slice(0, 3).map((img, i) => (
                  <img key={i} src={img.preview} alt=""
                    className="w-10 h-10 rounded-lg object-cover" />
                ))}
                {port.images.length > 3 && (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center
                                  justify-center text-xs font-bold text-gray-500">
                    +{port.images.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </ReviewCard>

        {/* Experience */}
        <ReviewCard title="Experience" icon={Award} onEdit={() => goToStep(3)}>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-gray-900">{biz.experience || 0}</span>
            <span className="text-sm text-gray-500 mb-1">years of experience</span>
          </div>
        </ReviewCard>

        {/* Confirmation checkbox */}
        <div className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer
                         transition-colors ${
          errors.confirmed
            ? 'border-red-300 bg-red-50'
            : 'border-gray-200 hover:border-green-300'
        }`}>
          {/*
            Checkboxes use register() the same as text inputs.
            The value stored in formState is a boolean (true/false).
            We validate it must be true using .refine() in the schema.
          */}
          <input
            {...register('confirmed')}
            type="checkbox"
            id="confirmed"
            className="mt-0.5 w-4 h-4 accent-green-600 cursor-pointer shrink-0"
          />
          <label htmlFor="confirmed" className="body-text text-sm text-gray-700 cursor-pointer leading-5">
            I confirm that the information provided is accurate and I agree to
            ArtisanHub's{' '}
            <span className="text-green-600 underline">Terms of Service</span> and{' '}
            <span className="text-green-600 underline">Privacy Policy</span>.
          </label>
        </div>
        {errors.confirmed && (
          <p className="caption text-xs text-red-500 -mt-2">{errors.confirmed.message}</p>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack}
            className="flex items-center gap-2 border border-gray-200 text-gray-600
                       hover:bg-gray-50 font-semibold px-5 py-3 rounded-xl
                       transition-colors text-sm">
            <ArrowLeft size={16} /> Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600
                       hover:bg-green-700 text-white font-semibold py-3 rounded-xl
                       transition-colors text-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <><Loader size={16} className="animate-spin" /> Submitting...</>
            ) : (
              <><CheckCircle size={16} /> Submit Application</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}