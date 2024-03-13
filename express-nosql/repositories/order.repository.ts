import { CartModel } from "../models/Cart.model";
import OrderModel from "../models/Order.model";
import { IOrderEntity } from "../types/IOrderEntity";


export class OrderRepository {

    static async createOrder(userId: string): Promise<IOrderEntity | null> {

        const cart = await CartModel.findOne({ user: userId });
        
        if(cart) {
            try {

                const total = cart.items.reduce((sum, currentItem) => sum += currentItem.product.price * currentItem.count, 0);

                const newOrder = new OrderModel({
                    userId: userId,
                    cartId: cart?._id,
                    items: [...cart?.items],
                    payment: {
                        type: "paypal",
                        address: "London",
                        creditCard: "1234-1234-1234-1234"
                      },
                      delivery: {
                        type: "post",
                        address: "London"
                      },
                      comments: "delivered",
                      status: "created",
                      total: total
                });

                const savedOrder = await newOrder.save();
                return savedOrder;

            } catch (error) {
                console.log(error);
                return null;
            }
        } else {
            return null;
        }
        
    }

}