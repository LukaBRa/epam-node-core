import { CartModel } from "../models/Cart.model";
import { ProductModel } from "../models/Product.model";
import UserModel from "../models/User.model";
import type { ICartEntity, } from "../types/ICartEntity";
import { IProductEntity } from "../types/IProductEntity";

export class CartRepository {


    static async findOrCreate(id: string): Promise<ICartEntity | null> {
        try {
            const cart = await CartModel.findOneAndUpdate(
                { user: id },
                {
                    $setOnInsert: {
                        user: id,
                        items: []
                    }
                },
                { upsert: true, new: true } 
            );
            return cart;
        }  catch (error) {
            console.error("Failed to find or create cart in repository", error);
            return null;
        }
        
    }

    static async updateCart({ productId, count }: { productId: string, count: number }, userId: string){
        try{
            let product: IProductEntity | null;
            let cart: ICartEntity | null;
            product = await ProductModel.findOne({ _id: productId });
            if(!product){
                return false;
            }
            cart = await CartModel.findOne({ user: userId });
            if(!cart){
                return null;
            }
            let productExists = cart.items.some(item => item.product.id === productId);
            let updatedCart;
            if(!productExists) {
                updatedCart = await CartModel.findOneAndUpdate(
                    { _id: cart.id },
                    { $push: { items: { product, count } } },
                    { new: true }
                );
            } else {
                updatedCart = await CartModel.findOneAndUpdate(
                    { _id: cart.id, "items.product._id": productId },
                    { $inc: { "items.$.count": count } },
                    { new: true }
                );
            }

            const total = updatedCart?.items.reduce((sum, currentItem) => sum += currentItem.count * currentItem.product.price, 0);

            return { updatedCart, total };
        } catch(error) {
            console.log("Failed to update cart in repository", error);
            return null;
        }

        
    };

    static async emptyCart(id: string): Promise<Boolean> {
        
        try {
            await CartModel.deleteOne({ user: id },);
            return true;
        } catch (error) {
            console.error("Failed to delete cart in repository", error);
            return false;
        }

    }

}