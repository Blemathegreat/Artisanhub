import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRequestService } from '../../hooks/userequestservice.js'
import RequestServiceForm from './RequestService'
import RequestReviewStep from './RequestReviewStep'
import RequestSuccessModal from './RequestSuccessModal'

// Detect mobile: drawer slides up from bottom, desktop: slides in from right
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

// Drawer animation variants
const drawerVariants = {
  desktop: {
    hidden:  { x: '100%', opacity: 0 },
    visible: { x: 0,      opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 28 } },
    exit:    { x: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
  },
  mobile: {
    hidden:  { y: '100%', opacity: 0 },
    visible: { y: 0,      opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 28 } },
    exit:    { y: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
  },
}

// Step transition
const stepVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -24, transition: { duration: 0.2,  ease: 'easeIn'  } },
}

export default function RequestServiceDrawer({ isOpen, artisan, onClose }) {
  const isMobile = useIsMobile()

  const {
    form,
    step,
    isSubmitting,
    isSuccess,
    photoPreviews,
    addPhotos,
    removePhoto,
    goToReview,
    goBack,
    submitRequest,
    handleClose,
  } = useRequestService({ artisan, onClose })

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const variant = isMobile ? drawerVariants.mobile : drawerVariants.desktop

  return (
    <>
      <AnimatePresence>
        {isOpen && !isSuccess && (
          <>
            {/* ── Backdrop ── */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* ── Drawer ── */}
            <motion.div
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Request Service"
              variants={variant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                fixed z-50 bg-white shadow-2xl flex flex-col
                ${isMobile
                  ? 'inset-x-0 bottom-0 rounded-t-3xl max-h-[92dvh]'
                  : 'right-0 top-0 bottom-0 w-full max-w-md rounded-l-3xl'
                }
              `}
            >
              {/* ── Drag handle (mobile only) ── */}
              {isMobile && (
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>
              )}

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-yellow-50 border border-yellow-200 rounded-xl
                                   flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="#ca8a04" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Request Service</h2>
                    <p className="text-xs text-gray-400">Step {step} of 2</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close drawer"
                  className="w-8 h-8 flex items-center justify-center rounded-full
                             hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Step progress bar ── */}
              <div className="h-1 bg-gray-100 flex-shrink-0">
                <motion.div
                  className="h-full bg-yellow-400 rounded-full"
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              {/* ── Scrollable content ── */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <RequestServiceForm
                        artisan={artisan}
                        form={form}
                        photoPreviews={photoPreviews}
                        addPhotos={addPhotos}
                        removePhoto={removePhoto}
                        onContinue={goToReview}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <RequestReviewStep
                        artisan={artisan}
                        form={form}
                        photoPreviews={photoPreviews}
                        isSubmitting={isSubmitting}
                        onBack={goBack}
                        onSubmit={submitRequest}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Success modal — rendered outside the drawer ── */}
      <RequestSuccessModal
        isOpen={isSuccess}
        artisan={artisan}
        onContinue={handleClose}
        onViewProfile={handleClose}
      />
    </>
  )
}