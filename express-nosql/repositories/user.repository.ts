import { IUserEntity, UserRolesEnum } from "../types/IUserEntity";
import type { IRegisterBody } from "../types/IRegisterBody";
import User from "../models/User.model";

export class UserRepository {

    static async createUser({ email, password, role }: IRegisterBody): Promise<IUserEntity | null> {

        try {
            const user = new User({
                email: email,
                password: password,
                role: role
            })
            const savedUser = await user.save();
            return savedUser;
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    static async findOne(id: string): Promise<IUserEntity | null> {
        try {
            const user = await User.findOne({ _id: id });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async findAll(): Promise<IUserEntity[] | null> {

        try {
            const users = await User.find();
            return users;
        } catch (error) {
            console.log(error);
            return null;
        }

    }

}