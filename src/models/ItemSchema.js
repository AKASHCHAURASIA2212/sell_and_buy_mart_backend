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
        required: true
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
        required: true,
        default: 'India'
    },
    city: {
        type: String,
        required: true,
        default: ''
    },
    address: {
        type: String,
        required: true,
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
        required: true,
        default: '0'
    },
    deleted_by: {
        type: String,
        required: true,
        default: ''
    },
    approved_by: {
        type: String,
        required: true,
        default: ''
    },
    rejected_by: {
        type: String,
        required: true,
        default: ''
    },
    message: {
        type: String,
        required: true,
        default: ''
    },
});

export const Item = mongoose.model('Item', itemSchema);

