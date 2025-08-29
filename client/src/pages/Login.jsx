import { useState } from "react";
import GoogleButton from "../component/GoogleButton";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    const loginInfo = {
      email,
      password,
    };

    console.log("Login info:", loginInfo);
    // later you can send loginInfo to backend with fetch/axios
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
                  to="/sign-up"
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
