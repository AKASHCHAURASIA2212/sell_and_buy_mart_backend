import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Define an asynchronous function to establish a MongoDB connection
async function connectToMongoDB() {
    // Retrieve MongoDB connection details from environment variables
    const username = process.env.DB_USER; // MongoDB username
    const password = process.env.DB_PASS; // MongoDB password
    const url = process.env.MONGO_DB_URL; // MongoDB URL

    // Construct the MongoDB connection URI with username and password
    const mongoURI = `mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`;

    // Attempt to connect to the MongoDB database using Mongoose
    await mongoose.connect(mongoURI);

    // Log a success message if the connection is established
    console.log("MongoDB connection is successful");
}

// Export the 'connect' function for use in your application
export { connectToMongoDB };

export const getDB = () => {
    return db_connection;
}

