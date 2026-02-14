import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../services/authService";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);

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
  }, [id]);

  if (loading)
    return <p className="text-center py-10">Loading car details...</p>;

  if (!car)
    return <p className="text-center py-10">Car not found</p>;

  return (
    <>
      {/* ================= MAIN SECTION ================= */}
      <section className="mt-20 min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-6 relative">

        {/* 🔙 GO BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-xl shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 font-medium"
        >
          ← Go Back
        </button>

        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* ===== Grid container ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[80vh] overflow-y-auto">
            
            {/* ================= IMAGE SIDE ================= */}
            <div className="relative group bg-slate-100 flex items-center justify-center p-6">
              <img
                src={car.images?.[0]}
                alt={car.title}
                onClick={() => setPreviewOpen(true)}
                className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105 cursor-zoom-in"
              />

              <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-lg font-semibold shadow-lg">
                ₹ {car.price}
              </div>
            </div>

            {/* ================= DETAILS SIDE ================= */}
            <div className="p-8 flex flex-col">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {car.title}
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {car.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Brand", value: car.brand },
                    { label: "Model", value: car.model },
                    { label: "Year", value: car.year },
                    { label: "Mileage", value: `${car.mileage} km` },
                    { label: "Fuel", value: car.fuelType },
                    { label: "Transmission", value: car.transmission },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 hover:bg-indigo-50 transition duration-300 p-3 rounded-xl"
                    >
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons always at bottom on mobile */}
              <div className="mt-6 flex gap-4 lg:mt-auto">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-md hover:shadow-xl">
                  Buy Now
                </button>

                <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition duration-300">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMAGE PREVIEW MODAL ================= */}
      {previewOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPreviewOpen(false)}
        >
          <button
            className="absolute top-6 right-8 text-white text-4xl font-bold"
            onClick={() => setPreviewOpen(false)}
          >
            ✕
          </button>

          <img
            src={car.images?.[0]}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

export default CarDetails;