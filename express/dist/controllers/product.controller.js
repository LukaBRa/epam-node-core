"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_repository_1 = require("../repositories/product.repository");
class ProductController {
    static findAll(req, res) {
        const products = product_repository_1.ProductRepository.findAll();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: products, error: null }));
    }
    static findOne(req, res) {
        const { productId } = req.params;
        const product = product_repository_1.ProductRepository.findOne(productId);
        if (!product) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ data: null, error: "No product with such id" }));
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: product, error: null }));
    }
}
exports.ProductController = ProductController;
