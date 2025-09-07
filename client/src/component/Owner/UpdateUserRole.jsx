import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Config/Axios/AxiosIntance";
import Swal from "sweetalert2";
import Loading from "../Loading";
import OwnerTitle from "./OwnerTitle";

const UpdateUserRole = () => {
  const newRole = "owner";
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/auth/read-user");
      return response.data.users;
    },
  });

  const handleUpdate = async (id, newRole) => {
    console.log(id, newRole);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to update this user to ${newRole}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (!result.isConfirmed) return;

      const response = await axiosInstance.put(`/api/auth/user/${id}`, {
        role: newRole,
      });

      if (response.data.success) {
        Swal.fire({
          title: "Updated!",
          text: "The user has been updated successfully.",
          icon: "success",
        });
        refetch();
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to update user",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="mx-2 my-2 mb-10">
      <OwnerTitle
        title={"You can promote any user to owner"}
        subTitle={
          "When they get promoted they can list car and get bookings into their dashboard"
        }
      />

      <div className="overflow-x-auto my-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, i) => (
              <tr key={user?._id}>
                <th>{i + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button
                    className={`${
                      user?.role === "owner"
                        ? "text-green-500"
                        : "text-gray-600"
                    } pointer`}
                    disabled={user?.role === "owner"}
                    onClick={() => handleUpdate(user?._id, newRole)}
                  >
                    {user?.role === "owner" ? "OWNER" : "Update Now"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UpdateUserRole;
