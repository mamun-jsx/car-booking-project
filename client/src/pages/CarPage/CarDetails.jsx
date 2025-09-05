import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Loading from "../../component/Loading";
import { AuthContext } from "../../Config/Provider/AuthProvider";
import axiosInstance from "../../Config/Axios/AxiosIntance";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const CarDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/read-car/${id}`);
      return response?.data?.carDetails;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error?.message}`,
    });
  }
  // ! Form input to send data to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if user is not login send him to login route
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
  };

  return data ? (
    <section className="px-6 md:px-16 lg:px-24 my-10 xl:px-32 mt-16">
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
          <motion.img
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.9 }}
            src={data?.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          {/* Content Wrapper  */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.9 }}
            className="contentWrapper"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                {data.brand} {data?.model}{" "}
              </h2>
              <p>
                {data?.category} | {data?.year}
              </p>
            </div>
            <hr className="border border-[#b2b0e8] my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets?.users_icon,
                  text: `${data?.seating_capacity} Seats`,
                },
                {
                  icon: assets?.fuel_icon,
                  text: data?.fuel_type,
                },
                {
                  icon: assets?.car_icon,
                  text: data?.transmission,
                },
                {
                  icon: assets?.location_icon,
                  text: data?.location,
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
              <p className="text-gray-500">{data?.description}</p>
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
          </motion.div>
        </div>

        {/* RIGHT : Booking Form  */}

        <motion.form
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.9 }}
          onSubmit={handleFormSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex secondary-color items-center justify-between text-2xl text-gray-800 font-semibold">
            ${data?.pricePerDay}{" "}
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
          <button
            type="submit"
            className="text-white bg-primary w-full font-medium rounded-xl pointer bg-hover transition-all py-3 "
          >
            Book Now
          </button>
          {/*  */}
          <p className="text-center text-sm  secondary-color">
            No credit datad required to reserve
          </p>
        </motion.form>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default CarDetails;
