import ENV from "../config/ENV.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" })
    }
    if (name.length < 2) {
      return res.status(400).json({ message: "name must be of at least 2 characters long" })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least of 6 characters long" })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" })
    }
    const user = await User.create({
      name, email, password
    })
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    })
    res.status(201).json({
      message: "user registered successfully", user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.log("error in register controller:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" })
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid credentials" })
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    })
    res.status(200).json({
      message: "user logged in successfully", user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.log("error in login controller:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie("token")
    res.status(200).json({ message: "user logged out successfully" })
  } catch (error) {
    console.log("error in logout controller:", error);
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("error in getMe controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
