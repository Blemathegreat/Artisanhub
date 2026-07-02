// Availability + Service Area — right column beside reviews

const DEFAULT_AVAILABILITY = [
  { day: 'Mon – Fri', hours: '8:00 AM – 6:00 PM' },
  { day: 'Saturday',  hours: '9:00 AM – 4:00 PM' },
  { day: 'Sunday',    hours: '12:00 PM – 4:00 PM' },
]

export default function ProfileSidebar({ artisan }) {
  const availability = artisan.availability ?? DEFAULT_AVAILABILITY
  const serviceAreas = artisan.serviceAreas ?? []

  return (
    <div className="flex flex-col gap-5">

      {/* Availability */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="section-heading text-base font-bold text-gray-900">Availability</h2>
          {artisan.openNow && (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              Available Today
            </span>
          )}
        </div>
        <div className="space-y-2.5">
          {availability.map(({ day, hours }) => (
            <div key={day} className="flex items-center justify-between text-sm">
              <span className="caption text-gray-500">{day}</span>
              <span className="body-text font-medium text-gray-800 text-xs">{hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Area */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex-1">
        <h2 className="section-heading text-base font-bold text-gray-900 mb-1">Service Area</h2>
        <p className="caption text-xs text-gray-400 mb-3">We serve these areas</p>

        {/* Map placeholder */}
        <div className="w-full h-[110px] bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-purple-600 shadow-lg shadow-purple-300" />
          </div>
        </div>

        {/* Area tags */}
        <div className="flex flex-wrap gap-1.5">
          {serviceAreas.slice(0, 5).map(area => (
            <span
              key={area}
              className="text-xs border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-green-300 hover:text-green-700 cursor-pointer transition-colors"
            >
              {area}
            </span>
          ))}
          {serviceAreas.length > 5 && (
            <span className="text-xs border border-gray-200 text-gray-400 px-2.5 py-1 rounded-full">
              +{serviceAreas.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
