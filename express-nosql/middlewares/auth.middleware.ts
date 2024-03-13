import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";

export async function auth(req: Request, res: Response, next: NextFunction) {

    if(!req.headers['x-user-id']) {
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.send({ data: null, error: "You must be authorized user" });
        return;
    }
    
    const userId: string | string[] = req.headers["x-user-id"];
    const user = await UserRepository.findOne(typeof userId === "string" ? userId : "" );

    if(!user) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.send({ data: null, error: "User is not authorized" });
        return;
    }

    next();

}