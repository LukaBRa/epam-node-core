import mongoose, { Schema } from "mongoose";
import {ProductModel, ProductSchema} from "./Product.model";
import { ICartEntity, ICartItemEntity } from "../types/ICartEntity";

export const CartItemSchema: Schema = new Schema({
    product: { type: ProductSchema, required: true },
    count: { type: Number, required: true },
});

export const CartItemModel = mongoose.model<ICartItemEntity>("CartItem", CartItemSchema);

const CartSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    items: { type: [CartItemSchema], required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

export const CartModel = mongoose.model<ICartEntity>("Cart", CartSchema);
