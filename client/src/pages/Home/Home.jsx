import React, { useContext } from "react";
import HomeHeroSection from "../../component/HeroSections/HomeHeroSection";
import FeaturedCar from "../../component/Features/FeaturedCar";
import { AuthContext } from "../../Config/Provider/AuthProvider";
import PricingTable from "../../component/PricingTable";
import BookingProcess from "../../component/BookingProcess";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log("user is --- ", user);
  return (
    <section>
      <HomeHeroSection />
      <FeaturedCar />
      <PricingTable />
      <BookingProcess />
    </section>
  );
};

export default Home;
