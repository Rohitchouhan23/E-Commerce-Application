import { useEffect, useState } from "react";
import { getMySoldCars } from "../services/authService";

export default function MySoldCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSoldCars = async () => {
      try {
        const data = await getMySoldCars();
        setCars(data.cars);
      } catch (error) {
        console.error("Error fetching sold cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoldCars();
  }, []);

  // ✅ Dynamic Cars Per Page
  const carsPerPage = isMobile ? 4 : 6;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(cars.length / carsPerPage);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading sold cars...
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🚗 My Sold Cars
      </h2>

      {cars.length === 0 ? (
        <p className="text-gray-500">No sold cars yet.</p>
      ) : (
        <>
          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={car.images?.[0]}
                    alt={car.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {car.brand} {car.model}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {car.year} • {car.kmDriven} km
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-indigo-600 font-bold text-lg">
                      ₹{car.price}
                    </span>

                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      Sold
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="w-full sm:w-auto px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Previous
              </button>

              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}