import { assets } from "../../assets/assets";
import Title from "../../component/Title";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";
import axiosInstance from "../../Config/Axios/AxiosIntance";
import Loading from "../../component/Loading";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { dbUser } = useRole();
  const userId = dbUser?._id; // get the current use's id and pass to backend
  const navigate = useNavigate();
  //  ! react query
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myBooking", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`api/user-booking/${userId}`); // axios to fetch data
      return response.data;
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h2>Error... </h2>;
  }
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 mb-10 text-sm max-w-7xl">
      <Title
        title={"My Bookings"}
        subTitle={"Vew and manage your all car bookings"}
        align={"left"}
      />

      {bookings?.bookings.length === 0 && (
        <p className="my-10 text-lg text-primary">
          You Do Not Book Any Car Yet...
          <br />
          <button
            onClick={() => {
              navigate("/cars");
              scrollTo(0, 0);
            }}
            className="flex animate-bounce items-center justify-center pointer rounded-md mt-18 hover:bg-primary hover:text-white gap-2 px-6 py-2 border border-[#b2b0e8]"
          >
            Explore All Cars <img src={assets?.arrow_icon} alt="arrow icon" />{" "}
          </button>
        </p>
      )}

      <div
        className={`${bookings?.bookings.length === 0 ? "hidden" : "block"}`}
      >
        {bookings?.bookings?.map((booking, idx) => (
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border  border-[#b2b0e8] rounded-lg mt-5 first:mt-12"
            key={booking?._id}
          >
            {/* Car Image and Information  */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  className="w-full h-auto aspect-video object-cover"
                  src={booking?.car?.image}
                  alt="car picture"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {" "}
                {booking?.car?.brand} {booking?.car?.model}{" "}
              </p>
              <p className="text-gray-500">
                {booking?.car?.year} | {booking?.car?.location}
              </p>
            </div>
            {/* Booking Information  */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-gray-50 rounded">
                  Booking #{idx + 1}
                </p>
                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking?.status === "confirmed"
                      ? "bg-green-700 text-white"
                      : "bg-red-700 text-white"
                  }`}
                >
                  {booking?.status}
                </p>
              </div>
              {/*  */}
              <div>
                <p className="flex items-center justify-start my-1 gap-1">
                  <img
                    src={assets?.calendar_icon_colored}
                    className="w-4 h-4 mt-1"
                    alt=""
                  />
                  Rental Period
                </p>
                <div>
                  <p className="text-gray-500">
                    From {booking?.pickupDate.split("T")[0]} TO{" "}
                    {booking?.returnDate.split("T")[0]}
                  </p>
                </div>
              </div>

              {/*  */}

              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.location_icon}
                  className="w-4 h-4 mt-1"
                  alt=""
                />
                <div>
                  <p className="text-gray-500">Pick-up Location</p>
                  <p className="text-gray-500">{booking?.car?.location}</p>
                </div>
              </div>
            </div>

            {/* Price  */}
            <div className="md:col-span-1 flex flex-col justify-between gap-6">
              <div className="text-sm text-gray-500 text-right">
                <p>Total Price</p>
                <h1 className="text-2xl my-1 font-semibold text-primary">
                  $ {booking?.price}
                </h1>
                <p>Booking on {booking?.createdAt.split("T")[0]} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBookings;
