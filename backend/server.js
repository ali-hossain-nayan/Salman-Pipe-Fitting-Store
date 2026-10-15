import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB once and wait for the connection before handling requests.
const dbConnection = connectDB();

app.use(async (req, res, next) => {
    try {
        await dbConnection;
        next();
    } catch (error) {
        console.error('Database connection failed:', error.message);
        res.status(503).json({
            success: false,
            message: 'Database connection unavailable'
        });
    }
});

// API routes
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API is Working!');
});

// Export the Express app for Vercel.
export default app;

// Start a local server when running on your computer.
if (!process.env.VERCEL) {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}