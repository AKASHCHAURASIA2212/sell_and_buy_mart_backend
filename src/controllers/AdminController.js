import UserService from "../services/UserService.js";
import ItemService from "../services/ItemService.js";
import MailService from "../services/MailService.js";

class AdminController {

    constructor() {
        this.UserService = new UserService()
        this.ItemService = new ItemService()
        this.MailService = new MailService()
    }

    async getAllItems(req, res) {

        try {



            let userData = await this.UserService.getUsers(3, 1);
            let itemData = await this.ItemService.getItems(3, 1);
            let mailData = await this.MailService.getMails(3, 1);

            // console.log("------------- getAllItems -------------");
            // console.log(userData.res.length, userData.totalCount,);
            // console.log(itemData.res.length, itemData.totalCount);
            // console.log(mailData.res.length, mailData.totalCount);
            // console.log("------------- getAllItems -------------");

            res.status(200).send({
                data: {
                    userData: userData,
                    itemData: itemData,
                    mailData: mailData
                },
                status: 200,
                message: "Admin",
                error: ""
            })

        } catch (err) {
            console.error('Error getting data:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: "none"
            });
        }

    }

    async getUsers(req, res) {

        try {

            let limit = req.params.limit;
            let page = req.params.page;

            console.log("getUsers : ", page, limit);

            let userData = await this.UserService.getUsers(Number(limit), Number(page));
            // let itemData = await this.ItemService.getItems(3);
            // let mailData = await this.MailService.getMails(3);

            console.log("------------- getAllItems -------------");
            // console.log(userData);
            // console.log(itemData);
            // console.log(mailData);
            console.log("------------- getAllItems -------------");

            res.status(200).send({
                data: {
                    userData: userData,
                    // itemData: itemData,
                    // mailData: mailData
                },
                status: 200,
                message: "Admin",
                error: ""
            })

        } catch (err) {
            console.error('Error getting data:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: "none"
            });
        }
    }

    async getUsersById(req, res) {
        // Logic to fetch users
        res.send('Get users');
    }

    async deleteUser(req, res) {
        try {

            let { userId, deleted_by } = req.body

            console.log(req.body);
            let result = await this.UserService.deleteUser(userId, deleted_by);


            res.status(200).send({
                data: result,
                status: 200,
                message: "User Deleted",
                error: ""
            })


        } catch (error) {
            console.error('Error deleting User:', error);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: error.message
            });
        }
    }

    async getItems(req, res) {

        try {

            let limit = req.params.limit;
            let page = req.params.page;

            // console.log("getItems : ", page, limit);

            let itemData = await this.ItemService.getAllItems(Number(limit), Number(page));

            // console.log("------------- getAllItems -------------");
            // console.log(itemData.res.length, itemData.totalCount);
            // console.log("------------- getAllItems -------------");

            res.status(200).send({
                data: {
                    itemData: itemData,
                },
                status: 200,
                message: "Admin",
                error: ""
            })

        } catch (err) {
            console.error('Error getting data:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: "none"
            });
        }
    }

    async getItemById(req, res) {
        // Logic to fetch item
        res.send('Get item');
    }

    async approveItem(req, res) {
        try {

            let { itemId, approved_by } = req.body

            console.log(req.body);
            let result = await this.ItemService.approveItem(itemId, approved_by);


            res.status(200).send({
                data: result,
                status: 200,
                message: "Item Approved",
                error: ""
            })


        } catch (error) {
            console.error('Error getting data:', error);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: error.message
            });
        }
    }

    async rejectItem(req, res) {
        try {

            let { itemId, rejected_by, message } = req.body

            let result = await this.ItemService.rejectItem(itemId, rejected_by, message);

            res.status(200).send({
                data: "",
                status: 200,
                message: "Item Rejected",
                error: ""
            })


        } catch (error) {
            console.error('Error getting data:', error);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: error.message
            });
        }
    }

    async deleteItem(req, res) {
        try {

            let { itemId, deleted_by } = req.body

            let result = await this.ItemService.deleteItem(itemId, deleted_by);

            res.status(200).send({
                data: "",
                status: 200,
                message: "Item Deleted",
                error: ""
            })

        } catch (error) {
            console.error('Error getting data:', error);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Admin",
                error: error.message
            });
        }
    }

    async getNotification(req, res) {
        // Logic to fetch notification
        res.send('Get notification');
    }

    async getNotificationById(req, res) {
        // Logic to fetch notification
        res.send('Get notification');
    }

    async updateNotification(req, res) {
        // Logic to update notification
        res.send('Update notification');
    }
}

export { AdminController };
