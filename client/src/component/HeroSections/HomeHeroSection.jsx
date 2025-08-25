import React, { useState } from "react";
import { assets, cityList } from "../../assets/assets";

const HomeHeroSection = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  return (
    <section className="h-screen  flex flex-col items-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        All Types Of Car On Rent
      </h1>
      {/* form input */}
      <form
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full md:max-w-200 bg-white max-w-80
      shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        {/* content wrapper  */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
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
        </div>
      </form>
      {/* bottom car image */}
      <img src={assets.main_car} alt="car image" className="max-h-74" />
    </section>
  );
};

export default HomeHeroSection;
