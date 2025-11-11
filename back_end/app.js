require('dotenv').config();
const path =require('path');
const express = require('express');
const connectDB = require('./config/db.js');
const app = express();
const cors = require('cors');

//connection to database
connectDB();




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
const chatRoutes = require('./routes/chats.js');
app.use('/api/chats', chatRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
