import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../services/authService";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setCar(data.car); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, []);

  if (loading) return <p className="text-center py-10">Loading car details...</p>;
  if (!car) return <p className="text-center py-10">Car not found</p>;

  return (
    <section className="max-w-6xl mx-auto py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* IMAGE */}
        <img
          src={car.images?.[0]}
          alt={car.title}
          className="w-full lg:h-96 object-cover rounded-2xl shadow "
        />

        {/* DETAILS */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{car.title}</h1>
          <p className="text-gray-600">{car.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <p><b>Brand:</b> {car.brand}</p>
            <p><b>Model:</b> {car.model}</p>
            <p><b>Year:</b> {car.year}</p>
            <p><b>Price:</b> {car.price}</p>
            <p><b>Mileage:</b> {car.mileage} km</p>
            <p><b>Fuel:</b> {car.fuelType}</p>
            <p><b>Transmission:</b> {car.transmission}</p>
            <p><b>Color:</b> {car.color}</p>
            <p><b>Location:</b> {car.location}</p>
            <p><b>Condition:</b> {car.condition}</p>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-xl font-semibold mt-4">Features</h3>
            <ul className="list-disc list-inside text-gray-600">
              {car.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarDetails;
