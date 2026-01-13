import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";
const images = [car1, car2, car3];

export default function HeroCarousel() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    // 🔁 Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full lg:h-[700px] bg-gradient-to-br from-black via-gray-900 to-black flex items-center ">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-3">

                {/* 🔹 LEFT CONTENT */}
                <div className="text-white space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                        Buy & Sell <span className="text-yellow-400">Premium Cars</span>
                    </h1>

                    <p className="text-gray-300 text-xl font-semibold">
                        Discover trusted buyers and verified sellers for premium SUVs
                        like BMW, Toyota, Audi & more.
                    </p>

                    <ul className="space-y-3 text-gray-300 text-lg font-serif">
                        <li>✔ Verified Car Listings</li>
                        <li>✔ Best Market Price</li>
                        <li>✔ Instant Buyer–Seller Connect</li>
                    </ul>

                    <div className="flex gap-4 pt-4">
                        <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition"
                        onClick={() => navigate("/sell-car")}
                        >
                            Explore Cars
                        </button>
                        <button className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition font-bold"
                        onClick={() => navigate("/sell-car")}
                        >
                            Sell Your Car
                        </button>
                    </div>
                </div>

                {/* 🔹 RIGHT CAROUSEL */}
                <div className="relative w-full h-[200px] md:h-[400px] lg:h-[420px] overflow-hidden rounded-3xl shadow-2xl">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Car"
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
                            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                         `}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
