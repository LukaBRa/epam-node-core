import { Document } from "mongoose";

export interface IProductEntity extends Document {
    id: string,
    title: string,
    description: string,
    price: number,
    createdAt: Date,
    updatedAt: Date
}