import { sendEmails } from "../../mailer/mailer.js";
import welcome from "../../templates/welcome.js";
import { User } from "../models/UserSchema.js";
import { OTP } from "../models/OTPSchema.js";
import otpTemp from "../../templates/otp.js";
import otpGenerator from 'otp-generator'
export default class UserService {

    async verifyMail(otp, user_id) {
        try {

            let user = await User.findOne({ user_id }, { password: 0, deleted_by: 0 })

            let res = await OTP.findOne({ email: user.email });

            if (res) {

                if (res.otp == otp) {
                    let res = await User.updateOne(
                        { user_id },
                        {
                            $set: {
                                varified: true,
                                deleted: '0'
                            }
                        }
                    )

                    await sendEmails([user.email], "Greetings", welcome(user.username))
                    return { data: user, status: true };

                } else {
                    return { data: "OTP Not Matched", status: false }
                }

            } else {
                return { data: "OTP Expired For This Email", status: false };
            }
        } catch (error) {
            console.log("something went wrong in verifyMail : ", error);
        }
    }

    async signUp(newUser) {
        try {
            let res = await User.create(newUser);

            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            let otp_res = await OTP.create({ email: newUser.email, otp });
            let otpHtmlTemp = otpTemp(otp);
            await sendEmails([newUser.email], "Email Verification", otpHtmlTemp);

            // console.log(res);
            return res;
        } catch (error) {
            console.log("something went wrong in signUp : ", error);
        }
    }

    async signIn(email, password) {
        try {
            let res = await User.findOne({ "email": email, "password": password, deleted: '0', varified: true })
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
            let res = await User.find({ deleted: '0', varified: true })
                .sort({ created_at: -1 })
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
            let totalCount = await User.countDocuments({ deleted: '0', varified: true })
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