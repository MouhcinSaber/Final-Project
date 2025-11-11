const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    Messages : {
        type: Array,
        required: true,
        unique: true,
    },
    Seen_messages_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Seen'
    },
    Theme_id : {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:'Theme'
    }
}, { timestamps: true });
module.exports = mongoose.model('Conversation', ConversationSchema);