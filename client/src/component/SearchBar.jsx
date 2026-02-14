import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allInOneSearch } from "../services/authService";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = async () => {
    try {
      let params = {};

      if (brand) params.brand = brand.trim();
      if (price) params.price = Number(price);
      if (year) params.year = Number(year);

      if (!brand && !price && !year && value.trim()) {
        const trimmed = value.trim();
        const num = Number(trimmed);

        if (!isNaN(num)) {
          if (num >= 1990 && num <= new Date().getFullYear()) {
            params.year = num;
          } else {
            params.price = num;
          }
        } else {
          params.brand = trimmed;
        }
      }

      const res = await allInOneSearch(params);
      onSearch(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-6">

      {/* 🔹 GLASS CARD */}
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6">

        {/* 🔍 MAIN SEARCH */}
        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Search by brand, price or year..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Search
          </motion.button>

          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Filters
          </motion.button>
        </div>

        {/* 🎛 FILTER ANIMATION */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden"
            >
              {/* BRAND */}
              <input
                type="text"
                placeholder="Brand"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              {/* PRICE */}
              <input
                type="number"
                placeholder="Max Price"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* YEAR */}
              <input
                type="number"
                placeholder="Year"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchBar;