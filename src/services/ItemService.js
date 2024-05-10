import { getDB } from "../../db/connection.js";
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

export default class ItemService {
    async addItem(newItems) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            let res = await collection.insertOne(newItems)

            console.log("New Item Created Succsessfully");

            return res;

        } catch (error) {
            console.log("something went wrong in addItem : ", error);
        }
    }

    async getAllItems(pageSize, currentPage) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')


            let totalCount = await collection.countDocuments({})
            // let pages = Math.ceil(totalCount / limit);
            // if (offset == pages) {
            //     limit = totalCount - (pages * limit - limit);
            // }

            let res = await collection.find({})
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .toArray()

            // console.log(total_count);

            // console.log(res);
            return { res, totalCount };
        } catch (error) {
            console.log("something went wrong in getAllItems : ", error);
        }
    }

    async getItemsByCategory(category) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            let res = await collection.find({ "item_category": category }).toArray(function (err, result) {
                if (err) throw err;
                // console.log(result);
                db.close();
                return result
            })
            // console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }
    async getItemById(id) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            // console.log(id, typeof id);
            let res = await collection.find({ "item_id": { $in: id } }, { "item_id": 1, "item_category": 1, "item_name:": 1 }).toArray()

            return res;

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async getItemByUserId(id) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            // console.log(id, typeof id);
            let res = await collection.find({ "posted_by": { $in: id } }, { "item_id": 1, "item_category": 1, "item_name:": 1 }).toArray()

            return res;

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async getItems(limit) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')

            // insert document
            let res = await collection.find({})
                .sort({ created_at: -1 })
                .limit(limit).toArray()

            let totalCount = await collection.countDocuments()

            return { res, totalCount };

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }


    async approveItem(itemId, approved_by) {
        try {

            console.log(itemId, approved_by);

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            let res = await collection.updateOne({ "item_id": itemId }, { $set: { status: "available", approved_by: approved_by } })
            // console.log(res);

            console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in approveItem : ", error);
        }
    }

    async rejectItem(itemId, rejected_by, message) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            let res = await collection.updateOne({ "item_id": itemId }, { $set: { status: "rejected", deleted: "1", rejected_by: rejected_by, message: message } })
            // console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in rejectItem : ", error);
        }
    }

    async deleteItem(itemId, deleted_by) {
        try {
            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('items')
            // insert document
            let res = await collection.updateOne({ "item_id": itemId }, { $set: { status: "unavailable", deleted: "1", deleted_by: deleted_by } })
            // console.log(res);
            return res;
        } catch (error) {
            console.log("something went wrong in deleteItem : ", error);
        }
    }
}