import { ProductModel } from "../models/Product.model";
import type { IProductEntity } from "../types/IProductEntity";

export class ProductRepository {

    static async create({ title, description, price }: IProductEntity) {
        try {
            const product = new ProductModel({
                title: title,
                description: description,
                price: price
            })
            const createdProduct = await product.save();
            return createdProduct;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async findAll(): Promise<IProductEntity[] | null> {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            return null;
        }
    }

    static async findOne(id: string) {
        try {
            const product = await ProductModel.findOne({ _id: id });
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}