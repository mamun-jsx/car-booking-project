import React, { useState } from "react";
import Title from "../../component/Title";
import { assets } from "../../assets/assets";
import CarCard from "../../component/Card/CarCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Config/Axios/AxiosIntance";
import Loading from "../../component/Loading";
import { motion } from "motion/react";

const Cars = () => {
  const [input, setInput] = useState();

  // ! fetch data from backend
  const {
    data: cars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/read-all-cars");
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <h3 className="text-2xl text-center text-red-400 my-2 py-3">
        Error : {error?.message}{" "}
      </h3>
    );
  }
  return (
    <section>
      <div className="flex flex-col items-center py-30 bg-gray-50 max-md:px-4">
        <Title
          title={"Available Cars"}
          subTitle={
            "Brows our selection of premium vehicles available for your next adventure"
          }
        />
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.9 }}
          className="flex items-center justify-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
        >
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />

          {/* input for search */}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full h-full outline-none text-gray-500 "
            type="text"
            placeholder="Search by make, model , or features"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 mr-2" />
        </motion.div>
      </div>

      {/* content area  */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 max-w-7xl mx-auto xl:px-20">
          Showing {cars?.count} Cars{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 my-10 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {cars?.cars?.map((car) => {
            return (
              <div key={car?._id}>
                <CarCard car={car} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cars;
