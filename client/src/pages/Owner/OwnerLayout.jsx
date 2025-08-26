import React from "react";
import OwnerNav from "../../component/Owner/OwnerNav";
import OwnerSidebar from "../../component/Owner/OwnerSidebar";
import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <section className="flex flex-col">
      <OwnerNav />
      <main className="flex">
        <OwnerSidebar />
        {/* Outlet to mount all under the layout */}
        <Outlet />
      </main>
    </section>
  );
};

export default OwnerLayout;
