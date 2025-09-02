import jwt from "jsonwebtoken";
import User from "../modules/User/userSchema.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

// Middleware for role checks
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only." });
  }
};

export const ownerOnly = (req, res, next) => {
  if (req.user && req.user.role === "owner") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Owners only." });
  }
};
