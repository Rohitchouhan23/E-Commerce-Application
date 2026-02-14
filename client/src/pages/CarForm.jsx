import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { createCar, updateCar } from "../services/authService";

export default function CarForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCar = location.state?.car;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingCar) {
      reset({
        ...editingCar,
        images: editingCar.images?.join(", "),
        features: editingCar.features?.join(", "),
      });
    }
  }, [editingCar, reset]);

  const onSubmit = async (data) => {
    try {
      data.images = data.images.split(",").map((img) => img.trim());
      data.features = data.features
        ? data.features.split(",").map((f) => f.trim())
        : [];

      if (editingCar) {
        await updateCar(editingCar._id, data);
        alert("🚗 Car Updated Successfully!");
      } else {
        await createCar(data);
        alert("🚗 Car Listed Successfully!");
      }

      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mt-20 min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 md:p-10 lg:p-12 space-y-10"
      >
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            ← Go Back
          </button>
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 text-center">
          {editingCar ? "Update Your Car" : "List Your Car"}
        </h2>

        {/* SAME DESIGN BELOW — NOTHING CHANGED */}

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input label="Title" register={register} name="title" errors={errors} />
            <Input label="Brand" register={register} name="brand" errors={errors} />
            <Input label="Model" register={register} name="model" errors={errors} />
            <Input label="Year" type="number" register={register} name="year" errors={errors} />
            <Input label="Price (₹)" type="number" register={register} name="price" errors={errors} />
            <Input label="Mileage (km)" type="number" register={register} name="mileage" errors={errors} />
            <Input label="Color" register={register} name="color" errors={errors} />
            <Input label="Location" register={register} name="location" errors={errors} />
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">
            Technical Specs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Select label="Fuel Type" name="fuelType" register={register} options={["Petrol","Diesel","Electric","Hybrid"]} errors={errors}/>
            <Select label="Transmission" name="transmission" register={register} options={["Manual","Automatic"]} errors={errors}/>
            <Select label="Condition" name="condition" register={register} options={["Excellent","Good","Fair","Poor"]} errors={errors}/>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">
            Description & Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea label="Description" register={register} name="description" errors={errors}/>
            <Textarea label="Images (URLs)" register={register} name="images" errors={errors}/>
            <Textarea label="Features (comma separated)" register={register} name="features"/>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-1"
          >
            {editingCar ? "Update Car" : "Submit Car"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* Reusable Components SAME */

const Input = ({ label, register, name, errors, type = "text" }) => (
  <div>
    <label className="block mb-2 font-medium text-gray-700">{label}</label>
    <input type={type} {...register(name,{required:true})}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition shadow-sm hover:shadow-md"
    />
    {errors[name] && <p className="text-red-500 text-sm mt-1">Required</p>}
  </div>
);

const Select = ({ label, name, register, options, errors }) => (
  <div>
    <label className="block mb-2 font-medium text-gray-700">{label}</label>
    <select {...register(name,{required:true})}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition shadow-sm hover:shadow-md"
    >
      <option value="">Select</option>
      {options.map(op=>(
        <option key={op} value={op}>{op}</option>
      ))}
    </select>
    {errors?.[name] && <p className="text-red-500 text-sm mt-1">Required</p>}
  </div>
);

const Textarea = ({ label, register, name, errors }) => (
  <div>
    <label className="block mb-2 font-medium text-gray-700">{label}</label>
    <textarea rows="4" {...register(name,{required:true})}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition shadow-sm hover:shadow-md resize-none"
    />
    {errors?.[name] && <p className="text-red-500 text-sm mt-1">Required</p>}
  </div>
);