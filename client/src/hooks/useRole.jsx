import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Config/Provider/AuthProvider";
import axiosInstance from "../Config/Axios/AxiosIntance";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [dbUser, setDbUser] = useState();

  useEffect(() => {
    const checkRole = async () => {
      if (!user?.email) return;
      try {
        const result = await axiosInstance.get(`/api/auth/user/${user.email}`);
        const role = result.data?.user?.role;
        setDbUser(result?.data?.user);
        if (role === "admin") {
          setIsAdmin(true);
        } else if (role === "owner") {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error checking role:", error.message);
      }
    };

    checkRole();
  }, [user]);

  return { isAdmin, isOwner, dbUser };
};

export default useRole;
