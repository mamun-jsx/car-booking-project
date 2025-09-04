import { Router } from "express";
import {
  addCar,
  deleteCar,
  getAllCars,
  getOwnerCars,
  toggleCarAvailability,
} from "./carController.js";
import upload from "../../middleware/multer.js";

const carRoute = Router();

carRoute.post(
  "/owner/car-add",
  upload.single("image"),

  addCar
);

carRoute.get("/owner/read-cars", getAllCars);
carRoute.get("/owner/:ownerId/cars", getOwnerCars);
carRoute.patch("/owner/dashboard/:carId/toggle", toggleCarAvailability);
carRoute.delete("/owner/dashboard-delete/:carId", deleteCar);

export default carRoute;
