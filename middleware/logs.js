import { UserLogs } from '../models/Logs.js';

export const Logs = async (req, res) => {
    const { method, url, body } = req;
    const userId = req.user ? req.user._id : null; // Assuming user ID is available in the request (e.g., from authentication middleware)

    // Create a new UserLogs object
    const newLog = new UserLogs({
        method,
        url,
        data: body,
        userId
    });

    // Save the log to the database
    newLog.save()
        .then(() => {
            console.log('Request logged successfully');
            next(); // Move to the next middleware or route handler
        })
        .catch(err => {
            console.error('Error logging request:', err);
            next(err); // Pass the error to the error handling middleware
        });

}

