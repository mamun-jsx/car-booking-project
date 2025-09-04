import { Router } from "express";
import { addCar, getAllCars } from "./carController.js";
import upload from "../../middleware/multer.js";

const carRoute = Router();

carRoute.post(
  "/owner/car-add",
  upload.single("image"),

  addCar
);
carRoute.get("/owner/read-cars", getAllCars);

export default carRoute;
