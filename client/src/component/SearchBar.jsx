import React, { useEffect, useState } from "react";
import {
  getUniqueBrands,
  getPriceRange,
  getYearRange,
} from "../services/authService";

function SearchBar({ onSearch }) {
  // selected values
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  // filter data
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [yearRange, setYearRange] = useState({ min: 2000, max: 2025 });

  const [mobileSearchType, setMobileSearchType] = useState("");

  // fetch filter data
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const brandRes = await getUniqueBrands();
        const priceRes = await getPriceRange();
        const yearRes = await getYearRange();

        setBrands(brandRes.brands || []);
        setPriceRange({
          min: priceRes.minPrice,
          max: priceRes.maxPrice,
        });
        setYearRange({
          min: yearRes.minYear,
          max: yearRes.maxYear,
        });
      } catch (err) {
        console.error("Filter fetch error", err);
      }
    };

    fetchFilters();
  }, []);

  // 🔥 BACKEND KE HISAAB SE FILTER BANAO
  const handleSearch = () => {
    const filters = {};

    if (brand) filters.brand = brand;

    if (price) {
      filters.minPrice = 0;
      filters.maxPrice = price;
    }

    if (year) {
      filters.minYear = year;
      filters.maxYear = year;
    }

    console.log("Sending filters:", filters);

    if (onSearch) onSearch(filters);
  };

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow">
      {/* Desktop View */}
      <div className="hidden lg:flex w-full gap-4">
        {/* Brand */}
        <input
          type="text"
          list="brand-list"
          placeholder="Search Brand"
          className="flex-1 rounded-xl border px-4 py-2"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <datalist id="brand-list">
          {brands.map((b, i) => (
            <option key={i} value={b} />
          ))}
        </datalist>

        {/* Price */}
        <input
          type="number"
          min={priceRange.min}
          max={priceRange.max}
          placeholder={`Max Price (${priceRange.min} - ${priceRange.max})`}
          className="flex-1 rounded-xl border px-4 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Year */}
        <input
          type="number"
          min={yearRange.min}
          max={yearRange.max}
          placeholder="Year"
          className="flex-1 rounded-xl border px-4 py-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded-xl px-6 py-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden w-full">
        <select
          className="w-full rounded-xl border px-4 py-2"
          value={mobileSearchType}
          onChange={(e) => setMobileSearchType(e.target.value)}
        >
          <option value="">Search By</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
          <option value="year">Year</option>
        </select>

        {mobileSearchType === "brand" && (
          <input
            type="text"
            list="brand-list-mobile"
            placeholder="Search Brand"
            className="w-full mt-2 rounded-xl border px-4 py-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        )}

        {mobileSearchType === "price" && (
          <input
            type="number"
            placeholder={`Max Price (${priceRange.min} - ${priceRange.max})`}
            className="w-full mt-2 rounded-xl border px-4 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        )}

        {mobileSearchType === "year" && (
          <input
            type="number"
            placeholder="Year"
            className="w-full mt-2 rounded-xl border px-4 py-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        )}

        <button
          onClick={handleSearch}
          className="w-full mt-3 bg-blue-500 text-white rounded-xl px-6 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
