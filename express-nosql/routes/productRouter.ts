import express from "express";
import { ProductController } from "../controllers/product.controller";
import { auth } from "../middlewares/auth.middleware";

const productRouter = express.Router();

productRouter.use(auth);
productRouter.get("/", ProductController.findAll);
productRouter.get("/:productId", ProductController.findOne);

export default productRouter;