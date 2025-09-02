import React, { useContext } from "react";
import HomeHeroSection from "../../component/HeroSections/HomeHeroSection";
import FeaturedCar from "../../component/Features/FeaturedCar";

import PricingTable from "../../component/PricingTable";
import BookingProcess from "../../component/BookingProcess";
import ComingSoon from "../../component/ComingSoon";


const Home = () => {
 


  return (
    <section>
      <HomeHeroSection />
      <FeaturedCar />
      <PricingTable />
      <BookingProcess />
      <ComingSoon/>
    </section>
  );
};

export default Home;
