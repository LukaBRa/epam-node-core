"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const cartRouter = express_1.default.Router();
cartRouter.get("/", cart_controller_1.CartController.findOrCreate);
cartRouter.put("/", cart_controller_1.CartController.updateCart);
cartRouter.delete("/", cart_controller_1.CartController.emptyCart);
cartRouter.post("/checkout", cart_controller_1.CartController.checkout);
exports.default = cartRouter;
