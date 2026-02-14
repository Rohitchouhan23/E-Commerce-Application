import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import car2 from "../assets/car5.png";

export default function HeroCarousel() {
  const navigate = useNavigate();

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  return (
    <div className="relative w-full overflow-hidden ">
      <section className="w-full lg:h-[700px] bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center">

        <div className="w-full px-0 grid grid-cols-1 lg:grid-cols-[45%_55%] items-center">

          {/* 🔹 LEFT CONTENT */}
          <motion.div
            initial={{ x: -180, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            
            className="space-y-6 lg:pl-36  mt-28 lg:mt-0 "
          >
            <h1 className="pl-5 text-4xl lg:text-5xl  lg:pl-0 sm:pl-0 font-extrabold text-gray-900 leading-tight">
              Buy & Sell <span className="text-blue-600">Trusted Cars</span>
            </h1>

            <p className="text-gray-600 text-xl font-bold pl-5 lg:pl-0 sm:pl-0">
              A modern marketplace where buyers and sellers meet with trust,
              transparency and the best prices.
            </p>

            <ul className="space-y-3 text-gray-700 text-lg font-semibold pl-5 lg:pl-0 sm:pl-0">
              <li>✔ 100% Verified Listings</li>
              <li>✔ Fair Market Valuation</li>
              <li>✔ Direct Buyer–Seller Contact</li>
            </ul>

            <div className="flex gap-4 pt-4">
              <button
                className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700"
                onClick={() => navigate("/cars")}
              >
                Explore Cars
              </button>

              <button
                className="px-6 py-3 border bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700"
                onClick={() => navigate("/carsform")}
              >
                Sell Your Car
              </button>
            </div>
          </motion.div>

          {/* 🚗 RIGHT IMAGE */}
          <motion.div
            initial={{ x: 180, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            
            className="relative lg:w-[1000px] h-[260px] md:h-[420px] lg:-ml-20 lg:mt-6"
          >
            <img
              src={car2}
              alt="car"
              className="w-full h-full object-contain lg:scale-150 md:scale-125"
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
}