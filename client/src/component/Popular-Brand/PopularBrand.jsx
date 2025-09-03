import { carBrand } from "../../assets/assets";
import Title from "../Title";
import Marquee from "react-fast-marquee";

export default function PopularBrand() {
  return (
    <section className="max-w-7xl mx-auto md:py-10  mt-10">
      <Title
        title={"Popular Brands We Use"}
        subTitle={
          "Explore a wide range of top car brands available for rent. There are no accident history of all cars and you will get well milage "
        }
      />
      <Marquee>
        <main className="flex md:gap-10 gap-5 my-14">
          {carBrand?.map((car) => (
            <img
              key={car?._id}
              src={car.img}
              alt={car.name || "car"}
              className="h-24 md:px-10 w-auto object-contain"
            />
          ))}
        </main>
      </Marquee>
    </section>
  );
}
