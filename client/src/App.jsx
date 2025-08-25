import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/Home/Home";
import CarDetails from "./pages/CarPage/CarDetails";
import Cars from "./pages/CarPage/Cars";
import MyBookings from "./pages/My-Bookings/MyBookings";

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
      </Routes>
    </>
  );
}

export default App;
