import { useContext, useState } from "react";
import GoogleButton from "../component/GoogleButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Config/Provider/AuthProvider";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext); //login function from context
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/"; //! track user route location and send him to origin
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      await loginUser(email, password) //* firebase login built in function
        .then((result) => {
          const user = result.user;
          // check user and navigate him to route
          
          if (user) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Welcome Back",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
            localStorage.setItem("token", res.data.token);
          }
        });
    } catch (error) {
      //? handle errors from tryCatch blog(show alert)
      if (error.code === "auth/invalid-credential") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credential 🫣",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      }
    }
  };

  return (
    <div className="hero bg-light min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Book Your Stay</h1>
          <p className="py-6">
            Welcome to our card booking platform! Easily reserve your preferred
            hotel room in just a few clicks. Enjoy a seamless booking experience
            with secure payments and instant confirmations.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="btn bg-primary bg-hover mt-4">
                Login
              </button>
              <p className="text-[14px] my-3">
                New Here ?{" "}
                <Link
                  to="/signup"
                  className="underline primary-color  "
                  onClick={() => scrollTo(0, 0)}
                >
                  Sing-Up Now
                </Link>{" "}
              </p>
              {/* Google Login Button */}
              <GoogleButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
