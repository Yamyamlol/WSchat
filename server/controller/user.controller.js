import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenWithCookies from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({ name, email, password: hashedPassword });

    await newUser.save();

    if (newUser) {
      createTokenWithCookies(newUser._id, res);
      res.status(201).json({
        message: "User Registered Succesfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while creating a new user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "No user found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    createTokenWithCookies(user._id, res);
    return res.status(200).json({
      message: "Logged in Succesfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error", error);
    return res
      .status(500)
      .json({ message: "Internal server error while logging in" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while logging out" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const currentUser = req.user._id;
    // %ne means not equal
    const allUsers = await User.find({_id: {$ne: currentUser}}).select("-password");
    res.status(201).json({ allUsers });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching users" });
  }
};
