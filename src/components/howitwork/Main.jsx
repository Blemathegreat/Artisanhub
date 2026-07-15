import React from 'react'
import HeroSection      from './HeroSection'
import CustomerJourney  from './CustomerJourney'
import ArtisanJourney   from './ArtisanJourney'
import TrustSection     from './TrustSection'
import FAQSection       from './FAQSection'
import CTASection       from './CTASection'

export default function HowItWorks() {
  return (
    <main className="bg-white">
      <HeroSection />
      <CustomerJourney />
      <ArtisanJourney />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}