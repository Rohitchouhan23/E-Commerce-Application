import React, { useEffect, useState } from "react";
import { getMyCars, deleteCar, soldCar } from "../services/authService";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, CheckCircle2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Mycars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const carsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getMyCars();
        setCars(data.cars);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    await deleteCar(id);
    setCars((prev) => prev.filter((car) => car._id !== id));
  };

  const handleSold = async (id) => {
    if (!window.confirm("Mark as sold?")) return;
    await soldCar(id);
    setCars((prev) =>
      prev.map((car) =>
        car._id === id ? { ...car, sold: true } : car
      )
    );
  };

  const indexOfLast = currentPage * carsPerPage;
  const indexOfFirst = indexOfLast - carsPerPage;
  const currentCars = cars.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading your cars...
      </p>
    );

  return (
    <div className="px-2 sm:px-0">
      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars listed yet</p>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {currentCars.map((car) => (
                <motion.div
                  key={car._id}
                  whileHover={{ y: -5 }}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                >
                  {car.sold && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                      SOLD
                    </div>
                  )}

                  <div className="h-44 sm:h-48 overflow-hidden">
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-base sm:text-lg font-semibold truncate">
                      {car.title}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {car.brand}
                    </p>

                    <p className="text-indigo-600 font-bold text-lg mt-1">
                      ₹ {car.price.toLocaleString()}
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex gap-2">

                        {/* ✅ UPDATE BUTTON */}
                        <button
                          onClick={() =>
                            navigate("/carsform", {
                              state: { car },
                            })
                          }
                          className="flex-1 flex items-center justify-center gap-1 bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                        >
                          <Pencil size={14} />
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(car._id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>

                      <button
                        onClick={() => handleSold(car._id)}
                        disabled={car.sold}
                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-white transition ${
                          car.sold
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gray-800 hover:bg-black"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        {car.sold ? "Sold" : "Mark Sold"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

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

export default Mycars;