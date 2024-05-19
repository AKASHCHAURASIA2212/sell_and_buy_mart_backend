import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { User } from '../src/models/UserSchema.js';

// Middleware function to authenticate JWT tokens
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        req.email = decoded.email;

        let userCount = await User.countDocuments({ email: req.email })

        console.log("url", req.url, "userCount", userCount);
        if (userCount == 1) {
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

