import { Router } from "express";
import {
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBooking,
  getUsersBooking,
} from "./bookingController.js";

const bookingRoute = Router();

bookingRoute.get("/check-availability", checkAvailabilityOfCar);
bookingRoute.post("/booking-create", createBooking);
bookingRoute.get("/user-booking/:id", getUsersBooking);
bookingRoute.get("/owner-booking/:ownerId", getOwnerBooking);
bookingRoute.post("/change-booking-status", getOwnerBooking);

export default bookingRoute;
