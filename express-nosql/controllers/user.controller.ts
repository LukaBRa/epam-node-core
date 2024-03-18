import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { catchError } from "../utils/catchError";
import { validationResult } from "express-validator";
import UserModel from "../models/User.model";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserController {

    static async allUsers(req: Request, res: Response) {

        try {
            // Passed req, of pagination options is passed in url
            const users = await UserRepository.findAll(req);
            res.status(200).json({ data: users });
        } catch (error: any) {
            catchError(res, "Failed to find all users.", error);
        }

    }

    static async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({ errors: errors })
                return;
            }
            const user = await UserRepository.createUser(req.body);
    
            if(!user) {
                res.status(500).json({ error: { message: "Internal server error." } });
            }
    
            res.status(200).json({ data: user });
        } catch (error) {
            catchError(res, "Failed to register user.", error);
        }
        
    }

    static async login(req: Request, res: Response) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({ errors: errors });
            };

            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });

            if(user && (await bcrypt.compare(password, user.password))){

                const token = jwt.sign(
                    {
                        user_id: user._id,
                        email,
                        role: user.role
                    },
                    process.env.TOKEN_KEY!,
                    {
                        expiresIn: "2h",
                    }
                );

                return res.status(200).json({ token });
            }

            return res.status(404).json({ error: "No user with such email or password" });

        } catch (error) {
            catchError(res, "Failed to login,", error);
        }
    }

}