import React, { useState } from "react";
import { assets } from "../assets/assets";
import Swal from "sweetalert2";
import PopularBrand from "../component/Popular-Brand/PopularBrand";
import PricingTable from "../component/PricingTable";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Form Submitted!",
      text: "Thank you for contacting us. We’ll get back to you soon.",
      icon: "success",
      confirmButtonColor: "#1a2a80",
    });
    setFormData({ name: "", email: "", mobile: "", message: "" });
  };
  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh]">
          <img
            src={assets.contactUsCar}
            alt="Car Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl">
                We are your trusted car booking partner since 2023. Offering
                safe, affordable, and convenient rides — anytime, anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Long Description */}
        <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-10">
          {/* Long Description */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">About Our Business</h3>
            <p className="text-gray-600 leading-relaxed">
              Since 2023, we have been providing a seamless and reliable car
              booking experience for our customers. Our platform allows you to
              easily create an account, choose your preferred car, select the
              booking date, and confirm your ride. Payments are made in cash
              upon approval, ensuring no worries about online transactions.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We are expanding our services and will soon introduce a wide range
              of vehicles, including sports cars, luxury cars, and SUVs, giving
              you more options to choose from. Trust and customer satisfaction
              have always been at the core of our journey.
            </p>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md font-semibold pointer transition"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
      <PricingTable />
      <div className="w-full flex items-center animate-bounce justify-center my-5">
        <button
          onClick={() => {
            navigate("/cars");
            scrollTo(0, 0);
          }}
          className="flex items-center justify-center pointer rounded-md mt-18 hover:bg-primary hover:text-white gap-2 px-6 py-2 border border-[#b2b0e8]"
        >
          Explore All Cars <img src={assets?.arrow_icon} alt="arrow icon" />{" "}
        </button>
      </div>
      <PopularBrand />
    </>
  );
};

export default ContactUs;
