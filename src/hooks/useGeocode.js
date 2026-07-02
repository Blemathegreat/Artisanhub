import { useState } from 'react'

const geocodeCache = {}

// This lock prevents two concurrent geocoding runs
// Without it, React Strict Mode's double-invocation causes both runs
// to see an empty cache simultaneously and fire duplicate requests
let isRunning = false

export function useGeocode() {
  const [coords, setCoords] = useState({})
  const [loading, setLoading] = useState(false)

  const geocodeArtisans = async (artisans) => {
    // If a geocoding run is already in progress, skip this call entirely
    // This is what prevents Strict Mode's second invocation from firing
    if (isRunning) return
    isRunning = true
    setLoading(true)

    const uncached = artisans.filter((a) => !geocodeCache[a.location])

    for (let i = 0; i < uncached.length; i++) {
      const artisan = uncached[i]
      try {
        // Note the URL — /nominatim instead of the full Nominatim URL
        // Vite proxy intercepts this and forwards it server-side
        const res = await fetch(
          `/nominatim/search?` +
          `q=${encodeURIComponent(artisan.location + ', Nigeria')}&` +
          `format=json&limit=1&countrycodes=ng`
        )

        if (!res.ok) {
          console.warn(`Geocode failed for ${artisan.location}: HTTP ${res.status}`)
          continue
        }

        const data = await res.json()

        if (data.length > 0) {
          geocodeCache[artisan.location] = {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          }
        }
      } catch (err) {
        console.error(`Failed to geocode: ${artisan.location}`, err)
      }

      // Still respect the 1-per-second rate limit even through the proxy
      if (i < uncached.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1100))
      }
    }

    // Build coords state from the now-populated cache
    const result = {}
    artisans.forEach((a) => {
      if (geocodeCache[a.location]) {
        result[a.id] = geocodeCache[a.location]
      }
    })

    setCoords(result)
    setLoading(false)
    // Release the lock — future calls (e.g. after a new search) can now run
    isRunning = false
  }

  return { coords, loading, geocodeArtisans }
}