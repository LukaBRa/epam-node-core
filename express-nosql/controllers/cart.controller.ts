import type { ICartEntity } from "../types/ICartEntity";
import { Request, Response } from "express";
import { CartRepository } from "../repositories/cart.repository";
import Joi from "joi";
import { OrderRepository } from "../repositories/order.repository";
import { catchError } from "../utils/catchError";
import { validationResult } from "express-validator";

export class CartController {

    static async findOrCreate(req: Request, res: Response) {
        try {
            const userId: string | string[] | undefined = req.headers['x-user-id'];
            if(userId){
                const cart = await CartRepository.findOrCreate(typeof userId === "string" ? userId : "");
                if(cart){
                    res.status(200).json({ data: cart, error: null });
                    return;
                }
            }
            res.status(500).json({ data: null, error: { message: "Internal server error" } });
        } catch (error) {
            catchError(res, "Failed to find or create cart.", error);
        }
    }

    static async updateCart(req: Request, res: Response) {
        try {
            const userId = req.headers["x-user-id"];
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(400).json({ data: null, errors });
                return;
            }
            const cartSnapshot = await CartRepository.updateCart(req.body, typeof userId === "string" ? userId : "");
            if(!cartSnapshot) {
                if(cartSnapshot === false){
                    // If cartSnapshot is false it means that product is not found
                    res.status(400).json({ data: null, error: { message: "Product is not valid." } });
                }else{
                    // If cartSnapshot is null it means that cart was not found
                    res.status(400).json({ data: null, error: { message: "Cart was not found." } });
                }
                return;
            }
            res.status(200).json({ data: cartSnapshot, error: null });
        } catch (error) {
            catchError(res, "Failed to update cart.", error);
        }
    }

    static async checkout(req: Request, res: Response) {
        try {
            const userId = req.headers['x-user-id'];

            const newOrder = await OrderRepository.createOrder(typeof userId === "string" ? userId : "");

            if(!newOrder) {
                res.status(500).json({ data: null, error: { message: "Internal server error." } });
                return;
            }

            res.status(200).json({ data: newOrder, error: null });
        } catch (error) {
            catchError(res, "Failed to create order.", error);
        }
    }

    static async emptyCart(req: Request, res: Response) {
        try {
            const userId = req.headers['x-user-id'];
            const actionResult = await CartRepository.emptyCart(typeof userId === "string" ? userId : "");

            if(!actionResult){
                res.status(500).json({ data: null, error: { message: "Internal server error." } });
                return;
            }

            res.status(200).json({ data: { success: true }, error: null });
        } catch (error) {
            catchError(res, "Failed to empty cart.", error);
        }
    }

}