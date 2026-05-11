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
    <section className="min-h-[50vh] md:min-h-[40vh] flex flex-col justify-center items-center gap-8 md:gap-14 bg-light text-center px-4 py-12 md:py-20 overflow-hidden">
      {" "}
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl">
        All Types Of Car On Rent
      </h1>
      {/* form input */}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 rounded-2xl md:rounded-full w-full md:max-w-5xl bg-white shadow-xl"
      >
        {/* content wrapper  */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full px-4">
          {/* 👇👇👇👇 This div is select location area 👇👇👇 */}

          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label className="text-xs font-bold uppercase text-gray-400 px-1">Location</label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 font-medium w-full"
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
          </div>

          <div className="h-px md:h-10 w-full md:w-px bg-gray-200"></div>

          {/* 👇👇👇👇 This div is (STARTING) date time area 👇👇👇 */}

          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label htmlFor="pickup-date" className="text-xs font-bold uppercase text-gray-400 px-1">Pick-up Date</label>
            <input
              required
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // ✅ restricts past dates
              className="text-sm text-gray-700 font-medium outline-none bg-transparent"
            />
          </div>

          <div className="h-px md:h-10 w-full md:w-px bg-gray-200"></div>

          {/* 👇 Return Date field 👇 */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label htmlFor="return-date" className="text-xs font-bold uppercase text-gray-400 px-1">Return Date</label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // ✅ return can’t be before today
              className="text-sm text-gray-700 font-medium outline-none bg-transparent"
            />
          </div>

          {/* Search Button  */}
          <button className="flex items-center justify-center gap-2 w-full md:w-auto cursor-pointer text-white bg-primary hover:bg-secondary transition-all px-8 py-3 rounded-full font-semibold shadow-lg">
            <img
              className="brightness-200 size-5"
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
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={assets.main_car}
        alt="car image"
        className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] object-contain drop-shadow-2xl"
      />
    </section>
  );
};

export default HomeHeroSection;
