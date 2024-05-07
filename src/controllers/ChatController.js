import { Chat } from '../models/ChatSchema.js'; // Import the Chat model
import ChatService from '../services/ChatService.js';
import UserService from '../services/UserService.js';
import ItemService from '../services/ItemService.js';
import { generateMongoId } from '../../utils/genrateId.js'
export class ChatController {
    constructor() {
        this.ChatService = new ChatService();
        this.UserService = new UserService();
        this.ItemService = new ItemService();
    }

    // Function to create a new chat
    async addNewChat(req, res) {
        try {
            const { sender, receiver, message, itemId, chat_started_by } = req.body;

            console.log(req.body);

            // Create a new chat object
            const newChat = new Chat({
                chat_id: generateMongoId(),
                participents: [sender, receiver],
                messages: [
                    {
                        content: message,
                        sendBy: sender,
                        message_id: generateMongoId()
                    }
                ],
                item_id: itemId,
                chat_started_by: chat_started_by
            });

            console.log("---------------------------");
            console.log(newChat);
            console.log("---------------------------");

            // Save the new chat to the database
            const savedChat = await this.ChatService.addNewChat(newChat);

            res.status(201).json({
                data: savedChat,
                status: 201,
                message: "New Chat added !!!",
                error: "none"
            });
        } catch (err) {
            console.error('Error creating new chat:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error creating new chat",
                error: "none"
            });
        }
    };

    // Function to insert a chat message into an existing chat
    async insertChat(req, res) {
        try {
            const { chatId, sender, message } = req.body;

            // Find the chat by ID
            let message_id = generateMongoId()

            let resp = await this.ChatService.insertChat(chatId, message, sender, message_id)

            const chat = await this.ChatService.getChatByChatId(chatId);

            res.status(201).json({
                data: chat,
                status: 201,
                message: "Chat added !!!",
                error: "none"
            });
        } catch (err) {
            console.error('Error inserting chat message:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error inserting chat message",
                error: err
            });
        }
    };

    // Function to update a chat message
    async updateChat(req, res) {
        try {
            const { chatId, messageId, message } = req.body;

            let resp = this.ChatService.updateChat(chatId, messageId, message);
            res.status(200).json({
                data: resp,
                status: 200,
                message: "chat",
                error: "none"
            });
        } catch (err) {
            console.error('Error updating chat message:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error updating chat message",
                error: err
            });
        }
    };

    // Function to get chats by user ID
    async getChatByParticipants(req, res) {
        try {
            const { sellerId, buyerId, user_id } = req.body;
            // const chats = await Chat.find({ $or: [{ sender: userId }, { receiver: userId }] });
            let resp = await this.ChatService.getChatByParticipants([sellerId, buyerId], user_id);

            // console.log(resp, typeof resp.seller_chat);
            // resp = JSON.parse(resp);
            console.log(resp);


            let userDetails = [];
            let itemDetails = [];


            resp.seller_chat.forEach(element => {
                userDetails.push(element.participents[0])
                userDetails.push(element.participents[1])
                itemDetails.push(element.item_id)
            })
            resp.buyer_chat.forEach(element => {
                userDetails.push(element.participents[0])
                userDetails.push(element.participents[1])
                itemDetails.push(element.item_id)

            })

            console.log("userDetails  : ", userDetails);
            console.log("itemDetails  : ", itemDetails);

            let itemData = await this.ItemService.getItemById(itemDetails)

            let userData = await this.UserService.findByUserID(userDetails)

            console.log(userData);
            console.log(itemData);


            res.status(200).json({
                data: { resp, itemData, userData },
                status: 200,
                message: "chat",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting chats by user ID:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting chats by user ID",
                error: "none"
            });
        }
    };

    // Function to get chats by item ID
    async getChatByParticipantAndItemId(req, res) {
        try {
            const { item_id, sellerId, buyerId } = req.body;
            // const chats = await Chat.find({ itemId });
            const chat = await this.ChatService.getChatByParticipantAndItemId([sellerId, buyerId], item_id);

            console.log(chat);

            res.status(200).json({
                data: chat,
                status: 200,
                message: "chat",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting chats by item ID:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting chats by item ID",
                error: err
            });
        }
    };

    async getChatByChatId(req, res) {
        try {
            const { chatId } = req.body;
            // const chats = await Chat.find({ itemId });
            console.log(chatId);

            const chat = await this.ChatService.getChatByChatId(chatId);

            console.log(chat);

            let userDetails = [];

            chat.forEach((item) => {
                userDetails.push(item.participents[0])
                userDetails.push(item.participents[1])
            })



            let userData = await this.UserService.findByUserID(userDetails)

            console.log(userData);


            res.status(200).json({
                data: { chat, userData },
                status: 200,
                message: "chat",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting chats by item ID:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting chats by item ID",
                error: err
            });
        }
    };

}

