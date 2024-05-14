import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_id: {
        type: String,
        required: true,
        unique: true,
    },
    buyer: [{
        type: String,
        ref: 'User'
    }],
    seller: [{
        type: String,
        ref: 'User'
    }],
    item_category: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true,
        index: 'text'
    },
    item_price: {
        type: Number,
        required: true
    },
    item_desc: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'India'
    },
    city: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    date_entered: {
        type: Date,
        required: true,
        default: new Date().toISOString()
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'pending', 'rejected'],
        default: 'pending'
    },
    img: [{
        type: String,
        max: 4
    }],
    posted_by: {
        type: String,
        required: true
    },
    deleted: {
        type: String,
        default: '0'
    },
    deleted_by: {
        type: String,
        default: ''
    },
    approved_by: {
        type: String,
        default: ''
    },
    rejected_by: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
});

export const Item = mongoose.model('Item', itemSchema);

