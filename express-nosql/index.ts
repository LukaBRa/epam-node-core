import dotenv from "dotenv";
import express from "express";
import { Express, Request, Response } from "express";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";
import authRouter from "./routes/authRouter";
import bodyParser = require("body-parser");
import { connectToMongoDB } from "./config/database";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const uri: string = process.env.MONGO_URI as string;

connectToMongoDB(uri);

app.use(bodyParser.json());
app.use("/api/products", productRouter);
app.use("/api/profile/cart", cartRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
