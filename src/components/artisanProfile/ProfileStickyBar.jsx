import { MessageCircle, Phone, Calendar } from 'lucide-react'

export default function ProfileStickyBar({ artisan }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">

          {/* Left info — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
            <img
              src={artisan.image}
              alt={artisan.title}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">
                Ready to work with {artisan.title}?
              </p>
              <p className="text-xs text-gray-400">
                Send a request and get a response within minutes.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${artisan.whatsapp}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">Chat Artisan</span>
              <span className="sm:hidden">Chat</span>
            </a>
            <a
              href={`tel:${artisan.call}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
            >
              <Phone size={15} />
              <span className="hidden sm:inline">Call Artisan</span>
              <span className="sm:hidden">Call</span>
            </a>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
              <Calendar size={15} />
              <span className="hidden sm:inline">Request Service</span>
              <span className="sm:hidden">Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
