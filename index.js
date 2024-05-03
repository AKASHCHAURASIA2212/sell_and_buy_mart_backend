import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
const port = 3000;

// Import MongoDB connection
// import { connectToMongoDB } from ;
import { connectToMongoDB } from './db/connection.js';
// Import middleware
// import { authMiddleware } from './middleware/authenticate.js';
// import { loggerMiddleware } from './middleware/logs.js';

// Middleware to parse JSON requests
// app.use(express.json());
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())


// Import route files
import { userRoutes } from './routes/userRoutes.js';
import { itemRoutes } from './routes/itemRoutes.js';
import { chatRoutes } from './routes/chatRoutes.js';
import { mailRoutes } from './routes/mailRoutes.js';
import { adminRoutes } from './routes/adminRoutes.js';

// Use the route files
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/admin', adminRoutes);

// Catch-all route for unknown routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectToMongoDB();
});
