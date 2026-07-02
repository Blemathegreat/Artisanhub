/**
 * BusinessInfoStep.jsx — Step 3
 *
 * Demonstrates:
 * - select inputs with register()
 * - textarea with character counter using watch()
 * - radio buttons with register()
 * - controlled character count with watch()
 */
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { businessInfoSchema } from './schema'

const CATEGORIES = [
  'Barber', 'Plumber', 'Electrician', 'Fashion Designer',
  'Mechanic', 'Carpenter', 'Painter', 'Cleaner', 'Other',
]

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
  'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

function FieldError({ error }) {
  if (!error) return null
  return (
    <p className="mt-1.5 text-xs text-red-500">{error}</p>
  )
}

const inputClass = (hasError) =>
  `w-full border rounded-xl text-sm px-4 py-3 outline-none transition-all
   placeholder:text-gray-300 bg-white
   ${hasError
     ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100'
     : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100'
   }`

export default function BusinessInfoStep({ onNext, onBack, defaultValues }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: defaultValues || { homeService: 'no' },
    mode: 'onChange',
  })

  /**
   * watch('description') gives us the live character count.
   * Every time the textarea updates, React re-renders the counter.
   * This is more efficient than an uncontrolled onChange handler
   * because RHF only re-renders what actually uses the watched value.
   */
  const descriptionValue = watch('description') || ''

  const onSubmit = (data) => onNext(data)

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
          Step 3 of 5
        </p>
        <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Tell customers about your business
        </h1>
        <p className="body-text text-sm text-gray-500">
          This information appears on your public artisan profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Business Name
          </label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2
                                            text-gray-400 pointer-events-none" />
            <input
              {...register('businessName')}
              type="text"
              placeholder="e.g. TrueFade Barbershop"
              className={`${inputClass(!!errors.businessName)} pl-10`}
            />
          </div>
          <FieldError error={errors.businessName?.message} />
        </div>

        {/* Category — a <select> works exactly like an <input> with register() */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Artisan Category
          </label>
          <select
            {...register('category')}
            className={inputClass(!!errors.category)}
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <FieldError error={errors.category?.message} />
        </div>

        {/* Location grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
            <select {...register('state')} className={inputClass(!!errors.state)}>
              <option value="">Select state...</option>
              {NIGERIAN_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <FieldError error={errors.state?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
            <input
              {...register('city')}
              type="text"
              placeholder="e.g. Ibadan"
              className={inputClass(!!errors.city)}
            />
            <FieldError error={errors.city?.message} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Area / Neighbourhood</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         text-gray-400 pointer-events-none" />
            <input
              {...register('area')}
              type="text"
              placeholder="e.g. Bodija"
              className={`${inputClass(!!errors.area)} pl-10`}
            />
          </div>
          <FieldError error={errors.area?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Address</label>
          <input
            {...register('address')}
            type="text"
            placeholder="e.g. 12 Bodija Market Road, Ibadan"
            className={inputClass(!!errors.address)}
          />
          <FieldError error={errors.address?.message} />
        </div>

        {/* Home Service — radio buttons */}
        <div>
            <label className="block body-text text-sm font-medium text-gray-700 mb-2">
            Do you offer Home Service?
          </label>
          <div className="flex gap-4">
            {['yes', 'no'].map(val => (
              <label key={val}
                className="flex items-center gap-2 cursor-pointer">
                {/*
                  Radio buttons use register() the same way as text inputs.
                  The value="" attribute on each radio is what gets stored
                  in the form state when that radio is selected.
                */}
                <input
                  {...register('homeService')}
                  type="radio"
                  value={val}
                  className="accent-green-600 w-4 h-4"
                />
                <span className="text-sm text-gray-700 capitalize">{val}</span>
              </label>
            ))}
          </div>
          <FieldError error={errors.homeService?.message} />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Years of Experience
          </label>
          <input
            {...register('experience')}
            type="number"
            min="1"
            max="50"
            placeholder="e.g. 5"
            className={inputClass(!!errors.experience)}
          />
          <FieldError error={errors.experience?.message} />
        </div>

        {/* Description — textarea with live character counter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-700">
              Business Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            {/*
              descriptionValue.length uses watch() to stay live.
              Color changes to red as the user approaches the limit.
            */}
            <span className={`text-xs ${
              descriptionValue.length > 450 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {descriptionValue.length}/500
            </span>
          </div>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Describe your services, experience, and what makes you stand out..."
            className={`${inputClass(!!errors.description)} resize-none`}
          />
          <FieldError error={errors.description?.message} />
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack}
            className="flex items-center gap-2 border border-gray-200 text-gray-600
                       hover:bg-gray-50 font-semibold px-5 py-3 rounded-xl
                       transition-colors text-sm">
            <ArrowLeft size={16} /> Back
          </button>
          <button type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600
                       hover:bg-green-700 text-white font-semibold py-3 rounded-xl
                       transition-colors text-sm">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}