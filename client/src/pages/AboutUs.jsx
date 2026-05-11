import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Config/Axios/AxiosIntance";
import ComingSoon from "../component/ComingSoon";
import FAQ from "../component/FAQ";
import Loading from "../component/Loading";
import PopularBrand from "../component/Popular-Brand/PopularBrand";
import Title from "../component/Title";
import WhyChooseUs from "../component/WhyChooseUs";
import { User, Mail, ShieldCheck } from "lucide-react";

export default function AboutUs() {
  // Fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/auth/read-user");
      return res.data.users; // Extract users array from response
    },
  });

  return (
    <>
      <section className="py-16 px-6 bg-base-100">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <Title
            title={"About Us"}
            subTitle={
              "Since 2023, we have been dedicated to providing reliable and affordable car booking services. Our mission is to make your travel smooth, safe, and enjoyable. With a wide range of vehicles, from budget-friendly small cars to premium SUVs, we ensure that every customer finds the perfect ride."
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

        {/* --- All Users Section --- */}
        <div className="max-w-7xl mx-auto mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black primary-color mb-2">Our Community</h2>
            <p className="text-gray-500">Meet the wonderful people using Safe Wheels</p>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="size-full object-cover" />
                        ) : (
                          <User className="size-10 text-primary" />
                        )}
                      </div>
                      {user.role === "owner" && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Verified Owner">
                          <ShieldCheck className="size-4" />
                        </div>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{user.name}</h4>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                      <Mail className="size-3" />
                      <span className="truncate max-w-[150px]">{user.email}</span>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'owner' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role || 'User'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <PopularBrand />
      <WhyChooseUs />
      <ComingSoon />
      <FAQ />
    </>
  );
}
