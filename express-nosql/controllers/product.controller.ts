import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import type { IProductEntity } from "../types/IProductEntity";
import { response } from "../utils/response";
import Joi from "joi";

export class ProductController {

    static async createProduct(req: Request, res: Response) {
        const productBodySchema = Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            price: Joi.number()
        });

        const { error, value } = productBodySchema.validate(req.body);

        if(error){
            response(res, 500, null, "Internal server error.");
            return;
        }

        try {
            const newProduct = await ProductRepository.create(value);
            if(newProduct){
                response(res, 200, newProduct, null);
                return;
            }
            response(res, 500, null, "Internal server error.");
        } catch (error) {
            console.log(error);
            response(res, 500, null, "Internal server error.");
        }
    }

    static async findAll(req: Request, res: Response) {
        const products = await ProductRepository.findAll();
        response(res, 200, products, null); 
    }

    static async findOne(req: Request<{ productId: string }>, res: Response) {
        const product = await ProductRepository.findOne(req.params.productId);
        
        if(!product) {
            response(res, 404, null, "Product not found.");
            return;
        }

        response(res, 200, product, null);
    }

}