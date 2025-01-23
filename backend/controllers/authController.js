import jwt from "jsonwebtoken"
import User from "../models/User.js"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",})
}

export const registerUser = async(req, res) => {

    const { fullName, username, email, password, profileImageUrl } = req.body

    if(!fullName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if(!usernameRegex.test(username)) {
        return res.status(400).json({ message: "Username must be alphanumeric" })
    }

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Email alredy exists" })
        }

        const existingUsername = await User.findOne({ username })
        if(existingUsername) {
            return res.status(400).json({ message: "Username not available. Please choose another one." })
        }

        const user = await User.create({
            fullName,
            username,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}