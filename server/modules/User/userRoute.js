import { Router } from "express";
import { registerUser } from "./userController.js";

const userRoute = Router();

userRoute.post("/auth/user", registerUser);

export default userRoute;
