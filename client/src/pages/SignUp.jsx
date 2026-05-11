import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../component/GoogleButton";
import { AuthContext } from "../Config/Provider/AuthProvider";
import axiosInstance from "../Config/Axios/AxiosIntance";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { UserPlus, User, Mail, Lock, ShieldCheck } from "lucide-react";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        if (loggedUser) {
          const signUpData = {
            _id: loggedUser.uid,
            name: fullName,
            email: loggedUser.email,
          };

          axiosInstance
            .post("/api/auth/user", signUpData)
            .then((res) => {
              if (res.data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Welcome to Safe Wheels!`,
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
              });
            })
            .finally(() => setLoading(false));
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.message,
        });
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-gray-500 mt-2">Join our premium car booking community</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <Loading small message="Creating Account..." />
            ) : (
              <button type="submit" className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer">
                Sign Up
              </button>
            )}

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline" onClick={() => scrollTo(0, 0)}>
                  Login now
                </Link>
              </p>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">Or continue with</span></div>
            </div>

            <GoogleButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
