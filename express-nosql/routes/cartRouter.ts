import express from "express";
import { CartController } from "../controllers/cart.controller";
import { Request, Response } from "express";
import { auth } from "../middlewares/auth.middleware";

const cartRouter = express.Router();

cartRouter.use(auth);
cartRouter.get("/", CartController.findOrCreate);
cartRouter.put("/", CartController.updateCart);
cartRouter.delete("/", CartController.emptyCart);
cartRouter.post("/checkout", CartController.checkout);

export default cartRouter;