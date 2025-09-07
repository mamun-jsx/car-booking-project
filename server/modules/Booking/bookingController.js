import Car from "../Car/carSchema.js";
import Booking from "./bookingSchema.js";

// check does car is available on the selected date;
export const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

// check availability of cars for the given date and location

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    // Use query parameters (frontend sends GET with params)
    const { location, pickupDate, returnDate } = req.query;

    if (!location || !pickupDate || !returnDate) {
      return res
        .status(400)
        .json({ success: false, message: "Missing search parameters" });
    }

    // Convert dates to Date objects
    const pickup = new Date(pickupDate);
    const dropOff = new Date(returnDate);

    // Fetch cars in the given location that are marked available
    const cars = await Car.find({ location, isAvailable: true });

    // Check availability for each car (no overlapping bookings)
    const availableCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickup, dropOff);
      return { ...car.toObject(), isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromise);

    // Filter only cars that are available for the date range
    availableCars = availableCars.filter((car) => car.isAvailable);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user will book a car
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.params;
    const { car, pickupDate, returnDate } = req.body;
    // check is available
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }
    const carData = await Car.findById(car);
    // ? calculate based on pickup date
    const pickup = new Date(pickupDate);
    const returned = new Date(returnDate);
    const numberOfDays = Math.ceil(returned - pickup) / (1000 * 60 * 60 * 24);
    const price = carData.pricePerDay * numberOfDays; // price according to days
    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });
    res.json({ success: true, message: "Booking done wait for confirmed" });
  } catch (error) {
 
    res.json({ success: false, message: error.message });
  }
};

// api to list bookings
// user-booking/:userId
export const getBookingByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // now using ID

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("car")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    console.error("getBookingByUserId error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// owner bookings
// owner can see the booking list
export const getOwnerBooking = async (req, res) => {
  const { ownerId: owner } = req.params;
  try {
    const bookings = await Booking.find({ owner })
      .populate("car user")
      .sort({ createdAt: -1 }); // latest data comes first
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// owner can update booking status

export const changeBookingStatus = async (req, res) => {
  const { bookingId, status, ownerId } = req.body;

  try {
    // Validate status
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Verify ownership
    if (booking.owner !== ownerId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update status
    booking.status = status;
    await booking.save();

    return res.json({ success: true, message: "Booking status updated" });
  } catch (error) {
    console.error("changeBookingStatus error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
