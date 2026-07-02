/**
 * SuccessScreen.jsx
 *
 * Shown after successful submission.
 * Matches the screenshot: green check, reference ID, status timeline,
 * "What you submitted" cards, and action buttons.
 */
import React, { useState } from 'react'
import {
  CheckCircle, Copy, Check, Send, Clock, Award, Wifi,
  User, Scissors, Image, Star, Film, Bell, LayoutDashboard, Edit,
} from 'lucide-react'

// Generates a reference ID in the format AH-YYYY-MM-DD-XXXXX
function generateRefId() {
  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  const num  = String(Math.floor(10000 + Math.random() * 90000)).padStart(5, '0')
  return `AH-${date}-${num}`
}

const REF_ID = generateRefId()

// Application status timeline
const TIMELINE = [
  { icon: Send,     label: 'Submitted',         sub: 'Just now',              done: true,   active: false },
  { icon: Clock,    label: 'Under Review',       sub: 'Estimated 24–48 hours', done: false,  active: true  },
  { icon: Award,    label: 'Approved',           sub: "You'll be notified",   done: false,  active: false },
  { icon: Wifi,     label: 'Live on ArtisanHub', sub: 'Start receiving customers', done: false, active: false },
]

function SummaryCard({ icon: Icon, title, children, iconColor = 'text-green-600', iconBg = 'bg-green-50' }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-4 bg-white flex-1 min-w-[160px]">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 ${iconBg} rounded-lg flex items-center justify-center`}>
          <Icon size={14} className={iconColor} />
        </div>
        <p className="small-label text-xs font-semibold text-gray-700">{title}</p>
      </div>
      {children}
    </div>
  )
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-1.5">
      <Check size={11} className="text-green-500 shrink-0" />
      <span className="text-xs text-gray-600">{text}</span>
    </div>
  )
}

