import express, { Express } from "express";
import productRouter from "../routes/productRouter";
import cartRouter from "../routes/cartRouter";
import authRouter from "../routes/authRouter";
import bodyParser from "body-parser";

export function createApp(): Express {

    const app: Express = express();

    app.use(bodyParser.json());
    app.use("/api/products", productRouter);
    app.use("/api/profile/cart", cartRouter);
    app.use("/api/auth", authRouter);

    return app;
}