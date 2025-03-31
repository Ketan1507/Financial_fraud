const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, ph_no, dob } = req.body;

    if(!name || !email || !password || !ph_no || !dob)
      return res.status(400).json({ status: false, message: "All fields are required" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ status: false, message: "User already exists" });

    user = new User({ name, email, password, ph_no, dob });
    await user.save();

    res.status(201).json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Token generated successfully",
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error", error });
    
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another account.",
        });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Server Error: ", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
