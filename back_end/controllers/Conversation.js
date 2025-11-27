const Conversation = require('../models/Conversation');

// Get all conversations
exports.getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find()
            .populate('Seen_messages_id')
            .populate('Theme_id');
        res.status(200).json(conversations);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch conversations', details: error.message });
    }
};

// Get one conversation by ID
exports.getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id)
            .populate('Seen_messages_id')
            .populate('Theme_id');

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        console.log("Fetched Conversation:", conversation);
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching conversation', details: error.message });
    }
};
//// Get one conversation by userId
exports.getConversationByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({users: userId})
            .populate('Seen_messages_id')
            .populate('Theme_id');

        console.log("Fetched Conversations for User ID:", userId, conversations);
        res.status(200).json(conversations);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching conversation by user ID', details: error.message });
    }
};



// Create a new conversation
exports.createConversation = async (req, res) => {
    try {
        const { Messages, Seen_messages_id, Theme_id,users } = req.body;

        const newConversation = new Conversation({
            Messages,
            Seen_messages_id,
            Theme_id,
            users
        });

        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Failed to create conversation', details: error.message });
    }
};

// Update a conversation by ID
exports.updateConversation = async (req, res) => {
    try {
        const updatedConversation = await Conversation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return the updated document
        );

        if (!updatedConversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.status(200).json(updatedConversation);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update conversation', details: error.message });
    }
};

// Delete a conversation by ID
exports.deleteConversation = async (req, res) => {
    try {
        const deletedConversation = await Conversation.findByIdAndDelete(req.params.id);

        if (!deletedConversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.status(200).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete conversation', details: error.message });
    }
};


