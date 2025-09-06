import React, { useState } from "react";
import { assets, cityList } from "../../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const HomeHeroSection = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("form is clicked");
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center gap-14 bg-light text-center">
      {" "}
      <h1 className="text-4xl md:text-5xl font-semibold">
        All Types Of Car On Rent
      </h1>
      {/* form input */}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full md:max-w-200 bg-white max-w-80
      shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        {/* content wrapper  */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          {/* 👇👇👇👇 This div is select location area 👇👇👇 */}

          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="" className="capitalization">
                Pickup Location
              </option>
              {/* cities from Apis */}
              {cityList?.map((city, idx) => (
                <option value={city} key={idx}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation ? pickupLocation : "Please select location"}
            </p>
          </div>

          {/* 👇👇👇👇 This div is (STARTING) date time area 👇👇👇 */}

          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              required
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // ✅ restricts past dates
              className="text-sm text-gray-500  rounded p-2"
            />
          </div>

          {/* 👇 Return Date field 👇 */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // ✅ return can’t be before today
              className="text-sm text-gray-500  rounded p-2"
            />
          </div>

          {/* Search Button  */}
          <button className="flex gap-2  pointer text-white bg-primary px-6  rounded-full py-2">
            <img
              className="brightness-200"
              src={assets.search_icon}
              alt="search"
            />
            Search
          </button>
        </div>
      </form>
      {/* bottom car image */}
      <motion.img
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 1, x: 700 }}
        transition={{ duration: 1.2 }}
        src={assets.main_car}
        alt="car image"
        className="max-h-74"
      />
    </section>
  );
};

export default HomeHeroSection;
