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
        default: Date.now
    },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

export const OTP = mongoose.model('OTP', otpSchema);

