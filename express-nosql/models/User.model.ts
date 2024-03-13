import mongoose, { Schema } from "mongoose";
import { IUserEntity } from "../types/IUserEntity";
import { CartModel } from "./Cart.model";

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model<IUserEntity>('users', UserSchema);
