import express from "express";
import { CartController } from "../controllers/cart.controller";
import { auth } from "../middlewares/auth.middleware";
import { CartProductValidatorSchema } from "../validation/schemas/CartProductValidatorSchema";

const cartRouter = express.Router();

cartRouter.use(auth);
cartRouter.get("/", CartController.findOrCreate);
cartRouter.put("/", CartProductValidatorSchema, CartController.updateCart);
cartRouter.delete("/", CartController.emptyCart);
cartRouter.post("/checkout", CartController.checkout);

export default cartRouter;