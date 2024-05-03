import Mail from "../models/MailSchema.js";
import { getDB } from "../db/connection.js";
export default class MailService {

    // Controller function to get all mail messages
    allMail = async (newMail) => {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            const allMail = await collection.insertOne(newMail);
            res.json("New Mail added");
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Controller function to get all mail messages
    getAllMail = async () => {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            const allMail = await collection.find({});
            res.json(allMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Controller function to get mail messages by user ID
    getMailByUserId = async (userId) => {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            const userMail = await collection.find({ sentBy: userId });
            res.json(userMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Controller function to get mail messages by sender
    getMailBySendBy = async (senderName) => {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            const senderMail = await collection.find({ sentBy: senderName });
            res.json(senderMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Controller function to get mail messages by recipient
    getMailBySendTo = async (recipientName) => {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            const recipientMail = await collection.find({ sentTo: recipientName });
            res.json(recipientMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    async getMails(limit) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            // insert document
            let res = await collection.find().sort({ dateEntered: -1 }).limit(limit).toArray()

            let totalCount = await collection.countDocuments()

            return { res, totalCount };

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

}
