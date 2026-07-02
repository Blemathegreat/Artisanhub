import React, { useState } from 'react'
import OnboardingSidebar from './OnboardingSidebar'
import CreateAccountStep from "./Createaccountstep "
import VerifyPhoneStep from './Verifyphonestep'
import BusinessInfoStep from './Businessinfostep'
import PortfolioUploadStep from './Portfoliouploadstep'
import ReviewSubmitStep from './Reviewsubmitstep'
import SuccessScreen from './Successscreen'
import { Check } from 'lucide-react'

const STEP_LABELS = ['Account', 'Verify', 'Business', 'Portfolio', 'Review']

// Mobile top stepper — compact numbered dots with labels
function MobileStepper({ currentStep }) {
  return (
    <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1
          const isCompleted = currentStep > stepNum
          const isActive = currentStep === stepNum
          return (
            <React.Fragment key={stepNum}>
              {/* Step dot + label */}
              <div className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center
                                 text-xs font-bold transition-colors ${
                  isCompleted ? 'bg-green-600 text-white' :
                  isActive    ? 'bg-green-600 text-white ring-4 ring-green-100' :
                                'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? <Check size={12} strokeWidth={3} /> : stepNum}
                </div>
                <span className={`text-[10px] font-medium ${
                  isActive    ? 'text-green-600' :
                  isCompleted ? 'text-gray-600'  :
                                'text-gray-300'
                }`}>
                  {label}
                </span>
              </div>

              {/* Connector line between dots */}
              {i < STEP_LABELS.length - 1 && (
                <div className={`flex-1 h-px mx-1 mb-4 transition-colors ${
                  currentStep > stepNum ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default function ArtisanOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    account:   {},
    business:  {},
    portfolio: {},
    review:    {},
  })

  const handleNext = (stepKey, stepData) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...stepData },
    }))
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => setCurrentStep(prev => prev - 1)
  const goToStep = (n) => setCurrentStep(n)

  const stepKeys = {
    1: 'account',
    2: 'account',
    3: 'business',
    4: 'portfolio',
    5: 'review',
  }

  const renderStep = () => {
    const commonProps = {
      onNext:   (data) => handleNext(stepKeys[currentStep], data),
      onBack:   handleBack,
      goToStep: goToStep,
      formData: formData,
    }

    switch (currentStep) {
      case 1: return <CreateAccountStep  {...commonProps} defaultValues={formData.account}   />
      case 2: return <VerifyPhoneStep    {...commonProps} defaultValues={formData.account}   />
      case 3: return <BusinessInfoStep   {...commonProps} defaultValues={formData.business}  />
      case 4: return <PortfolioUploadStep {...commonProps} defaultValues={formData.portfolio} />
      case 5: return <ReviewSubmitStep   {...commonProps} defaultValues={formData.review}    />
      case 6: return <SuccessScreen formData={formData} />
      default: return null
    }
  }

  const isSuccess = currentStep === 6

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">

      {/* ── Top nav bar ── */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center
                         justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center
                          justify-center text-white font-bold text-sm">A</div>
          <span className="font-bold text-gray-900">ArtisanHub</span>
        </div>

        {!isSuccess && (
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 text-sm text-gray-500
                       hover:text-gray-700 disabled:opacity-0 transition-colors"
          >
            {/* Shorter label on mobile */}
            <span className="hidden sm:inline">← Back to Onboarding</span>
            <span className="sm:hidden">← Back</span>
          </button>
        )}

        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <span className="hidden sm:inline">? Need help?</span>
          <span className="sm:hidden">?</span>
        </button>
      </header>

      {/* ── Mobile stepper — only below lg ── */}
      {!isSuccess && <MobileStepper currentStep={currentStep} />}

      {/* ── Main layout: sidebar + content ── */}
      <div className="flex flex-1 lg:max-w-7xl lg:mx-auto w-full">

        {/* Sidebar — hidden on mobile/tablet, visible on lg+ */}
        <div className="hidden lg:block">
          <OnboardingSidebar currentStep={currentStep} />
        </div>

        {/* Step content */}
        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-8 lg:py-10 overflow-y-auto">
          {renderStep()}
        </main>
      </div>
    </div>
  )
}