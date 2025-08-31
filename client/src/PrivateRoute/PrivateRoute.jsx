import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Config/Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (!user) {
    return <navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
