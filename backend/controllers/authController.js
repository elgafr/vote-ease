import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const registerUser = async (req, res) => {
  const { fullName, username, email, password, profileImageUrl } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: "Username must be alphanumeric" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email alredy exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({
          message: "Username not available. Please choose another one.",
        });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email })
    if(!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalVotesCreated: 0,
        totalCastVotes: 0,
        totalVotesBookmarked: 0,
      },
      token: generateToken(user._id),
    })
  } catch(error) {
    res.status(500).json({ message: "Error loging in", error: error.message })
  }

};

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")

        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const userInfo = {
            ...user.toObject(),
            totalVotesCreated: 0,
            totalCastVotes: 0,
            totalVotesBookmarked: 0,
        }

        res.status(200).json(userInfo)

    } catch (error) {
        res.status(500).json({ message: "Error getting user info", error: error.message })
    }
};
