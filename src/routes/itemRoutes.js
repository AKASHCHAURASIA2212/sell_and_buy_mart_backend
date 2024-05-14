import express from 'express';
const itemRoutes = express.Router();
import { ItemController } from '../controllers/ItemController.js';

const itemController = new ItemController();
// Item routes
itemRoutes.get('/:page/:limit/:search/:category', (req, res) => {
    console.log("getAllItems");
    itemController.getAllItems(req, res)
});

itemRoutes.post('/category/:category', (req, res) => {
    console.log("getItemsByCategory");

    itemController.getItemsByCategory(req, res)
});

itemRoutes.get('/:itemId', (req, res) => {
    console.log("getItemById");

    itemController.getItemById(req, res)
});

itemRoutes.post('/user', (req, res) => {
    console.log("getItemByUserId");

    itemController.getItemByUserId(req, res)
});

itemRoutes.post('/update', (req, res) => {
    console.log("updateItemDetails");

    itemController.updateItemDetails(req, res)
});

itemRoutes.post('/add', (req, res) => {
    itemController.addNewItem(req, res)
});

itemRoutes.delete('/:itemId', (req, res) => {
    console.log("deleteItem");

    itemController.deleteItem(req, res)
});

export { itemRoutes };
