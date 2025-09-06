import { Router } from "express";
import {
  addCar,
  deleteCar,
  getAllCars,
  getCarById,
  getDashboardData,
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

carRoute.get("/read-all-cars", getAllCars);
carRoute.get("/read-car/:id", getCarById);
carRoute.get("/owner/:ownerId/cars", getOwnerCars);
carRoute.patch("/owner/dashboard/:carId/toggle/:ownerId", toggleCarAvailability);
carRoute.delete("/owner/delete-car", deleteCar);
carRoute.get("/owner/:owner/dashboard-data", getDashboardData);

export default carRoute;
