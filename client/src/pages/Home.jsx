import React from 'react'
import Carousel from "../component/Carousel";
import AllCars from '../component/AllCars';
import SearchBar from '../component/SearchBar';
function Home() {
  return (
    <div>
      <Carousel/>
      <SearchBar/>
      <AllCars/>
    </div>
  )
}

export default Home