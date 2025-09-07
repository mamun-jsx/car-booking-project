import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const bookingSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    car: { type: ObjectId, ref: "Car", required: true },
    user: { type: String, ref: "User", required: true },

    // pickup date and return date
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: { type: Number, required: true },
  },

  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
