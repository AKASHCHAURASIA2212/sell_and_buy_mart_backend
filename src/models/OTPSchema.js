import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 30, // The document will be automatically deleted after 30 minutes of its creation time
    },
});

export const OTP = mongoose.model('OTP', otpSchema);

