import React from "react";
import { useState } from "react";
import axiosInstance from "./Config/Axios/AxiosIntance";
import { useEffect } from "react";

const AllUser = () => {
  const [allUser, setAllUser] = useState();

  const getAllUsers = async () => {
    axiosInstance.get("api/auth/read-user").then((result) => {
      setAllUser(result?.data?.users);
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      all user page
      {allUser?.map((user) => (
        <h2 key={user?._id}>
          {user?.name} - {user?.email} {user?.role}{" "}
        </h2>
      ))}
    </div>
  );
};

export default AllUser;
