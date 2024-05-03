import MailService from "../services/MailService.js";
import { Mail } from "../models/MailSchema.js";
export class MailController {

    constructor() {
        this.MailService = new MailService();
    }

    async getAllMail(req, res) {
        try {
            // const { chatId } = req.body;
            // const chats = await Chat.find({ itemId });
            console.log(chatId);

            const mails = await this.MailService.getAllMail();

            console.log(mails);

            // let userDetails = [];

            // chat.forEach((item) => {
            //     userDetails.push(item.participents[0])
            //     userDetails.push(item.participents[1])
            // })



            // let userData = await this.UserService.findByUserID(userDetails)

            // console.log(userData);

            res.status(200).json({
                data: mails,
                status: 200,
                message: "mail",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting mails:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting mails",
                error: err
            });
        }
    };

    async getMailByUserId(req, res) {
        try {
            const { userId } = req.params;

            console.log(chatId);

            const mails = await this.MailService.getMailByUserId(userId);

            console.log(mails);

            res.status(200).json({
                data: mails,
                status: 200,
                message: "mail",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting mails:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting mails",
                error: err
            });
        }
    };
    async addMail(req, res) {
        try {
            const { userId } = req.params;
            const { subject, email, smessage } = req.body

            let data = {
                subject,
                smessage,
                email,
                sentBy: userId,
                sendTo: 'admin'
            }

            let newMail = new Mail(data);

            const mails = await this.MailService.addMail(newMail);

            console.log(mails);

            res.status(200).json({
                data: mails,
                status: 200,
                message: "mail",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting mails:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting mails",
                error: err
            });
        }
    };

}