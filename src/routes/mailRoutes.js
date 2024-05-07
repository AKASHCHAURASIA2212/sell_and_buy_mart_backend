import express from 'express';

const mailRoutes = express.Router();
import { MailController } from '../controllers/MailController.js';

const mailController = new MailController();

// Route to get all mail messages
mailRoutes.get('/:page/:limit', (req, res) => {
    mailController.getAllMail(req, res)
});

mailRoutes.post('/:userId', (req, res) => {
    mailController.addMail(req, res)
});


// Route to get mail messages by user ID
// mailRoutes.get('/user/:userId', (req, res) => {
//     mailController.getMailByUserId
// });

// // Route to get mail messages by sender
// mailRoutes.get('/sender/:senderName', (req, res) => {
//     mailController.getMailBySendBy(req, res)
// });

// // Route to get mail messages by recipient
// mailRoutes.get('/recipient/:recipientName', (req, res) => {
//     mailController.getMailBySendTo(req, res)
// });

export { mailRoutes };
