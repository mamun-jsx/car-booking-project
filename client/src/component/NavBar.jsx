import { Link, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import Search from "./Search";
import { useContext } from "react";
import { AuthContext } from "../Config/Provider/AuthProvider";
import { CarFront } from "lucide-react";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";
const NavBar = () => {
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext);
  const { isOwner, dbUser } = useRole();
  const handleLogout = async () => {
    try {
      await logOutUser().then(() => {
        //* alert if login successful
        Swal.fire({
          title: "You Are Logout",
          icon: "success",
          // draggable: true,
        });
      });
      navigate("login");
    } catch (error) {
      //? handle error from tryCatch blog
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: `${error.message}`,
      });
    }
  };

  return (
    <section className="sticky top-0 bg-gray-50 z-50 border-b">
      <div className="navbar max-w-7xl mx-auto ">
        <div className="flex-1">
          {/* logo */}
          <button
            className="flex items-center pointer justify-center md:gap-2 gap-1"
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
          >
            <CarFront className="md:size-14 size-8 secondary-color" />
            <span className="primary-color md:text-3xl animate-pulse">
              Safe Wheels
            </span>
          </button>
        </div>
        <div className="flex gap-2">
          <div className=" w-full md:w-auto">
            <Search />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={assets.userIcon}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {user && (
                <button
                  type="button"
                  onClick={() => navigate("/my-bookings")}
                  className="text-left pointer hover:bg-gray-100 text-[12px] ml-1 p-1"
                >
                  My Bookings
                </button>
              )}
              {isOwner && (
                <button
                  type="button"
                  onClick={() => navigate("/owner")}
                  className="text-left pointer hover:bg-gray-100 text-[12px] ml-1 p-1"
                >
                  Dashboard
                </button>
              )}
              {menuLinks?.map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
              {user && (
                <button
                  onClick={() => handleLogout()}
                  className="text-left pointer hover:bg-gray-100 text-[12px] ml-1 p-1"
                >
                  Logout
                </button>
              )}
              {!user && (
                <Link
                  to="/signup"
                  className="btn my-2 btn-primary rounded-full"
                >
                  Signup
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
