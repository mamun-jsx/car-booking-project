import { assets } from "../assets/assets";
import Title from "./Title";

export default function PricingTable() {
  return (
    <section className="py-14 px-4 bg-base-200">
      <Title
        title={"Car Rental Pricing"}
        subTitle={"Choose the right car that fits your needs. All cars are well performed no accident history. Good milage with perfect braking."}
      />
      <br />
      <br />
      <div className="grid max-w-7xl mx-auto gap-6 md:grid-cols-3">
        {/* Small Cars */}
        <div className="card w-full bg-base-100 shadow-md hover:shadow-lg transition">
          <div className="card-body">
            <span className="badge badge-xs bg-light self-start">Budget</span>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Small Cars</h3>
              <span className="text-xl">$150/day</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>Compact size for city driving</li>
              <li>Fuel efficient</li>
              <li>2-4 passengers</li>
            </ul>
            <div className="mt-6">
              {/* Carousel Start   */}
              <div className="carousel rounded-box ">
                <div className="carousel-item w-full">
                  <img src={assets.car_image4} alt="" />
                </div>
                <div className="carousel-item w-full">
                  <img src={assets.banner_car_image} alt="" />
                </div>
              </div>

              {/* Carousel ends */}
            </div>
          </div>
        </div>

        {/* Standard Sedans */}
        <div className="card w-full bg-base-100 shadow-md hover:shadow-lg border-2 border-primary">
          <div className="card-body">
            <span className="badge badge-xs bg-secondary self-start">
              Most Popular
            </span>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Standard Sedans</h3>
              <span className="text-xl">$250/day</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>Comfortable 4 seats</li>
              <li>Air-conditioned</li>
              <li>Perfect for families & groups</li>
            </ul>
            <div className="mt-6">
              {/* Carousel Start   */}
              <div className="carousel rounded-box ">
                <div className="carousel-item w-full">
                  <img src={assets.main_car} alt="" />
                </div>
                <div className="carousel-item w-full">
                  <img src={assets.car_image7} alt="" />
                </div>
              </div>

              {/* Carousel ends */}
            </div>
          </div>
        </div>

        {/* Premium SUVs */}
        <div className="card w-full bg-base-100 shadow-md hover:shadow-lg transition">
          <div className="card-body">
            <span className="badge badge-xs bg-primary self-start">
              Premium
            </span>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Premium SUVs</h3>
              <span className="text-xl">$300/day</span>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>Spacious & powerful</li>
              <li>Ideal for long trips</li>
              <li>Luxury comfort</li>
            </ul>
            <div className="mt-6">
              {/* Carousel Start   */}
              <div className="carousel rounded-box ">
                <div className="carousel-item w-full">
                  <img src={assets.car_image5} alt="" />
                </div>
                <div className="carousel-item w-full">
                  <img src={assets.car_image6} alt="" />
                </div>
              </div>

              {/* Carousel ends */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
