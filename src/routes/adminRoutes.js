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


adminRoutes.post('/user/delete', (req, res) => {
    adminController.deleteUser(req, res)
});

adminRoutes.get('/item/:page/:limit', (req, res) => {
    adminController.getItems(req, res)
});

adminRoutes.post('/item/approve', (req, res) => {
    adminController.approveItem(req, res)
});

adminRoutes.post('/item/reject', (req, res) => {
    adminController.rejectItem(req, res)
});

adminRoutes.post('/item/delete', (req, res) => {
    adminController.deleteItem(req, res)
});

adminRoutes.get('/notification', (req, res) => {
    adminController.getNotification(req, res)
});

adminRoutes.put('/notification', (req, res) => {
    adminController.updateNotification(req, res)
});


export { adminRoutes };
