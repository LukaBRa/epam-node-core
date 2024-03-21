import express, { Express, Request, Response } from "express";
import productRouter from "../routes/productRouter";
import cartRouter from "../routes/cartRouter";
import authRouter from "../routes/authRouter";
import { ICurrentUser } from "../types/ICurrentUser";
import { connectToMongoDB, closeMongoDBConnection } from "../config/database";
import { logData } from "../middlewares/logger.middleware";

declare global {
    namespace Express {
        interface Request {
            user: ICurrentUser
        }
    }
}

export function createApp(): Express {

    const app: Express = express();

    app.use("/health", async (req: Request, res: Response) => {
        try {
            if(await connectToMongoDB()) {
                res.status(200).json({ message: "Application is healthy." });
                closeMongoDBConnection();
            } 
            return res.status(500).send('Error connecting to database');
        } catch (error) {
            console.error("Failed to connect to mongodb.", error);
        }
        
    });
    app.use(logData);
    app.use("/api/products", productRouter);
    app.use("/api/profile/cart", cartRouter);
    app.use("/api/auth", authRouter);

    return app;
}