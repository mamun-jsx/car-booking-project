import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase is connected 🚀 ")
    );
    await mongoose.connect(`${process.env.MONGO_DB_URI}/car_booking_DB`);
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
