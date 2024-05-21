import { Item } from "../models/ItemSchema.js";

export default class ItemService {
    async addItem(newItems) {
        try {
            let res = await Item.create(newItems)
            return res;
        } catch (error) {
            console.log("something went wrong in addItem : ", error);
        }
    }

    async getAllItems(pageSize, currentPage, filter) {
        try {
            let totalCount = await Item.countDocuments(filter)
            let res = await Item.find(filter)
                .sort({ date_entered: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
            return { res, totalCount };
        } catch (error) {
            console.log("something went wrong in getAllItems : ", error);
        }
    }

    async getItemsByCategory(category) {
        try {
            // console.log(category);
            let res = await Item.find({ "item_category": category }).sort({ date_entered: -1 })
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
            // console.log(id);
            let res = await Item.find({ "posted_by": { $in: id } }).sort({ date_entered: -1 })
            console.log(res);
            return res;
        } catch (error) {
            console.log("something went wrong in getItemByUserId : ", error);
        }
    }

    async getItems(limit) {
        try {
            let res = await Item.find({ deleted: '0' })
                .sort({ date_entered: -1 })
                .limit(limit)
            let totalCount = await Item.countDocuments({ deleted: '0' })
            return { res, totalCount };
        } catch (error) {
            console.log("something went wrong in getItems : ", error);
        }
    }

    async updateItemDetails(item_id, item_name, item_category, item_desc, item_price, location, img) {
        try {
            let update_obj = {
                item_category,
                item_desc,
                item_name,
                item_price,
                location,
                img
            }
            let res = await Item.updateOne(
                { item_id: item_id },
                {
                    $set: update_obj
                }
            )
            return res;
        } catch (error) {
            console.log("something went wrong in updateItemDetails : ", error);
        }
    }


    async approveItem(itemId, approved_by) {
        try {
            let res = await Item.updateOne({ "item_id": itemId }, { $set: { status: "available", approved_by: approved_by } })
            return res;
        } catch (error) {
            console.log("something went wrong in approveItem : ", error);
        }
    }

    async rejectItem(itemId, rejected_by, message) {
        try {
            let res = await Item.updateOne({ "item_id": itemId }, { $set: { status: "rejected", deleted: "1", rejected_by: rejected_by, message: message } })
            return res;

        } catch (error) {
            console.log("something went wrong in rejectItem : ", error);
        }
    }

    async deleteItem(itemId, deleted_by) {
        try {
            let res = await Item.updateOne({ "item_id": itemId }, { $set: { status: "unavailable", deleted: "1", deleted_by: deleted_by } })
            return res;
        } catch (error) {
            console.log("something went wrong in deleteItem : ", error);
        }
    }
}