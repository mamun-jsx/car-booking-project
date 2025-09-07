import User from "./userSchema.js";
import fs from "fs";
import imageKit from "../../config/imagekit.js";

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
    const { id } = req.params; // user string ID from URL
    const { role } = req.body; // new role

    // Validate role
    const allowedRoles = ["user", "owner", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    // Find user by string _id and update
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update user" });
  }
};


// get User data using Token (JWT)

export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};

// user will update the profile image;
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.body;
    const imageFile = req.file;
    // upload Image to imageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/user",
    });
    var optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [{ width: 400 }, { quality: "auto" }, { format: "webp" }],
    });
    const image = optimizedImageUrl;
    await User.findOneAndUpdate(_id, { image });
    res.json({ success: true, message: "Profile picture updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
