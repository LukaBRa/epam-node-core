import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import type { IProductEntity } from "../types/IProductEntity";
import { response } from "../utils/response";

export class ProductController {

    static findAll(req: Request, res: Response) {
        const products: IProductEntity[] = ProductRepository.findAll();
        response(res, 200, products, null);
    }

    static findOne(req: Request<{ productId: string }>, res: Response) {
        const { productId } = req.params;
        const product = ProductRepository.findOne(productId);
        if(!product) {
            response(res, 404, null, "No product with such id.");
        }

        response(res, 200, product, null);
    }

}