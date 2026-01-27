
import { useNavigate } from "react-router-dom";
import car2 from "../assets/car5.png";
const images = [car2];

export default function HeroCarousel() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden ">
    <section className="w-full  lg:h-[700px] bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center">
        

      <div className="w-full px-0 grid grid-cols-1 lg:grid-cols-[45%_55%] items-center">

        {/* 🔹 LEFT CONTENT */}
        <div className="space-y-6 lg:pl-36 pl-7 mt-28 lg:mt-0">
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

<div className="relative lg:w-[1000px] h-[260px] md:h-[420px]  lg:-ml-20 lg:mt-6">
   <img src={images[0]} alt="car" className="w-full h-full object-contain lg:scale-150 md:scale-125 scale-100" />
</div>

      </div>
      
    </section>
    </div>
  );
}

