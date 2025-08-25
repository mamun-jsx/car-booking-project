import { useNavigate } from "react-router-dom";
import { assets, dummyCarData } from "../../assets/assets";
import CarCard from "../Card/CarCard";
import Title from "../Title";

const FeaturedCar = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title={"Featured Vehicle"}
          subTitle={
            "Explore our section of premium vehicle available for your next adventure"
          }
        />
      </div>
      {/* card component */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {dummyCarData?.slice(0, 6).map((car) => (
          <div key={car?._id}>
            <CarCard key={car?._id} car={car} />
          </div>
        ))}
      </main>
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center pointer rounded-md mt-18 hover:bg-primary hover:text-white gap-2 px-6 py-2 border border-[#b2b0e8]"
      >
        Explore All Cars <img src={assets?.arrow_icon} alt="arrow icon" />{" "}
      </button>
    </section>
  );
};

export default FeaturedCar;
