const mongoose = require('mongoose');
//4.5.	Field of study :_id,Name,Group conversation,Field Theme,
//group converstion as an array of ids of users
//add id of the field study conversation
//field theme means the theme of the field study conversation


const Field_of_Study_Schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    Name : {
        type: String,
        required: true,
        unique: true,
    },
    Group_conversation : {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref:'User'
    },
    Field_Theme : {
        type: String,
        required: true,
       
    }
}, { timestamps: true });

module.exports = mongoose.model('Field_of_Study', Field_of_Study_Schema);
