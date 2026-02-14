import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Audi from "../assets/Audi.svg";
import Bmw from "../assets/BMW.svg";
import Mercedes from "../assets/Mercedes.svg";
import Toyota from "../assets/toyota.svg";
import Hyundai from "../assets/hyundai.svg";
import Mahindra from "../assets/Mahindra.svg";

const brands = [
  { name: "BMW", logo: Bmw },
  { name: "Audi", logo: Audi },
  { name: "Mercedes", logo: Mercedes },
  { name: "Toyota", logo: Toyota },
  { name: "Hyundai", logo: Hyundai },
  { name: "Mahindra", logo: Mahindra },
  { name: "BMW", logo: Bmw },
  { name: "Audi", logo: Audi },
  { name: "Mercedes", logo: Mercedes },
  { name: "Toyota", logo: Toyota },
  { name: "Hyundai", logo: Hyundai },
  { name: "Mahindra", logo: Mahindra },
];

function TopBrands({ onBrandClick }) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Our Top Brands
        </motion.h2>

        <p className="text-gray-500 mt-3">
          Explore cars from the most trusted brands
        </p>
      </div>

      {/* Slider */}
<div className="max-w-7xl mx-auto px-6 relative">

  {/* Rounded Outer Wrapper */}
  <div className="p-10 relative max-w-[1500px] bg-white rounded-3xl shadow-xl px-10 py-10">

    {/* Custom Left Button */}
    <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10">
      <div className="w-12 h-12 flex items-center justify-center bg-white shadow-lg rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition">
        ❮
      </div>
    </div>

    {/* Custom Right Button */}
    <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10">
      <div className="w-12 h-12 flex items-center justify-center bg-white shadow-lg rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition">
        ❯
      </div>
    </div>

    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      spaceBetween={20}
      slidesPerView={6}
      slidesPerGroup={1}
      breakpoints={{
        0: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      }}
    >
      {brands.map((brand, index) => (
        <SwiperSlide key={index}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBrandClick(brand.name)}
            className="cursor-pointer group bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center justify-center border border-gray-100 hover:border-blue-200 "
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-100 transition">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-12 h-12 object-contain"
              />
            </div>

            <p className="mt-4 font-semibold text-gray-700 group-hover:text-blue-600 transition">
              {brand.name}
            </p>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
    </section>
  );
}

export default TopBrands;