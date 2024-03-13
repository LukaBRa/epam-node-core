import { Request, Response } from "express";
import { response } from "../utils/response";
import Joi from "joi";
import { UserRepository } from "../repositories/user.repository";

export class UserController {

    static async allUsers(req: Request, res: Response) {

        const users = await UserRepository.findAll();

        response(res, 200, users, null);
    }

    static async register(req: Request, res: Response) {
        const registerUserBodySchema = Joi.object({
            email: Joi.string(),
            password: Joi.string(),
            role: Joi.string()
        })

        const { error, value } = registerUserBodySchema.validate(req.body);

        if(error) {
            response(res, 400, null, "Invalid data.");
            return;
        }

        const user = await UserRepository.createUser(value);

        if(!user) {
            response(res, 500, null, "Internal Server error");
        }

        response(res, 200, user, null);
    }

}