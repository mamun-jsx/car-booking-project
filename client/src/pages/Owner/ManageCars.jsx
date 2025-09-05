import { assets } from "../../assets/assets";
import OwnerTitle from "../../component/Owner/OwnerTitle";
import axiosInstance from "../../Config/Axios/AxiosIntance";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";
import Loading from "../../component/Loading";
import Swal from "sweetalert2";

const ManageCars = () => {
  const { dbUser } = useRole();
  const ownerId = dbUser?._id;
  // api/owner/delete-car
  const fetchCars = async (ownerId) => {
    const response = await axiosInstance.get(`api/owner/${ownerId}/cars`);
    return response.data;
  };
  // useQuery to fetch
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["cars", ownerId],
    queryFn: () => fetchCars(ownerId),
  });
  // request for delete a single car
  const handleDeleteCar = async (_id) => {
    try {
      const carId = _id; // car id

      // show confirmation BEFORE deletion
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return; // stop if user canceled

      // axios.delete requires
      const response = await axiosInstance.delete("api/owner/delete-car", {
        data: { ownerId, carId },
      });

      if (response.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data is deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // refresh list {tanStackQuery Function}
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message || "Failed to delete car",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error?.message}`,
    });
  }

  return (
    <section className="px-4 pt-10 md:px-10 w-full">
      <OwnerTitle
        title={"Manage Cars"}
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
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {!isLoading &&
              data?.cars?.map((car) => (
                <tr key={car?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="h-12 w-12 aspect-square rounded-md object-cover">
                          <img src={car?.image} alt="car picture" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{car?.brand}</div>
                        <div className="text-sm opacity-50">
                          {car?.seating_capacity} Seats | {car?.transmission}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{car?.category}</td>
                  <td>$ {car?.pricePerDay}</td>
                  <th>
                    {car?.isAvailable ? (
                      <span className="bg-green-300 p-1 rounded animate-pulse text-green-600">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-300 p-1 rounded text-red-600 ">
                        Not Available
                      </span>
                    )}
                  </th>
                  <th>
                    <button className="pointer">
                      <img src={assets.eye_icon} className="" alt="" />
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="pointer"
                    >
                      <img src={assets.delete_icon} className="" alt="" />
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageCars;
