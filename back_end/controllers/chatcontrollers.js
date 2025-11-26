const messages = require("../models/messages");
const Conversation = require("../models/Conversation");


// Controller: get messages by conversation ID
const getMessagesByConversationId = async (req, res) => {
    const { conversation_id } = req.params;
    try {
        // Filter messages by conversationId and populate sender info
        const msgs = await messages.find({ conversation_id })
            .populate({ path: 'sender_id', model: 'UserProfile', select: 'Username Profile_picture' });

        // if (!msgs || msgs.length === 0) {
        //     return res.status(404).json({ message: 'No messages found for this conversation.' });
        // }

        res.status(200).json(msgs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//post envoyer un message
const sendMessage = async (req, res) => {
    const {conversation_id} = req.params;
    const {sender_id, type, content } = req.body;
    try {
        const newMessage = new messages({
            conversation_id,
            sender_id,
            type,
            content
        });
    
        //quand on ajoute un message array Messages s'ajoute automatiquement
    
        let savedMsg = await newMessage.save();

        // populate sender info before returning
        try {
            savedMsg = await savedMsg.populate({ path: 'sender_id', model: 'UserProfile', select: 'Username Profile_picture' });
        } catch (popErr) {
            console.error('Failed to populate sender on saved message:', popErr);
        }

        // push the saved message into the Conversation.Messages array
        try {
            const conv = await Conversation.findByIdAndUpdate(
                conversation_id,
                { $push: { Messages: savedMsg } },
                { new: true }
            );
            // if conversation not found, still return the saved message but log a warning
            if (!conv) {
                console.warn(`Conversation ${conversation_id} not found when pushing message`);
            }
        } catch (pushErr) {
            console.error('Failed to push message into conversation:', pushErr);
        }

        res.status(201).json(savedMsg);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
//modifier un message
const updateMessage = async (req, res) => {
    const { messageId } = req.params;
    const { content, status } = req.body;
    try {
        const msg = await messages.findByIdAndUpdate(
            messageId,
            { content, status },
            { new: true }
        );  
        if (!msg) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
//delete message
const deleteMessage = async (req, res) => {
    const { messageId } = req.params;   
    try {
        const msg = await messages.findByIdAndDelete(messageId);
        if (!msg) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    getMessagesByConversationId,
    sendMessage,
    updateMessage,
    deleteMessage
};
