import { IUserEntity, UserRolesEnum } from "../types/IUserEntity";
import type { IRegisterBody } from "../types/IRegisterBody";
import User from "../models/User.model";

export class UserRepository {

    static async createUser({ email, password, role }: IRegisterBody) {

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

    static findOne(id: string) {
        try {
            const user = User.findOne({ _id: id });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async findAll() {

        try {
            const users = await User.find();
            return users;
        } catch (error) {
            console.log(error);
            return null;
        }

    }

}