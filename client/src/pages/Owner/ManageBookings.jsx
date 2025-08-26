import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Loading from "../../component/Loading";
import OwnerTitle from "../../component/Owner/OwnerTitle";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };
  useEffect(() => {
    fetchOwnerBookings();
  }, []);
  if (bookings.length == 0) return <Loading />;

  return (
    <section className="px-4 pt-10 md:px-10 w-full">
      <OwnerTitle
        title={"Manage bookings"}
        subTitle={
          "view all list cars, update their details, or remove them from the booking platform"
        }
      />
      {/* table area  */}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Car</th>
              <th>Date Range</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr
                key={booking?._id}
                className="border-t border-[#b2b0e8] text-gray-500"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                    alt=""
                  />
                  <p className="font-medium max-md:hidden">
                    {" "}
                    {booking.car.model}
                  </p>
                </td>
                {/* date range info */}
                <td className="p-3 max-md:hidden">
                  From {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>
                {/* Price Info */}
                <td className="p-3">$ {booking?.price}</td>
                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs ">
                    offline
                  </span>
                </td>
                {/*  */}
                <td className="p-3">
                  {booking?.status === "pending" ? (
                    <select
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-500 border border-[#b2b0e8] rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sx font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageBookings;
