import React from "react";
import { useForm } from "react-hook-form";
import {createCar} from "../services/authService"

export default function CarForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // images ko array banana (comma separated URLs)
      data.images = data.images.split(",").map(img => img.trim());
      data.features = data.features
        ? data.features.split(",").map(f => f.trim())
        : [];

      await createCar(data);
      alert("🚗 Car Listed Successfully!");
      reset();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          List Your Car
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Input label="Title" register={register} name="title" errors={errors} />
          <Input label="Brand" register={register} name="brand" errors={errors} />
          <Input label="Model" register={register} name="model" errors={errors} />
          <Input label="Year" type="number" register={register} name="year" errors={errors} />
          <Input label="Price" register={register} name="price" errors={errors} />
          <Input label="Mileage (km)" type="number" register={register} name="mileage" errors={errors} />
          <Input label="Color" register={register} name="color" errors={errors} />
          <Input label="Location" register={register} name="location" errors={errors} />

          {/* Fuel Type */}
          <Select
            label="Fuel Type"
            name="fuelType"
            register={register}
            options={["Petrol", "Diesel", "Electric", "Hybrid"]}
            errors={errors}
          />

          {/* Transmission */}
          <Select
            label="Transmission"
            name="transmission"
            register={register}
            options={["Manual", "Automatic"]}
            errors={errors}
          />

          {/* Condition */}
          <Select
            label="Condition"
            name="condition"
            register={register}
            options={["Excellent", "Good", "Fair", "Poor"]}
          />
        </div>

        {/* Description */}
        <Textarea
          label="Description"
          register={register}
          name="description"
          errors={errors}
        />

        {/* Images */}
        <Textarea
          label="Images (comma separated URLs)"
          register={register}
          name="images"
          errors={errors}
          placeholder="https://img1.jpg, https://img2.jpg"
        />

        {/* Features */}
        <Textarea
          label="Features (comma separated)"
          register={register}
          name="features"
          placeholder="ABS, Airbags, Sunroof"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition"
        >
          Submit Car
        </button>
      </form>
    </div>
  );
}

/* 🔹 Reusable Components */

const Input = ({ label, register, name, errors, type = "text" }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      type={type}
      {...register(name, { required: true })}
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
    />
    {errors[name] && <p className="text-red-500 text-sm">Required</p>}
  </div>
);

const Select = ({ label, name, register, options, errors }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <select
      {...register(name, { required: true })}
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
    >
      <option value="">Select</option>
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
    {errors?.[name] && <p className="text-red-500 text-sm">Required</p>}
  </div>
);

const Textarea = ({ label, register, name, errors, placeholder }) => (
  <div className="mt-6">
    <label className="block mb-1 font-semibold">{label}</label>
    <textarea
      rows="3"
      placeholder={placeholder}
      {...register(name, { required: true })}
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
    />
    {errors?.[name] && <p className="text-red-500 text-sm">Required</p>}
  </div>
);
