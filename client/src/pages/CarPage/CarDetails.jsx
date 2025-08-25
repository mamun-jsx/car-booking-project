import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets, dummyCarData } from "../../assets/assets";
import Loading from "../../component/Loading";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  // ! Form input to send data to backend 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("hello world");
  };
  useEffect(() => {
    const filtered = dummyCarData?.find((car) => car?._id === id);
    setCar(filtered);
  }, [id]);

  return car ? (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => {
          navigate(-1);
          scrollTo(0, 0);
        }}
        className="flex btn bg-primary rounded shadow-2xl text-center px-4 py-1 text-white items-center gap-2 mb-6  pointer bg-hover"
      >
        Back to all cars
        <img
          src={assets?.arrow_icon}
          alt="arrow to back"
          className="rotate-180  brightness-200"
        />
      </button>

      {/* booking form  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT: car image and Details  */}
        <div className="lg:col-span-2">
          <img
            src={car?.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              {car.brand} {car?.model}{" "}
            </h2>
            <p>
              {car?.category} | {car?.year}
            </p>
          </div>
          <hr className="border border-[#b2b0e8] my-6" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: assets?.users_icon,
                text: `${car?.seating_capacity} Seats`,
              },
              {
                icon: assets?.fuel_icon,
                text: car?.fuel_type,
              },
              {
                icon: assets?.car_icon,
                text: car?.transmission,
              },
              {
                icon: assets?.location_icon,
                text: car?.location,
              },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center bg-light p-4 rounded-lg"
              >
                <img src={icon} alt="" className="h-5 mb-2 " />
                {text}
              </div>
            ))}
          </div>
          {/* description  */}
          <div className="my-3">
            <h2 className="text-xl font-medium mb-3 ">Description </h2>
            <p className="text-gray-500">{car?.description}</p>
          </div>
          {/* description Ends */}
          {/* Features Starts from here  */}
          <div>
            <h2 className="text-xl font-medium mb-3 ">Features </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "360 camera",
                "Bluetooth",
                "GPS",
                "Heated Seats",
                "Rear view Mirror",
              ].map((item) => (
                <li key={item} className="flex items-center text-gray-500">
                  <img src={assets?.check_icon} alt="" className="h-4 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Features ENDS  here  */}
        </div>
        {/* RIGHT : Booking Form  */}

        <form
          onSubmit={handleFormSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex secondary-color items-center justify-between text-2xl text-gray-800 font-semibold">
            ${car?.pricePerDay}{" "}
            <span className="font-normal text-sm text-light ">/ Per Day </span>
          </p>
          <hr className="border border-[#b2b0e8] my-6" />

          {/* form Input values  */}
          <div className="flex flex-col gap-2">
            {/* ----------------------Pickup Date-------------------------------- */}
            <label htmlFor="pickup-date " className="text-light">
              Pickup Date
            </label>
            <input
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              type="date"
              className="border border-[#b2b0e8] px-3 py-2 rounded-lg"
              required
            />
          </div>
          {/* -------------------------Return Date----------------------------- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date" className="text-light">
              Return Date
            </label>
            <input
              id="return-date"
              min={new Date().toISOString().split("T")[0]}
              type="date"
              className="border border-[#b2b0e8] px-3 py-2 rounded-lg"
              required
            />
          </div>
          <button className="text-white bg-primary w-full font-medium rounded-xl pointer bg-hover transition-all py-3 ">
            Book Now
          </button>
          {/*  */}
          <p className="text-center text-sm  secondary-color">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default CarDetails;
