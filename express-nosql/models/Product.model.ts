import mongoose, { Schema } from "mongoose";
import { IProductEntity } from "../types/IProductEntity";

export const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

export const ProductModel = mongoose.model<IProductEntity>('Product', ProductSchema);