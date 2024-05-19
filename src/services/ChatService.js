import { Chat } from '../models/ChatSchema.js';

export default class ChatService {

    async addNewChat(newChat) {
        try {
            let res = await Chat.create(newChat)
            return res;

        } catch (error) {
            console.log("something went wrong in addItem : ", error);
        }
    }

    async insertChat(chatId, content, sendBy, message_id) {
        try {
            const result = await Chat.updateOne(
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
            return result;
        } catch (err) {
            console.error('Error inserting chat message:', err);
            return err
        }
    };

    async updateChat(chatId, messageId, newMessage) {
        try {
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
            const result = await Chat.updateOne(filter, update);
            if (!result) {
                return res.status(404).json({ error: 'Message not found in chat' });
            }
            return result
        } catch (err) {
            console.error('Error updating chat message:', err);
            return err
        }
    };

    async getChatByParticipants(participantId, user_id) {
        try {
            console.log(" getChatByParticipants ");
            console.log(participantId, user_id);
            const result = await Chat.aggregate([
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
                            user_img: 1
                        },
                        item_details: {
                            item_id: 1,
                            item_name: 1,
                            item_category: 1,
                        }
                    }
                }
            ])
            if (!result) throw new Error('Chat not found');
            const seller_chat = [];
            const buyer_chat = [];
            result.forEach(element => {
                if (element.chat_started_by === user_id) {
                    seller_chat.push(element);
                } else {
                    buyer_chat.push(element);
                }
            });
            return { seller_chat, buyer_chat };
        } catch (error) {
            throw error;
        }
    }
    async getChatByUserId(user_id) {
        try {

            console.log(" getChatByParticipants ");
            console.log(participantId, user_id);
            const result = await Chat.aggregate([
                {
                    $match: {
                        participents: {
                            $in: user_id
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
                            user_img: 1
                        },
                        item_details: {
                            item_id: 1,
                            item_name: 1,
                            item_category: 1,
                        }
                    }
                }
            ])
            if (!result) throw new Error('Chat not found');
            const seller_chat = [];
            const buyer_chat = [];
            result.forEach(element => {
                if (element.chat_started_by === user_id) {
                    seller_chat.push(element);
                } else {
                    buyer_chat.push(element);
                }
            });
            return { seller_chat, buyer_chat };
        } catch (error) {
            throw error;
        }
    }

    async getChatByParticipantAndItemId(participantId, itemId) {
        try {
            const chat = await Chat.find({
                participents: { $all: participantId },
                item_id: itemId
            })
            if (!chat) throw new Error('Chat not found');
            return chat;
        } catch (error) {
            throw error;
        }
    }
    async getChatByChatId(chatID) {
        try {
            const chat = await Chat.find({ chat_id: chatID });
            if (!chat) throw new Error('Chat not found');
            return chat;
        } catch (error) {
            throw error;
        }
    }


    async getChatByUserId(user_id) {
        try {
            const result = await Chat.aggregate([
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
                            user_img: 1
                        },
                        item_details: {
                            item_id: 1,
                            item_name: 1,
                            item_category: 1,
                        }
                    }
                }
            ])
            if (!result) throw new Error('Chat not found');
            const seller_chat = [];
            const buyer_chat = [];
            result.forEach(element => {
                if (element.chat_started_by === user_id) {
                    seller_chat.push(element);
                } else {
                    buyer_chat.push(element);
                }
            });
            return { seller_chat, buyer_chat };
        } catch (error) {
            throw error;
        }
    }

}