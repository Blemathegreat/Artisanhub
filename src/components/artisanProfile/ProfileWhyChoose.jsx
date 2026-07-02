import { Award, Zap, CheckCircle, Heart } from 'lucide-react'

const DEFAULT_WHY = [
  { icon: <Award size={20} className="text-green-600" />,      title: 'Quality Service',       desc: 'Top-notch service guaranteed' },
  { icon: <Zap size={20} className="text-purple-600" />,       title: 'Professional Tools',    desc: 'We use the best tools and products' },
  { icon: <CheckCircle size={20} className="text-blue-500" />, title: 'Clean Environment',     desc: 'Hygienic and comfortable environment' },
  { icon: <Heart size={20} className="text-red-500" />,        title: 'Customer Satisfaction', desc: 'Your satisfaction is our priority' },
]

export default function ProfileWhyChoose({ artisan }) {
  const items = artisan.whyChoose ?? DEFAULT_WHY

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h2 className="section-heading text-lg font-bold text-gray-900 mb-5">
        Why Choose {artisan.title}?
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-start gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100">
              {item.icon}
            </div>
            <p className="card-title text-sm font-semibold text-gray-800 leading-tight">{item.title}</p>
            <p className="caption text-xs text-gray-400 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
