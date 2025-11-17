const mongoose = require('mongoose');

const VipSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    time_end: {
        type: Date,
        default: Date.now
    },
    number_accont: {
        type: String,
        required: true,
        unique: true,
    },
    payment:{
        type: Boolean,
        required: true
    }
    }, { timestamps: true });
module.exports = mongoose.model('Vip', VipSchema);