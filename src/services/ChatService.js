import { getDB } from "../../db/connection.js";
import mongodb from 'mongodb';
import { Chat } from '../models/ChatSchema.js'; // Import the Chat model
import { UserController } from '../controllers/UserController.js'

let userController = new UserController();

export default class ChatService {

    async addNewChat(newChat) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('chats')
            // insert document
            let res = await collection.insertOne(newChat)

            console.log("New Chat Created Succsessfully");

            return res;

        } catch (error) {
            console.log("something went wrong in addItem : ", error);
        }
    }

    async insertChat(chatId, content, sendBy, message_id) {
        try {


            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('chats')
            // insert document

            // Find the chat by ID

            // const chat = await collection.find({ "chat_id": chatId });
            const result = await collection.updateOne(
                { "chat_id": chatId },
                {
                    $push: {
                        "messages": {
                            "message_id": message_id,
                            "content": content,
                            "sendBy": sendBy,
                            "deleted": "0",
                            "date_entered": new Date().toISOString(),
                            "date_modified": new Date().toISOString(),
                        }
                    }
                }
            );


            if (result.nModified === 0) {
                throw new Error('Failed to insert message');
            }

            // res.status(200).json(result);
            return result;
        } catch (err) {
            console.error('Error inserting chat message:', err);
            // res.status(500).json({ error: 'Internal server error' });
            return err
        }
    };

    async updateChat(chatId, messageId, newMessage) {
        try {



            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('chats')
            // insert document

            const filter = {
                "chat_id": chatId,
                "messages_id": messageId
            };

            const update = {
                $set: {
                    "messages": {
                        "content": newMessage,
                        "date_modified": new Date().toISOString(),
                    }
                }
            };

            const result = await collection.updateOne(filter, update);
            if (!result) {
                return res.status(404).json({ error: 'Message not found in chat' });
            }

            console.log(result);



            return result
        } catch (err) {
            console.error('Error updating chat message:', err);
            // res.status(500).json({ error: 'Internal server error' });
            return err
        }
    };

    async getChatByParticipants(participantId, user_id) {
        try {

            console.log(" getChatByParticipants ");
            const db = getDB();
            const collection = db.collection('chats')
            console.log(participantId, user_id);
            const result = await collection.aggregate([
                {
                    $match: {
                        participents: {
                            $in: participantId
                        }
                    }
                }
                , {
                    $lookup: {
                        from: 'users',
                        localField: 'participents',
                        foreignField: 'user_id',
                        as: 'user_details'
                    }
                }
                , {
                    $lookup: {
                        from: 'items',
                        localField: 'item_id',
                        foreignField: 'item_id',
                        as: 'item_details'
                    }
                }
                , {
                    $project: {
                        chat_id: 1,
                        messages: 1,
                        chat_started_by: 1,
                        participents: 1,
                        user_details: {
                            user_id: 1,
                            username: 1,
                            email: 1,
                            address: 1,
                        },
                        item_details: {
                            item_id: 1,
                            item_name: 1,
                            item_category: 1,
                        }
                    }
                }
            ]).toArray()

            console.log("------------------- chat by user -------------------------");
            console.log(result);
            console.log("------------------- chat by user -------------------------");



            if (!result) throw new Error('Chat not found');


            const seller_chat = [];
            const buyer_chat = [];
            const userDetails = []
            const itemDetails = []

            console.log(result);

            result.forEach(element => {
                if (element.chat_started_by === user_id) {
                    seller_chat.push(element);
                } else {
                    buyer_chat.push(element);
                }
            });

            console.log("------------------- buyer and seller data -------------------------");

            console.log("result chat : ", result);
            console.log("seller chat : ", seller_chat);
            console.log("buyer chat : ", buyer_chat);

            console.log("------------------- buyer and seller data -------------------------");

            return { seller_chat, buyer_chat };
        } catch (error) {
            throw error;
        }
    }

    async getChatByParticipantAndItemId(participantId, itemId) {
        try {


            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('chats')
            // insert document

            console.log(participantId, itemId);


            const chat = await collection.find({
                participents: { $all: participantId },
                item_id: itemId
            }).toArray(function (err, result) {
                if (err) throw err;

                console.log(result);

                let chats = result.map((chat) => {
                    let arr1 = chat.participents;
                    let arr2 = participantId;
                    if (arr1.length === arr2.length && arr1.every((element, index) => element === arr2[index])) {
                        return chat;
                    };
                })

                return chats
            }); // Populate the 'participants' field with only the 'username' property
            console.log("--------------------------------------------");
            console.log(chat);
            console.log("--------------------------------------------");
            if (!chat) throw new Error('Chat not found');
            return chat;
        } catch (error) {
            throw error;
        }
    }
    async getChatByChatId(chatID) {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('chats')
            // insert document
            console.log(chatID);
            const chat = await collection.find({ chat_id: chatID }, { messages: 1 }).toArray();
            if (!chat) throw new Error('Chat not found');
            return chat;
        } catch (error) {
            throw error;
        }
    }


    async getChatByUserId(user_id) {
        try {

            console.log(" getChatByParticipants ");
            const db = getDB();
            const collection = db.collection('chats')
            console.log(user_id);
            const result = await collection.aggregate([
                {
                    $match: {
                        participents: {
                            $in: [user_id]
                        }
                    }
                }
                , {
                    $lookup: {
                        from: 'users',
                        localField: 'participents',
                        foreignField: 'user_id',
                        as: 'user_details'
                    }
                }
                , {
                    $lookup: {
                        from: 'items',
                        localField: 'item_id',
                        foreignField: 'item_id',
                        as: 'item_details'
                    }
                }
                , {
                    $project: {
                        chat_id: 1,
                        messages: 1,
                        chat_started_by: 1,
                        participents: 1,
                        user_details: {
                            user_id: 1,
                            username: 1,
                            email: 1,
                            address: 1,
                        },
                        item_details: {
                            item_id: 1,
                            item_name: 1,
                            item_category: 1,
                        }
                    }
                }
            ]).toArray()

            console.log("------------------- chat by user -------------------------");
            console.log(result);
            console.log("------------------- chat by user -------------------------");



            if (!result) throw new Error('Chat not found');


            const seller_chat = [];
            const buyer_chat = [];
            const userDetails = []
            const itemDetails = []

            console.log(result);

            result.forEach(element => {
                if (element.chat_started_by === user_id) {
                    seller_chat.push(element);
                } else {
                    buyer_chat.push(element);
                }
            });

            console.log("------------------- buyer and seller data -------------------------");

            console.log("result chat : ", result);
            console.log("seller chat : ", seller_chat);
            console.log("buyer chat : ", buyer_chat);

            console.log("------------------- buyer and seller data -------------------------");

            return { seller_chat, buyer_chat };
        } catch (error) {
            throw error;
        }
    }

}