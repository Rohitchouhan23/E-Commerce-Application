import React, { useEffect, useState } from "react";
import { getMyCars, deleteCar, soldCar } from "../services/authService";

function Mycars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (error) {
      alert("Failed to delete car");
      console.log(error);
    }
  };

  const handleSold = async (id) => {
    const confirmSold = window.confirm("Are you sure this car is sold?");
    if (!confirmSold) return;

    try {
      await soldCar(id);
      setCars((prev) =>
        prev.map((car) => (car._id === id ? { ...car, sold: true } : car))
      );
    } catch (error) {
      alert("Failed to mark car as sold");
      console.log(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your cars...</p>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl text-center font-bold mb-6">My Cars</h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars listed yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              {/* IMAGE */}
              <div className="h-24 sm:h-52 lg:h-56 w-full overflow-hidden rounded-t-lg">
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="p-3 sm:p-4">
                <h3 className="text-md sm:text-lg font-semibold truncate">{car.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{car.brand}</p>
                <p className="text-green-600 font-bold text-sm sm:text-base">
                  ₹ {car.price.toLocaleString()}
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs sm:text-sm hover:bg-blue-600 transition">
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex-1 px-2 py-1 bg-red-500 text-white rounded text-xs sm:text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleSold(car._id)}
                    disabled={car.sold}
                    className={`flex-1 px-2 py-1 rounded text-xs sm:text-sm text-white transition ${
                      car.sold
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    {car.sold ? "Sold" : "Mark Sold"}
                  </button>
                </div>

                {car.sold && (
                  <p className="mt-2 text-red-500 font-semibold text-xs sm:text-sm text-center">
                    SOLD
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mycars;
