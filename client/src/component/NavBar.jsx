import { Link, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import Search from "./Search";
import { useContext } from "react";
import { AuthContext } from "../Config/Provider/AuthProvider";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";
const NavBar = () => {
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext);
  const { isOwner } = useRole();
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
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <section className="border-b border-gray-200 sticky top-0 z-20  bg-base-100">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Open Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuLinks?.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuLinks?.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End (Right side) */}
        <div className="navbar-end gap-2">
          <Search />

          {/* Signup */}
          {!user && (
            <Link to="/signup" className="btn btn-primary rounded-full">
              Signup
            </Link>
          )}

          {/* Dashboard (uses navigate) */}
          {isOwner && (
            <button
              onClick={() => navigate("/owner")}
              className="btn btn-outline rounded-full"
            >
              Dashboard
            </button>
          )}

          {user && (
            <button
              onClick={() => handleLogout()}
              className="btn btn-outline rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NavBar;
