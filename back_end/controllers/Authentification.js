const messages = require("../models/UserProfile");

const getAuth = async (req, res) => {
    try {
        const auths = await messages.find();
        res.status(200).json(auths);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const createAuth = async (req, res) => {
    const { _id, Password, email, Username, Field_of_study, University_name, Gender, Profile_picture, Conversations} = req.body;
    try {
        const newAuth = new messages({
            _id,
            Password,
            email,
            Username,
            Field_of_study,
            University_name,
            Gender,
            Profile_picture,
            Conversations
        });
        const savedAuth = await newAuth.save();
        res.status(201).json(savedAuth);
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

module.exports = { getAuth, createAuth, updateAuth, deleteUserProfile };