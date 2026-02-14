import { motion } from "framer-motion";
import sellerImg from "../assets/seller.png";
import buyerImg from "../assets/buyer.png";
import { Link } from "react-router-dom";

export default function CarJoinSection() {
  const MotionLink = motion(Link);

  return (
    <div className="relative mt-18 z-30 px-6">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
        {/* ================= SELLER CARD ================= */}
        <div className="relative bg-white rounded-3xl p-8 shadow-xl overflow-hidden group transition-all duration-300">
          
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-400 rounded-full group-hover:rotate-12 transition-transform duration-500"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            
            <motion.img
              src={sellerImg}
              alt="Car Seller"
              whileHover={{ y: -8, rotate: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-40 md:w-48 object-contain"
            />

            <div>
              <motion.h2 
                whileHover={{ x: 5 }} 
                className="text-3xl font-bold text-slate-800 transition"
              >
                Sell Your Car
              </motion.h2>

              <p className="text-gray-600 mt-3">
                List your car easily, reach thousands of buyers, and get the best market value instantly.
              </p>

              {/* 🔥 LINK ADDED HERE */}
              <MotionLink
                to="/carsform"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Start Selling →</span>

                <motion.span
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-white/20 skew-x-12"
                />
              </MotionLink>
            </div>
          </div>
        </div>

        {/* ================= BUYER CARD ================= */}
        <div className="relative bg-white rounded-3xl p-8 shadow-xl overflow-hidden group transition-all duration-300">
          
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-500 rounded-full group-hover:rotate-12 transition-transform duration-500"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            
            <motion.img
              src={buyerImg}
              alt="Car Buyer"
              whileHover={{ y: -8, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-40 md:w-48 object-contain"
            />

            <div>
              <motion.h2 
                whileHover={{ x: 5 }} 
                className="text-3xl font-bold text-slate-800 transition"
              >
                Buy Your Dream Car
              </motion.h2>

              <p className="text-gray-600 mt-3">
                Explore verified listings, compare prices, and find the perfect car for your lifestyle.
              </p>

              <MotionLink
                
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Start Buying →</span>

                <motion.span
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-white/20 skew-x-12"
                />
              </MotionLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}