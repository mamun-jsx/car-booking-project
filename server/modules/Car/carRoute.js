import { Router } from "express";
import { addCar } from "./carController.js";
import upload from "../../middleware/multer.js";

const carRoute = Router();

carRoute.post("/owner/car-add",upload.single("image"),

  addCar
);

export default carRoute;
