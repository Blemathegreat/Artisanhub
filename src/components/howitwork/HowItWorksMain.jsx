import React from 'react'
import HeroSection      from './HeroSection'
import CustomerJourney  from './CustomerJourney'
import ArtisanJourney   from './ArtisanJourney'
import TrustSection     from './TrustSection'
import FaqSection       from './FaqSection'
import CTASection       from './CTASection'

export default function HowItWorksMain() {
  return (
    <main className="bg-white">
      <HeroSection />
      <CustomerJourney />
      <ArtisanJourney />
      <TrustSection />
      <FaqSection />
      <CTASection />
    </main>
  )
}