import React, { useState } from "react";
import OwnerTitle from "../../component/Owner/OwnerTitle";
import { assets } from "../../assets/assets";

const AddCar = () => {
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
  });
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <section className="px-4 py-10 md:px-10 flex-1">
      <OwnerTitle
        title={"Add New Car"}
        subTitle={
          "Fill in details to list a new car for booking including price, available and specification"
        }
      />
      <form
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
        onSubmit={onsubmitHandler}
      >
        {/* car image  */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              className="h-14 rounded pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
            />
            {/* input */}
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
      </form>
    </section>
  );
};

export default AddCar;
