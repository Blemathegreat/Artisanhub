import React from 'react'
import Hero from '../components/Hero'
import PopularCategories from '../components/PopularCategories'
import WhyChooseUs from '../components/WhyChooseUs'
import HowItWorks from '../components/HowItWorks'
import ArtisanCTABannery from '../components/ArtisanCTABannery'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <div><Hero />
    
 <PopularCategories />
    <WhyChooseUs />
      
    <HowItWorks />
     
    <ArtisanCTABannery />
    <Testimonials />
    </div>
  )
}
