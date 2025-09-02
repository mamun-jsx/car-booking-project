import fs from "fs";
import imageKit from "../../config/imagekit.js";
import Car from "./carSchema.js";

//! Create a single Car
export const addCar = async (req, res) => {
  try {
    // Check if image is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    // Get ownerId from formData
    const {
      ownerId,
      brand,
      model,
      year,
      pricePerDay,
      category,
      transmission,
      fuel_type,
      seating_capacity,
      location,
      description,
    } = req.body;

    // Read image file
    const fileBuffer = fs.readFileSync(req.file.path);

    // Upload image to ImageKit
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: req.file.originalname,
      folder: "/cars",
    });

    // Optimize image URL
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    // Save car in DB
    await Car.create({
      owner: ownerId,
      brand,
      model,
      year,
      pricePerDay,
      category,
      transmission,
      fuel_type,
      seating_capacity,
      location,
      description,
      image: optimizedImageUrl,
    });

    return res
      .status(201)
      .json({ success: true, message: "Car added into Database" });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add car",
      error: error.message,
    });
  }
};
