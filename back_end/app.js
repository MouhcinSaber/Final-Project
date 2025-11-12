require('dotenv').config();
const path =require('path');
const express = require('express');
const connectDB = require('./config/db.js');
const app = express();
const cors = require('cors');
const seenRoutes = require('./routes/Seen_Messages')
const chatRoutes = require('./routes/chats.js');
const conversationRoutes = require('./routes/conversationRoutes');
//connection to database
connectDB();




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(express.json());

// Define routes
app.use('/api/conversations', conversationRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/seen', seenRoutes);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
