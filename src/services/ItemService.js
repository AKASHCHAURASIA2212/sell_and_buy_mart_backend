import { getDB } from "../../db/connection.js";
import mongodb from 'mongodb';
import { Item } from "../models/ItemSchema.js";
const ObjectId = mongodb.ObjectId;

export default class ItemService {
    async addItem(newItems) {
        try {

            let res = await Item.create(newItems)

            console.log("New Item Created Succsessfully");

            return res;

        } catch (error) {
            console.log("something went wrong in addItem : ", error);
        }
    }

    async getAllItems(pageSize, currentPage) {
        try {


            let totalCount = await Item.countDocuments({})


            let res = await Item.find({})
                .sort({ date_entered: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)


            // console.log(total_count);

            // console.log(res);
            return { res, totalCount };
        } catch (error) {
            console.log("something went wrong in getAllItems : ", error);
        }
    }

    async getItemsByCategory(category) {
        try {
            console.log(category);
            let res = await Item.find({ "item_category": category }).sort({ date_entered: -1 })
            // console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in getItemsByCategory : ", error);
        }
    }
    async getItemById(id) {
        try {
            let res = await Item.find({ "item_id": { $in: id } }).sort({ date_entered: -1 })

            return res;

        } catch (error) {
            console.log("something went wrong in getItemById : ", error);
        }
    }

    async getItemByUserId(id) {
        try {
            console.log(id);
            let res = await Item.find({ "posted_by": { $in: id } }).sort({ date_entered: -1 })

            console.log(res);
            return res;

        } catch (error) {
            console.log("something went wrong in getItemByUserId : ", error);
        }
    }

    async getItems(limit) {
        try {
            let res = await Item.find({})
                .sort({ date_entered: -1 })
                .limit(limit)

            let totalCount = await Item.countDocuments()

            return { res, totalCount };

        } catch (error) {
            console.log("something went wrong in getItems : ", error);
        }
    }


    async approveItem(itemId, approved_by) {
        try {

            console.log(itemId, approved_by);

            let res = await Item.updateOne({ "item_id": itemId }, { $set: { status: "available", approved_by: approved_by } })
            // console.log(res);

            console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in approveItem : ", error);
        }
    }

    async rejectItem(itemId, rejected_by, message) {
        try {
            let res = await Item.updateOne({ "item_id": itemId }, { $set: { status: "rejected", deleted: "1", rejected_by: rejected_by, message: message } })
            // console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in rejectItem : ", error);
        }
    }

    async deleteItem(itemId, deleted_by) {
        try {
            let res = await Item.updateOne({ "item_id": itemId }, { $set: { status: "unavailable", deleted: "1", deleted_by: deleted_by } })
            // console.log(res);
            return res;
        } catch (error) {
            console.log("something went wrong in deleteItem : ", error);
        }
    }
}