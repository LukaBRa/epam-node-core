import { Document } from "mongoose";

export enum UserRolesEnum {
    Admin = "admin",
    User = "user"
}

export interface IUserEntity extends Document {
    id: string,
    email: string,
    password: string,
    role: UserRolesEnum | string,
    createdAt: Date,
    updatedAt: Date
}