import React, { useContext } from "react";
import HomeHeroSection from "../../component/HeroSections/HomeHeroSection";
import FeaturedCar from "../../component/Features/FeaturedCar";
import { AuthContext } from "../../Config/Provider/AuthProvider";
import PricingTable from "../../component/PricingTable";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log("user is --- ", user);
  return (
    <section>
      <HomeHeroSection />
      <FeaturedCar />
      <PricingTable />
    </section>
  );
};

export default Home;
