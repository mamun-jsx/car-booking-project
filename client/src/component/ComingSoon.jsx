import { assets } from "../assets/assets";

export default function ComingSoon() {
  return (
    <section className="py-16  px-6 bg-light">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left side text */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold primary-color mb-4">
            Coming Soon - motorcycles
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We are preparing to bring you an exciting collection of bikes — from
            high-performance <span className="font-semibold">sports bikes</span>
            , to stylish{" "}
            <span className="font-semibold">naked sports bikes</span>, and more.
            Stay tuned for the ultimate riding experience!
          </p>
        </div>

        {/* Right side image */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.bike_image1}
            alt="Sports Bike"
            className="max-w-full h-auto rounded-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
