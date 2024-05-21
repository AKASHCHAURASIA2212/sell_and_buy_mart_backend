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
    dob: {
        type: String,
        default: 'dd-mm-yyyy'

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
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: 'India'
    },
    city: {
        type: String,
        default: ''
    },
    street: {
        type: String,
        default: ''
    },
    landmark: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    user_img: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    },
    deleted_by: {
        type: String,
        default: ''
    },
    deleted: {
        type: String,
        default: '1'
    },
    varified: {
        type: Boolean,
        default: false
    },

});


// User model using the schema
export const User = mongoose.model('User', userSchema);

