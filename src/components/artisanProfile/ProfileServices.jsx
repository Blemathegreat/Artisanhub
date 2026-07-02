// Service icon map — falls back to a wrench emoji for unknown services
const iconMap = {
  'Haircut':              '✂️',
  'Beard Trim':           '🪒',
  'Kids Cut':             '👦',
  'Hair & Beard':         '💈',
  'Shave':                '🪥',
  'Home Service':         '🏠',
  'Ankara Styles':        '👗',
  'Agbada':               '👔',
  'Wedding Outfit':       '💍',
  'Ladies Wear':          '👒',
  'Bridal Outfit':        '👰',
  'Corporate Styles':     '🧥',
  'Pipe Repair':          '🔧',
  'Leakage Fix':          '💧',
  'Bathroom Installation':'🚿',
  'Borehole Plumbing':    '⛏️',
  'Tank Installation':    '🪣',
  'Wiring':               '⚡',
  'Solar Installation':   '☀️',
  'Generator Repair':     '🔌',
  'Inverter Installation':'🔋',
  'CCTV Installation':    '📷',
}

export default function ProfileServices({ services = [] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-heading text-lg font-bold text-gray-900">Services Offered</h2>
        <button className="small-label text-green-600 text-sm font-medium hover:underline">See all</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {services.map((svc) => (
          <div
            key={svc.name}
            className="flex flex-col items-start gap-1.5 border border-gray-100 rounded-xl p-3 hover:border-green-200 hover:bg-green-50/50 transition-colors cursor-pointer"
          >
            <span className="text-xl">{svc.icon ?? iconMap[svc.name] ?? '🔨'}</span>
            <p className="card-title text-xs font-semibold text-gray-800 leading-tight">{svc.name}</p>
            <p className="caption text-xs text-gray-400">From {svc.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
