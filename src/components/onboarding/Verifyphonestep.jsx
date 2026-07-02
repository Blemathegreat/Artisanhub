/**
 * VerifyPhoneStep.jsx — Step 2
 *
 * OTP (One-Time Password) input with 6 individual boxes.
 *
 * Key UX behaviors:
 * 1. Typing a digit auto-focuses the NEXT box
 * 2. Backspace auto-focuses the PREVIOUS box
 * 3. Paste support — paste "123456" and all 6 boxes fill instantly
 * 4. Countdown timer — 60s before "Resend" becomes available
 *
 * Why manually manage OTP state instead of register()?
 * React Hook Form's register() works best with standard inputs.
 * For 6 separate boxes that behave as ONE logical field, it's cleaner
 * to manage the array in local state and use setValue() to sync
 * the joined value back to RHF as a single 'otp' field.
 */
import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react'
import { verifyPhoneSchema } from './schema'

export default function VerifyPhoneStep({ onNext, onBack, formData }) {
  // 6 individual digit values stored as an array
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [status, setStatus]       = useState('idle') // idle | verifying | success | error
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Array of refs — one per input box, used for programmatic focus
  const inputRefs = useRef([])

  const { setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(verifyPhoneSchema),
    defaultValues: { otp: '' },
  })

  // Start the countdown timer when the component mounts
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  // Whenever digits change, join them and sync to RHF
  // setValue('otp', '123456') — this is how you programmatically set
  // a React Hook Form field value from outside a register() input
  useEffect(() => {
    const joined = digits.join('')
    setValue('otp', joined, { shouldValidate: joined.length === 6 })
  }, [digits, setValue])

  const handleDigitChange = (index, value) => {
    // Only accept a single digit character
    const digit = value.replace(/\D/, '').slice(-1)

    const newDigits = [...digits]
    newDigits[index] = digit
    setDigits(newDigits)

    // Auto-advance: if user typed a digit, move focus to next box
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Backspace on an empty box → clear previous box and focus it
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const newDigits = [...digits]
      newDigits[index - 1] = ''
      setDigits(newDigits)
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    // Get pasted text, keep only digits, take first 6
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newDigits = [...digits]
    pasted.split('').forEach((char, i) => { newDigits[i] = char })
    setDigits(newDigits)
    // Focus the last filled box (or the 6th if all filled)
    const nextEmpty = newDigits.findIndex(d => !d)
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus()
  }

  const handleResend = () => {
    setDigits(['', '', '', '', '', ''])
    setCountdown(60)
    setCanResend(false)
    setStatus('idle')
    inputRefs.current[0]?.focus()
    // In production: trigger your resend SMS API call here
  }

  const onSubmit = async () => {
    setStatus('verifying')
    // Simulate API verification delay
    await new Promise(r => setTimeout(r, 1200))
    // In production: call your API here, check the OTP
    // For demo purposes we accept any 6-digit code
    setStatus('success')
    setTimeout(() => onNext({}), 800)
  }

  const phone = formData?.phone || 'your phone'

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
          Step 2 of 5
        </p>
        <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Verify your phone number
        </h1>
        <p className="body-text text-gray-500 text-sm">
          We sent a 6-digit verification code to{' '}
          <span className="font-semibold text-gray-700">{phone}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* 6 OTP boxes */}
        <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleDigitChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl
                          outline-none transition-all
                          ${status === 'error'   ? 'border-red-400 bg-red-50 text-red-600' :
                            status === 'success' ? 'border-green-500 bg-green-50 text-green-700' :
                            digit               ? 'border-green-500 bg-green-50 text-green-700' :
                                                  'border-gray-200 bg-white text-gray-900'}
                          focus:border-green-500 focus:ring-2 focus:ring-green-100`}
            />
          ))}
        </div>

        {/* Status messages */}
        {errors.otp && (
          <p className="text-center body-text text-sm text-red-500 mb-4">{errors.otp.message}</p>
        )}
        {status === 'error' && (
          <p className="text-center text-sm text-red-500 mb-4">
            Invalid code. Please try again.
          </p>
        )}
        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Phone number verified!</span>
          </div>
        )}

        {/* Resend */}
        <div className="text-center mb-8">
          {canResend ? (
            <button type="button" onClick={handleResend}
              className="flex items-center gap-1.5 mx-auto text-sm text-green-600
                         font-medium hover:underline">
              <RefreshCw size={14} /> Resend code
            </button>
          ) : (
            <p className="body-text text-sm text-gray-400">
              Resend code in <span className="font-semibold text-gray-600">{countdown}s</span>
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button type="button" onClick={onBack}
            className="flex items-center gap-2 border border-gray-200 text-gray-600
                       hover:bg-gray-50 font-semibold px-5 py-3 rounded-xl
                       transition-colors text-sm">
            <ArrowLeft size={16} /> Back
          </button>
          <button
            type="submit"
            disabled={digits.join('').length < 6 || status === 'verifying' || status === 'success'}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600
                       hover:bg-green-700 text-white font-semibold py-3 rounded-xl
                       transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'verifying' ? (
              <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full
                                 animate-spin" /> Verifying...</>
            ) : (
              <> Verify & Continue <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}