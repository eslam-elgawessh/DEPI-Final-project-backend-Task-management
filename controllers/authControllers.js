const bcrypt = require('bcryptjs');
const User = require('../models/user');

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ 
            message: "User created successfully", 
            user: { username: newUser.username, id: newUser._id } 
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({ 
            message: "Login successful", 
            user: { username: user.username, id: user._id } 
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { signup, login };


