import React, { useContext, useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import OwnerTitle from "../../component/Owner/OwnerTitle";
import { AuthContext } from "../../Config/Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log("your email -- ",`>`,user?.email,);




  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });
  const dashBoardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];
  //   load the data
  useEffect(() => {
    setData(dummyDashboardData);
  }, []);
  return (
    <section className="px-4 pt-10 md:px-10 flex-1">
      <OwnerTitle
        title={"Admin Dashboard"}
        subTitle={
          "You can monitor overall platform performance including total cars, bookings, revenue , and resent activities"
        }
      />
      {/* top cards section starts */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashBoardCards.map((card, idx) => (
          <div
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-[#b2b0e8]"
            key={idx}
          >
            {/* content */}
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>

            {/* icon wrapper */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-white">
              <img src={card.icon} className="brightness-200 h-4 w-4" alt="" />
            </div>
          </div>
        ))}
      </div>
      {/* top cards section ENDS */}

      {/* ==================================================================================================== */}
      {/* ------------------------------------------------------------------------------------------------- */}

      <main className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent bookings */}
        <div className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white flex-1 min-w-[300px]">
          <h1 className="text-lg font-semibold text-gray-800">
            Recent Bookings
          </h1>
          <p className="text-sm text-gray-500">Latest customer bookings</p>

          {data.recentBookings.map((booking, idx) => (
            <div
              key={idx}
              className="mt-5 flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              {/* Car info */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
                  <img
                    src={assets.listIconColored}
                    className="h-5 w-5 brightness-200"
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>

              {/* Price + Status */}
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-gray-600">
                  $ {booking.price}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    booking.status === "Confirmed"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : booking.status === "Pending"
                      ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly revenue (Right Column) */}
        <div className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white w-full md:max-w-xs">
          <h2 className="text-lg font-semibold text-gray-800">
            Monthly Revenue
          </h2>
          <p className="text-sm text-gray-500">Revenue for current month</p>
          <p className="text-4xl mt-6 font-bold text-primary">
            $ {data.monthlyRevenue}
          </p>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;