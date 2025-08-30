import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../component/GoogleButton";
import { AuthContext } from "../Config/Provider/AuthProvider";
import axiosInstance from "../Config/Axios/AxiosIntance";
import Swal from "sweetalert2";

//! main jsx function Start
const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        if (loggedUser) {
          const signUpData = {
            _id: loggedUser.uid, // use Firebase UID
            name: fullName, // match backend key
            email: loggedUser.email,
          };

          axiosInstance
            .post("/api/auth/user", signUpData)
            .then((res) => {
              if (res.data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Your Registered`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.message,
                // footer: '<a href="#">Why do I have this issue?</a>',
              });
            });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.message,
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-light">
        <form
          onSubmit={handleSignUp}
          className="bg-white shadow-lg rounded-xl p-8 w-96"
        >
          <h1 className="text-3xl font-bold primary-color mb-6">
            Create Account
          </h1>

          <label className="block mb-2 font-semibold">Full Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-primary pointer text-white py-2 rounded-lg bg-hover transition"
          >
            Sign Up
          </button>

          <p className="text-[14px] my-3 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline primary-color"
              onClick={() => scrollTo(0, 0)}
            >
              Login now
            </Link>
          </p>
          {/* google Login Button */}
          <GoogleButton />
        </form>
      </div>

      {/* Right Side - Info Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-primary text-white p-12">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Car Booking</h2>
          <p className="text-lg text-light">
            Book your ride with ease and confidence. Join us today to enjoy
            quick reservations, secure payments, and exclusive member offers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
