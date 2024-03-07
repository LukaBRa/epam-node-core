"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const uuid = require("uuid");
class OrderRepository {
    static createOrder(user, cart) {
        const newOrder = {
            id: uuid.v4(),
            userId: user.id,
            cartId: cart.id,
            items: [...cart.items],
            payment: {
                type: "paypal",
                address: "London",
                creditCard: "1234-1234-1234-1234"
            },
            delivery: {
                type: "post",
                address: "London"
            },
            comments: "",
            status: "created",
            total: cart.items.reduce((sum, currentItem) => { return sum += currentItem.product.price * currentItem.count; }, 0)
        };
        return newOrder;
    }
}
exports.OrderRepository = OrderRepository;
OrderRepository.orders = [];
