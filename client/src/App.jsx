import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/Home/Home";
import CarDetails from "./pages/CarPage/CarDetails";
import Cars from "./pages/CarPage/Cars";
import MyBookings from "./pages/My-Bookings/MyBookings";
import OwnerLayout from "./pages/Owner/OwnerLayout";
import Dashboard from "./pages/Owner/Dashboard";
import AddCar from "./pages/Owner/AddCar";
import ManageCars from "./pages/Owner/ManageCars";
import ManageBookings from "./pages/Owner/ManageBookings";

function App() {
  const IsOwner = useLocation().pathname.startsWith("/owner");
  return (
    <>
      {!IsOwner && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        {/* -------------------------------------- ------- ------- ------- ------- */}
        {/* ---------------- ------- ---------Car Owner Route-------------------- */}
        {/* --------------------------------------------- ------- ------- -------  */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
