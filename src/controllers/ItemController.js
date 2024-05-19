import { Item } from '../models/ItemSchema.js';
import ItemService from '../services/ItemService.js';

import { generateMongoId } from '../../utils/genrateId.js'


export class ItemController {

    constructor() {
        this.ItemService = new ItemService();
    }

    // Function to add a new item
    async addNewItem(req, res) {
        try {

            const { seller, item_name, item_category, item_price, item_desc, location, posted_by, img } = req.body;

            // console.log(req.body);

            let data = {
                seller: seller,
                item_category,
                item_name,
                item_price,
                item_desc,
                location,
                posted_by,
                img
            }

            data.item_id = generateMongoId();
            let newItem = new Item(data)

            // console.log(newItem);
            const savedItem = await this.ItemService.addItem(newItem);
            res.status(201).json({
                data: savedItem,
                status: 201,
                message: "New Item added !!!",
                error: "none"
            });
        } catch (err) {
            console.error('Error adding new item:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error adding new item",
                error: "none"
            });
        }
    };

    async updateItemDetails(req, res) {
        try {

            const { item_id, item_name, item_category, item_desc, item_price, location, img } = req.body;

            // console.log(req.body);

            const savedItem = await this.ItemService.updateItemDetails(item_id, item_name, item_category, item_desc, item_price, location, img);

            res.status(201).json({
                data: savedItem,
                status: 201,
                message: "Item updated !!!",
                error: "none"
            });
        } catch (err) {
            console.error('Error Updating item:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error Updating item",
                error: "none"
            });
        }
    };

    async getAllItems(req, res) {
        try {

            let limit = req.params.limit;
            let offset = req.params.page;
            let search = req.params.search;
            let category = req.params.category;

            // console.log(req.params);

            let filter = { status: 'available' }

            if (category != 'empty') {
                filter.item_category = category;
            }

            if (search != 'empty') {

                const regexPattern = new RegExp(`.*${search}.*`, "i");
                filter.item_name = { $regex: regexPattern }
            };





            // console.log(limit, offset);



            const items = await this.ItemService.getAllItems(Number(limit), Number(offset), filter);
            // console.log(items);
            res.status(200).json({
                data: items,
                status: 200,
                message: "Items",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting all items:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "getting all items !!!",
                error: err
            });
        }
    };

    // Function to get items by category
    async getItemsByCategory(req, res) {
        try {
            // console.log("getItemsByCategory");
            const category = req.params.category;
            const items = await this.ItemService.getItemsByCategory(category);
            // console.log(items);
            res.status(200).json({
                data: items,
                status: 200,
                message: "Items",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting items by category:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting items by category",
                error: "none"
            });
        }
    };

    // Function to get item by ID
    async getItemById(req, res) {
        try {
            const itemId = req.params.itemId;
            const item = await this.ItemService.getItemById([itemId]);
            if (!item) {
                return res.status(404).json({
                    data: "",
                    status: 404,
                    message: "Item not found",
                    error: "none"
                });

            }
            res.status(200).json({
                data: item,
                status: 200,
                message: "Item",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting item by ID:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting item by ID",
                error: "none"
            });
        }
    };
    // Function to get item by ID
    async getItemByUserId(req, res) {
        try {
            const userId = req.body.userId;
            // console.log("getItemByUserId : ", userId);
            const item = await this.ItemService.getItemByUserId([userId]);
            if (!item) {
                return res.status(404).json({
                    data: "",
                    status: 404,
                    message: "Item not found",
                    error: "none"
                });

            }
            res.status(200).json({
                data: item,
                status: 200,
                message: "Item",
                error: "none"
            });
        } catch (err) {
            console.error('Error getting item by ID:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error getting item by ID",
                error: "none"
            });
        }
    };

    // Function to delete an item
    async approveItem(req, res) {
        try {
            const { itemId, approved_by } = req.body;
            const deletedItem = await this.ItemService.approveItem(itemId, approved_by);
            if (!deletedItem) {
                return res.status(404).json({
                    data: "",
                    status: 404,
                    message: "Item not found",
                    error: "none"
                });
            }
            res.status(200).json({ message: 'Item Approved successfully' });
            res.status(200).json({
                data: "",
                status: 200,
                message: "Item Approved successfully",
                error: "none"
            });
        } catch (err) {
            console.error('Error Approving item:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error Approving item",
                error: "none"
            });
        }
    };

    async rejectItem(req, res) {
        try {
            const { itemId, rejected_by, message } = req.body;
            const deletedItem = await this.ItemService.rejectItem(itemId, rejected_by, message);
            if (!deletedItem) {
                return res.status(404).json({
                    data: "",
                    status: 404,
                    message: "Item not found",
                    error: "none"
                });
            }
            res.status(200).json({ message: 'Item Rejected successfully' });
            res.status(200).json({
                data: "",
                status: 200,
                message: "Item Rejected successfully",
                error: "none"
            });
        } catch (err) {
            console.error('Error Rejected item:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error Rejected item",
                error: "none"
            });
        }
    };

    async deleteItem(req, res) {
        try {
            const { itemId, deleted_by } = req.body;
            const deletedItem = await this.ItemService.deleteItem(itemId, deleted_by);
            if (!deletedItem) {
                return res.status(404).json({
                    data: "",
                    status: 404,
                    message: "Item not found",
                    error: "none"
                });
            }
            res.status(200).json({ message: 'Item deleted successfully' });
            res.status(200).json({
                data: "",
                status: 200,
                message: "Item deleted successfully",
                error: "none"
            });
        } catch (err) {
            console.error('Error deleting item:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Error deleting item",
                error: "none"
            });
        }
    };

}
