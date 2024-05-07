import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let connection_url = process.env.DB_CONNECTION_STRING
// let connection_url = 'mongodb://0.0.0.0:27017/db';

let db_connection;

export const connectToMongoDB = () => {
    MongoClient.connect(connection_url)
        .then((clientInstance) => {
            db_connection = clientInstance.db();
            console.log("MongoDB is Connected");
        }).catch((err) => {
            console.log("Error in Connected To Mongo DB : ", err);
        })
}
export const getDB = () => {
    return db_connection;
}

