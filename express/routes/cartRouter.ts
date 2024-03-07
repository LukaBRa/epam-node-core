import express from "express";
import { CartController } from "../controllers/cart.controller";
import { Request, Response } from "express";

const cartRouter = express.Router();

cartRouter.get("/", CartController.findOrCreate);
cartRouter.put("/", CartController.updateCart);
cartRouter.delete("/", CartController.emptyCart);
cartRouter.post("/checkout", CartController.checkout);

export default cartRouter;