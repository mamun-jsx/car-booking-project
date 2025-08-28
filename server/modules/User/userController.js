import User from "./userSchema.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "fill all the fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "user already exist" });
    }

    const newUser = new User({ name, email });
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
