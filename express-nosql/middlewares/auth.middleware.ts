import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";

export async function auth(req: Request, res: Response, next: NextFunction) {

    if(!req.headers['x-user-id']) {
        res.status(403).json({ data: null, error: "You must be authorized user." })
        return;
    }
    
    const userId: string | string[] = req.headers["x-user-id"];
    const user = await UserRepository.findOne(typeof userId === "string" ? userId : "" );

    if(!user) {
        res.status(401).json({ data: null, error: "User is not authorized." });
        return;
    }

    next();

}