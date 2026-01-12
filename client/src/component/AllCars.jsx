import { useEffect, useState } from "react";
import { getAllCars } from "../services/authService";

function AllCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data.cars || data); // backend response ke hisab se
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading cars...</p>;
  }

  return (
    <section className="max-w-full mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Cars
      </h2>

      {/* 🔹 RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <img
              src={car.images?.[0]}
              alt={car.title}
              className="w-full h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-800">
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
