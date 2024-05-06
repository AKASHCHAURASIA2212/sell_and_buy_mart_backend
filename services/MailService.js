import { Mail } from "../models/MailSchema.js";
import { getDB } from "../db/connection.js";
export default class MailService {

    // Controller function to get all mail messages
    async addMail(newMail) {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            const allMail = await collection.insertOne(newMail);
            return allMail
        } catch (err) {
            // res.status(500).json({ message: err.message });
            console.log(err);
            return false
        }
    };
    // Controller function to get all mail messages
    async getAllMail(currentPage, pageSize) {
        try {

            console.log(pageSize, currentPage);
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('mails')

            let totalCount = await collection.countDocuments({})


            const allMail = await collection.aggregate([
                {
                    $match: {
                        sentTo: 'admin'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'sentBy',
                        foreignField: 'user_id',
                        as: 'sender'
                    }
                },
                {
                    $unwind: '$sender'
                },
                {
                    $project: {
                        subject: 1,
                        message: 1,
                        email: 1,
                        'sender.user_id': 1,
                        'sender.username': 1,
                        'sender.address': 1,
                    }
                }
            ])
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .toArray();


            // const allMail = await collection.find({}).skip((currentPage - 1) * pageSize)
            //     .limit(pageSize)
            //     .toArray();
            return { allMail, totalCount }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    // Controller function to get mail messages by user ID
    async getMailByUserId(userId) {
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
    async getMailBySendBy(senderName) {
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
    async getMailBySendTo(recipientName) {
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
