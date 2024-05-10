import { getDB } from "../../db/connection.js";
import { sendEmails } from "../../mailer/mailer.js";
import weeklyNewsletter from "../../templates/weeklyNewsletter.js";
import welcome from "../../templates/welcome.js";
export default class UserService {
    async signUp(newUser) {
        try {
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.insertOne(newUser)
            console.log("New User Created Succsessfully");
            sendEmails([newUser.email], "Greetings", welcome(newUser.username))
            console.log(res);
            return res;
        } catch (error) {
            console.log("something went wrong in signUp : ", error);
        }
    }

    async signIn(email, password) {
        try {
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.findOne({ "email": email, "password": password })
            return res;
        } catch (error) {
            console.log("something went wrong in signIn : ", error);
        }
    }

    async updateUserDetails(username, email, phone, address, role, user_id) {
        try {
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.updateOne(
                { user_id: user_id },
                {
                    $set: {
                        username: username,
                        email: email,
                        phone: phone,
                        address: address,
                        role: role
                    }
                }
            )
            return res;
        } catch (error) {
            console.log("something went wrong in signIn : ", error);
        }
    }

    async findByMail(email) {
        try {
            const db = await getDB();
            const collection = db.collection('users')
            let res = await collection.findOne({ "email": email })
            return res;
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async findByUserID(user_id) {
        try {
            console.log(user_id);
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.find({ "user_id": { $in: user_id } }).toArray()
            return res;
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async getUsers(pageSize, currentPage) {
        try {
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.find()
                .sort({ created_at: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .toArray()
            let totalCount = await collection.countDocuments()
            return { res, totalCount };
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async deleteUser(userId, deleted_by) {
        try {
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.updateOne({ "user_id": userId }, { $set: { deleted: "1", deleted_by: deleted_by } })
            return res;
        } catch (error) {
            console.log("something went wrong in deleteUser : ", error);
        }
    }

    async resetPassword(userId, Password) {
        try {
            const db = getDB();
            const collection = db.collection('users')
            let res = await collection.updateOne({ "user_id": userId }, { $set: { password: Password } })
            return res;
        } catch (error) {
            console.log("something went wrong in resetPassword : ", error);
        }
    }
}