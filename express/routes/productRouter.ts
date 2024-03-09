import express from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.get("/", ProductController.findAll);
productRouter.get("/:productId", ProductController.findOne);

export default productRouter;