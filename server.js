import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        const dbConnected = await connectDB();
        await connectCloudinary();

        //middleware
        app.use(cors());
        app.use(express.json());

        app.use('/api/user',userRouter)
        app.use('/api/product', productRouter)
        app.use('/api/cart', cartRouter)
        app.use('/api/order', orderRouter)

        //api endpoints
        app.get('/', (req, res) => {
            res.send({
                success: true,
                message: "Backend is running",
                dbConnected
            });
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}. DB connected: ${dbConnected}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error && error.stack ? error.stack : error);
        process.exit(1);
    }
}

startServer();
