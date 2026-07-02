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
import { Barbers } from './barbers'
import { FashionDesigners } from './fashionDesigners'
import { Plumbers } from './plumbers'
import { Electricians } from './electricians'


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
  ...Barbers,
  ...FashionDesigners,
  ...Plumbers,
  ...Electricians,
]