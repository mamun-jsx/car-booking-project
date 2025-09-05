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
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/Error-Page/ErrorPage";
import Footer from "./component/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { useContext } from "react";
import { AuthContext } from "./Config/Provider/AuthProvider";
import AllUser from "./AllUser";

function App() {
  const IsOwner = useLocation().pathname.startsWith("/owner");
  const { user } = useContext(AuthContext);

  return (
    <>
      {!IsOwner && <NavBar />}
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/signup" element={<SignUp />} />}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-user" element={<AllUser />} />
        {/* ------------------------------------------------------------------ */}
        {/* --------------------------------Car Owner Route-------------------- */}
        {/* --------------------------------------------- ------- ------- -------  */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

