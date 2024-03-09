import type { ICartEntity, } from "../types/ICartEntity";
import type { ICartItemEntity } from "../types/ICartItemEntity";
import { ProductRepository } from "./product.repository";

export class CartRepository {

    private static carts: ICartEntity[] = [];

    static findOrCreate(id: string) {
        const cart = this.carts.find(cart => cart.id === id);
        if(!cart){
            let newCart = {
                id: id,
                items: []
            }
            this.carts.push(newCart);
            return newCart;
        }
        return cart;
    }

    static updateCart({ productId, count }: { productId: string, count: number }, userId: string): ICartEntity | undefined{
        let userCart = this.carts.find(cart => cart.id === userId);
        const product = ProductRepository.findOne(productId);

        if(userCart && product) {

            this.carts = this.carts.map(cart => {
                // Find user cart
                if(cart.id === userId){
                    // Check if product already exists in cart, if so just add count, if not, add new product
                    if(cart.items.find(item => item.product.id === productId)){
                        cart.items = cart.items.map(item => {
                            if(item.product.id === productId){
                                item.count += count;
                            }
                            return item;
                        })
                    } else {
                        cart.items.push({ product, count: count });
                    }
                }
                // update userCard with new value to create snapshot
                userCart = cart;
                return cart;
            });

        }

        return userCart;
    };

    static emptyCart(id: string) {
        this.carts = this.carts.map(cart => {
            if(cart.id === id){
                cart.items = [];
            }
            return cart;
        })

        return true;
    }

}