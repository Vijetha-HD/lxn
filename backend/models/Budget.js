const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    spent: {
        type: Number,
        default: 0,
        min: 0
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    description: {               // <---- add this optional field
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
