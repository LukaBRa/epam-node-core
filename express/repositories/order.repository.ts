import { ICartEntity } from "../types/ICartEntity";
import type { IOrderEntity } from "../types/IOrderEntity"
import { IUserEntity } from "../types/IUserEntity";

const uuid = require("uuid");

export class OrderRepository {

    private static orders: IOrderEntity[] = [];

    static createOrder(user: IUserEntity, cart: ICartEntity): IOrderEntity {

        const newOrder: IOrderEntity = {
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
            total: cart.items.reduce((sum, currentItem) => { return sum += currentItem.product.price * currentItem.count }, 0)
        }

        return newOrder;
    }

}