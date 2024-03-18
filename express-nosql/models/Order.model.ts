import mongoose, { Schema } from "mongoose";
import { CartItemSchema } from "./Cart.model";
import { IOrderEntity } from "../types/IOrderEntity";

const OrderSchema: Schema = new Schema({
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    items: { type: [CartItemSchema], required: true },
    payment: {
        type: { type: String, required: true },
        address: { type: String, required: true },
        creditCard: { type: String, required: true }
    },
    delivery: {
        type: { type: String },
        address: { type: String },
    },
    comments: { type: String, required: true, default: "" },
    status: { type: String, required: true },
    total: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model<IOrderEntity>("Order", OrderSchema);