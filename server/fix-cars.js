import mongoose from "mongoose";
import "dotenv/config";
import User from "./modules/User/userSchema.js";
import Car from "./modules/Car/carSchema.js";

const fixCars = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}/car_Booking`);
    console.log("Connected to DB");

    const adminUser = await User.findOne({ email: "admin@gmail.com" });
    if (!adminUser) {
      console.log("Admin user not found.");
      return;
    }

    const adminId = adminUser._id;
    console.log(`Admin ID: ${adminId}`);

    // Update the 'owner' field (not 'ownerId')
    const result = await Car.updateMany({}, { $set: { owner: adminId }, $unset: { ownerId: "" } });
    console.log(`Updated ${result.modifiedCount} cars to the correct owner field.`);

    await mongoose.disconnect();
    console.log("Fix complete!");
  } catch (error) {
    console.error("Error:", error);
  }
};

fixCars();
