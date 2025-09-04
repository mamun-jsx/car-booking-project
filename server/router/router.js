import { Router } from "express";
import userRoute from "../modules/User/userRoute.js";
import carRoute from "../modules/Car/carRoute.js";
import bookingRoute from "../modules/Booking/bookingRoute.js";

const router = Router();
router.use("/api", userRoute);
router.use("/api", carRoute);
router.use("/api", bookingRoute);

export default router;
