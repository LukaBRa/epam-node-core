import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { catchError } from "../utils/catchError";

export class ProductController {

    static async findAll(req: Request, res: Response) {
        try {
            const products = await ProductRepository.findAll();
            res.status(200).json({ data: products });
        } catch (error) {
            catchError(res, "Failed to find all products.", error);
        }
    }

    static async findOne(req: Request<{ productId: string }>, res: Response) {
        try {
            const product = await ProductRepository.findOne(req.params.productId);
        
            if(!product) {
                res.status(404).json({ error: { message: "Product not found." } });
                return;
            }

            res.status(200).json({ data: product });
        } catch (error) {
            catchError(res, "Failed to find product.", error);
        }
    }

}