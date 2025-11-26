const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    Messages : {
        type: Array,
        required: true,
        unique: true,
    },
    Seen_messages_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'Seen'
    },
    Theme_id : {
        type: String, 
        required: true,
       
    },
  users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
    }]

}, { timestamps: true });
module.exports = mongoose.model('Conversation', ConversationSchema);