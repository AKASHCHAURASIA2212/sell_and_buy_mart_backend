import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { userRoutes } from './src/routes/userRoutes.js';
import { itemRoutes } from './src/routes/itemRoutes.js';
import { chatRoutes } from './src/routes/chatRoutes.js';
import { mailRoutes } from './src/routes/mailRoutes.js';
import { adminRoutes } from './src/routes/adminRoutes.js';
import { connectToMongoDB } from './db/connection.js';
import { authMiddleware } from './middleware/authenticate.js';
import dotenv from "dotenv";

await connectToMongoDB();
const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}


app.use(cors(corsOptions))
app.use(bodyParser.json())
dotenv.config();
let port = process.env.PORT;

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use('/api/users', userRoutes);
app.use('/api/items', authMiddleware, itemRoutes);
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/mail', authMiddleware, mailRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

app.get('/', (req, res) => {
    res.status(200).send('S&BM SERVER START');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});


