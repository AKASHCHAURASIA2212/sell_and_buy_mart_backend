import MailService from "../services/MailService.js";
import { Mail } from "../models/MailSchema.js";
export class MailController {

    constructor() {
        this.MailService = new MailService();
    }

    async getAllMail(req, res) {
        try {
            const { page, limit } = req.params;

            const mails = await this.MailService.getAllMail(Number(page), Number(limit));

            // console.log(mails);

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

            // console.log(chatId);

            const mails = await this.MailService.getMailByUserId(userId);

            // console.log(mails);

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
            const { subject, email, message } = req.body

            let data = {
                subject,
                message,
                email,
                sentTo: 'admin'
            }

            let newMail = new Mail(data);

            // console.log(newMail);

            const mails = await this.MailService.addMail(newMail);

            // console.log(mails);

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
    async sendMail(req, res) {
        try {
            const { email, subject, message } = req.body

            const mails = await this.MailService.sendMail(email, subject, message);

            // console.log(mails);

            res.status(200).json({
                data: "Mail Send",
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
    async sendMailNewsLatter(req, res) {
        try {
            const { email } = req.body

            const mails = await this.MailService.sendMailNewsLatter(email);

            // console.log(mails);

            res.status(200).json({
                data: "Mail Send",
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