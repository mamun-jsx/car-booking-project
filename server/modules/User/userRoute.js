import { Router } from "express";
import {
  getAllUser,
  getUserByEmail,
  registerUser,
  updateUserById,
  updateUserImage,
} from "./userController.js";
import upload from "../../middleware/multer.js";

const userRoute = Router();

userRoute.post("/auth/user", registerUser);
userRoute.get("/auth/read-user", getAllUser);
userRoute.get("/auth/user/:email", getUserByEmail);
userRoute.put("/auth/user/:id", updateUserById);
userRoute.post(
  "/auth/user/update-image",
  upload.single("image"),
  updateUserImage
);

export default userRoute;