export default function SuccessScreen({ formData }) {
  const [copied, setCopied] = useState(false)

  const acct = formData?.account   || {}
  const biz  = formData?.business  || {}
  const port = formData?.portfolio || {}

  const handleCopy = () => {
    navigator.clipboard.writeText(REF_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Hero success banner ── */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100
                      rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center
                        justify-between gap-6">
          <div className="flex-1">
            {/* Animated check */}
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center
                            justify-center mb-4 shadow-lg shadow-green-200">
              <CheckCircle size={28} className="text-white fill-white" />
            </div>

            <h1 className="display-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              Your application has been submitted!
            </h1>
            <p className="body-text text-gray-500 text-sm mb-5">
              Thank you, {acct.fullName || 'Artisan'}. Your profile is now under review.
            </p>

            {/* Reference ID */}
            <div className="inline-flex items-center gap-3 bg-white border border-green-200
                            rounded-xl px-4 py-2.5">
              <span className="caption text-xs text-gray-500">Reference ID:</span>
              <span className="body-text text-sm font-bold text-gray-900 font-mono">{REF_ID}</span>
              <button onClick={handleCopy}
                className="text-gray-400 hover:text-green-600 transition-colors">
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Decorative artisan image */}
          <div className="hidden sm:block w-32 h-32 rounded-2xl overflow-hidden shrink-0
                          border-4 border-white shadow-md">
            {port.images?.[port.coverIndex ?? 0]?.preview ? (
              <img src={port.images[port.coverIndex ?? 0].preview} alt="Your work"
                className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-green-100 flex items-center justify-center">
                <User size={32} className="text-green-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Application Status Timeline ── */}
      <div className="border border-gray-100 rounded-2xl p-6 bg-white">
        <h2 className="section-heading font-bold text-gray-900 mb-6">Application Status</h2>
        <div className="flex items-center justify-between relative">

          {/* Connecting line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 z-0" />
          <div className="absolute top-5 left-5 h-0.5 bg-green-600 z-0"
            style={{ width: '25%' }} />

          {TIMELINE.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="flex flex-col items-center gap-2 z-10 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                 border-2 transition-all ${
                  step.done   ? 'bg-green-600 border-green-600' :
                  step.active ? 'bg-white border-purple-500 ring-4 ring-purple-100' :
                                'bg-white border-gray-200'
                }`}>
                  <Icon size={16} className={
                    step.done   ? 'text-white' :
                    step.active ? 'text-purple-500' :
                                  'text-gray-300'
                  } />
                </div>
                <div className="text-center">
                  <p className={`text-xs font-semibold ${
                    step.done ? 'text-green-600' : step.active ? 'text-purple-600' : 'text-gray-400'
                  }`}>{step.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{step.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── What You Submitted ── */}
      <div className="border border-gray-100 rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-heading font-bold text-gray-900">What you submitted</h2>
          <button className="text-green-600 text-sm font-medium hover:underline
                             flex items-center gap-1">
            <Star size={13} /> View full summary
          </button>
        </div>

        <div className="flex flex-wrap gap-4">

          {/* Profile Info */}
          <SummaryCard title="Profile Information" icon={User}>
            <div className="space-y-1.5">
              <CheckItem text={`Category: ${biz.category || '—'}`} />
              <CheckItem text={`Business: ${biz.businessName || '—'}`} />
              <CheckItem text={`Location: ${biz.city || '—'}, ${biz.state || '—'}`} />
              <CheckItem text={`Home Service: ${biz.homeService === 'yes' ? 'Yes' : 'No'}`} />
            </div>
          </SummaryCard>

          {/* Services */}
          <SummaryCard title="Services Offered" icon={Scissors}
            iconColor="text-purple-600" iconBg="bg-purple-50">
            <div className="space-y-1.5">
              {(biz.description || 'No services listed').split(',').slice(0, 4).map((s, i) => (
                <CheckItem key={i} text={s.trim() || 'General service'} />
              ))}
            </div>
          </SummaryCard>

          {/* Portfolio */}
          <SummaryCard title="Portfolio" icon={Image}
            iconColor="text-blue-600" iconBg="bg-blue-50">
            <p className="text-xs text-gray-500 mb-2">
              {port.images?.length || 0} Photos uploaded
            </p>
            <div className="flex gap-1">
              {port.images?.slice(0, 3).map((img, i) => (
                <img key={i} src={img.preview} alt=""
                  className="w-10 h-10 rounded-lg object-cover" />
              ))}
              {(port.images?.length || 0) > 3 && (
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center
                                justify-center text-xs font-bold text-blue-500">
                  +{port.images.length - 3}
                </div>
              )}
              {(!port.images?.length) && (
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center
                                justify-center">
                  <Image size={16} className="text-gray-300" />
                </div>
              )}
            </div>
          </SummaryCard>

          {/* Experience */}
          <SummaryCard title="Experience" icon={Award}
            iconColor="text-amber-600" iconBg="bg-amber-50">
            <p className="text-xs text-gray-500 mb-1">Years of Experience</p>
            <p className="text-2xl font-bold text-gray-900">
              {biz.experience || 0} <span className="text-sm font-normal text-gray-500">Years</span>
            </p>
          </SummaryCard>

          {/* Videos */}
          <SummaryCard title="Videos (Optional)" icon={Film}
            iconColor="text-pink-600" iconBg="bg-pink-50">
            {port.videos?.length > 0 ? (
              <p className="text-xs text-gray-600">{port.videos.length} video(s) uploaded</p>
            ) : (
              <>
                <p className="text-xs text-gray-400">No videos uploaded</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-4">
                  You can add videos later from your dashboard.
                </p>
              </>
            )}
          </SummaryCard>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 border-2
                           border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold
                           px-5 py-3 rounded-xl transition-colors text-sm">
          <LayoutDashboard size={16} />
          Go to Dashboard (After Approval)
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600
                           hover:bg-purple-700 text-white font-semibold px-5 py-3
                           rounded-xl transition-colors text-sm">
          <Bell size={16} />
          Notify Me of Updates
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border-2
                           border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold
                           px-5 py-3 rounded-xl transition-colors text-sm">
          <Edit size={16} />
          Edit My Application
        </button>
      </div>
    </div>
  )
}