import { useContext, useState } from "react";
import GoogleButton from "../component/GoogleButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Config/Provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { LogIn, User, ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password).then((result) => {
        const user = result.user;
        if (user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Welcome Back",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
      });
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Login</h1>
            <p className="text-gray-500 mt-2">Welcome back to Safe Wheels</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="name@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loading ? (
              <Loading small message="Authenticating..." />
            ) : (
              <button type="submit" className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer">
                Sign In
              </button>
            )}

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">Quick Demo Access</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setEmail("jdoe@gmail.com");
                  setPassword("Crazyboy#01");
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <User className="size-4 text-gray-400 group-hover:text-primary" />
                <span className="text-xs font-bold text-gray-600 group-hover:text-primary">User</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@gmail.com");
                  setPassword("Crazyboy#01");
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-100 hover:border-secondary hover:bg-secondary/5 transition-all group"
              >
                <ShieldCheck className="size-4 text-gray-400 group-hover:text-secondary" />
                <span className="text-xs font-bold text-gray-600 group-hover:text-secondary">Owner</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-bold hover:underline" onClick={() => scrollTo(0, 0)}>
                  Create one now
                </Link>
              </p>
            </div>

            <GoogleButton />
          </form>
        </div>
      </div>
    </div>
  );
}
