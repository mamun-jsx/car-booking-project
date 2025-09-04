import Car from "../Car/carSchema.js";
import Booking from "./bookingSchema.js";
// check does car is available on the selected date;

export const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $get: pickupDate },
  });
  return bookings.length === 0;
};

// check availability of cars for the given date and location

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    const cars = Car.find({ location, isAvailable: true });
    //check car availability for given data range using promise
    const availableCarsPromise = (await cars).map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });
    let availableCars = await Promise.all(availableCarsPromise);
    availableCars = availableCars.filter((car) => car.isAvailable === true);
    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
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
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// api to list bookings
export const getUsersBooking = async (req, res) => {
  try {
    const { _id } = req.params;
    const bookings = await Booking.find({ user: _id })
      .populate("car") // attached car information
      .sort({ createdAt: -1 }); // latest data comes first
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
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
  const { bookingId, status, ownerId: owner } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!owner) {
      return res.json({ success: false, message: "Unauthorize " });
    }
    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
