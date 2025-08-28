import { Router } from "express";
import userRoute from "../modules/User/userRoute.js";

const router = Router();
router.use("/api", userRoute);

export default router;
