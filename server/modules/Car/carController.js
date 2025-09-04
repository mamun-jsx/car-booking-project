import fs from "fs";
import imageKit from "../../config/imagekit.js";
import Car from "./carSchema.js";
import Booking from "../Booking/bookingSchema.js";

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

// get all cars with Owner info

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate({
      path: "owner",
      select: "name email image",
      match: { role: "owner" },
    }); //car with owner info
    res.json({ success: true, count: cars.length, cars });
  } catch (error) {
    console.log("Error", error);
    res.json({
      success: false,
      message: "Failed to fetch data",
      error: error?.message,
    });
  }
};

// Get cars by owner (Firebase UID = string)
export const getOwnerCars = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const cars = await Car.find({ owner: ownerId }).populate({
      path: "owner",
      select: "name email image",
    });

    if (!cars.length) {
      return res.json({
        success: false,
        message: "No cars found for this owner",
      });
    }

    res.json({ success: true, count: cars.length, cars });
  } catch (error) {
    console.error("Error in getOwnerCars:", error.message);
    res.json({
      success: false,
      message: "Failed to fetch owner cars",
      error: error.message,
    });
  }
};

// Toggle car availability (only if owner matches)
export const toggleCarAvailability = async (req, res) => {
  try {
    const { carId, ownerId } = req.params;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    // If only the owner can toggle
    if (car.owner !== ownerId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // toggle
    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, car });
  } catch (error) {
    console.error("Error in toggleCarAvailability:", error.message);
    res.json({
      success: false,
      message: "Failed to toggle availability",
      error: error.message,
    });
  }
};
//  Delete a single car
export const deleteCar = async (req, res) => {
  try {
    const { carId, ownerId } = req.params;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    // check if the car belongs to this owner
    if (car.owner !== ownerId) {
      return res.json({
        success: false,
        message: "Unauthorized: You can only delete your own cars",
      });
    }

    await car.deleteOne();

    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCar:", error.message);
    res.json({
      success: false,
      message: "Failed to delete car",
      error: error.message,
    });
  }
};

// Api to show Dashboard data

export const getDashboardData = async (req, res) => {
  try {
    const { ownerId: owner } = req.body;
    const cars = await Car.find({ owner });
    const bookings = await Booking.find({ owner })
      .populate("car")
      .sort({ createdAt: -1 });
    const pendingBookings = await Booking.find({ owner, status: "pending" });
    const completedBookings = await Booking.find({
      owner,
      status: "confirmed",
    });
    // calculate monthly revenue from bookings status is confirmed
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);
    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      resentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    }
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error?.message);
    res.json({ success: false, message: error.message });
  }
}
