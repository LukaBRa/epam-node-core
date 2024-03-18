import { ProductModel } from "../models/Product.model";
import type { IProductEntity } from "../types/IProductEntity";
import { paginate } from "../utils/paginate";
import { PaginatedResult } from "../types/PaginateTypes";

export class ProductRepository {

    static async create({ title, description, price }: IProductEntity): Promise< IProductEntity | null > {
        try {
            const product = new ProductModel({
                title: title,
                description: description,
                price: price
            })
            return product;
        } catch (error) {
            console.error("Failed to create product in repository.", error);
            return null;
        }
    }

    static async findAll(): Promise<PaginatedResult<IProductEntity> | null> {
        try {
            const page = 1;
            const perPage = 10;
            const products = await paginate(ProductModel.find({}, { password: 0 } ), { page, perPage });
            return products;
        } catch (error) {
            console.error("Failed to find all products in repository.", error);
            return null;
        }
    }

    static async findOne(id: string): Promise<IProductEntity | null> {
        try {
            const product = await ProductModel.findOne({ _id: id });
            return product;
        } catch (error) {
            console.log("Failed to find a product in repository.", error);
            return null;
        }
    }

}