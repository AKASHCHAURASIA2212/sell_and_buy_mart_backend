import mongoose from "mongoose";
// Define the schema for the mail messages
const mailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateEntered: {
        type: Date,
        default: Date.now
    },
    sentBy: {
        type: String,
        required: true
    },
    sentTo: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    }
});

// Create a model based on the schema
export const Mail = mongoose.model('Mail', mailSchema);
