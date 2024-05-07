import { getDB } from "../../db/connection.js";

export default class UserService {
    async signUp(newUser) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('users')
            // insert document
            let res = await collection.insertOne(newUser)

            console.log("New User Created Succsessfully");

            return res;

        } catch (error) {
            console.log("something went wrong in signUp : ", error);
        }
    }

    async signIn(email, password) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('users')
            // insert document
            let res = await collection.findOne({ "email": email, "password": password })

            return res;

        } catch (error) {
            console.log("something went wrong in signIn : ", error);
        }
    }
    async updateUserDetails(username, email, phone, address, role, user_id) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('users')
            // insert document
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

            console.log(res);

            return res;

        } catch (error) {
            console.log("something went wrong in signIn : ", error);
        }
    }

    async findByMail(email) {
        try {

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('users')
            // insert document
            let res = await collection.findOne({ "email": email })

            return res;

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async findByUserID(user_id) {
        try {
            console.log(user_id);

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('users')
            // insert document
            let res = await collection.find({ "user_id": { $in: user_id } }).toArray()

            return res;

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }

    async getUsers(pageSize, currentPage) {
        try {

            console.log(pageSize, currentPage);
            // console.log(user_id);

            // get db
            const db = getDB();
            // get collection
            const collection = db.collection('users')


            // insert document
            let res = await collection.find()
                .sort({ created_at: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .toArray()


            let totalCount = await collection.countDocuments()

            console.log(res.length);

            return { res, totalCount };

        } catch (error) {
            console.log("something went wrong in findByMail : ", error);
        }
    }
}