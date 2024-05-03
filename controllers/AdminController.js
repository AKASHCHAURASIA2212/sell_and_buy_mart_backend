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

            console.log("------------- getAllItems -------------");
            console.log(userData.res.length, userData.totalCount,);
            console.log(itemData.res.length, itemData.totalCount);
            console.log(mailData.res.length, itemData.totalCount);
            console.log("------------- getAllItems -------------");

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

    async updateUser(req, res) {
        // Logic to update user
        res.send('Update user');
    }

    async getItems(req, res) {

        try {

            let limit = req.params.limit;
            let page = req.params.page;

            console.log("getItems : ", page, limit);

            let itemData = await this.ItemService.getAllItems(Number(limit), Number(page));

            console.log("------------- getAllItems -------------");
            console.log(itemData.res.length, itemData.totalCount);
            console.log("------------- getAllItems -------------");

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

    async updateItem(req, res) {
        // Logic to update item
        res.send('Update item');
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
