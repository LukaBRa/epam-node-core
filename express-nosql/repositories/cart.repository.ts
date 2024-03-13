import { CartModel } from "../models/Cart.model";
import { ProductModel } from "../models/Product.model";
import UserModel from "../models/User.model";
import type { ICartEntity, } from "../types/ICartEntity";
import { IProductEntity } from "../types/IProductEntity";

export class CartRepository {


    static async findOrCreate(id: string) {
        const cart = await CartModel.findOne({ user: id });
        if(!cart){
            try {
                const newCart = await new CartModel({
                    user: id,
                    items: [],
                });
                const savedCart = await newCart.save();
                await UserModel.updateOne({ _id: id }, { cart: savedCart._id });
                return savedCart;
            } catch(error) {
                console.log(error);
                return null;
            }
        } 

        return cart;
    }

    static async updateCart({ productId, count }: { productId: string, count: number }, userId: string){
        let product: IProductEntity | null;
        let cart: ICartEntity | null;
        try{
            product = await ProductModel.findOne({ _id: productId });
            if(!product){
                return false;
            } 
        } catch (error) {
            console.log(error);
            return false;
        }
        try{
            cart = await CartModel.findOne({ user: userId });
            if(!cart){
                return null;
            }
        } catch(error) {
            console.log(error);
            return null;
        }

        let productExists = cart.items.find(item => item.product.id === productId);
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

        const cartSnapshot = { updatedCart, total };

        return cartSnapshot;
    };

    static async emptyCart(id: string) {
        
        try {
            await CartModel.updateOne(
                { user: id },
                { $set: { items: [] } }
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

}