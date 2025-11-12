require('dotenv').config();

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

// Define routes
const chatRoutes = require('./routes/chats.js');
const fieldOfStudyRoutes = require('./routes/field_of_study.js');
const authentificationRoutes = require('./routes/Authentification.js');

// Define routes
app.use('/api/conversations', conversationRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/fields_of_study', fieldOfStudyRoutes);
app.use('/api/authentification', authentificationRoutes);
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
