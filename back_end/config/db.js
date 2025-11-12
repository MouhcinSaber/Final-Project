const mongoose = require('mongoose');

const uri = process.env.MONGDODB;

module.exports = async function connectDB() {
    try {
        await mongoose.connect(uri), 
        console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }}