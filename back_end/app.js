require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db.js');
const app = express();




//connection to database
connectDB();




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
const chatRoutes = require('./routes/chats.js');
const fieldOfStudyRoutes = require('./routes/field_of_study.js');


app.use('/api/chats', chatRoutes);
app.use('/api/fields_of_study', fieldOfStudyRoutes);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
