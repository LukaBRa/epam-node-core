import type { ICartEntity } from "../types/ICartEntity";
import { Request, Response } from "express";
import { CartRepository } from "../repositories/cart.repository";
import Joi from "joi";
import { IUserEntity } from "../types/IUserEntity";
import { UserRepository } from "../repositories/user.repository";
import { OrderRepository } from "../repositories/order.repository";
import { response } from "../utils/response";

export class CartController {

    static async findOrCreate(req: Request, res: Response) {
        const userId: string | string[] | undefined = req.headers['x-user-id'];
        
        if(userId){
            const cart = await CartRepository.findOrCreate(typeof userId === "string" ? userId : "");
            if(cart){
                response(res, 200, cart, null);
                return;
            }
        }
        response(res, 500, null, "Internal server error.");
    }

    static async updateCart(req: Request, res: Response) {
        const userId = req.headers["x-user-id"];
        const productBodySchema = Joi.object({
            productId: Joi.string(),
            count: Joi.number()
        });
        const { error, value } = productBodySchema.validate(req.body);
        if(error) {
            response(res, 500, null, "Internal server error.");
            return;
        }
        const cartSnapshot = await CartRepository.updateCart(value, typeof userId === "string" ? userId : "");
        if(!cartSnapshot) {
            if(cartSnapshot === false){
                response(res, 400, null, "Product is not valid.");
            }else{
                response(res, 404, null, "Cart was not found.");
            }
            return;
        }
        response(res, 200, cartSnapshot, null); 
    }

    static async checkout(req: Request, res: Response) {
        const userId = req.headers['x-user-id'];

        const newOrder = await OrderRepository.createOrder(typeof userId === "string" ? userId : "");

        if(!newOrder) {
            response(res, 500, null, "Internal server error.");
            return;
        }

        response(res, 200, newOrder, null);
    }

    static async emptyCart(req: Request, res: Response) {
        const userId = req.headers['x-user-id'];
    
        const actionResult = await CartRepository.emptyCart(typeof userId === "string" ? userId : "");
        
        if(!actionResult){
            response(res, 500, null, "Internal server error.");
            return;
        }

        response(res, 200, { success: true }, null);

    }

}