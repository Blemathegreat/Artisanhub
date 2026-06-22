import React from 'react'
import ArtisanSearch from '../components/artisanspage/ArtisanSearch'
import ArtisanProducts from '../components/artisanspage/ArtisanProducts'

export default function Search() {
  return (
   <div className=" w-full flex gap-6  py-6 ">
      <ArtisanSearch />
      <ArtisanProducts />
    </div>
  )
}
