import React, { useState } from "react";
import OwnerTitle from "../../component/Owner/OwnerTitle";
import { assets } from "../../assets/assets";

import axiosInstance from "../../Config/Axios/AxiosIntance";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const AddCar = () => {
  const [loading, setLoading] = useState(false);
  const { dbUser } = useRole()
  const ownerId = dbUser?._id;
console.log(ownerId)
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
    ownerId,
  });

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // show alert during data save to database..
    // Show loading alert (no timer, stays open)
    Swal.fire({
      title: "Please wait...",
      text: "Your car is being added. Do not reload the page.",
      allowOutsideClick: false, // prevent closing by clicking outside
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("pricePerDay", car.pricePerDay);
    formData.append("category", car.category);
    formData.append("transmission", car.transmission);
    formData.append("fuel_type", car.fuel_type);
    formData.append("seating_capacity", car.seating_capacity);
    formData.append("location", car.location);
    formData.append("description", car.description);
    formData.append("ownerId", ownerId);
    if (image) formData.append("image", image); // append the file

    try {
      const res = await axiosInstance.post("/api/owner/car-add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Close loading alert
      Swal.close();

      // data save to data base and show alert

      if (res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Car is added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setLoading(false);
    }
  };

  // Reusable input/select classes
  const inputClasses =
    "px-3 py-2 mt-1 border border-gray-300 rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary";
  const selectClasses =
    "px-3 py-2 mt-1 border border-gray-300 rounded-lg outline-none text-gray-700 bg-white focus:ring-2 focus:ring-primary focus:border-primary";

  return (
    <section className="px-4 py-10 md:px-10 flex-1">
      <OwnerTitle
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking including price, availability and specifications"
      />

      <form
        className="flex flex-col gap-6 text-gray-600 text-sm mt-6 max-w-xl"
        onSubmit={onsubmitHandler}
      >
        {/* Car Image */}
        <div className="flex items-center gap-4 w-full">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              className="h-16 w-16 object-cover rounded-lg border border-gray-300"
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Upload"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Brand</label>
            <input
              required
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Model</label>
            <input
              required
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Year - Price - Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Year</label>
            <input
              required
              type="number"
              placeholder="2025"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Daily Price $</label>
            <input
              required
              type="number"
              placeholder="10"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Category</label>
            <select
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission - Fuel - Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Transmission</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Fuel Type</label>
            <select
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium">Seating Capacity</label>
            <input
              required
              type="number"
              placeholder="4"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              className={inputClasses}
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col w-full">
          <label htmlFor="car-location" className="text-sm font-medium">
            Location
          </label>
          <select
            id="car-location"
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            className={selectClasses}
          >
            <option value="">Select a location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label htmlFor="car-description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="car-description"
            required
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className={`${inputClasses} resize-none`}
          ></textarea>
        </div>

        {/* Submit */}
        {loading ? (
          <>
            <span className="loading loading-spinner text-primary"></span>
          </>
        ) : (
          <>
            <button className="bg-primary hover:bg-secondary transition-colors text-white flex items-center gap-2 px-5 py-2.5 mt-4 rounded-lg font-medium w-max cursor-pointer">
              <img
                src={assets.tick_icon}
                className="h-4 w-4 brightness-200"
                alt=""
              />
              List Your Car
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default AddCar;
