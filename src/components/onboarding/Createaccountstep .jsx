
 
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react'
import { createAccountSchema } from './schema'

// Password strength meter — computed from the password string
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8)          score++
  if (/[A-Z]/.test(password))        score++
  if (/[a-z]/.test(password))        score++
  if (/[0-9]/.test(password))        score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map = [
    { score: 0, label: '',          color: 'bg-gray-200' },
    { score: 1, label: 'Very weak', color: 'bg-red-400'  },
    { score: 2, label: 'Weak',      color: 'bg-orange-400' },
    { score: 3, label: 'Fair',      color: 'bg-yellow-400' },
    { score: 4, label: 'Strong',    color: 'bg-green-400'  },
    { score: 5, label: 'Very strong', color: 'bg-green-600' },
  ]
  return map[score]
}

// Reusable input wrapper — shows icon, error message, and focus ring
function Field({ label, error, icon: Icon, children }) {
  return (
    <div>
      <label className="block body-text text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2
                                     text-gray-400 pointer-events-none" />
        )}
        {children}
      </div>
      {error && (
        <p className="mt-1.5 caption text-xs text-red-500 flex items-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-500 flex items-center
                           justify-center text-[9px] font-bold shrink-0">!</span>
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError, hasIcon = true) =>
  `w-full border rounded-xl text-sm py-3 pr-4 ${hasIcon ? 'pl-10' : 'pl-4'}
   outline-none transition-all placeholder:text-gray-300
   ${hasError
     ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200'
     : 'border-gray-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100'
   }`

export default function CreateAccountStep({ onNext, defaultValues }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: defaultValues || {},
    mode: 'onChange',
  })

  
  const passwordValue = watch('password') || ''
  const strength = getPasswordStrength(passwordValue)

  const onSubmit = (data) => {
    // Pass validated data up to the parent wizard
    onNext(data)
  }

  return (
    <div className="max-w-lg mx-auto mb-8">
      <div className="mb-8">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
          Step 1 of 5
        </p>
        <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Let's create your ArtisanHub account
        </h1>
        <p className="body-text text-gray-500 text-sm">
          Fill in your details to get started. It takes less than 2 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

        {/* Full Name */}
        <Field label="Full Name" error={errors.fullName?.message} icon={User}>
          <input
            {...register('fullName')}
            type="text"
            placeholder="e.g. Musa Adewale"
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" error={errors.email?.message} icon={Mail}>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className={inputClass(!!errors.email)}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number" error={errors.phone?.message} icon={Phone}>
          <input
            {...register('phone')}
            type="tel"
            placeholder="08012345678"
            className={inputClass(!!errors.phone)}
          />
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password?.message} icon={Lock}>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimum 8 characters"
            className={inputClass(!!errors.password)}
          />
          <button type="button"
            onClick={() => setShowPassword(p => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400
                       hover:text-gray-600 transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Field>

        {/* Password strength meter — only shows if user has typed something */}
        {passwordValue.length > 0 && (
          <div className="-mt-2">
            <div className="flex gap-1 mb-1">
              {[1,2,3,4,5].map(i => (
                <div key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i <= strength.score ? strength.color : 'bg-gray-200'
                  }`} />
              ))}
            </div>
            {strength.label && (
              <p className="text-xs text-gray-500">
                Password strength: <span className="font-medium">{strength.label}</span>
              </p>
            )}
          </div>
        )}

        {/* Confirm Password */}
        <Field label="Confirm Password" error={errors.confirmPassword?.message} icon={Lock}>
          <input
            {...register('confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter your password"
            className={inputClass(!!errors.confirmPassword)}
          />
          <button type="button"
            onClick={() => setShowConfirm(p => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400
                       hover:text-gray-600 transition-colors">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Field>

        {/* Submit */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600
                       hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl
                       transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue <ArrowRight size={16} />
          </button>
          <button type="button"
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600
                       py-2 transition-colors">
            Save and continue later
          </button>
        </div>
      </form>
    </div>
  )
}