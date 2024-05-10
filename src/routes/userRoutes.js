import express from 'express';
import { UserController } from '../controllers/UserController.js';

const userController = new UserController();
const userRoutes = express.Router();

// User routes
userRoutes.post('/signup', (req, res) => {
    userController.userSignUp(req, res)
});
userRoutes.post('/signin', (req, res) => {
    userController.userLogin(req, res)
});
userRoutes.post('/update', (req, res) => {
    userController.updateUserDetails(req, res)
});
userRoutes.post('/check', (req, res) => {
    userController.checkUserExist(req, res)
});
userRoutes.post('/reset', (req, res) => {
    userController.resetPassword(req, res)
});
userRoutes.post('/:user_id', (req, res) => {
    userController.getUserByID(req, res)
});

export { userRoutes };
