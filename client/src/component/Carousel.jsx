// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import car1 from "../assets/car1.png";
// import car2 from "../assets/car2.png";
// import car3 from "../assets/car3.png";
// const images = [car1, car2, car3];

// export default function HeroCarousel() {
//     const navigate = useNavigate();
//     const [current, setCurrent] = useState(0);

//     // 🔁 Auto Slide
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % images.length);
//         }, 3500);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section className="w-full lg:h-[700px] bg-gradient-to-br from-black via-gray-900 to-black flex items-center ">
//             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-3">

//                 {/* 🔹 LEFT CONTENT */}
//                 <div className="text-white space-y-6">
//                     <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
//                         Buy & Sell <span className="text-yellow-400">Premium Cars</span>
//                     </h1>

//                     <p className="text-gray-300 text-xl font-semibold">
//                         Discover trusted buyers and verified sellers for premium SUVs
//                         like BMW, Toyota, Audi & more.
//                     </p>

//                     <ul className="space-y-3 text-gray-300 text-lg font-serif">
//                         <li>✔ Verified Car Listings</li>
//                         <li>✔ Best Market Price</li>
//                         <li>✔ Instant Buyer–Seller Connect</li>
//                     </ul>

//                     <div className="flex gap-4 pt-4">
//                         <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition"
//                         onClick={() => navigate("/sell-car")}
//                         >
//                             Explore Cars
//                         </button>
//                         <button className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition font-bold"
//                         onClick={() => navigate("/sell-car")}
//                         >
//                             Sell Your Car
//                         </button>
//                     </div>
//                 </div>

//                 {/* 🔹 RIGHT CAROUSEL */}
//                 <div className="relative w-full h-[200px] md:h-[400px] lg:h-[420px] overflow-hidden rounded-3xl shadow-2xl">
//                     {images.map((img, index) => (
//                         <img
//                             key={index}
//                             src={img}
//                             alt="Car"
//                             className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
//                             ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
//                          `}
//                         />
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import car1 from "../assets/car4.png";
// import car2 from "../assets/car5.png";
// import car3 from "../assets/car6.png";


// const images = [car1, car2, car3];

// export default function HeroCarousel() {
//   const navigate = useNavigate();
//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false); // zoom out in progress

//   // 🔁 Auto Slide
// useEffect(() => {
//   const interval = setInterval(() => {
//     setIsAnimating(true); // start zoom out
//     setTimeout(() => {
//       setCurrent((prev) => (prev + 1) % images.length); // switch car after zoom out
//       setIsAnimating(false);
//     }, 1600); // match with transition duration
//   }, 4000); // overall interval
//   return () => clearInterval(interval);
// }, []);


//   return (
//     <div className="relative w-full overflow-hidden">
//     <section className="w-full lg:h-[700px] bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center">
        

//       <div className="w-full px-0 grid grid-cols-1 lg:grid-cols-[45%_55%] items-center">

//         {/* 🔹 LEFT CONTENT */}
//         <div className="space-y-6 lg:pl-36 pl-7">
//           <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
//             Buy & Sell <span className="text-blue-600">Trusted Cars</span>
//           </h1>

//           <p className="text-gray-600 text-xl font-bold">
//             A modern marketplace where buyers and sellers meet with trust,
//             transparency and the best prices.
//           </p>

//           <ul className="space-y-3 text-gray-700 text-lg font-semibold">
//             <li>✔ 100% Verified Listings</li>
//             <li>✔ Fair Market Valuation</li>
//             <li>✔ Direct Buyer–Seller Contact</li>
//           </ul>

//           <div className="flex gap-4 pt-4">
//             <button
//               className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
//               onClick={() => navigate("/cars")}
//             >
//               Explore Cars
//             </button>

//             <button
//               className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition font-bold"
//               onClick={() => navigate("/carsform")}
//             >
//               Sell Your Car
//             </button>
//           </div>
//         </div>

//         {/* 🔹 RIGHT CAROUSEL */}
// {/* 🔹 RIGHT CAROUSEL */}
// {/* 🔹 RIGHT CAROUSEL */}
// <div className="relative lg:w-[1000px] h-[260px] md:h-[420px]  lg:-ml-20 ">


//   {/* SCREEN / DIV */}
//   <div className="absolute inset-6   overflow-hidden z-10"></div>

//   {/* CAR IMAGES */}
//     {images.map((img, index) => (
//   <img
//     key={index}
//     src={img}
//     alt="Car"
//     className={`absolute top-1/2 left-2 md:left-4 lg:left-6 -translate-y-1/2
//       w-[120%] md:w-[150%] lg:w-[200%] md:h-[500px]
//       object-contain transition-all duration-[1600ms] ease-in-out
//       ${
//         index === current
//           ? isAnimating
//             ? "opacity-0 scale-0 md:scale-0 lg:scale-0 -translate-x-10 md:-translate-x-40 lg:-translate-x-56 z-0"
//             : "opacity-100 scale-200 md:scale-5 lg:scale-150 -translate-x-7 md:-translate-x-30 lg:-translate-x-30 z-0"
//           : "opacity-0 scale-75 translate-x-10 md:translate-x-20 lg:translate-x-20 z-10"
//       }`}
//   />
// ))}


// </div>

//       </div>
      
//     </section>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import car1 from "../assets/car4.png";
import car2 from "../assets/car5.png";
import car3 from "../assets/car6.png";


const images = [car2];

export default function HeroCarousel() {
  const navigate = useNavigate();
 // zoom out in progress



  return (
    <div className="relative w-full overflow-hidden ">
    <section className="w-full  lg:h-[700px] bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center">
        

      <div className="w-full px-0 grid grid-cols-1 lg:grid-cols-[45%_55%] items-center">

        {/* 🔹 LEFT CONTENT */}
        <div className="space-y-6 lg:pl-36 pl-7">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Buy & Sell <span className="text-blue-600">Trusted Cars</span>
          </h1>

          <p className="text-gray-600 text-xl font-bold">
            A modern marketplace where buyers and sellers meet with trust,
            transparency and the best prices.
          </p>

          <ul className="space-y-3 text-gray-700 text-lg font-semibold">
            <li>✔ 100% Verified Listings</li>
            <li>✔ Fair Market Valuation</li>
            <li>✔ Direct Buyer–Seller Contact</li>
          </ul>

          <div className="flex gap-4 pt-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
              onClick={() => navigate("/cars")}
            >
              Explore Cars
            </button>

            <button
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition font-bold"
              onClick={() => navigate("/carsform")}
            >
              Sell Your Car
            </button>
          </div>
        </div>

<div className="relative lg:w-[1000px] h-[260px] md:h-[420px]  lg:-ml-20 ">
   <img src={images[0]} alt="car" className="w-full h-full object-contain lg:scale-150 md:scale-125 scale-100" />
</div>

      </div>
      
    </section>
    </div>
  );
}

