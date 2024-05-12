import express from 'express';
const itemRoutes = express.Router();
import { ItemController } from '../controllers/ItemController.js';

const itemController = new ItemController();
// Item routes
itemRoutes.get('/:page/:limit', (req, res) => {
    itemController.getAllItems(req, res)
});

itemRoutes.get('/category/:category', (req, res) => {
    itemController.getItemsByCategory(req, res)
});

itemRoutes.get('/:itemId', (req, res) => {
    itemController.getItemById(req, res)
});

itemRoutes.post('/user', (req, res) => {
    itemController.getItemByUserId(req, res)
});

itemRoutes.post('/update', (req, res) => {
    itemController.updateItemDetails(req, res)
});

itemRoutes.post('/add', (req, res) => {
    itemController.addNewItem(req, res)
});

itemRoutes.delete('/:itemId', (req, res) => {
    itemController.deleteItem(req, res)
});

export { itemRoutes };
