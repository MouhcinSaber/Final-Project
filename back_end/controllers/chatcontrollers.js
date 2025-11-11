const messages = require("../models/messages");

//get afficher les messages d'une conversation
const getMessagesByConversationId = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const msgs = await messages.find({ conversation_id: conversationId });
        res.status(200).json(msgs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
//post envoyer un message
const sendMessage = async (req, res) => {
    const { conversation_id, sender_id, type, content } = req.body;
    try {
        const newMessage = new messages({
            conversation_id,
            sender_id,
            type,
            content
        });
        await newMessage.save();
        res.status(201).json(newMessage);
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
