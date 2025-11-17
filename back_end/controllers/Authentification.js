const messages = require("../models/User");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const getAuth = async (req, res) => {
    try {
        const auths = await messages.find();
        res.status(200).json(auths);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
//when the user creates an account (register)
const createAuth = async (req, res) => {
    const { Password, email, Username, Field_of_study, University_name, Gender, Profile_picture, Conversations } = req.body;
    try {
        const existingUser = await messages.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newAuth = new messages({
            Password: hashedPassword,
            email,
            Username,
            Field_of_study,
            University_name,
            Gender, 
            Profile_picture,
            Conversations
        });
        await newAuth.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const updateAuth = async (req, res) => {
    const { authId } = req.params;
    const { Password, email, Username, Field_of_study, University_name, Gender, Profile_picture, Conversations } = req.body;
    try {
        const auth = await messages.findByIdAndUpdate(
            authId,
            { Password, email, Username, Field_of_study, University_name, Gender, Profile_picture, Conversations },
            { new: true }
        );
        res.status(200).json(auth);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

deleteUserProfile = async (req, res) => {
    const { authId } = req.params;
    try {
        const auth = await messages.findByIdAndDelete(authId);
        res.status(200).json(auth);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const login = async (req, res) => {
    const { email, Password } = req.body;
    try {
        const auth = await
            messages.findOne({ email });
        if (!auth) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //password comparison can be added here
        const match = await bcrypt.compare(Password, auth.Password);
        if (match) {
            //token generation
            const token = JWT.sign({ user: { id: auth._id } }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAuth, createAuth, updateAuth, deleteUserProfile, login };