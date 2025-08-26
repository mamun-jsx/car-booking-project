import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";

const OwnerNav = () => {
  const user = dummyUserData;

  return (
    <section className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-[#b2b0e8] relative transition-all">
      <Link to="/">
        <img src={assets?.logo} className="h-7" alt="" />
      </Link>
      <p>Welcome, {user?.name || "Owner"} </p>
    </section>
  );
};

export default OwnerNav;
