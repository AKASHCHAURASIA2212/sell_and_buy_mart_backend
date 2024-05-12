import { Mail } from "../models/MailSchema.js";
import { getDB } from "../../db/connection.js";
export default class MailService {

    async addMail(newMail) {
        try {
            const allMail = await Mail.create(newMail);
            return allMail
        } catch (err) {
            console.log(err);
            return false
        }
    };
    async getAllMail(currentPage, pageSize) {
        try {
            let totalCount = await Mail.countDocuments({})
            const allMail = await Mail.aggregate([
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
            return { allMail, totalCount }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    async getMailByUserId(userId) {
        try {
            const userMail = await Mail.find({ sentBy: userId });
            res.json(userMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Controller function to get mail messages by sender
    async getMailBySendBy(senderName) {
        try {
            const senderMail = await Mail.find({ sentBy: senderName });
            res.json(senderMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Controller function to get mail messages by recipient
    async getMailBySendTo(recipientName) {
        try {
            const recipientMail = await Mail.find({ sentTo: recipientName });
            res.json(recipientMail);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    async getMails(limit) {
        try {
            let res = await Mail.find().sort({ dateEntered: -1 }).limit(limit)
            let totalCount = await Mail.countDocuments()
            return { res, totalCount };

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

}
