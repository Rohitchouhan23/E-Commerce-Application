import React from 'react'
import Carousel from "../component/Carousel";
import AllCars from '../component/AllCars';
import Feedback from '../component/FeedBack';
import TopBrands from '../component/TopBrands';
import CarJourney from '../component/CarJourney';
import LatestNews from '../component/LatestNews';
import BuyerSellerSection from '../component/BuyerSellerSection';
function Home() {
  return (
    <div>
      <Carousel />
      <AllCars/>
      <TopBrands/>
<div className="relative">
  <CarJourney />
  
  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
    <BuyerSellerSection /> {/* Floating only on large screens */}
  </div>

  {/* For mobile/tablet, show normally below */}
  <div className="lg:hidden ">
    <BuyerSellerSection /> {/* Stacks in normal flow on smaller screens */}
  </div>

  <LatestNews />
</div>
      <Feedback/>
    </div>
  )
}

export default Home;