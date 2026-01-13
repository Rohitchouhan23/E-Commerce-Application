import React, { useState } from "react";

function SearchBar() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [mobileSearchType, setMobileSearchType] = useState(""); // track selected type

  return (
    <div className="w-full p-4">
      {/* Desktop / Laptop View */}
      <div className="hidden lg:flex w-full gap-4">
        <input
          type="text"
          placeholder="Search Brand"
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Price"
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Year"
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button className="bg-blue-500 text-white rounded-xl px-6 py-2 hover:bg-blue-600 transition">
          Search
        </button>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden w-full">
        <select
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={mobileSearchType}
          onChange={(e) => setMobileSearchType(e.target.value)}
        >
          <option value="">Search Here</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
          <option value="year">Year</option>
        </select>

        {/* Conditional input based on selection */}
        {mobileSearchType === "brand" && (
          <input
            type="text"
            placeholder="Search Brand"
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        )}
        {mobileSearchType === "price" && (
          <input
            type="text"
            placeholder="Search Price"
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        )}
        {mobileSearchType === "year" && (
          <input
            type="text"
            placeholder="Search Year"
            className="w-full mt-2 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        )}

        <button className="w-full mt-2 bg-blue-500 text-white rounded-xl px-6 py-2 hover:bg-blue-600 transition">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
