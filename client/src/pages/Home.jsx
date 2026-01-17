import React from 'react'
import Carousel from "../component/Carousel";
import AllCars from '../component/AllCars';
import SearchBar from '../component/SearchBar';
import Feedback from '../component/FeedBack';
function Home() {
  return (
    <div>
      <Carousel/>
      <SearchBar/>
      <AllCars/>
      <Feedback/>
    </div>
  )
}

export default Home