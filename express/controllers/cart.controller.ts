import type { ICartEntity } from "../types/ICartEntity";
import { Request, Response } from "express";
import { CartRepository } from "../repositories/cart.repository";
import Joi from "joi";
import { IUserEntity } from "../types/IUserEntity";
import { UserRepository } from "../repositories/user.repository";
import { OrderRepository } from "../repositories/order.repository";
import { response } from "../utils/response";

export class CartController {

    static findOrCreate(req: Request, res: Response) {
        const userId = req.headers['x-user-id'];
        const cart = CartRepository.findOrCreate(typeof userId === "string" ? userId : "");

        response(res, 200, cart, null);
    }

    static updateCart(req: Request, res: Response) {
        const updateCartBodySchema = Joi.object({
            productId: Joi.string(),
            count: Joi.number()
        })
        const { error, value } = updateCartBodySchema.validate(req.body);

        const userId = req.headers['x-user-id'];

        if(error) {
            response(res, 400, null, "Products are not valid.");
            return;
        }

        const cartSnapshot: ICartEntity | undefined = CartRepository.updateCart(value, typeof userId === "string" ? userId : "");
        if(!cartSnapshot) {
            response(res, 404, null, "Cart was not found.");
            return;
        }

        const cartTotal = cartSnapshot.items.reduce((sum, currentItem) =>{ 
            return sum += currentItem.product.price * currentItem.count;
        }, 0);

        response(res, 200, { cart: cartSnapshot, total: cartTotal }, null);
    }

    static emptyCart(req: Request, res: Response) {

        const userId = req.headers['x-user-id'];
        const result = CartRepository.emptyCart(typeof userId === "string" ? userId : "");

        response(res, 200, { success: result }, null);
    }

    static checkout(req: Request, res: Response) {

        const userId = req.headers['x-user-id'];
        const user: IUserEntity | undefined = UserRepository.findOne(typeof userId === "string" ? userId : "");
        const cart: ICartEntity | undefined = CartRepository.findOrCreate(typeof userId === "string" ? userId : "");

        if(user && cart.items.length > 0) {
            const order = OrderRepository.createOrder(user, cart);
            response(res, 200, order, null);
            return;
        }

        response(res, 404, null, "Cart is empty.");
    }

}