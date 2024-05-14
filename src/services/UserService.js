import { getDB } from "../../db/connection.js";
import { sendEmails } from "../../mailer/mailer.js";
import weeklyNewsletter from "../../templates/weeklyNewsletter.js";
import welcome from "../../templates/welcome.js";
import { User } from "../models/UserSchema.js";
export default class UserService {
    async signUp(newUser) {
        try {
            let res = await User.create(newUser)
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

    async updateUserDetails(username, dob, email, phone, country, city, street, landmark, role, userId, user_img) {
        try {
            let res = await User.updateOne(
                { user_id: userId },
                {
                    $set: {
                        username: username,
                        dob: dob,
                        email: email,
                        phone: phone,
                        role: role,
                        user_img: user_img,
                        country: country,
                        city: city,
                        street: street,
                        landmark: landmark,
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
            let res = await User.findOne({ "email": email, "deleted": '0' })
            return res;
        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async findByUserID(user_id) {
        try {
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