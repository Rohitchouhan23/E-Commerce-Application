import React, { useEffect, useState } from "react";
import { getMyCars } from "../services/authService";
import {deleteCar} from "../services/authService";
import {soldCar} from "../services/authService";
function Dashboard() {
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
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this car?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCar(id);
      setCars((prevCars) =>
      prevCars.filter((car) => car._id !== id)
    );
  } catch (error) {
    alert("Failed to delete car");
    console.log(error);
  }
};
  const handleSold = async (id) => {
  const confirmSold = window.confirm(
    "Are you sure this car is sold?"
  );

  if (!confirmSold) return;

  try {
    const res = await soldCar(id);

    // UI update
    setCars((prevCars) =>
      prevCars.map((car) =>
        car._id === id ? { ...car, sold: true } : car
      )
    );
  } catch (error) {
    alert("Failed to mark car as sold");
    console.log(error);
  }
};



  if (loading) {
    return <p className="text-center mt-10">Loading your cars...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">My Cars</h2>

      {cars.length === 0 ? (
        <p>No cars listed yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="border rounded-lg shadow hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <img
                src={car.images[0]}
                alt={car.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />

              {/* DETAILS */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car.title}</h3>
                <p className="text-gray-600">{car.brand}</p>
                <p className="text-green-600 font-bold">₹ {car.price}</p>

                {/* BUTTONS */}
                <div className="flex justify-between mt-4">
                  <button
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Update
                  </button>

                  <button onClick={() => handleDelete(car._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                    Delete
                  </button>

                  <button
                        onClick={() => handleSold(car._id)}
                        disabled={car.sold}
                        className={`px-3 py-1 text-white rounded text-sm ${
                          car.sold ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700"
                        }`}
                      >
                        Sold
                  </button>

                  {car.sold && (
                      <span className="text-red-500 font-semibold text-sm">
                        SOLD
                      </span>
                    )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
