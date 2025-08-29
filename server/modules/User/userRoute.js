import { Router } from "express";
import {
  getAllUser,
  getUserByEmail,
  registerUser,
  updateUserById,
} from "./userController.js";

const userRoute = Router();

userRoute.post("/auth/user", registerUser);
userRoute.get("/auth/read-user", getAllUser);
userRoute.get("/auth/user/:email", getUserByEmail);
userRoute.put("/auth/user/:id", updateUserById);

export default userRoute;
