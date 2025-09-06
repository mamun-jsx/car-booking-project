import Title from "../../component/Title";
import { assets } from "../../assets/assets";
import CarCard from "../../component/Card/CarCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Config/Axios/AxiosIntance";
import Loading from "../../component/Loading";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Cars = () => {
  const [input, setInput] = useState(""); // initialize as empty string
  const [filteredCars, setFilteredCars] = useState([]);

  // get Search params from URL
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const isSearchData = pickupLocation && pickupDate && returnDate;

  // API call to check availability
  const searchAvailability = async () => {
    try {
      const { data } = await axiosInstance.get("/api/check-availability", {
        params: {
          location: pickupLocation,
          pickupDate,
          returnDate,
        },
      });

      if (data.success) {
        setFilteredCars(data.availableCars || []);
        if (!data.availableCars || data.availableCars.length === 0) {
          alert("No cars available");
        }
      }
    } catch (err) {
      console.error("Failed to fetch available cars:", err.message);
    }
  };

  // apply filter to show cars 
  const applyFilter = async () => {
    if (input === "") {
      setFilteredCars(cars?.cars);
      return null;
    }
    const filtered = cars?.cars.slice().filter((c) => {
      return (
        c.brand.toLowerCase().includes(input.toLowerCase()) ||
        c.category.toLowerCase().includes(input.toLowerCase()) ||
        c.model.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

  // Run searchAvailability when search params change
  useEffect(() => {
    if (isSearchData) searchAvailability();
  }, [pickupLocation, pickupDate, returnDate]);

  // Fetch all cars as fallback/default
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
  useEffect(() => {
    cars?.cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <h3 className="text-2xl text-center text-red-400 my-2 py-3">
        Error: {error.message}
      </h3>
    );

  const displayCars = filteredCars.length > 0 ? filteredCars : cars?.cars || [];

  return (
    <section>
      <div className="flex flex-col items-center py-30 bg-gray-50 max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.9 }}
          className="flex items-center justify-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
        >
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full h-full outline-none text-gray-500"
            type="text"
            placeholder="Search by make, model, or features"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 mr-2" />
        </motion.div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 max-w-7xl mx-auto xl:px-20">
          Showing {displayCars.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 my-10 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {displayCars.map((car) => (
            <div key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cars;
