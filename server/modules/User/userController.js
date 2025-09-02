import User from "./userSchema.js";

// create a single user
export const registerUser = async (req, res) => {
  try {
    const { _id, name, email } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "fill all the fields" });
    }

    const userExist = await User.findOne({ email }); //! check email is already exist
    if (userExist) {
      return res.json({ success: false, message: "user already exist" });
    }

    const newUser = new User({ _id, name, email });
    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "data is not saved into Database" });
  }
};

// get all user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
// get a single user by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params; // get email from URL
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

// ! update a single user by id

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params; // user id from URL
    const { role } = req.body; // fields to update

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.json({ success: false, message: "Failed to update user.." });
  }
};

// get User data using Token (JWT)

export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error?.message });
  }
};
