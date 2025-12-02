import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}


// controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all the fields" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({ user: newUser, token, message: "User registered successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}