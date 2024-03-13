"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_repository_1 = require("../repositories/cart.repository");
const joi_1 = __importDefault(require("joi"));
const user_repository_1 = require("../repositories/user.repository");
const order_repository_1 = require("../repositories/order.repository");
class CartController {
    static findOrCreate(req, res) {
        const userId = req.headers['x-user-id'];
        const cart = cart_repository_1.CartRepository.findOrCreate(typeof userId === "string" ? userId : "");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: cart, error: null }));
    }
    static updateCart(req, res) {
        const updateCartBodySchema = joi_1.default.object({
            productId: joi_1.default.string(),
            count: joi_1.default.number()
        });
        const { error, value } = updateCartBodySchema.validate(req.body);
        const userId = req.headers['x-user-id'];
        if (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: null, error: { message: "Products are not valid." } }));
            return;
        }
        const cartSnapshot = cart_repository_1.CartRepository.updateCart(value, typeof userId === "string" ? userId : "");
        if (!cartSnapshot) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: null, error: { message: "Cart was not found." } }));
            return;
        }
        const cartTotal = cartSnapshot.items.reduce((sum, currentItem) => {
            return sum += currentItem.product.price * currentItem.count;
        }, 0);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: { cart: cartSnapshot, total: cartTotal } }));
    }
    static emptyCart(req, res) {
        const userId = req.headers['x-user-id'];
        const result = cart_repository_1.CartRepository.emptyCart(typeof userId === "string" ? userId : "");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: { success: result }, error: null }));
    }
    static checkout(req, res) {
        const userId = req.headers['x-user-id'];
        const user = user_repository_1.UserRepository.findOne(typeof userId === "string" ? userId : "");
        const cart = cart_repository_1.CartRepository.findOrCreate(typeof userId === "string" ? userId : "");
        if (user && cart.items.length > 0) {
            const order = order_repository_1.OrderRepository.createOrder(user, cart);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: order, error: null }));
            return;
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: null, error: { message: "Cart is empty." } }));
    }
}
exports.CartController = CartController;
