import type { ICartEntity } from "../types/ICartEntity";
import { Request, Response } from "express";
import { CartRepository } from "../repositories/cart.repository";
import Joi from "joi";
import { IUserEntity } from "../types/IUserEntity";
import { UserRepository } from "../repositories/user.repository";
import { OrderRepository } from "../repositories/order.repository";

export class CartController {

    static findOrCreate(req: Request, res: Response) {
        const userId = req.headers['x-user-id'];
        const cart = CartRepository.findOrCreate(typeof userId === "string" ? userId : "");

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: cart, error: null }));
    }

    static updateCart(req: Request, res: Response) {
        const updateCartBodySchema = Joi.object({
            productId: Joi.string(),
            count: Joi.number()
        })
        const { error, value } = updateCartBodySchema.validate(req.body);

        const userId = req.headers['x-user-id'];

        if(error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: null, error: { message: "Products are not valid." } }));
            return;
        }

        const cartSnapshot: ICartEntity | undefined = CartRepository.updateCart(value, typeof userId === "string" ? userId : "");
        if(!cartSnapshot) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: null, error: { message: "Cart was not found." } }));
            return;
        }

        const cartTotal = cartSnapshot.items.reduce((sum, currentItem) =>{ 
            return sum += currentItem.product.price * currentItem.count;
        }, 0);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: { cart: cartSnapshot, total: cartTotal } })); 
    }

    static emptyCart(req: Request, res: Response) {

        const userId = req.headers['x-user-id'];
        const result = CartRepository.emptyCart(typeof userId === "string" ? userId : "");

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: { success: result }, error: null }));
    }

    static checkout(req: Request, res: Response) {

        const userId = req.headers['x-user-id'];
        const user: IUserEntity | undefined = UserRepository.findOne(typeof userId === "string" ? userId : "");
        const cart: ICartEntity | undefined = CartRepository.findOrCreate(typeof userId === "string" ? userId : "");

        if(user && cart.items.length > 0) {
            const order = OrderRepository.createOrder(user, cart);
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