import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Artisans } from '../../assets/Photos'

import ProfileHeader     from './ProfileHeader'
import Artisanprofilenav from './Artisanprofilenav'
import ProfileAbout      from './ProfileAbout'
import ProfileServices   from './ProfileServices'
import ProfilePortfolio  from './ProfilePortfolio'
import ProfileReviews    from './ProfileReviews'
import ProfileSidebar    from './ProfileSidebar'
import ProfileWhyChoose  from './ProfileWhyChoose'
import ProfileRelated    from './ProfileRelated'
import ProfileStickyBar  from './ProfileStickyBar'

export default function ArtisanProfileMain() {
  const { id } = useParams()
  const navigate = useNavigate()

  const artisan = Artisans.find(a => a.id === Number(id))

  if (!artisan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Artisan not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 font-medium flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Go back
        </button>
      </div>
    )
  }

  const related = Artisans
    .filter(a => a.category === artisan.category && a.id !== artisan.id)
    .slice(0, 4)

  return (
    <div className="bg-gray-50 min-h-screen">
      <ArtisanProfileNav/>

      {/* Breadcrumb */}
      <div className="px-4 lg:px-10 border-b border-gray-100 bg-gray-50">
  <div className="py-3 flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
    <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
    <ChevronRight size={12} />
    <Link to="/search" className="hover:text-green-600 transition-colors">Search Results</Link>
    <ChevronRight size={12} />
    <span className="hover:text-green-600 cursor-pointer transition-colors">{artisan.category}</span>
    <ChevronRight size={12} />
    <span className="text-gray-700 font-medium truncate max-w-[180px]">{artisan.title}</span>
  </div>
</div>

      <div className=" px-4 bg-[#ffffff] sm:px-6 lg:px-10 py-6 sm:py-10 space-y-8">
        <ProfileHeader     artisan={artisan} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileAbout    artisan={artisan} />
          <ProfileServices services={artisan.services} />
        </div>
        <ProfilePortfolio  portfolio={artisan.portfolio} videos={artisan.videos} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileReviews  artisan={artisan} />
          <ProfileSidebar  artisan={artisan} />
        </div>
        <ProfileWhyChoose  artisan={artisan} />
        <ProfileRelated    related={related} />
      </div>

      <ProfileStickyBar artisan={artisan} />
    </div>
  )
}