const mongoose = require('mongoose');

const Seen_Messages_Schema = new mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Seen_messages: {
        type: Boolean,
        required: true
    },
    Time_when_seen: {
        type: String,
        required: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Seen', Seen_Messages_Schema);