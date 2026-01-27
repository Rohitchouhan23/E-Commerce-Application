import { useEffect, useState } from "react";
import { getAllCars } from "../services/authService";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function AllCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // 🔹 Initial load (without filters)
  useEffect(() => {
    fetchCars();
  }, []);

  // 🔹 Fetch cars (reusable)
  const fetchCars = async (filters = {}) => {
    try {
      const res = await getAllCars(filters);
      setCars(res.cars);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 SearchBar callback
  const handleSearch = (filters) => {
    fetchCars(filters);
  };

  return (
    <section className="max-w-full mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Cars
      </h2>

      {/* 🔍 SEARCH BAR (added only) */}
      <SearchBar onSearch={handleSearch} />

      {/* 🔹 RESPONSIVE GRID (UNCHANGED) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cars.map((car) => (
          <div
            key={car._id}
            onClick={() => navigate(`/cars/${car._id}`)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <img
              src={car.images?.[0]}
              alt={car.title}
              className="w-full sm:h-56 object-cover lg:h-80"
            />

            {/* CONTENT */}
            <div className="lg:p-4 lg:space-y-1 h-22 p-2">
              <h3 className="lg:text-xl font-bold text-gray-800">
                {car.title}
              </h3>
              <p className="text-gray-500 font-medium">
                Brand: {car.brand}
              </p>
              <p className="text-gray-500 font-medium">
                Price: {car.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllCars;
