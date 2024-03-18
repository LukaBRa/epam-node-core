import { IUserEntity, UserRolesEnum } from "../types/IUserEntity";
import type { IRegisterBody } from "../types/IRegisterBody";
import User from "../models/User.model";
import { Request } from "express";
import { paginate } from "../utils/paginate";
import UserModel from "../models/User.model";
import { PaginatedResult } from "../types/PaginateTypes";

export class UserRepository {

    static async createUser({ email, password, role }: IRegisterBody): Promise<IUserEntity | null | boolean> {

        try {
            const user = new User({
                email: email,
                password: password,
                role: role
            })
            return user;
        } catch (error) {
            console.error("Failed to create user in repository.", error);
            return null;
        }

    }

    static async findOne(id: string): Promise<IUserEntity | null | boolean> {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            console.log("Failed to find an user in repository.", error);
            return null;
        }
    }

    static async findAll(req: Request): Promise<PaginatedResult<IUserEntity> | null> {

        try {
            // Fixed page and perPage, no data in url for this app
            const page = 1;
            const perPage = 10;
            const users = await paginate(UserModel.find(), { page, perPage });
            return users;
        } catch (error) {
            console.error("Failed to find all users in repository.", error);
            return null;
        }

    }

}