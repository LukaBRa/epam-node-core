import mongoose, { Schema } from "mongoose";
import { IUserEntity } from "../types/IUserEntity";

const UserSchema: Schema = new Schema<IUserEntity>({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:  { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model<IUserEntity>('users', UserSchema);
