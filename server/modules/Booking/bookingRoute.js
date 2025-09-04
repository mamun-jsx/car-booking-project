import { Router } from "express";
import {
  checkAvailability,
  createBooking,
  getOwnerBooking,
  getUsersBooking,
} from "./bookingController.js";

const bookingRoute = Router();

bookingRoute.post("/check-availability", checkAvailability);
bookingRoute.post("/booking-create", createBooking);
bookingRoute.get("/user-booking", getUsersBooking);
bookingRoute.get("/owner-booking", getOwnerBooking);
bookingRoute.post("/change-booking-status", getOwnerBooking);

export default bookingRoute;
