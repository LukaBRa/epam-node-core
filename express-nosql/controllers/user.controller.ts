import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { catchError } from "../utils/catchError";
import { validationResult } from "express-validator";

export class UserController {

    static async allUsers(req: Request, res: Response) {

        try {
            // Passed req, of pagination options is passed in url
            const users = await UserRepository.findAll(req);
            res.status(200).json({ data: users, error: null });
        } catch (error: any) {
            catchError(res, "Failed to find all users.", error);
        }

    }

    static async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({ data: null, errors: errors })
                return;
            }
            const user = await UserRepository.createUser(req.body);
    
            if(!user) {
                res.status(500).json({ data: null, error: { message: "Internal server error." } });
            }
    
            res.status(200).json({ data: user, error: null });
        } catch (error) {
            catchError(res, "Failed to register user.", error);
        }
        
    }

}