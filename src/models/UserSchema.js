import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { generateMongoId } from '../../utils/genrateId.js'

// User schema
const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    user_img: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    }
});

// User model using the schema
export const User = mongoose.model('User', userSchema);

