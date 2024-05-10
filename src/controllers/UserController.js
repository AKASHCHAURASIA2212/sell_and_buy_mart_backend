import { User } from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import { generateMongoId } from '../../utils/genrateId.js'
import { sendEmails } from '../../mailer/mailer.js';
import resetPassTemp from '../../templates/resetPassword.js';



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

            res.status(201).json({
                data: {
                    user_id: newUser.user_id,
                    username: newUser.username,
                    role: newUser.role
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

    async userLogin(req, res) {
        try {
            const resp = await this.UserService.findByMail(req.body.email)
            if (!resp) {
                return res.status(400).send({
                    data: "",
                    status: 400,
                    message: "User Not Exist",
                    error: ""
                })
            } else {
                let resps = await bcrypt.compare(req.body.password, resp.password)

                if (resps) {
                    let token = jwt.sign({ user_id: resp.user_id, email: resp.email }, 'SECRET KEY', { expiresIn: '20min' })
                    res.status(200).send({
                        data: {
                            user_id: resp.user_id,
                            username: resp.username,
                            role: resp.role,
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
        } catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    };

    async getUserByID(req, res) {
        try {
            console.log("inside getUserByID");

            let user_id = req.params.user_id;
            const resp = await this.UserService.findByUserID([user_id])
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
            console.log("inside updateUserDetails");


            let { username, email, phone, address, role, user_id } = req.body;
            const result = await this.UserService.updateUserDetails(username, email, phone, address, role, user_id)
            const resp = await this.UserService.findByUserID([user_id])
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
            return resp;
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    async checkUserExist(req, res) {
        try {
            console.log("inside checkUserExist");
            console.log(req.body);
            const user = await this.UserService.findByMail(req.body.email);
            if (!user) {
                return res.status(400).send({
                    data: false,
                    status: 400,
                    message: "User Not Found",
                    error: ""
                })

            }

            console.log(user);

            const userId = user.user_id;
            const email = user.email;
            let resetTemp = resetPassTemp(userId);
            sendEmails([email], "Reset Password", resetTemp);

            res.status(200).send({
                data: true,
                status: 200,
                message: "User Exist",
                error: ""
            })

        } catch (err) {
            console.error('Error resetting password:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    async sendRestPasswordMail(req, res) {
        try {
            const { mail, userId } = req.body;
            let resetTemp = resetPassTemp(userId);
            sendEmails(mail, "Reset Password", resetTemp);
            res.status(200).json({ message: 'Mail Send SuccessFully' });
        } catch (err) {
            console.error('Error resetting password:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    async resetPassword(req, res) {
        try {
            let { password, userId } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 13);
            const result = await this.UserService.resetPassword(userId, hashedPassword)
            console.log(result);
            res.status(200).send({
                data: '',
                status: 200,
                message: "Password Reset Successfully",
                error: ""
            })
        } catch (err) {
            console.error('Error resetting password:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };



}

