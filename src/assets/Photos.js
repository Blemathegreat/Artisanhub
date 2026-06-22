import Logo from './images/logo.png'
import Barber from './images/barber.png'
import Barber1 from './images/barber1.png'
import Choose1 from './images/choose1.png'
import Choose2 from './images/choose2.png'
import FemaleTailor from './images/FemaleTailor.png'
import Hero from './images/hero.png'
import Location1 from './images/location1.png'
import Location from './images/location.png'
import Video from './images/video.png'
import Scissors from './images/scissors.png'
import Password from './images/password.png'
import Verified from './images/verified.png'
import Artisan1 from "./images/artisan1.png"
import Artisan2 from "./images/artisan2.png"
import Artisan3 from "./images/artisan3.png"
import Artisan4 from "./images/artisan4.png"
import Electrician from './images/electrician.png'


export const photos ={
    logo:Logo,
    location1:Location1,
    scissors:Scissors,
    artisan1:Artisan1,
    artisan1:Artisan2,
    artisan:Artisan3,
    artisan:Artisan4,
    video:Video,
    barber:Barber,
    barber1:Barber1,
    choose1:Choose1,
    choose2:Choose2,
    FemaleTailor:FemaleTailor,
    hero:Hero,
    location:Location,
    password:Password,
    verified:Verified,
    electrician:Electrician,
}

export const testimonialData = [{
    id: 1,
    title:"Sarah A.",
    description:"ArtisansHub helped me find a reliable Plummer in minute. Great services!",
    image:FemaleTailor,
    rating:5,
    location:"Lagos, Nigeria"

},
    {
    id: 2,
    title:"Micheal O.",
    description:"The Tailor i found here is amazing!perfect fitting and very professional.",
    image:Electrician,
    rating:5,
    location:"Abuja, Nigeria"
    
},
    {
    id: 3,
    title:"Chioma B.",
    description:"I love how easy it is to find a trusted artisan near me.Highly recommended",
    image:Barber1,
    rating:5,
    location:"Ibadan, Nigeria"
    
},
    {
    id: 4,
    title:"Mudathir T.",
    description:"I love how easy it is to find a trusted artisan near me.Highly recommended",
    image:Barber,
    rating:5,
    location:"Osun, Nigeria"
    
},
    {
    id: 5,
    title:"Olatunji H.",
    description:"I love how easy it is to find a trusted artisan near me.Highly recommended",
    image:Electrician,
    rating:5,
    location:"Ogun, Nigeria"
    
},
    {
    id: 6,
    title:"Deji A.",
    description:"I love how easy it is to find a trusted artisan near me.Highly recommended",
    image:Barber,
    rating:5,
    location:"Ondo, Nigeria"
    
},
    {
    id: 7,
    title:"James O.",
    description:"I love how easy it is to find a trusted artisan near me.Highly recommended",
    image:Barber1,
    rating:5,
    location:"Oyo, Nigeria"
    
},
{
    id: 8,
    title:"Azeezat Y.",
    description:"I love how easy it is to find a trusted artisan near me.Highly recommended",
    image:FemaleTailor,
    rating:5,
    location:"Igboho, Nigeria"
    
}]


