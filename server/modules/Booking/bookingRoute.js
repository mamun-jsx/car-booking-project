import { Router } from "express";
import {
  changeBookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getBookingByUserId,
  getOwnerBooking,
} from "./bookingController.js";

const bookingRoute = Router();

bookingRoute.get("/check-availability", checkAvailabilityOfCar);
bookingRoute.post("/booking-create", createBooking);
bookingRoute.get("/user-booking/:userId", getBookingByUserId);
bookingRoute.get("/owner-booking/:ownerId", getOwnerBooking);
bookingRoute.post("/change-booking-status", changeBookingStatus);

export default bookingRoute;
