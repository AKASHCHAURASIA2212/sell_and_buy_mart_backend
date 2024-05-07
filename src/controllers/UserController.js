import { User } from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import { generateMongoId } from '../../utils/genrateId.js'



export class UserController {

    constructor() {
        this.UserService = new UserService();
    }

    // Function to handle user sign up
    async userSignUp(req, res) {
        try {

            console.log(req.body);
            // Hash the password
            const hashedPassword = bcrypt.hashSync(req.body.password, 13);

            // Create a new user object
            const newUser = new User({
                user_id: generateMongoId(),
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                address: req.body.address
            });

            // Save the new user to the database
            const resp = await this.UserService.signUp(newUser);

            // Respond with the saved user data
            res.status(201).json({
                data: {
                    user_id: newUser.user_id,
                    username: newUser.username
                },
                status: 201,
                message: "New User Created !!!",
                error: "none"
            });
        } catch (err) {
            console.error('Error signing up:', err);
            res.status(500).json({
                data: "",
                status: 500,
                message: "Internal server error",
                error: err
            });
        }
    };

    // Function to handle user login
    async userLogin(req, res) {
        try {

            console.log(req.body);


            const resp = await this.UserService.findByMail(req.body.email)

            // console.log(resp);

            if (!resp) {
                return res.status(400).send({
                    data: "",
                    status: 400,
                    message: "User Not Exist",
                    error: ""
                })
            } else {
                // compare password with hash password

                let resps = await bcrypt.compare(req.body.password, resp.password)

                if (resps) {
                    // create token

                    let token = jwt.sign({ user_id: resp.user_id, email: resp.email }, 'SECRET KEY', { expiresIn: '20min' })

                    res.status(200).send({
                        data: {
                            user_id: resp.user_id,
                            username: resp.username,
                            token
                        },
                        status: 400,
                        message: "Login Succesfull",
                        error: ""
                    })
                } else {
                    console.error('Error Password Not Matched:');
                    res.status(400).json({
                        data: "",
                        status: 400,
                        message: "Error Password Not Matched",
                        error: ""
                    });
                }

            }
            // Find the user by email
            // const user = await User.findOne({ email: req.body.email });
            // if (!user) {
            //     return res.status(400).json({ error: 'Invalid credentials' });
            // }

            // Check if the password matches
            // const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            // if (!isPasswordMatch) {
            //     return res.status(400).json({ error: 'Invalid credentials' });
            // }

            // Generate JWT token
            // const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

            // Respond with the JWT token
            // res.status(200).json({ token });
        } catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    };

    async getUserByID(req, res) {
        try {

            let user_id = req.params.user_id;

            console.log("getUserByID ", user_id);

            const resp = await this.UserService.findByUserID([user_id])
            console.log(resp);

            res.status(200).send({
                data: {
                    data: resp[0]
                },
                status: 200,
                message: "User Data",
                error: ""
            })

        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    async updateUserDetails(req, res) {
        try {

            let { username, email, phone, address, role, user_id } = req.body;

            console.log("updateUserDetails => ", req.body);


            const result = await this.UserService.updateUserDetails(username, email, phone, address, role, user_id)
            console.log(result);

            console.log("getUserByID ", user_id);

            const resp = await this.UserService.findByUserID([user_id])
            console.log(resp);

            res.status(200).send({
                data: {
                    data: resp[0]
                },
                status: 200,
                message: "User Data",
                error: ""
            })

        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    async getUserDetailsByID(user_id) {
        try {

            const resp = await this.UserService.findByUserID(user_id)
            console.log(resp);

            return resp;

        } catch (err) {
            console.error('Error logging in:', err);
        }
    };



    // Function to handle password reset
    // async resetPassword(req, res) {
    //     try {
    //         // Find the user by email
    //         const user = await User.findOne({ email: req.body.email });
    //         if (!user) {
    //             return res.status(400).json({ error: 'User not found' });
    //         }

    //         // Generate a new password and update the user's password
    //         const newPassword = Math.random().toString(36).slice(-8); // Generate a random password
    //         const hashedPassword = await bcrypt.hash(newPassword, 10);
    //         user.password = hashedPassword;
    //         await user.save();

    //         // Send the new password to the user's email (implementation not shown here)

    //         // Respond with success message
    //         res.status(200).json({ message: 'Password reset successful' });
    //     } catch (err) {
    //         console.error('Error resetting password:', err);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // };

}

