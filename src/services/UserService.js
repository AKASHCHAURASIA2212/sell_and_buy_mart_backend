import { getDB } from "../../db/connection.js";
import { sendEmails } from "../../mailer/mailer.js";
import weeklyNewsletter from "../../templates/weeklyNewsletter.js";
import welcome from "../../templates/welcome.js";
import { User } from "../models/UserSchema.js";
export default class UserService {
    async signUp(newUser) {
        try {
            let res = await User.create(newUser)
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
            let res = await User.findOne({ "email": email, "password": password })
            return res;
        } catch (error) {
            console.log("something went wrong in signIn : ", error);
        }
    }

    async updateUserDetails(username, email, phone, address, role, user_id) {
        try {
            let res = await User.updateOne(
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
            let res = await User.findOne({ "email": email })
            return res;
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async findByUserID(user_id) {
        try {
            console.log(user_id);
            let res = await User.find({ "user_id": { $in: user_id } })
            return res;
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async getUsers(pageSize, currentPage) {
        try {

            let res = await User.find({})
                .sort({ created_at: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)

            let totalCount = await User.countDocuments()

            return { res, totalCount };
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async deleteUser(userId, deleted_by) {
        try {
            let res = await User.updateOne({ "user_id": userId }, { $set: { deleted: "1", deleted_by: deleted_by } })
            return res;
        } catch (error) {
            console.log("something went wrong in deleteUser : ", error);
        }
    }

    async resetPassword(userId, Password) {
        try {
            let res = await User.updateOne({ "user_id": userId }, { $set: { password: Password } })
            return res;
        } catch (error) {
            console.log("something went wrong in resetPassword : ", error);
        }
    }
}