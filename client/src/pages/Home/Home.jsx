
import HomeHeroSection from "../../component/HeroSections/HomeHeroSection";
import FeaturedCar from "../../component/Features/FeaturedCar";

import PricingTable from "../../component/PricingTable";
import BookingProcess from "../../component/BookingProcess";
import ComingSoon from "../../component/ComingSoon";
import PopularBrand from "../../component/Popular-Brand/PopularBrand";

const Home = () => {
  // const data = 
  return (
    <section>
      <HomeHeroSection />
      <FeaturedCar />
      <PricingTable />
      <PopularBrand />
      <BookingProcess />
      <ComingSoon />
    </section>
  );
};

export default Home;
