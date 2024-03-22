import express, { Express, Request, Response } from "express";
import productRouter from "../routes/productRouter";
import cartRouter from "../routes/cartRouter";
import authRouter from "../routes/authRouter";
import { ICurrentUser } from "../types/ICurrentUser";
import { logData } from "../middlewares/logger.middleware";
import { HealthController } from "../controllers/health.controller";

declare global {
    namespace Express {
        interface Request {
            user: ICurrentUser
        }
    }
}

export function createApp(): Express {

    const app: Express = express();

    app.use("/health", HealthController.checkHealth);
    app.use(logData);
    app.use("/api/products", productRouter);
    app.use("/api/profile/cart", cartRouter);
    app.use("/api/auth", authRouter);

    return app;
}