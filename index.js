import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { userRoutes } from './src/routes/userRoutes.js';
import { itemRoutes } from './src/routes/itemRoutes.js';
import { chatRoutes } from './src/routes/chatRoutes.js';
import { mailRoutes } from './src/routes/mailRoutes.js';
import { adminRoutes } from './src/routes/adminRoutes.js';
import { connectToMongoDB } from './db/connection.js';
import dotenv from "dotenv";
const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

await connectToMongoDB();

app.use(cors(corsOptions))
app.use(bodyParser.json())
dotenv.config();
let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.status(200).send('S&BM SERVER START');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});


