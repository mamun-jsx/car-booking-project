import { Router } from "express";
import userRoute from "../modules/User/userRoute.js";
import carRoute from "../modules/Car/carRoute.js";

const router = Router();
router.use("/api", userRoute);
router.use("/api", carRoute);

export default router;
