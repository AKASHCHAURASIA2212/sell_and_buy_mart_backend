import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { generateMongoId } from '../utils/genrateId.js'

// Define the Chat schema
const chatSchema = new Schema({
    participents: [
        {
            type: String,
            required: true,
            ref: 'User',
        },
        {
            type: String,
            required: true,
            ref: 'User',
        }
    ],
    chat_id: {
        type: String,
        required: true,
    },
    messages: [
        {
            message_id: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            sendBy: {
                type: String,
                required: true,
                ref: 'User',
            },
            date_entered: {
                type: Date,
                default: new Date().toISOString() // Default value is the current date and time
            },
            date_modified: {
                type: Date,
                default: new Date().toISOString() // Default value is the current date and time
            },
            deleted: {
                type: String,
                default: '0' // Default value is the current date and time
            },
        }
    ],
    date_started: {
        type: Date,
        default: new Date().toISOString() // Default value is the current date and time
    },
    date_deleted: {
        type: Date,
        default: "" // Default value is the current date and time
    },
    chat_deleted: {
        type: String,
        default: '0' // Default value is the current date and time
    },
    chat_started_by: {
        type: String,
        required: true,
        ref: 'User'
    },
    item_id: {
        type: String,
        ref: 'Item' // Reference to the Item model
    }
});

// Create the Chat model using the schema
export const Chat = mongoose.model('Chat', chatSchema);

