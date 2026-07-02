/**
 * OnboardingSidebar.jsx
 *
 * Displays the 5-step progress on the left side.
 * Props:
 *   currentStep  — number 1-5 (or 6 for success)
 *   formData     — the accumulated form data (to show artisan name)
 */
import React from 'react'
import { Check } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Create Account',       sub: 'Your personal details' },
  { number: 2, label: 'Verify Phone Number',  sub: 'Confirm your identity' },
  { number: 3, label: 'Business Information', sub: 'Your artisan profile' },
  { number: 4, label: 'Portfolio Upload',     sub: 'Showcase your work' },
  { number: 5, label: 'Application Submitted', sub: 'Just now' },
]

export default function OnboardingSidebar({ currentStep }) {
  const progress = Math.round(((currentStep - 1) / 4) * 100)

  return (
    <aside className="w-full lg:w-[260px] shrink-0 bg-white border-b lg:border-b-0
                      lg:border-r border-gray-100 px-6 py-8">

      {/* Brand */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center
                        justify-center text-white font-bold text-sm">A</div>
        <span className="font-bold text-gray-900 text-lg">ArtisanHub</span>
      </div>

      {/* Title */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        Artisan Onboarding
      </p>
      <p className="text-sm text-green-600 font-medium mb-6">
        {currentStep >= 5 ? 'Submission Successful' : `Step ${currentStep} of 5`}
      </p>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs font-semibold text-green-600">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps list */}
      <nav className="space-y-1">
        {STEPS.map((step) => {
          const isCompleted = currentStep > step.number
          const isActive    = currentStep === step.number
          const isPending   = currentStep < step.number

          return (
            <div key={step.number}
              className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-green-50' : ''
              }`}>

              {/* Step circle */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center
                               shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                isCompleted ? 'bg-green-600 text-white' :
                isActive    ? 'bg-green-600 text-white ring-4 ring-green-100' :
                              'bg-gray-100 text-gray-400'
              }`}>
                {isCompleted ? <Check size={13} strokeWidth={3} /> : step.number}
              </div>

              {/* Step text */}
              <div>
                <p className={`text-sm font-semibold leading-tight ${
                  isActive    ? 'text-green-600' :
                  isCompleted ? 'text-gray-700'  :
                                'text-gray-400'
                }`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 ${
                  isCompleted ? 'text-green-500' :
                  isActive    ? 'text-green-500' :
                                'text-gray-300'
                }`}>
                  {isCompleted ? 'Completed' : isActive ? 'In progress' : step.sub}
                </p>
              </div>
            </div>
          )
        })}
      </nav>

      {/* What happens next — shown after step 4 */}
      {currentStep >= 5 && (
        <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-800 mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center
                             justify-center text-[9px]">i</span>
            What happens next?
          </p>
          <ul className="space-y-1.5">
            {[
              'Our admin team will review your application.',
              'You will receive an email and SMS notification once a decision is made.',
              'This usually takes 24–48 hours.',
            ].map((item, i) => (
              <li key={i} className="text-xs text-green-700 flex items-start gap-1.5">
                <Check size={11} className="text-green-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}