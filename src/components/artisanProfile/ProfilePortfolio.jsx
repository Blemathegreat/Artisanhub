import { useState } from 'react'
import { Image, Video, Play } from 'lucide-react'

const TABS = ['All', 'Photos', 'Videos']

export default function ProfilePortfolio({ portfolio = [], videos = [] }) {
  const [activeTab, setActiveTab] = useState('All')

  const allItems = [
    ...portfolio.map(src => ({ src, type: 'photo' })),
    ...videos.map(src => ({ src, type: 'video' })),
  ]

  const displayed = allItems.filter(item => {
    if (activeTab === 'Photos') return item.type === 'photo'
    if (activeTab === 'Videos') return item.type === 'video'
    return true
  })

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-heading text-lg font-bold text-gray-900">Portfolio</h2>
        <button className="small-label text-green-600 text-sm font-medium hover:underline">
          View all ({allItems.length})
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab === 'Photos' && <Image size={13} />}
            {tab === 'Videos' && <Video size={13} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {displayed.map((item, i) => (
          <div
            key={i}
            className={`relative rounded-xl overflow-hidden cursor-pointer group
              ${i === 0 ? 'col-span-2 row-span-2 h-[220px]' : 'h-[100px]'}`}
          >
            <img
              src={item.src}
              alt={`Portfolio ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play size={22} className="text-white fill-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
