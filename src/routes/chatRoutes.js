import express from 'express';
const chatRoutes = express.Router();
import { ChatController } from '../controllers/ChatController.js';

const chatController = new ChatController();

// Chat routes
chatRoutes.post('/new', (req, res) => {
    chatController.addNewChat(req, res)
});
chatRoutes.post('/insert', (req, res) => {
    chatController.insertChat(req, res)
});
chatRoutes.put('/update', (req, res) => {
    chatController.updateChat(req, res)
});
chatRoutes.post('/user', (req, res) => {
    chatController.getChatByParticipants(req, res)
});
chatRoutes.post('/single', (req, res) => {
    chatController.getChatByUserId(req, res)
});
chatRoutes.post('/item', (req, res) => {
    chatController.getChatByParticipantAndItemId(req, res)
});
chatRoutes.post('/chat', (req, res) => {
    chatController.getChatByChatId(req, res)
});

export { chatRoutes };
