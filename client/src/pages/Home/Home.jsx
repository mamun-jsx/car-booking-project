
import HomeHeroSection from "../../component/HeroSections/HomeHeroSection";
import FeaturedCar from "../../component/Features/FeaturedCar";

import PricingTable from "../../component/PricingTable";
import BookingProcess from "../../component/BookingProcess";
import ComingSoon from "../../component/ComingSoon";
import PopularBrand from "../../component/Popular-Brand/PopularBrand";
import WhyChooseUs from "../../component/WhyChooseUs";

const Home = () => {
  return (
    <section>
      <HomeHeroSection />
      <PopularBrand />
      <FeaturedCar />
      <PricingTable />
      <BookingProcess />
      <WhyChooseUs/>
      <ComingSoon />
    </section>
  );
};

export default Home;
