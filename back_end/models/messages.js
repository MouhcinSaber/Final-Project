const mongoose = require('mongoose');
//3.	Messages :Conversation_Id,_id,sender_id,Type ( Txt/Img/video/Other file (PDF, docs..),Time when sent,Status (Seen/not seen)
const messageSchema = new mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },  
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Txt', 'Img', 'Video', 'Other'],
        required: true  
    },
    content: {
        type: String,
        required: true
    },
    time_sent: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Seen', 'Not Seen'],
        default: 'Not Seen'
    }
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
