import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import type { IProductEntity } from "../types/IProductEntity";

export class ProductController {

    static findAll(req: Request, res: Response) {
        const products: IProductEntity[] = ProductRepository.findAll();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: products, error: null }));
    }

    static findOne(req: Request<{ productId: string }>, res: Response) {
        const { productId } = req.params;
        const product = ProductRepository.findOne(productId);
        if(!product) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: null, error: "No product with such id" }));
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: product, error: null }));
    }

}