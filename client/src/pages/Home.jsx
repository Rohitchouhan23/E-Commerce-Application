import React from 'react'
import Carousel from "../component/Carousel";
import AllCars from '../component/AllCars';
import Feedback from '../component/FeedBack';
function Home() {
  return (
    <div>
      <Carousel/>
      <AllCars/>
      <Feedback/>
    </div>
  )
}

export default Home