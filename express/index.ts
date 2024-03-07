import dotenv from "dotenv";
import express from "express";
import { Express, Request, Response } from "express";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";
import { auth } from "./middlewares/auth.middleware";
import bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(auth);
app.use(bodyParser.json());
app.use("/api/products", productRouter);
app.use("/api/profile/cart", cartRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
