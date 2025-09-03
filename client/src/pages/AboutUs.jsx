import ComingSoon from "../component/ComingSoon";
import FAQ from "../component/FAQ";
import PopularBrand from "../component/Popular-Brand/PopularBrand";
import Title from "../component/Title";
import WhyChooseUs from "../component/WhyChooseUs";

export default function AboutUs() {
  return (
    <>
      <section className="py-16 px-6 bg-base-100">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <Title
            title={"About Us"}
            subTitle={
              "Since  we have been dedicated to providing reliable and affordable car booking services. Our mission is to make your travel smooth, safe, and enjoyable. With a wide range of vehicles, from budget-friendly small cars to premium SUVs, we ensure that every customer finds the perfect ride."
            }
          />
        </div>
        {/* title ends  */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Trusted Company */}
          <div className="card bg-base-200 p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Trusted Service</h3>
            <p className="text-sm text-gray-600">
              Thousands of customers trust us for our transparent process, no
              hidden fees, and easy booking system. Your satisfaction is our top
              priority.
            </p>
          </div>

          {/* Experience */}
          <div className="card bg-base-200 p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Working Since 2023</h3>
            <p className="text-sm text-gray-600">
              We started in 2023 with a vision to simplify car rentals. Our
              growing fleet and loyal customer base show our dedication and hard
              work.
            </p>
          </div>

          {/* Our Promise */}
          <div className="card bg-base-200 p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Our Promise</h3>
            <p className="text-sm text-gray-600">
              We promise reliable cars, affordable prices, and a booking process
              that’s stress-free. Whether short trips or long journeys, we’ve
              got you covered.
            </p>
          </div>
        </div>
      </section>
      <PopularBrand />
      <WhyChooseUs />
      <ComingSoon />
      <FAQ />
    </>
  );
}
