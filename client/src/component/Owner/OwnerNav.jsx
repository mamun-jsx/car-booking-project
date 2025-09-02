import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Config/Provider/AuthProvider";

const OwnerNav = () => {
  const { user } = useContext(AuthContext);

  const userEmail = user?.email;
  const positionOfAt = userEmail.indexOf("@");
  const userNameIs = userEmail?.slice(0, positionOfAt);

  return (
    <section className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-[#b2b0e8] relative transition-all">
      <Link to="/">
        <img src={assets?.logo} className="h-7" alt="" />
      </Link>
      <p className="capitalize">Welcome, {userNameIs} </p>
    </section>
  );
};

export default OwnerNav;
