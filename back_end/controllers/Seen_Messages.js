const Seen = require('../models/Seen_messages');

// Get all seen records
exports.getAllSeen = async (req, res) => {
    try {
        const seenRecords = await Seen.find().populate('User_id');
        res.status(200).json(seenRecords);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch seen messages', details: error.message });
    }
};

// Get one seen record by ID
exports.getSeenById = async (req, res) => {
    try {
        const seenRecord = await Seen.findById(req.params.id).populate('User_id');
        if (!seenRecord) return res.status(404).json({ error: 'Seen record not found' });

        res.status(200).json(seenRecord);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching seen record', details: error.message });
    }
};

// Create a new seen record
exports.createSeen = async (req, res) => {
    try {
        const { User_id, Seen_messages, Time_when_seen } = req.body;

        const newSeen = new Seen({
            User_id,
            Seen_messages,
            Time_when_seen
        });

        const savedSeen = await newSeen.save();
        res.status(201).json(savedSeen);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create seen record', details: error.message });
    }
};

// Update a seen record by ID
exports.updateSeen = async (req, res) => {
    try {
        const updatedSeen = await Seen.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedSeen) return res.status(404).json({ error: 'Seen record not found' });

        res.status(200).json(updatedSeen);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update seen record', details: error.message });
    }
};

// Delete a seen record by ID
exports.deleteSeen = async (req, res) => {
    try {
        const deletedSeen = await Seen.findByIdAndDelete(req.params.id);
        if (!deletedSeen) return res.status(404).json({ error: 'Seen record not found' });

        res.status(200).json({ message: 'Seen record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete seen record', details: error.message });
    }
};
