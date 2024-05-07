import express from 'express';
const adminRoutes = express.Router();
import { AdminController } from '../controllers/AdminController.js';

const adminController = new AdminController();
// Item routes
adminRoutes.get('/dash', (req, res) => {
    adminController.getAllItems(req, res)
});
adminRoutes.get('/user/:page/:limit', (req, res) => {
    adminController.getUsers(req, res)
});
adminRoutes.put('/user', (req, res) => {
    adminController.updateUser(req, res)
});
adminRoutes.get('/item/:page/:limit', (req, res) => {
    adminController.getItems(req, res)
});
adminRoutes.put('/item', (req, res) => {
    adminController.updateItem(req, res)
});
adminRoutes.get('/notification', (req, res) => {
    adminController.getNotification(req, res)
});
adminRoutes.put('/notification', (req, res) => {
    adminController.updateNotification(req, res)
});

export { adminRoutes };