export const Artisans = [
  // BARBERS
  {
    id: 1,
    image: Artisan1,
    title: "TrueFade Barber Shop",
    rating: 4.8,
    location1:Location1,
    totalRating: 126,
    location: "Bodija Market Road, Ibadan",
    distance: "0.8 km away",
    description: "Men's Haircut, Beard Trim, Shave",
    whatsapp: "08012345601",
    call: "08012345601",
    verified: true,
    openNow: true,
    category: "Barber"
  },
  {
    id: 2,
    image: Artisan2,
    title: "De King Kutz",
    rating: 4.6,
    totalRating: 98,
    location: "Akobo, Ibadan",
    distance: "1.2 km away",
    description: "Men's Haircut, Beard Trim",
    whatsapp: "08012345602",
    call: "08012345602",
    verified: true,
    openNow: true,
    category: "Barber"
  },
  {
    id: 3,
    image: Artisan3,
    title: "Sharp Lines Lounge",
    rating: 4.7,
    totalRating: 210,
    location: "Agodi, Ibadan",
    distance: "1.5 km away",
    description: "Men's Haircut, Beard Trim, Shave",
    whatsapp: "08012345603",
    call: "08012345603",
    verified: true,
    openNow: false,
    category: "Barber"
  },
  {
    id: 4,
    image: Artisan4,
    title: "Classic Cuts",
    rating: 4.5,
    totalRating: 76,
    location: "UI Road, Ibadan",
    distance: "1.6 km away",
    description: "Men's Haircut, Kids Cut, Shave",
    whatsapp: "08012345604",
    call: "08012345604",
    verified: true,
    openNow: true,
    category: "Barber"
  },
  {
    id: 5,
    image: Artisan2,
    title: "Fade Factory",
    rating: 4.3,
    totalRating: 54,
    location: "Ikeja, Lagos",
    distance: "9.1 km away",
    description: "Men's Haircut, Beard Trim, Hot Towel Shave",
    whatsapp: "08012345605",
    call: "08012345605",
    verified: true,
    openNow: true,
    category: "Barber"
  },
  {
    id: 6,
    image: Artisan1,
    title: "Crown Barbershop",
    rating: 4.4,
    totalRating: 89,
    location: "Surulere, Lagos",
    distance: "3.0 km away",
    description: "Men's Haircut, Beard Shape, Kids Cut",
    whatsapp: "08012345606",
    call: "08012345606",
    verified: false,
    openNow: true,
    category: "Barber"
  },

  // FASHION DESIGNERS
  {
    id: 7,
    image: Artisan4,
    title: "Stitched by Sola",
    rating: 4.9,
    totalRating: 312,
    location: "Dugbe, Ibadan",
    distance: "1.0 km away",
    description: "Ankara Styles, Agbada, Wedding Outfits",
    whatsapp: "08012345607",
    call: "08012345607",
    verified: true,
    openNow: true,
    category: "Fashion Designer"
  },
  {
    id: 8,
    image: Artisan2,
    title: "Threads & Grace",
    rating: 4.7,
    totalRating: 178,
    location: "Lekki Phase 1, Lagos",
    distance: "2.4 km away",
    description: "Ladies Wear, Bridal, Corporate Styles",
    whatsapp: "08012345608",
    call: "08012345608",
    verified: true,
    openNow: true,
    category: "Fashion Designer"
  },
  {
    id: 9,
    image: Artisan4,
    title: "Adire Couture",
    rating: 4.5,
    totalRating: 143,
    location: "Abeokuta, Ogun State",
    distance: "1.8 km away",
    description: "Adire Designs, Casual Wear, Traditional Outfits",
    whatsapp: "08012345609",
    call: "08012345609",
    verified: true,
    openNow: false,
    category: "Fashion Designer"
  },
  {
    id: 10,
    image: Artisan1,
    title: "Velvet Stitch Atelier",
    rating: 4.8,
    totalRating: 224,
    location: "Victoria Island, Lagos",
    distance: "0.5 km away",
    description: "Evening Gowns, Corporate Wear, Tailoring",
    whatsapp: "08012345610",
    call: "08012345610",
    verified: true,
    openNow: true,
    category: "Fashion Designer"
  },
  {
    id: 11,
    image: Artisan3,
    title: "Kemi's Fashion Hub",
    rating: 4.2,
    totalRating: 67,
    location: "Osogbo, Osun State",
    distance: "3.5 km away",
    description: "Ankara, Aso-Oke, Children Wear",
    whatsapp: "08012345611",
    call: "08012345611",
    verified: false,
    openNow: true,
    category: "Fashion Designer"
  },

  // PLUMBERS
  {
    id: 12,
    image: Artisan4,
    title: "AquaFix Plumbing",
    rating: 4.6,
    totalRating: 95,
    location: "Festac Town, Lagos",
    distance: "1.3 km away",
    description: "Pipe Repairs, Leakage Fix, Bathroom Installation",
    whatsapp: "08012345612",
    call: "08012345612",
    verified: true,
    openNow: true,
    category: "Plumber"
  },
  {
    id: 13,
    image: Artisan4,
    title: "PipePro Services",
    rating: 4.4,
    totalRating: 112,
    location: "Ikorodu, Lagos",
    distance: "2.7 km away",
    description: "Borehole Plumbing, Tank Installation, Drainage",
    whatsapp: "08012345613",
    call: "08012345613",
    verified: true,
    openNow: false,
    category: "Plumber"
  },
  {
    id: 14,
    image: Artisan4,
    title: "FlowMaster Plumbing",
    rating: 4.7,
    totalRating: 188,
    location: "Mokola, Ibadan",
    distance: "0.9 km away",
    description: "Emergency Repairs, Pipe Fitting, Water Heater",
    whatsapp: "08012345614",
    call: "08012345614",
    verified: true,
    openNow: true,
    category: "Plumber"
  },
  {
    id: 15,
    image: Artisan1,
    title: "Reliable Pipes Co.",
    rating: 4.1,
    totalRating: 43,
    location: "Ota, Ogun State",
    distance: "4.2 km away",
    description: "General Plumbing, Sink Repairs, Toilet Fix",
    whatsapp: "08012345615",
    call: "08012345615",
    verified: false,
    openNow: true,
    category: "Plumber"
  },
  {
    id: 16,
    image: Artisan2,
    title: "Swift Plumbing Solutions",
    rating: 4.5,
    totalRating: 134,
    location: "Akure, Ondo State",
    distance: "1.1 km away",
    description: "Pipe Installation, Leakage Control, Renovation Plumbing",
    whatsapp: "08012345616",
    call: "08012345616",
    verified: true,
    openNow: false,
    category: "Plumber"
  },

  // ELECTRICIANS
  {
    id: 17,
    image: Artisan4,
    title: "BrightSpark Electricals",
    rating: 4.8,
    totalRating: 267,
    location: "Yaba, Lagos",
    distance: "0.6 km away",
    description: "Wiring, Solar Installation, Generator Repair",
    whatsapp: "08012345617",
    call: "08012345617",
    verified: true,
    openNow: true,
    category: "Electrician"
  },
  {
    id: 18,
    image: Artisan1,
    title: "VoltEdge Services",
    rating: 4.6,
    totalRating: 154,
    location: "Ijebu-Ode, Ogun State",
    distance: "2.0 km away",
    description: "Electrical Repairs, Panel Upgrade, Lighting",
    whatsapp: "08012345618",
    call: "08012345618",
    verified: true,
    openNow: true,
    category: "Electrician"
  },
  {
    id: 19,
    image: Artisan1,
    title: "PowerLine Electricals",
    rating: 4.3,
    totalRating: 88,
    location: "Ado-Ekiti, Ekiti State",
    distance: "3.3 km away",
    description: "Inverter Installation, Fault Detection, Rewiring",
    whatsapp: "08012345619",
    call: "08012345619",
    verified: false,
    openNow: true,
    category: "Electrician"
  },
  {
    id: 20,
    image: Artisan2,
    title: "SafeWire Solutions",
    rating: 4.7,
    totalRating: 199,
    location: "Ile-Ife, Osun State",
    distance: "1.4 km away",
    description: "Solar Panel Setup, Wiring, Electrical Maintenance",
    whatsapp: "08012345620",
    call: "08012345620",
    verified: true,
    openNow: false,
    category: "Electrician"
  },
  {
    id: 21,
    image: Artisan1,
    title: "Watts Up Electricals",
    rating: 4.4,
    totalRating: 72,
    location: "Alagbado, Lagos",
    distance: "2.9 km away",
    description: "CCTV Installation, Wiring, Generator Servicing",
    whatsapp: "08012345621",
    call: "08012345621",
    verified: true,
    openNow: true,
    category: "Electrician"
  },
];