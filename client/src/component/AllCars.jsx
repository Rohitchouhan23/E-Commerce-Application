import { useEffect, useState } from "react";
import { getAllCars } from "../services/authService";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import AOS from "aos";
import { motion } from "framer-motion";

function AllCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(9);

  useEffect(() => {
  const handleFocus = () => {
    fetchCars();
  };

  window.addEventListener("focus", handleFocus);

  return () => window.removeEventListener("focus", handleFocus);
}, []);



  // 🔹 Adjust cars per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCarsPerPage(6); // mobile
      else setCarsPerPage(9); // tablet/laptop
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Initial load (without filters)
  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [cars, currentPage]);

  // 🔹 Fetch cars (reusable)
  const fetchCars = async (filters = {}) => {
    try {
      const res = await getAllCars(filters);
      console.log("API Response:", res); 
      setCars(res.cars);
      
      setCurrentPage(1); // reset page on new fetch
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 SearchBar callback
  const handleSearch = (carsData) => {
    setCars(carsData);
    setHasSearched(true);
    setCurrentPage(1);
  };

  // 🔹 Pagination calculations
  const totalCars = cars.length;
  const totalPages = Math.ceil(totalCars / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  // 🔹 Handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="max-w-full mx-auto px-4 py-10">
      {/* 🔥 PREMIUM HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
          Find Your Premium Car
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto"
        >
          Explore luxury, performance and comfort — all in one place.
        </motion.p>
      </motion.div>

      <SearchBar onSearch={handleSearch} />

      {hasSearched && cars.length === 0 && (
        <div className="mt-12 flex flex-col items-center text-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="No cars"
            className="w-28 mb-4 opacity-80"
          />
          <h3 className="text-2xl font-bold text-gray-700">No Cars Found 🚗</h3>
          <p className="mt-2 text-lg">
            Try changing filters or search with a different keyword.
          </p>
        </div>
      )}

      {/* 🔹 RESPONSIVE GRID */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {currentCars.map((car, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={`${300 + index * 50}`}
            key={car._id}
            onClick={() => navigate(`/cars/${car._id}`)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* IMAGE */}
            <img
              src={car.images?.[0]}
              alt={car.title}
              className="w-full sm:h-56 h-32 object-contain bg-gray-100 lg:object-cover rounded-2xl lg:h-80"
            />

            {/* CONTENT */}
            <div className="lg:p-4 lg:space-y-1 h-22 p-2">
              <h3 className="lg:text-xl lg:font-bold font-semibold text-gray-800">
                {car.title}
              </h3>
              <p className="text-gray-500 font-medium">Brand: {car.brand}</p>
              <p className="text-gray-500 font-medium">Price: {car.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 PAGINATION BUTTONS */}
{/* 🔹 PAGINATION */}
{totalPages > 1 && (
  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-10">
    
    {/* Previous */}
    <button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    {/* Page Info */}
    <span className="text-sm font-medium text-gray-600">
      Page {currentPage} of {totalPages}
    </span>

    {/* Next */}
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>

  </div>
)}
    </section>
  );
}

export default AllCars;