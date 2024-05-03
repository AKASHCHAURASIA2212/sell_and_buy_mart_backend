import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { generateMongoId } from '../utils/genrateId.js'

// Define the UserLogs schema
const userLogsSchema = new Schema({
    log_id: {
        type: String,
        required: true,

    },
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    data: {
        type: Schema.Types.Mixed // Store any type of data
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    date_entered: {
        type: Date,
        default: new Date().toISOString() // Default value is the current date and time
    }
});

// Create the UserLogs model using the schema
export const UserLogs = mongoose.model('UserLogs', userLogsSchema);

