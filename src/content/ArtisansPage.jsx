import { createContext, useState, useEffect } from 'react'
import { Artisans } from '../assets/Photos'
import toast from 'react-hot-toast'

export const ArtisansContext = createContext()

const distanceRanges = {
  '1': [0, 5],
  '2': [5, 10],
  '3': [10, 20],
  '4': [20, Infinity],
}

const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '')

const parseDistance = (rawDistance) => {
  const match = rawDistance.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : null
}

export default function ArtisansProvider({ children }) {
  // Search bar state
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')

  // Sidebar filter state
  const [distance, setDistance] = useState('1')
  const [sortBy, setSortBy] = useState('nearest')
  const [ratings, setRatings] = useState([])
  const [openNow, setOpenNow] = useState(false)
  const [selectedArtisan, setSelectedArtisan] = useState(null)
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const [filteredArtisans, setFilteredArtisans] = useState(Artisans)

  // Lives at component level — not inside any other function
  const toggleRating = (value) =>
    setRatings((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    )

  const clearAll = () => {
    setDistance('1')
    setSortBy('nearest')
    setRatings([])
    setOpenNow(false)
    setVerifiedOnly(false)
  }

  // Pure function — computes and RETURNS results, touches no state itself
  const computeResults = () => {
    const cleanService = service.trim().toLowerCase()
    const cleanLocation = location.trim().toLowerCase()
    const serviceIsEmpty = cleanService === ''
    const locationIsEmpty = cleanLocation === ''

    // Step 1 — filter
    let results = Artisans.filter((artisan) => {
      const matchService = serviceIsEmpty || artisan.category.toLowerCase() === cleanService
      const matchLocation = locationIsEmpty || normalize(artisan.location).includes(normalize(cleanLocation))
      const matchVerified = !verifiedOnly || artisan.verified === true
      const matchOpenNow = !openNow || artisan.openNow === true

      // Rating — sibling of the others, not nested inside distance
      let matchRating = true
      if (ratings.length > 0 && !ratings.includes('any')) {
        const numericRatings = ratings.filter((r) => typeof r === 'number')
        if (numericRatings.length > 0) {
          const minRating = Math.min(...numericRatings)
          matchRating = artisan.rating >= minRating
        }
      }

      // Distance — sibling of the others, not nested inside rating
      let matchDistance = true
      const range = distanceRanges[distance]
      if (range) {
        const parsedDistance = parseDistance(artisan.distance)
        matchDistance = parsedDistance !== null
          && parsedDistance >= range[0]
          && parsedDistance < range[1]
      }

      return matchService && matchLocation && matchVerified && matchOpenNow && matchRating && matchDistance
    })

    // Step 2 — sort the FILTERED results (must come after filter, before return)
    switch (sortBy) {
      case 'nearest':
        results = [...results].sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
        break
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        results = [...results].sort((a, b) => b.totalRating - a.totalRating)
        break
      
      default:
        break
    }

    // Returns the array — does NOT call setFilteredArtisans itself
    return results
  }

  // Click-triggered — owns the toast decision + triggers state update
  const handleSearch = () => {
    const cleanService = service.trim().toLowerCase()
    const cleanLocation = location.trim().toLowerCase()
    const serviceIsEmpty = cleanService === ''
    const locationIsEmpty = cleanLocation === ''

    if (serviceIsEmpty && locationIsEmpty) {
      toast('Please select a service and enter a location to find artisans near you.')
    } else if (!serviceIsEmpty && locationIsEmpty) {
      toast('Please enter a location to bring artisans near you.')
    } else if (serviceIsEmpty && !locationIsEmpty) {
      toast('Please select a service from the dropdown.')
    }

    setFilteredArtisans(computeResults())
  }

  useEffect(() => {
    setFilteredArtisans(computeResults())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance, sortBy, ratings, openNow, verifiedOnly])
const value = {
  Artisans,
  service, setService,
  location, setLocation,
  distance, setDistance,
  sortBy, setSortBy,
  ratings, toggleRating,
  openNow, setOpenNow,
  verifiedOnly, setVerifiedOnly,
  filteredArtisans,
  clearAll,
  handleSearch,
  selectedArtisan,
  setSelectedArtisan,   
}

  return (
    <ArtisansContext.Provider value={value}>
      {children}
    </ArtisansContext.Provider>
  )
}