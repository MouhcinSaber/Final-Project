const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
/*  _Id
b.	Password 
c.	Field of study
d.	University name
e.	Username
f.	email
g.	Gender
h.	Profile picture
i.	Conversations*/
    
    Password : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
    },
    Username : {
        type: String,
        required: true,
    },
    Field_of_study : {
        type: String,
        required: true,
    },
    University_name : {
        type: String,
        required: true,
    },
    Gender : {
        type: String,
        required: true,
    },
    Profile_picture : {
        type: String,
        required: false,
    },
    Conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConversationSchema'
    }]
}, { timestamps: true });
module.exports = mongoose.model('UserProfile', UserProfileSchema);