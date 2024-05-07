import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { generateMongoId } from '../../utils/genrateId.js'

// Define the Item schema
const itemSchema = new Schema({
    item_id: {
        type: String,
        required: true,
        unique: true,

    },
    buyer: [{
        type: String,
        ref: 'User' // Reference to the User model
    }],
    seller: [{
        type: String,
        ref: 'User' // Reference to the User model
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
    date_entered: {
        type: Date,
        required: true,
        default: new Date().toISOString()
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'pending'],
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

    }
});

// Item model using the schema
export const Item = mongoose.model('Item', itemSchema);

