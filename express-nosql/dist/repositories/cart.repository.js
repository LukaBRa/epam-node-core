"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const product_repository_1 = require("./product.repository");
class CartRepository {
    static findOrCreate(id) {
        const cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            let newCart = {
                id: id,
                items: []
            };
            this.carts.push(newCart);
            return newCart;
        }
        return cart;
    }
    static updateCart({ productId, count }, userId) {
        let userCart = this.carts.find(cart => cart.id === userId);
        const product = product_repository_1.ProductRepository.findOne(productId);
        if (userCart && product) {
            this.carts = this.carts.map(cart => {
                // Find user cart
                if (cart.id === userId) {
                    // Check if product already exists in cart, if so just add count, if not, add new product
                    if (cart.items.find(item => item.product.id === productId)) {
                        cart.items = cart.items.map(item => {
                            if (item.product.id === productId) {
                                item.count += count;
                            }
                            return item;
                        });
                    }
                    else {
                        cart.items.push({ product, count: count });
                    }
                }
                // update userCard with new value to create snapshot
                userCart = cart;
                return cart;
            });
        }
        return userCart;
    }
    ;
    static emptyCart(id) {
        this.carts = this.carts.map(cart => {
            if (cart.id === id) {
                cart.items = [];
            }
            return cart;
        });
        return true;
    }
}
exports.CartRepository = CartRepository;
CartRepository.carts = [];
